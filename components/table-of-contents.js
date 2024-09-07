'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Icon from '@/components/icon'

function TableOfContents({ headings, open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    // Toggle the class on the body element
    document.body.classList.toggle('max-lg:overflow-hidden')
    document.getElementById('nav').classList.toggle('max-lg:translate-y-full')
  }

  // Ensure the class is removed when the component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('max-lg:overflow-hidden')
      document.getElementById('nav').classList.remove('max-lg:translate-y-full')
    }
  }, [])

  return (
    <div
      className="max-lg:py-4 collapsible isolate max-lg:before:isolate max-lg:data-[state=open]:bg-neutral-01-150 max-lg:before:content-[''] max-lg:before:absolute max-lg:before:top-0 max-lg:before:-left-6 max-lg:before:-right-6 max-lg:before:h-[72px] max-lg:before:[mask-image:linear-gradient(180deg,_#000_18.75%,rgb(0_0_0_/.99)_30.43%,rgb(0_0_0_/.96)_40.41%,rgb(0_0_0_/.92)_48.89%,rgb(0_0_0_/.86)_56.03%,rgb(0_0_0_/.79)_62.04%,rgb(0_0_0_/.71)_67.09%,rgb(0_0_0_/.63)_71.36%,rgb(0_0_0_/.54)_75.05%,rgb(0_0_0_/.45)_78.34%,rgb(0_0_0_/.36)_81.42%,rgb(0_0_0_/.27)_84.46%,rgb(0_0_0_/.19)_87.65%,rgb(0_0_0_/.12)_91.18%,rgb(0_0_0_/.05)_95.24%,transparent_100%)] max-lg:bg-gradient-to-b max-lg:from-neutral-01-150 max-lg:from-25% max-lg:to-neutral-01-150/0 max-lg:before:backdrop-blur-lg max-lg:before:backdrop-saturate-100 max-lg:before:z-[0] max-lg:data-[state=open]:h-[100dvh] max-lg:data-[state=open]:overflow-x-hidden max-lg:data-[state=open]:overflow-y-auto max-lg:data-[state=open]:backdrop-blur-md max-lg:-mx-6 max-lg:px-6"
      data-state={isOpen ? 'open' : 'closed'}
    >
      <button
        onClick={toggleOpen}
        className="sticky top-0 z-10 text-fern-1100 font-bold cursor-pointer flex flex-row items-center -ml-2 xl:-ml-6 w-full text-left"
        aria-expanded={isOpen}
        aria-controls="toc-content"
      >
        <span className="flex items-center justify-center w-6 h-6 relative top-[-2px]">
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
        className="max-lg:data-[state=open]:block data-[state=closed]:hidden data-[state=closed]:overflow-hidden"
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

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Add listener for subsequent changes
    mediaQuery.addListener(handleMediaQueryChange)

    // Cleanup
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
        rootMargin: '0% 0% -72.5% 0%',
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

  const handleLinkClick = useCallback((e, slug) => {
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
  }, [isMobile, toggleOpen])

  const renderHeadings = (
    headings,
    className = 'pt-1',
    classChildren = 'pb-0'
  ) => {
    return (
      <ul className={className}>
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
