'use client'
import { useRef, useState } from 'react'
import { Button } from 'react-aria-components'
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react'
import { useGesture } from '@use-gesture/react'
import { Modal } from '@/components/modal'
import Icon from '@/components/icon'

const MIN_SCALE = 1
const MAX_SCALE = 4
const SPRING_SNAP = { type: 'spring', stiffness: 500, damping: 45 }
const SPRING_RESET = { type: 'spring', stiffness: 350, damping: 38 }
const SPRING_DISMISS = { type: 'spring', stiffness: 250, damping: 30 }
const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_PX = 30
const DISMISS_VY = 700   // px/s — requires a deliberate flick
const DISMISS_DY = 200   // px  — requires a deliberate drag
// Seconds of velocity projected forward on release for momentum feel
const MOMENTUM = 0.15
// Rubber-band resistance beyond bounds (0 = wall, 1 = no resistance)
const ELASTIC = 0.4

function getBoundsAtScale(s, fitDimensions) {
  const { w, h } = fitDimensions
  const maxX = Math.max(0, (w * s - window.innerWidth) / 2)
  const maxY = Math.max(0, (h * s - window.innerHeight) / 2)
  return { minX: -maxX, maxX, minY: -maxY, maxY }
}

function LightboxContent({ src, alt, close }) {
  const containerRef = useRef(null)
  const fitDimensionsRef = useRef({ w: 0, h: 0 })
  const lastTap = useRef(null)
  const isPinching = useRef(false)
  const isDragging = useRef(false)

  const scaleValue = useMotionValue(1)
  const xValue = useMotionValue(0)
  const yValue = useMotionValue(0)
  const opacityVal = useMotionValue(1)

  const [cursor, setCursor] = useState('cursor-zoom-in')

  useMotionValueEvent(scaleValue, 'change', (s) => {
    if (s <= 1) setCursor('cursor-zoom-in')
    else if (s >= MAX_SCALE) setCursor('cursor-zoom-out')
    else setCursor(isDragging.current ? 'cursor-grabbing' : 'cursor-grab')
  })

  function snapToBounds(s) {
    const { minX, maxX, minY, maxY } = getBoundsAtScale(s, fitDimensionsRef.current)
    const cx = xValue.get()
    const cy = yValue.get()
    const clampedX = Math.min(maxX, Math.max(minX, cx))
    const clampedY = Math.min(maxY, Math.max(minY, cy))
    if (Math.abs(cx - clampedX) > 0.5) animate(xValue, clampedX, SPRING_SNAP)
    if (Math.abs(cy - clampedY) > 0.5) animate(yValue, clampedY, SPRING_SNAP)
  }

  function toggleZoom(clientX, clientY) {
    const scale = scaleValue.get()
    if (scale > 1) {
      animate(scaleValue, 1, SPRING_RESET)
      animate(xValue, 0, SPRING_RESET)
      animate(yValue, 0, SPRING_RESET)
    } else {
      const TARGET = 2
      const vpCx = window.innerWidth / 2
      const vpCy = window.innerHeight / 2
      animate(scaleValue, TARGET, SPRING_RESET)
      animate(xValue, -(clientX - vpCx) * (TARGET - 1), SPRING_RESET)
      animate(yValue, -(clientY - vpCy) * (TARGET - 1), SPRING_RESET)
    }
  }

  // Double-tap detection — fired from the native onClick on the image container.
  // Clicks on the container are stopped from reaching the outer close-on-click
  // overlay, so this only handles the image-tap interaction.
  function handleClick(e) {
    e.stopPropagation()
    const { clientX, clientY } = e
    const now = Date.now()
    const last = lastTap.current
    if (
      last &&
      now - last.time < DOUBLE_TAP_MS &&
      Math.abs(clientX - last.x) < DOUBLE_TAP_PX &&
      Math.abs(clientY - last.y) < DOUBLE_TAP_PX
    ) {
      lastTap.current = null
      toggleZoom(clientX, clientY)
    } else {
      lastTap.current = { time: now, x: clientX, y: clientY }
    }
  }

  // useGesture is the single source of truth for all gesture handling.
  // It manages drag (pan + swipe-to-dismiss) and pinch-to-zoom in one
  // unified system, eliminating the conflicts that arise from mixing
  // Framer Motion's onPan events with raw pointer listeners.
  useGesture(
    {
      onDragStart: () => {
        if (isPinching.current) return
        isDragging.current = true
        if (scaleValue.get() > 1) setCursor('cursor-grabbing')
      },

      onDrag: ({ pinching, cancel, offset: [ox, oy] }) => {
        // A second finger arrived mid-drag — hand off to pinch
        if (pinching) return cancel()

        const scale = scaleValue.get()
        if (scale > 1) {
          // use-gesture applies rubberband + bounds via config, so we just
          // mirror the offset directly into the motion values
          xValue.set(ox)
          yValue.set(oy)
        } else {
          // Swipe-to-dismiss: constrain horizontal travel, follow vertically
          xValue.set(ox * 0.3)
          yValue.set(oy)
        }
      },

      onDragEnd: ({ pinching, tap, velocity: [vx, vy], offset: [ox, oy], event }) => {
        isDragging.current = false
        // Pinch took over — don't process as a drag end
        if (pinching) return
        // Taps are handled by the native onClick on the container
        if (tap) return

        const scale = scaleValue.get()

        if (scale <= 1) {
          // use-gesture velocity is in px/ms; convert to px/s for comparison
          const absVy = Math.abs(vy) * 1000
          const absOy = Math.abs(oy)
          if (absVy > DISMISS_VY || absOy > DISMISS_DY) {
            const dir = oy >= 0 ? 1 : -1
            animate(yValue, dir * (window.innerHeight + 300), {
              ...SPRING_DISMISS,
              onComplete: close,
            })
            animate(opacityVal, 0, { duration: 0.25 })
          } else {
            animate(xValue, 0, SPRING_RESET)
            animate(yValue, 0, SPRING_RESET)
          }
        } else {
          const { minX, maxX, minY, maxY } = getBoundsAtScale(
            scale,
            fitDimensionsRef.current
          )
          // Project forward by MOMENTUM seconds of velocity, then clamp to bounds.
          // Passing velocity to the spring gives natural deceleration feel.
          const velX = vx * 1000 // px/ms → px/s
          const velY = vy * 1000
          const targetX = Math.min(maxX, Math.max(minX, ox + velX * MOMENTUM))
          const targetY = Math.min(maxY, Math.max(minY, oy + velY * MOMENTUM))
          animate(xValue, targetX, { ...SPRING_SNAP, velocity: velX })
          animate(yValue, targetY, { ...SPRING_SNAP, velocity: velY })
        }
      },

      onPinchStart: () => {
        isPinching.current = true
        lastTap.current = null // a pinch is never a double-tap
      },

      // use-gesture's onPinch provides:
      //   origin  — the current midpoint of both fingers (window coords)
      //   offset  — [cumulativeScale, cumulativeAngle] from gesture start
      //   memo    — return value from the previous call (persistent across frames)
      //
      // We store the image state at gesture start in memo, then each frame we
      // compute the new position: zoom around the start origin + track any
      // translation of the midpoint across the screen.
      onPinch: ({ origin: [ox, oy], offset: [s], memo }) => {
        const startState = memo ?? {
          x: xValue.get(),
          y: yValue.get(),
          scale: scaleValue.get(),
          ox,
          oy,
        }

        const vpCx = window.innerWidth / 2
        const vpCy = window.innerHeight / 2

        // Actual world scale = start scale × gesture's cumulative factor
        const newScale = Math.min(
          MAX_SCALE,
          Math.max(MIN_SCALE, startState.scale * s)
        )
        const scaleRatio = newScale / startState.scale

        // Zoom around the start-of-gesture origin, plus translate by however
        // much the pinch midpoint has moved since the gesture began
        const newX =
          (startState.ox - vpCx) * (1 - scaleRatio) +
          startState.x * scaleRatio +
          (ox - startState.ox)
        const newY =
          (startState.oy - vpCy) * (1 - scaleRatio) +
          startState.y * scaleRatio +
          (oy - startState.oy)

        scaleValue.set(newScale)
        xValue.set(newX)
        yValue.set(newY)

        return startState
      },

      onPinchEnd: () => {
        isPinching.current = false
        const s = scaleValue.get()
        if (s <= MIN_SCALE + 0.05) {
          animate(scaleValue, 1, SPRING_RESET)
          animate(xValue, 0, SPRING_RESET)
          animate(yValue, 0, SPRING_RESET)
        } else {
          snapToBounds(s)
        }
      },
    },
    {
      target: containerRef,
      drag: {
        // Always start from the current motion value position so a drag
        // immediately following a pinch/spring picks up without a jump
        from: () => [xValue.get(), yValue.get()],
        bounds: () => {
          const scale = scaleValue.get()
          if (scale <= 1) return {} // no bounds — free-drag for swipe-to-dismiss
          const { minX, maxX, minY, maxY } = getBoundsAtScale(
            scale,
            fitDimensionsRef.current
          )
          return { left: minX, right: maxX, top: minY, bottom: maxY }
        },
        rubberband: ELASTIC,
        filterTaps: true,
        pointer: { touch: true },
      },
      pinch: {
        scaleBounds: { min: MIN_SCALE, max: MAX_SCALE },
        rubberband: true,
        pointer: { touch: true },
      },
      eventOptions: { passive: false },
    }
  )

  return (
    // Outer: full-screen overlay. Clicking outside the image closes the modal.
    // This is a plain div (not react-aria Button) to avoid press-event conflicts
    // with the gesture system on the inner element.
    <div
      className={`w-full h-full flex items-center justify-center ${cursor}`}
      onClick={close}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') close()
      }}
      role="button"
      tabIndex={0}
      aria-label="Close image"
    >
      <motion.div
        ref={containerRef}
        style={{ x: xValue, y: yValue, scale: scaleValue, opacity: opacityVal }}
        onClick={handleClick}
        className="touch-none select-none"
      >
        <img
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
    </div>
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
