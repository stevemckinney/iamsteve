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
  const panel = useRef(null)

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
      <Modal
        ref={panel}
        className={cn(
          'fixed inset-x-0 z-200 flex flex-col outline-none',
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
      >
        <Dialog className="flex flex-col min-h-0 outline-none">
          <Handle panel={panel} />
          <div className="flex items-center gap-3 px-6 pb-4">
            {icon && (
              <Icon icon={icon} size={24} variant="header" aria-hidden="true" />
            )}
            <Heading
              slot="title"
              className="grow text-2xl font-display font-variation-bold lowercase leading-none text-heading"
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
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

// The pill at the top. Dragging it pulls the panel down; let go past the
// threshold and the panel closes from where it was, otherwise it settles back.
function Handle({ panel }) {
  const state = useContext(OverlayTriggerStateContext)
  const start = useRef(null)

  const distance = (event) => Math.max(0, event.clientY - start.current)

  const end = (event) => {
    if (start.current === null) return
    const pulled = distance(event)
    start.current = null
    panel.current.style.transition = ''
    panel.current.style.translate = ''
    if (pulled > 80) state.close()
  }

  return (
    <div
      className="flex justify-center py-3 touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={(event) => {
        start.current = event.clientY
        event.currentTarget.setPointerCapture(event.pointerId)
        panel.current.style.transition = 'none'
      }}
      onPointerMove={(event) => {
        if (start.current === null) return
        panel.current.style.translate = `0 ${distance(event)}px`
      }}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <span aria-hidden="true" className="h-1 w-10 rounded-full bg-body/25" />
    </div>
  )
}
