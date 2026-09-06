'use client'

import { cn } from '@/lib/utils'
import { sections } from './registry'

export default function Sidebar({ activeSection, onSelect }) {
  return (
    <nav
      className="sticky top-8 self-start flex flex-col gap-6 max-h-[calc(100vh-4rem)] overflow-y-auto pb-8"
      aria-label="Design system navigation"
    >
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
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    'w-full text-left block px-3 py-1.5 text-sm rounded-sm transition-colors duration-150',
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
  )
}
