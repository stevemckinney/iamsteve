import * as Dialog from '@radix-ui/react-dialog'

import Icon from '@/components/icon'

export default function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

function ModalContent({ title, children, overlay = true }) {
  return (
    <Dialog.Portal>
      {overlay && (
        <Dialog.Overlay className="fixed z-199 inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      )}
      <Dialog.Content className="shadow-placed bg-white/90 [backdrop-filter:blur(6px)] flex flex-col rounded-lg h-auto mt-24 fixed z-200 bottom-4 left-4 right-4 max-w-md md:left-1/2 md:-translate-x-1/2 pt-2 outline-hidden data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
        <div className="mx-auto w-14 h-1 shrink-0 rounded-full bg-neutral-01-900/10 mb-9" />
        {title && (
          <>
            <Dialog.Title className="font-medium mb-4">{title}</Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <Icon icon="close" />
            </Dialog.Close>
          </>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
