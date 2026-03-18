'use client'
import { useEffect, useRef, useCallback } from 'react'
import { Button } from 'react-aria-components'
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react'
import { Modal } from '@/components/modal'
import Icon from '@/components/icon'

const MIN_SCALE = 1
const MAX_SCALE = 4
const ZOOM_TARGET = 2
const ELASTIC_FACTOR = 0.15
const DISMISS_X_DAMPING = 0.3
const SPRING_SNAP = { type: 'spring', stiffness: 400, damping: 40 }
const SPRING_RESET = { type: 'spring', stiffness: 300, damping: 35 }
const SPRING_DISMISS = { type: 'spring', stiffness: 250, damping: 30 }
const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_PX = 30
const DISMISS_VY = 500
const DISMISS_DY = 150
const WHEEL_ZOOM_SPEED = 0.005

function getBoundsAtScale(s, fitDimensions) {
  const { w, h } = fitDimensions
  const maxX = Math.max(0, (w * s - window.innerWidth) / 2)
  const maxY = Math.max(0, (h * s - window.innerHeight) / 2)
  return { minX: -maxX, maxX, minY: -maxY, maxY }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function updateCursor(el, scale, isDragging) {
  const classes = ['cursor-zoom-in', 'cursor-zoom-out', 'cursor-grab', 'cursor-grabbing']
  el.classList.remove(...classes)
  if (scale <= 1) el.classList.add('cursor-zoom-in')
  else if (scale >= MAX_SCALE) el.classList.add('cursor-zoom-out')
  else el.classList.add(isDragging ? 'cursor-grabbing' : 'cursor-grab')
}

function LightboxContent({ src, alt, close }) {
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const fitDimensionsRef = useRef({ w: 0, h: 0 })
  const activePointers = useRef(new Map())
  const pinchRef = useRef(null)
  const lastTap = useRef(null)
  const justPinched = useRef(false)
  const isDraggingRef = useRef(false)
  const imgRef = useRef(null)

  const scaleValue = useMotionValue(1)
  const xValue = useMotionValue(0)
  const yValue = useMotionValue(0)
  const opacityVal = useMotionValue(1)

  const snapToBounds = useCallback(() => {
    const s = scaleValue.get()
    const { minX, maxX, minY, maxY } = getBoundsAtScale(
      s,
      fitDimensionsRef.current
    )
    const cx = xValue.get()
    const cy = yValue.get()
    const clampedX = clamp(cx, minX, maxX)
    const clampedY = clamp(cy, minY, maxY)
    if (cx !== clampedX) animate(xValue, clampedX, SPRING_SNAP)
    if (cy !== clampedY) animate(yValue, clampedY, SPRING_SNAP)
  }, [scaleValue, xValue, yValue])

  const toggleZoom = useCallback(
    (clientX, clientY) => {
      const scale = scaleValue.get()
      if (scale > 1) {
        animate(scaleValue, 1, SPRING_RESET)
        animate(xValue, 0, SPRING_RESET)
        animate(yValue, 0, SPRING_RESET)
      } else {
        const viewportCentreX = window.innerWidth / 2
        const viewportCentreY = window.innerHeight / 2
        const newX = -(clientX - viewportCentreX) * (ZOOM_TARGET - 1)
        const newY = -(clientY - viewportCentreY) * (ZOOM_TARGET - 1)
        animate(scaleValue, ZOOM_TARGET, SPRING_RESET)
        animate(xValue, newX, SPRING_RESET)
        animate(yValue, newY, SPRING_RESET)
      }
    },
    [scaleValue, xValue, yValue]
  )

  // Update cursor via DOM to avoid re-renders
  useMotionValueEvent(scaleValue, 'change', (s) => {
    if (buttonRef.current) {
      updateCursor(buttonRef.current, Math.max(MIN_SCALE, s), isDraggingRef.current)
    }
  })

  // Update fitDimensions on window resize
  useEffect(() => {
    function updateFitDimensions() {
      const img = imgRef.current
      if (img) {
        fitDimensionsRef.current = {
          w: img.offsetWidth,
          h: img.offsetHeight,
        }
      }
    }

    window.addEventListener('resize', updateFitDimensions)
    return () => window.removeEventListener('resize', updateFitDimensions)
  }, [])

  // Wheel/trackpad zoom
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onWheel(e) {
      e.preventDefault()
      const currentScale = scaleValue.get()
      const delta = -e.deltaY * WHEEL_ZOOM_SPEED
      const newScale = clamp(currentScale + delta, MIN_SCALE, MAX_SCALE)

      const viewportCentreX = window.innerWidth / 2
      const viewportCentreY = window.innerHeight / 2
      const scaleDelta = newScale / currentScale
      const cx = xValue.get()
      const cy = yValue.get()
      const newX = cx - (e.clientX - viewportCentreX - cx) * (scaleDelta - 1)
      const newY = cy - (e.clientY - viewportCentreY - cy) * (scaleDelta - 1)

      scaleValue.set(newScale)
      xValue.set(newX)
      yValue.set(newY)

      // Snap when zooming settles at min scale
      if (newScale <= MIN_SCALE) {
        animate(xValue, 0, SPRING_RESET)
        animate(yValue, 0, SPRING_RESET)
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scaleValue, xValue, yValue])

  // Pinch-to-zoom via raw pointer events
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onPointerDown(e) {
      el.setPointerCapture(e.pointerId)
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      justPinched.current = false

      if (activePointers.current.size === 2) {
        const pts = [...activePointers.current.values()]
        const dx = pts[1].x - pts[0].x
        const dy = pts[1].y - pts[0].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const midX = (pts[0].x + pts[1].x) / 2
        const midY = (pts[0].y + pts[1].y) / 2
        pinchRef.current = {
          startDist: dist,
          startScale: scaleValue.get(),
          startPanX: xValue.get(),
          startPanY: yValue.get(),
          startMidX: midX,
          startMidY: midY,
        }
      }
    }

    function onPointerMove(e) {
      if (!activePointers.current.has(e.pointerId)) return
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (activePointers.current.size === 2 && pinchRef.current) {
        const pts = [...activePointers.current.values()]
        const dx = pts[1].x - pts[0].x
        const dy = pts[1].y - pts[0].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const p = pinchRef.current
        const newScale = clamp(
          p.startScale * (dist / p.startDist),
          MIN_SCALE,
          MAX_SCALE
        )
        const scaleDelta = newScale / p.startScale
        const viewportCentreX = window.innerWidth / 2
        const viewportCentreY = window.innerHeight / 2
        const newX =
          p.startPanX - (p.startMidX - viewportCentreX) * (scaleDelta - 1)
        const newY =
          p.startPanY - (p.startMidY - viewportCentreY) * (scaleDelta - 1)
        scaleValue.set(newScale)
        xValue.set(newX)
        yValue.set(newY)
      }
    }

    function onPointerUp(e) {
      activePointers.current.delete(e.pointerId)

      if (activePointers.current.size < 2 && pinchRef.current) {
        pinchRef.current = null
        justPinched.current = true
        lastTap.current = null
        snapToBounds()
        return
      }

      if (justPinched.current) return

      function isDoubleTap(clientX, clientY) {
        const now = Date.now()
        const last = lastTap.current
        if (
          last &&
          now - last.time < DOUBLE_TAP_MS &&
          Math.abs(clientX - last.x) < DOUBLE_TAP_PX &&
          Math.abs(clientY - last.y) < DOUBLE_TAP_PX
        ) {
          lastTap.current = null
          return true
        }
        lastTap.current = { time: now, x: clientX, y: clientY }
        return false
      }

      if (isDoubleTap(e.clientX, e.clientY)) {
        toggleZoom(e.clientX, e.clientY)
      }
    }

    function onPointerCancel(e) {
      activePointers.current.delete(e.pointerId)
      if (pinchRef.current) {
        pinchRef.current = null
        justPinched.current = true
        snapToBounds()
      }
    }

    function onTouchMove(e) {
      if (activePointers.current.size >= 2) {
        e.preventDefault()
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerCancel)
    el.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerCancel)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [scaleValue, xValue, yValue, snapToBounds, toggleZoom])

  const handlePanStart = useCallback(() => {
    isDraggingRef.current = true
    if (buttonRef.current) {
      updateCursor(buttonRef.current, scaleValue.get(), true)
    }
  }, [scaleValue])

  const handlePan = useCallback(
    (e, info) => {
      if (activePointers.current.size > 1) return
      const scale = scaleValue.get()
      const x = xValue.get()
      const y = yValue.get()

      if (scale > 1) {
        const { minX, maxX, minY, maxY } = getBoundsAtScale(
          scale,
          fitDimensionsRef.current
        )
        const newX = x + info.delta.x
        const newY = y + info.delta.y
        const elasticX =
          newX < minX
            ? minX + (newX - minX) * ELASTIC_FACTOR
            : newX > maxX
            ? maxX + (newX - maxX) * ELASTIC_FACTOR
            : newX
        const elasticY =
          newY < minY
            ? minY + (newY - minY) * ELASTIC_FACTOR
            : newY > maxY
            ? maxY + (newY - maxY) * ELASTIC_FACTOR
            : newY
        xValue.set(elasticX)
        yValue.set(elasticY)
      } else {
        yValue.set(y + info.delta.y)
        xValue.set(x + info.delta.x * DISMISS_X_DAMPING)
      }
    },
    [scaleValue, xValue, yValue]
  )

  const handlePanEnd = useCallback(
    (e, info) => {
      isDraggingRef.current = false
      if (activePointers.current.size > 1) return

      const scale = scaleValue.get()

      if (scale <= 1) {
        const vy = Math.abs(info.velocity.y)
        const dy = Math.abs(yValue.get())
        if (vy > DISMISS_VY || dy > DISMISS_DY) {
          const direction = yValue.get() >= 0 ? 1 : -1
          animate(yValue, direction * (window.innerHeight + 300), {
            ...SPRING_DISMISS,
            onComplete: close,
          })
          animate(opacityVal, 0, { duration: 0.25 })
        } else {
          animate(xValue, 0, SPRING_RESET)
          animate(yValue, 0, SPRING_RESET)
        }
      } else {
        snapToBounds()
      }
    },
    [scaleValue, xValue, yValue, opacityVal, close, snapToBounds]
  )

  return (
    <Button
      ref={buttonRef}
      onPress={() => scaleValue.get() <= 1 && close()}
      className="w-full h-full flex items-center justify-center cursor-zoom-in"
      aria-label="Close image"
    >
      <motion.div
        ref={containerRef}
        style={{
          x: xValue,
          y: yValue,
          scale: scaleValue,
          opacity: opacityVal,
          willChange: 'transform',
        }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onClick={(e) => {
          if (scaleValue.get() > 1) e.stopPropagation()
        }}
        className="touch-none select-none"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={(e) => {
            fitDimensionsRef.current = {
              w: e.target.offsetWidth,
              h: e.target.offsetHeight,
            }
          }}
          draggable={false}
          className="block max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)] object-contain drop-shadow-image pointer-events-none"
        />
      </motion.div>
    </Button>
  )
}

export function FigureModal({ children, src, alt }) {
  return (
    <Modal
      content={({ close }) => (
        <LightboxContent src={src} alt={alt} close={close} />
      )}
    >
      <Button
        className="relative group cursor-zoom-in block w-full text-left [&_img]:transition-opacity [&_img]:duration-200 [&_img]:drop-shadow-placed hover:[&_img]:opacity-80"
        aria-label={`Enlarge image: ${alt}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute top-8 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-canvas shadow-reduced p-2 rounded-sm"
        >
          <Icon icon="enlarge" size={16} />
        </span>
      </Button>
    </Modal>
  )
}
