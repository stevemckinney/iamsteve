'use client'
import { Button } from 'react-aria-components'
import { Modal } from '@/components/modal'
import Icon from '@/components/icon'

export function FigureModal({ children, src, alt }) {
  return (
    <Modal
      content={({ close }) => (
        <Button
          onPress={close}
          className="cursor-zoom-out w-full h-full flex items-center justify-center p-8"
          aria-label="Close image"
        >
          <img
            src={src}
            alt={alt}
            className="block max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)] object-contain drop-shadow-image"
          />
        </Button>
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
