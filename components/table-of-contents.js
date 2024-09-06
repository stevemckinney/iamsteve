'use client'

import { useState, useEffect, useRef } from 'react'
import Icon from '@/components/icon'

function TableOfContents({ headings, open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    // Toggle the class on the body element
    document.body.classList.toggle('max-lg:overflow-hidden')
  }

  // Ensure the class is removed when the component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('max-lg:overflow-hidden')
    }
  }, [])

  return (
    <div
      className="collapsible isolate max-lg:before:isolate max-lg:data-[state=open]:bg-gradient-to-b max-lg:data-[state=open]:from-neutral-01-150 max-lg:data-[state=open]:to-neutral-01-150/60 max-lg:before:content-[''] max-lg:before:absolute max-lg:before:top-0 max-lg:before:-left-6 max-lg:before:-right-6 max-lg:before:h-[72px] max-lg:before:[mask-image:linear-gradient(180deg,_#000_0%,_#000_50%,_transparent_80%,_transparent_99%,_transparent_100%)] max-lg:before:bg-neutral-01-150/60 max-lg:before:backdrop-blur-md max-lg:before:z-[0] max-lg:data-[state=open]:h-[100dvh] max-lg:data-[state=open]:overflow-x-hidden max-lg:data-[state=open]:overflow-y-auto max-lg:data-[state=open]:backdrop-blur-md max-lg:-mx-6 max-lg:px-6"
      data-state={isOpen ? 'open' : 'closed'}
    >
      <button
        onClick={toggleOpen}
        className="sticky top-0 z-10 text-fern-1100 font-bold cursor-pointer flex flex-row items-center -ml-2 xl:-ml-6 w-full text-left leading-[3.5rem]"
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
        <TableOfContentsList headings={headings} />
      </div>
    </div>
  )
}

function TableOfContentsList({ headings, ...props }) {
  const [activeId, setActiveId] = useState('')

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
            >
              {heading.text}
            </a>
            {heading.children &&
              heading.children.length > 0 &&
              renderHeadings(
                heading.children,
                `pt-1`,
                `relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6 before:border-l-2 before:border-b-2 before:border-neutral-01-600/50 last:before:rounded-bl-sm after:content-[''] after:absolute after:left-px after:-bottom-1 after:w-4 after:h-6 after:border-l-2 after:border-neutral-01-600/50 last:after:hidden hover:before:w-6 before:transition-all before:duration-200 before:ease`
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
