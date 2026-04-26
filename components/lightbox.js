'use client'
import Icon from '@/components/icon'
import { Dialog } from '@/components/dialog'

export function Lightbox({ children, src, alt }) {
  return (
    <Dialog
      label={alt}
      className="max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)]"
      trigger={(id) => (
        <button
          type="button"
          popoverTarget={id}
          className="group cursor-zoom-in text-left my-4 block w-full"
          aria-label={`Enlarge image: ${alt}`}
        >
          <span className="relative block">
            {children}
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-200 bg-[light-dark(theme(--color-neutral-01-50/.8),theme(--color-fern-1100/.8))] backdrop-blur-md shadow-reduced p-2 rounded-sm"
            >
              <Icon icon="enlarge" size={16} />
            </span>
          </span>
        </button>
      )}
    >
      <img
        src={src}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className="block max-w-full max-h-full object-contain rounded-sm touch-pinch-zoom"
      />
    </Dialog>
  )
}
