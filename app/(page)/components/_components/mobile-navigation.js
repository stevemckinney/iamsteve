'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Button,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { sections } from './registry'

function getActiveLabel(activeSection) {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.id === activeSection) return item.label
    }
  }
  return 'Navigation'
}

export default function MobileNavigation({ activeSection, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = useCallback(
    (id) => {
      onSelect(id)
      setIsOpen(false)
    },
    [onSelect]
  )

  return (
    <div className="lg:hidden sticky top-0 z-40">
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button className="w-full flex items-center justify-between px-4 py-3 bg-surface-01 border-b border-surface-02 text-sm font-medium text-heading outline-none pressed:bg-surface-02 transition-colors">
          <span>{getActiveLabel(activeSection)}</span>
          <Icon
            icon="angle-down"
            size={16}
            variant="none"
            className={cn(
              'transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </Button>
        <ModalOverlay className="fixed inset-0 z-50 bg-neutral-01-900/60 backdrop-blur-sm transition-opacity duration-200 data-[entering]:opacity-0 data-[exiting]:opacity-0">
          <Modal className="fixed inset-x-0 top-0 z-50 outline-none transition-transform duration-200 data-[entering]:-translate-y-full data-[exiting]:-translate-y-full">
            <Dialog className="outline-none bg-surface-01 shadow-lg max-h-[70vh] overflow-y-auto">
              {({ close }) => (
                <nav
                  className="flex flex-col gap-4 p-4 pb-6"
                  aria-label="Design system navigation"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-variation-bold text-sm text-heading">
                      Navigation
                    </h2>
                    <Button
                      onPress={close}
                      className="p-1 rounded-sm text-body-60 hover:text-heading outline-none focus-visible:ring-2 focus-visible:ring-current"
                      aria-label="Close navigation"
                    >
                      <Icon icon="close" size={16} variant="none" />
                    </Button>
                  </div>
                  {sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-1">
                      <h3 className="font-display font-variation-bold text-xs uppercase tracking-wider text-body-60 px-3 pb-1">
                        {section.title}
                      </h3>
                      <ul className="flex flex-col">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => handleSelect(item.id)}
                              className={cn(
                                'w-full text-left block px-3 py-2 text-sm rounded-sm transition-colors duration-150',
                                activeSection === item.id
                                  ? 'text-heading bg-surface-02 font-medium'
                                  : 'text-body-80 hover:text-heading hover:bg-surface-02/50'
                              )}
                            >
                              {item.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  )
}
