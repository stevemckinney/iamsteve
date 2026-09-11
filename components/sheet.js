'use client'

import { useContext, useRef } from 'react'
import {
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
  Button,
  OverlayTriggerStateContext,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

// A panel that slides up from the bottom edge. It takes its open state from
// the trigger it sits in (DialogTrigger, MenuTrigger) or from isOpen and
// onOpenChange when used on its own. The look follows the hamburger menu.
export default function Sheet({ title, icon, className, children, ...props }) {
  const scroller = useRef(null)

  // The list scrolls inside the sheet. When it fits, a touch anywhere on it
  // may pull the sheet instead, so the browser must not claim it for panning.
  // Measured again whenever the box changes size, as a react-aria collection
  // renders its items a pass after the box first appears.
  const fit = (element) => {
    if (!element) return
    scroller.current = element
    const measure = () => {
      element.style.touchAction =
        element.scrollHeight > element.clientHeight ? 'pan-y' : 'none'
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => {
      observer.disconnect()
      scroller.current = null
    }
  }

  return (
    <ModalOverlay
      isDismissable
      {...props}
      className={cn(
        'fixed inset-0 z-200 bg-canvas/60',
        'transition-opacity duration-300 ease-out motion-reduce:transition-none',
        'data-[entering]:opacity-0 data-[exiting]:opacity-0'
      )}
    >
      <Panel
        scroller={scroller}
        onClose={() => props.onOpenChange?.(false)}
        className={className}
      >
        <Dialog className="flex flex-col min-h-0 outline-none">
          <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
            <span
              aria-hidden="true"
              className="h-1 w-10 rounded-full bg-body/25"
            />
          </div>
          <div className="flex items-center gap-3 px-6 pb-4">
            <Heading
              slot="title"
              className="relative top-px grow text-2xl font-display font-variation-bold lowercase leading-none text-heading"
            >
              {title}
            </Heading>
            <Button
              slot="close"
              aria-label="Close"
              className={cn(
                'flex p-2 -m-2 rounded-sm text-body cursor-pointer',
                'hover:text-heading transition-colors duration-200 ease-linear',
                'outline-none focus-visible:ring-2 focus-visible:ring-cornflour-600 dark:focus-visible:ring-fern-400'
              )}
            >
              <Icon
                icon="close"
                size={24}
                variant="header"
                aria-hidden="true"
              />
            </Button>
          </div>
          <div
            ref={fit}
            className="min-h-0 overflow-auto"
            // A mouse dragging a link would start the browser's own link drag
            // and end the pull
            onDragStart={(event) => event.preventDefault()}
          >
            {children}
          </div>
        </Dialog>
      </Panel>
    </ModalOverlay>
  )
}

// The panel itself, and the pull that dismisses it. A pull can start anywhere
// except on a list that scrolls, which keeps its touches for scrolling. The
// handlers run in the capture phase, as react-aria's pressable items stop
// pointer events from bubbling. Once a pull has moved past a few pixels the
// press underneath it is cancelled, so letting go over a link does not follow
// it. Past the threshold, or on a flick, the panel closes from where it was;
// otherwise it settles back.
function Panel({ scroller, onClose, className, children }) {
  const state = useContext(OverlayTriggerStateContext)
  const panel = useRef(null)
  const pull = useRef(null)
  const pulled = useRef(false)

  const close = () => (state ? state.close() : onClose())

  const end = (event) => {
    const current = pull.current
    if (!current || !event.isTrusted || event.pointerId !== current.id) return
    pull.current = null
    if (!current.moved) return
    pulled.current = true
    panel.current.style.transition = ''
    panel.current.style.translate = ''
    const distance = Math.max(0, event.clientY - current.start)
    // Speed over the last stretch of the pull, so one odd sample cannot flick
    const { samples } = current
    const last = samples[samples.length - 1]
    const first = samples.find((sample) => last.t - sample.t <= 100)
    const speed = (last.y - first.y) / Math.max(1, last.t - first.t)
    if (distance > 80 || (distance > 16 && speed > 0.5)) close()
  }

  return (
    <Modal
      ref={panel}
      className={cn(
        'fixed inset-x-0 z-200 flex flex-col outline-none touch-none select-none',
        // Safari's bottom bar is translucent and shows what is behind it.
        // A fixed panel stops at the top of the bar, so the bar would show
        // the page. Reaching under it by the bar's height, and padding by
        // the same, fills the bar with the panel. Elsewhere the bar is 0.
        '[--bar:0px] supports-[height:100svh]:[--bar:calc(100lvh_-_100svh)]',
        'bottom-[calc(var(--bar)_*_-1)] max-h-[calc(100dvh_-_4rem_+_var(--bar))]',
        'pb-[calc(var(--bar)_+_max(1.5rem,env(safe-area-inset-bottom)))]',
        'rounded-t-lg shadow-placed backdrop-blur-md backdrop-contrast-200 backdrop-saturate-100',
        'bg-[light-dark(rgb(255_255_255/.90),color-mix(in_oklab,var(--color-fern-1200),transparent_20%))]',
        'transition-transform duration-300 ease-out motion-reduce:transition-none',
        'data-[entering]:translate-y-full data-[exiting]:translate-y-full',
        className
      )}
      onPointerDownCapture={(event) => {
        pulled.current = false
        if (event.button !== 0) return
        const list = scroller.current
        if (
          list?.contains(event.target) &&
          list.scrollHeight > list.clientHeight
        ) {
          return
        }
        pull.current = {
          id: event.pointerId,
          start: event.clientY,
          target: event.target,
          moved: false,
          samples: [{ y: event.clientY, t: event.timeStamp }],
        }
      }}
      onPointerMoveCapture={(event) => {
        const current = pull.current
        if (!current || event.pointerId !== current.id) return
        if (!current.moved) {
          if (event.clientY - current.start < 8) return
          current.moved = true
          event.currentTarget.setPointerCapture(current.id)
          current.target.dispatchEvent(
            new PointerEvent('pointercancel', {
              bubbles: true,
              pointerId: current.id,
            })
          )
          panel.current.style.transition = 'none'
        }
        current.samples.push({ y: event.clientY, t: event.timeStamp })
        if (current.samples.length > 12) current.samples.shift()
        panel.current.style.translate = `0 ${Math.max(
          0,
          event.clientY - current.start
        )}px`
      }}
      onPointerUpCapture={end}
      onPointerCancelCapture={end}
      onClickCapture={(event) => {
        if (!pulled.current) return
        pulled.current = false
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {children}
    </Modal>
  )
}
