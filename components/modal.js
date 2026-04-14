'use client'
import {
  DialogTrigger,
  ModalOverlay,
  Modal as AriaModal,
  Dialog,
} from 'react-aria-components'

export function Modal({ children, content }) {
  return (
    <DialogTrigger>
      {children}
      <ModalOverlay className="fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300 data-[entering]:opacity-0 data-[exiting]:opacity-0">
        <AriaModal className="fixed inset-0 outline-none transition-all duration-300 data-[exiting]:delay-[50ms] data-[entering]:opacity-0 data-[entering]:scale-95 data-[entering]:-translate-y-2 data-[exiting]:opacity-0 data-[exiting]:scale-95 data-[exiting]:-translate-y-2">
          <Dialog className="outline-none w-full h-full">
            {({ close }) => content({ close })}
          </Dialog>
        </AriaModal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
