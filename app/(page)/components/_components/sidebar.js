'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const sections = [
  {
    title: 'Foundations',
    items: [
      { id: 'colours', label: 'Colours' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing & radius' },
      { id: 'shadows', label: 'Shadows' },
      { id: 'icons', label: 'Icons' },
      { id: 'grid', label: 'Grid & layout' },
      { id: 'dark-mode', label: 'Dark mode' },
      { id: 'utilities', label: 'Custom utilities' },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'button', label: 'Button' },
      { id: 'card', label: 'Card' },
      { id: 'category', label: 'Category' },
      { id: 'chat', label: 'Chat' },
      { id: 'chip', label: 'Chip' },
      { id: 'codepen', label: 'CodePen' },
      { id: 'contact-form', label: 'ContactForm' },
      { id: 'date', label: 'Date' },
      { id: 'figure', label: 'Figure' },
      { id: 'icon-component', label: 'Icon' },
      { id: 'link', label: 'Link' },
      { id: 'modal', label: 'Modal' },
      { id: 'newsletter-form', label: 'NewsletterForm' },
      { id: 'notepad', label: 'Notepad' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'placeholder', label: 'Placeholder' },
      { id: 'social', label: 'Social' },
      { id: 'table-of-contents', label: 'Table of contents' },
    ],
  },
  {
    title: 'MDX authoring',
    items: [
      { id: 'blockquote', label: 'Blockquote' },
      { id: 'comparison-images', label: 'ComparisonImages' },
      { id: 'demo', label: 'Demo' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'link-buttons', label: 'LinkFigma & LinkGithub' },
      { id: 'shortcut', label: 'Shortcut' },
      { id: 'remark-plugins', label: 'Remark plugins' },
    ],
  },
  {
    title: 'Patterns',
    items: [{ id: 'illustration', label: 'Illustrations' }],
  },
]

export default function Sidebar() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const headings = document.querySelectorAll('[data-section]')
    headings.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

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
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    const target = document.getElementById(item.id)
                    if (
                      target &&
                      target.tagName === 'DETAILS' &&
                      !target.open
                    ) {
                      target.open = true
                    }
                  }}
                  className={cn(
                    'block px-3 py-1.5 text-sm rounded-sm transition-colors duration-150',
                    activeId === item.id
                      ? 'text-heading bg-surface-02 font-medium'
                      : 'text-body-80 hover:text-heading hover:bg-surface-02/50'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
