'use client'

import { useState, useEffect, useRef } from 'react'
import Icon from '@/components/icon'

function TableOfContents({ headings, open = false, ...props }) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapsible max-xl:data-[state=open]:bg-gradient-to-b max-xl:data-[state=open]:from-neutral-01-150 max-xl:data-[state=open]:to-neutral-01-150/0 max-xl:data-[state=open]:[mask-image:linear-gradient(180deg,_#000_0%,_#000_75%,_transparent_90%,_transparent_99%,_transparent_100%)] max-xl:data-[state=open]:backdrop-blur-md max-xl:-mx-6 max-xl:px-6" data-state={isOpen ? 'open' : 'closed'}>
      <button
        onClick={toggleOpen}
        className="text-fern-1100 font-bold cursor-pointer flex flex-row items-center -ml-2 xl:-ml-6 pt-4 pb-3.5 w-full text-left"
        aria-expanded={isOpen}
        aria-controls="toc-content"
      >
        <span className="flex items-center justify-center w-6 h-6 relative top-[-2px]">
          <Icon
            icon={isOpen ? "caret-down" : "caret-right"}
            size={16}
            aria-hidden="true"
          />
        </span>
        Contents
      </button>
      <div
        id="toc-content"
        ref={contentRef}
        className="max-xl:data-[state=open]:h-[calc(100dvh_-_128px)] data-[state=closed]:h-0 data-[state=closed]:overflow-hidden"
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
      { rootMargin: '0% 0% -25% 0%' }
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
      const linkText = linkMatch ? linkMatch[1] : text.replace(/<a.*?>(.*?)<\/a>/, '$1')
      const linkUrl = linkMatch ? linkMatch[2] : ''

      if (level === 'two') {
        const newHeading = { level, text: linkText, slug, url: linkUrl, children: [] }
        nestedHeadings.push(newHeading)
        headingStack.push(newHeading)
      } else if (level === 'three' && headingStack.length > 0) {
        headingStack[headingStack.length - 1].children.push({ level, text: linkText, slug, url: linkUrl })
      }
    })

    return nestedHeadings
  }

  const renderHeadings = (headings, className = 'pt-1', classChildren = 'pb-0') => {
    return (
      <ul className={className}>
        {headings.map((heading) => (
          <li key={heading.slug} className={`group/toc ${classChildren}`}>
            <a
              href={`#${heading.slug}`}
              className={`block truncate font-medium py-1.5 hover:text-fern-600 hover:translate-x-2 transform-gpu transition-all duration-200 ease ${activeId === heading.slug ? 'text-fern-600' : ''}`}
              aria-current={activeId === heading.slug ? 'location' : undefined}
              aria-label={`Go to section: ${heading.text}`}
            >
              {heading.text}
            </a>
            {heading.children && heading.children.length > 0 && (
              renderHeadings(
                heading.children,
                `pt-1`,
                `relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6 before:border-l-2 before:border-b-2 before:border-neutral-01-300 last:before:rounded-bl-sm after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-4 after:h-6 after:border-l-2 after:border-neutral-01-300 last:after:hidden hover:before:w-6 before:transition-all before:duration-200 before:ease`
              )
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
