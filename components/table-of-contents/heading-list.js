'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

const childBranchClasses = cn(
  'relative pl-6',
  'before:content-[""] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6',
  'before:border-l-2 before:border-b-2 before:border-neutral-01-600/30 dark:before:border-fern-400/12',
  'last:before:rounded-bl-sm',
  'after:content-[""] after:absolute after:left-0 after:bottom-[.375rem] after:w-4 after:h-[.75rem]',
  'after:border-l-2 after:border-neutral-01-600/30 dark:after:border-fern-400/12 last:after:hidden',
  'hover:before:w-6 before:will-change-auto before:transform-gpu before:transition-all before:duration-200 before:ease'
)

const linkBaseClasses =
  'block truncate font-medium py-1.5 hover:text-fern-600 dark:hover:text-dandelion-300 hover:translate-x-2 transform-gpu transition-all duration-200 ease'

export default function HeadingList({ nestedHeadings, headings, toggleOpen }) {
  const [activeId, setActiveId] = useState('')
  const isMobile = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '0% 0% -50% 0%',
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const handleLinkClick = useCallback(
    (e, slug) => {
      if (isMobile) {
        e.preventDefault()
        toggleOpen()
        setTimeout(() => {
          const element = document.getElementById(slug)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 300)
      }
    },
    [isMobile, toggleOpen]
  )

  const renderHeadings = (
    items,
    className = 'pt-1',
    classChildren = 'pb-0'
  ) => {
    return (
      <ul className={cn(className)}>
        {items.map((heading) => (
          <li key={heading.slug} className={cn('group/toc', classChildren)}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                linkBaseClasses,
                activeId === heading.slug && 'text-fern-600 dark:text-fern-200'
              )}
              aria-current={activeId === heading.slug ? 'location' : undefined}
              aria-label={`Go to section: ${heading.text}`}
              onClick={(e) => handleLinkClick(e, heading.slug)}
            >
              {heading.text}
            </a>
            {heading.children &&
              heading.children.length > 0 &&
              renderHeadings(heading.children, 'pt-1', childBranchClasses)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <nav aria-labelledby="aside-contents">
      {nestedHeadings.length > 0 ? renderHeadings(nestedHeadings) : null}
    </nav>
  )
}
