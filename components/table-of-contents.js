'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Icon from '@/components/icon'

function useIntersectionObserver(options) {
  const [isIntersecting, setIsIntersecting] = useState(true)
  const targetRef = useRef(null)

  useEffect(() => {
    const currentTarget = targetRef.current // Capture the current value

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [options])

  return [targetRef, !isIntersecting]
}

function TableOfContents({ headings, open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef(null)
  const [observerRef, isSticky] = useIntersectionObserver({ threshold: 1 })

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    document.body.classList.toggle('max-lg:overflow-hidden')
    document.getElementById('nav').classList.toggle('max-lg:translate-y-full')
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove('max-lg:overflow-hidden')
      document.getElementById('nav').classList.remove('max-lg:translate-y-full')
    }
  }, [])

  return (
    <div
      ref={observerRef}
      className="
        collapsible
        isolate

        max-lg:-mx-6 max-lg:px-6 max-lg:pt-4 max-lg:pb-3.5

        max-lg:before:isolate
        max-lg:before:content-['']
        max-lg:before:absolute
        max-lg:before:top-0
        max-lg:before:bottom-0
        max-lg:before:-left-6
        max-lg:before:-right-6
        max-lg:before:from-neutral-01-150
        max-lg:before:from-[72px]
        max-lg:before:to-neutral-01-150/70
        max-lg:before:z-1
        before:bg-neutral-01-150
        before:mask-(--blur-mask)

        max-lg:backdrop-blur-lg

        transition
        duration-200
        ease

        max-lg:data-[state=open]:overflow-x-clip
        max-lg:data-[state=open]:overflow-y-auto
        max-lg:data-[state=open]:bg-linear-to-b
        max-lg:data-[state=open]:from-neutral-01-150
        max-lg:data-[state=open]:from-[32px]
        max-lg:data-[state=open]:to-neutral-01-150/90
        max-lg:data-[state=open]:max-h-dvh"
      data-state={isOpen ? 'open' : 'closed'}
      data-sticky={isSticky}
      style={{
        '--blur-mask':
          'linear-gradient(to bottom, #000 18%, rgb(0 0 0 /.99) 30%, rgb(0 0 0 /.96) 40%, rgb(0 0 0 /.92) 48%, rgb(0 0 0 /.86) 56%,rgb(0 0 0 /.79) 62%, rgb(0 0 0 /.71) 67%,rgb(0 0 0 /.63) 72%,rgb(0 0 0 /.54) 75.05%, rgb(0 0 0 /.45) 78%, rgb(0 0 0 /.36) 81%,rgb(0 0 0 /.27) 84%, rgb(0 0 0 /.19) 87%, rgb(0 0 0 /.12) 91%, rgb(0 0 0 /.05) 95%,transparent 100%)',
      }}
    >
      <button
        onClick={toggleOpen}
        className="max-lg:sticky top-0 z-10 text-fern-1100 font-bold cursor-pointer flex flex-row items-center w-full text-left"
        aria-expanded={isOpen}
        aria-controls="toc-content"
        data-sticky={isSticky}
      >
        <span className="-ml-2 lg:-ml-6 flex items-center justify-center w-6 h-6 relative left top-[-2px]">
          <Icon
            icon={isOpen ? 'caret-down' : 'caret-right'}
            size={16}
            aria-hidden="true"
          />
        </span>
        Contents
      </button>
      <div
        id="toc-content"
        ref={contentRef}
        className="data-[state=closed]:transform-[scale3d(0.5,.6,1.7)] data-[state=closed]:perspective-[1000px] data-[state=closed]:opacity-0 origin-top-left transition duration-200 ease-[cubic-bezier(.165,.84,.44,1)] max-lg:data-[state=open]:h-min data-[state=closed]:h-0 data-[state=closed]:overflow-clip"
        data-state={isOpen ? 'open' : 'closed'}
        aria-hidden={!isOpen}
      >
        <TableOfContentsList headings={headings} toggleOpen={toggleOpen} />
      </div>
    </div>
  )
}

function TableOfContentsList({ headings, toggleOpen, ...props }) {
  const [activeId, setActiveId] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addListener(handleMediaQueryChange)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  }, [])

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

  const createNestedHeadings = (headings) => {
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
      <ul className={`${className}`}>
        {headings.map((heading) => (
          <li key={heading.slug} className={`group/toc ${classChildren}`}>
            <a
              href={`#${heading.slug}`}
              className={`block truncate font-medium py-1.5 hover:text-fern-600 hover:translate-x-2 transform-gpu transition-all duration-200 ease ${
                activeId === heading.slug ? 'text-fern-600' : ''
              }`}
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
                `pt-1`,
                `relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6 before:border-l-2 before:border-b-2 before:border-neutral-01-600/30 last:before:rounded-bl-sm after:content-[''] after:absolute after:left-0 after:bottom-[.375rem] after:w-4 after:h-[.75rem] after:border-l-2 after:border-neutral-01-600/30 last:after:hidden hover:before:w-6 before:will-change-auto before:transform-gpu before:transition-all before:duration-200 before:ease`
              )}
          </li>
        ))}
      </ul>
    )
  }

  const nestedHeadings = createNestedHeadings(headings)

  return (
    <nav aria-labelledby="aside-contents" {...props}>
      {nestedHeadings.length > 0 ? renderHeadings(nestedHeadings) : null}
    </nav>
  )
}

export default TableOfContents
