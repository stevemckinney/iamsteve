'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

function TableOfContents({ headings, open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open)
  const [isSticky, setIsSticky] = useState(false)
  const contentRef = useRef(null)
  const wrapperRef = useRef(null)
  const initialTopRef = useRef(null)

  // Track scroll position to determine sticky state
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // Capture the initial top position once
    if (initialTopRef.current === null) {
      initialTopRef.current = wrapper.getBoundingClientRect().top + window.scrollY
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldBeSticky = scrollY >= initialTopRef.current
      setIsSticky(shouldBeSticky)
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
    document.body.classList.toggle('max-lg:overflow-hidden')
    document.getElementById('nav')?.classList.toggle('tabbar-hidden')
  }, [])

  useEffect(() => {
    return () => {
      document.body.classList.remove('max-lg:overflow-hidden')
      document.getElementById('nav')?.classList.remove('tabbar-hidden')
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="max-lg:data-[sticky=true]:h-[54px]"
      data-sticky={isSticky}
    >
      <div
        className={cn(
          // Base
          'collapsible isolate overscroll-contain [scroll-padding:4rem]',

          // Layout
          'max-lg:-mx-6 max-lg:px-6 max-lg:pt-4 max-lg:pb-3.5',
          // 'max-lg:data-[sticky=true]:px-5',

          // Positioning
          'max-lg:data-[sticky=false]:relative',
          'max-lg:data-[sticky=true]:fixed max-lg:data-[sticky=true]:top-0 max-lg:data-[sticky=true]:left-0 max-lg:data-[sticky=true]:right-0 max-lg:data-[sticky=true]:z-250',

          // When open AND sticky, full screen
          'max-lg:data-[sticky=true]:data-[state=open]:inset-0',

          // Background/effects
          'before:bg-canvas before:mask-(--blur-mask)',
          'max-lg:data-[sticky=true]:backdrop-blur-md',
          'max-lg:data-[sticky=true]:bg-white/80 max-lg:data-[sticky=true]:dark:bg-fern-1200/90',
          'max-lg:data-[sticky=true]:shadow-reduced',
          'max-lg:will-change-transform',

          // Transitions
          'transition duration-200 ease',

          // State: open
          'max-lg:data-[state=open]:overflow-x-clip max-lg:data-[state=open]:overflow-y-auto',
          'max-lg:data-[state=open]:max-h-dvh max-lg:data-[state=open]:h-dvh',
        )}
        data-state={isOpen ? 'open' : 'closed'}
        data-sticky={isSticky}
        style={{
          '--blur-mask':
            'linear-gradient(to top, #000 18%, rgb(0 0 0 /.99) 30%, rgb(0 0 0 /.96) 40%, rgb(0 0 0 /.92) 48%, rgb(0 0 0 /.86) 56%, rgb(0 0 0 /.79) 62%, rgb(0 0 0 /.71) 67%, rgb(0 0 0 /.63) 72%,rgb(0 0 0 /.54) 75.05%, rgb(0 0 0 /.45) 78%, rgb(0 0 0 /.36) 81%, rgb(0 0 0 /.27) 84%, rgb(0 0 0 /.19) 87%, rgb(0 0 0 /.12) 91%, rgb(0 0 0 /.05) 95%, transparent 100%)',
        }}
      >
        <button
          onClick={toggleOpen}
          className={cn(
            'max-lg:sticky top-0 z-10',
            'text-emphasis font-bold cursor-pointer',
            'flex flex-row items-center w-full text-left'
          )}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <span className="-ml-2 lg:-ml-6 flex items-center justify-center w-6 h-6 relative top-[-2px]">
            <Icon
              icon={isOpen ? 'caret-down' : 'caret-right'}
              size={16}
              aria-hidden="true"
              variant="header"
              className="relative top-px"
            />
          </span>
          Contents
        </button>
        <div
          id="toc-content"
          ref={contentRef}
          className={cn(
            'data-[state=closed]:transform-[scale3d(0.5,.6,1.7)] data-[state=closed]:perspective-[1000px] data-[state=closed]:opacity-0 origin-top-left',
            'transition duration-200 ease-[cubic-bezier(.165,.84,.44,1)]',
            'max-lg:data-[state=open]:h-min data-[state=closed]:h-0 data-[state=closed]:overflow-clip'
          )}
          data-state={isOpen ? 'open' : 'closed'}
          aria-hidden={!isOpen}
        >
          <TableOfContentsList headings={headings} toggleOpen={toggleOpen} />
        </div>
      </div>
    </div>
  )
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

function createNestedHeadings(headings) {
  const nestedHeadings = []
  const headingStack = []

  headings.forEach((heading) => {
    const { level, text, slug } = heading
    const linkMatch = text.match(/\[(.*?)\]\((.*?)\)/)
    const linkText = linkMatch
      ? linkMatch[1]
      : text.replace(/<a.*?>(.*?)<\/a>/, '$1')
    const linkUrl = linkMatch ? linkMatch[2] : ''

    if (level === 'two') {
      const newHeading = {
        level,
        text: linkText,
        slug,
        url: linkUrl,
        children: [],
      }
      nestedHeadings.push(newHeading)
      headingStack.push(newHeading)
    } else if (level === 'three' && headingStack.length > 0) {
      headingStack[headingStack.length - 1].children.push({
        level,
        text: linkText,
        slug,
        url: linkUrl,
      })
    }
  })

  return nestedHeadings
}

function TableOfContentsList({ headings, toggleOpen, ...props }) {
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
    headings,
    className = 'pt-1',
    classChildren = 'pb-0'
  ) => {
    return (
      <ul className={cn(className)}>
        {headings.map((heading) => (
          <li key={heading.slug} className={cn('group/toc', classChildren)}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                'block truncate font-medium py-1.5 hover:text-fern-600 dark:hover:text-dandelion-300 hover:translate-x-2 transform-gpu transition-all duration-200 ease',
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
              renderHeadings(
                heading.children,
                'pt-1',
                cn(
                  'relative pl-6',
                  'before:content-[""] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6',
                  'before:border-l-2 before:border-b-2 before:border-neutral-01-600/30 dark:before:border-fern-400/12',
                  'last:before:rounded-bl-sm',
                  'after:content-[""] after:absolute after:left-0 after:bottom-[.375rem] after:w-4 after:h-[.75rem]',
                  'after:border-l-2 after:border-neutral-01-600/30 dark:after:border-fern-400/12 last:after:hidden',
                  'hover:before:w-6 before:will-change-auto before:transform-gpu before:transition-all before:duration-200 before:ease'
                )
              )}
          </li>
        ))}
      </ul>
    )
  }

  const nestedHeadings = useMemo(
    () => createNestedHeadings(headings),
    [headings]
  )

  return (
    <nav aria-labelledby="aside-contents" {...props}>
      {nestedHeadings.length > 0 ? renderHeadings(nestedHeadings) : null}
    </nav>
  )
}

export default TableOfContents
