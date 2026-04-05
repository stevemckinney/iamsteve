import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react'
import Icon from './Icon'

interface Heading {
  depth: number
  slug: string
  text: string
}

interface NestedHeading {
  text: string
  slug: string
  children: NestedHeading[]
}

function createNestedHeadings(headings: Heading[]): NestedHeading[] {
  const nested: NestedHeading[] = []
  const stack: NestedHeading[] = []

  headings.forEach((heading) => {
    const linkText = heading.text
      .replace(/\[(.*?)\]\((.*?)\)/, '$1')
      .replace(/<a.*?>(.*?)<\/a>/, '$1')

    if (heading.depth === 2) {
      const newHeading: NestedHeading = {
        text: linkText,
        slug: heading.slug,
        children: [],
      }
      nested.push(newHeading)
      stack.push(newHeading)
    } else if (heading.depth === 3 && stack.length > 0) {
      stack[stack.length - 1].children.push({
        text: linkText,
        slug: heading.slug,
        children: [],
      })
    }
  })

  return nested
}

function useStickyScroll(wrapperRef: React.RefObject<HTMLDivElement | null>) {
  const initialTopRef = useRef<number | null>(null)

  const subscribe = useCallback((callback: () => void) => {
    const reset = () => {
      initialTopRef.current = null
      callback()
    }
    window.addEventListener('scroll', callback, { passive: true })
    window.addEventListener('resize', reset, { passive: true })
    return () => {
      window.removeEventListener('scroll', callback)
      window.removeEventListener('resize', reset)
    }
  }, [])

  const getSnapshot = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return false
    if (initialTopRef.current === null) {
      initialTopRef.current =
        wrapper.getBoundingClientRect().top + window.scrollY
    }
    return window.scrollY >= initialTopRef.current
  }, [wrapperRef])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
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

const collapsibleClasses = [
  'collapsible isolate overscroll-contain [scroll-padding:4rem]',
  'max-lg:z-250',
  'transition duration-200 ease',
  'max-lg:pt-4 max-lg:pb-3.5',
  'max-lg:overflow-x-clip max-lg:overflow-y-auto',
  'max-lg:data-[sticky=true]:px-5',
  'max-lg:data-[sticky=false]:relative',
  'max-lg:data-[sticky=true]:fixed',
  'max-lg:data-[sticky=true]:top-0 max-lg:data-[sticky=true]:left-0 max-lg:data-[sticky=true]:right-0',
  'max-lg:data-[sticky=true]:data-[state=open]:inset-0',
  'max-lg:data-[state=open]:max-h-dvh max-lg:data-[state=open]:h-dvh',
  'before:bg-canvas before:mask-(--blur-mask)',
  'max-lg:data-[sticky=true]:backdrop-blur-md',
  'max-lg:data-[sticky=true]:bg-gradient-to-b max-lg:data-[sticky=true]:from-[light-dark(var(--color-canvas-light),var(--color-canvas-dark))] max-lg:data-[sticky=true]:from-50% max-lg:data-[sticky=true]:to-transparent',
  'max-lg:data-[sticky=true]:shadow-reduced',
  'max-lg:will-change-transform',
].join(' ')

const toggleButtonClasses = [
  'max-lg:sticky top-0 z-10',
  'text-emphasis font-bold cursor-pointer',
  'flex flex-row items-center w-full text-left',
].join(' ')

const contentClasses = [
  'data-[state=closed]:transform-[scale3d(0.5,.6,1.7)] data-[state=closed]:perspective-[1000px] data-[state=closed]:opacity-0 origin-top-left',
  'transition duration-200 ease-[cubic-bezier(.165,.84,.44,1)]',
  'max-lg:data-[state=open]:h-min data-[state=closed]:h-0 data-[state=closed]:overflow-clip',
].join(' ')

const childBranchClasses = [
  'relative pl-6',
  'before:content-[""] before:absolute before:left-0 before:top-[-6px] before:w-4 before:h-6',
  'before:border-l-2 before:border-b-2 before:border-toc-branch',
  'last:before:rounded-bl-sm',
  'after:content-[""] after:absolute after:left-0 after:bottom-[.375rem] after:w-4 after:h-[.75rem]',
  'after:border-l-2 after:border-toc-branch last:after:hidden',
  'hover:before:w-6 before:will-change-auto before:transform-gpu before:transition-all before:duration-200 before:ease',
].join(' ')

const linkBaseClasses =
  'block truncate font-medium py-1.5 hover:text-link-hover hover:translate-x-2 transform-gpu transition-all duration-200 ease'

function HeadingList({
  nestedHeadings,
  headings,
  toggleOpen,
}: {
  nestedHeadings: NestedHeading[]
  headings: Heading[]
  toggleOpen: () => void
}) {
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
      { root: null, rootMargin: '0% 0% -50% 0%', threshold: 0 }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (isMobile) {
        e.preventDefault()
        toggleOpen()
        setTimeout(() => {
          const element = document.getElementById(slug)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    },
    [isMobile, toggleOpen]
  )

  const renderHeadings = (
    items: NestedHeading[],
    className = 'pt-1',
    classChildren = 'pb-0'
  ) => (
    <ul className={className}>
      {items.map((heading) => (
        <li key={heading.slug} className={`group/toc ${classChildren}`}>
          <a
            href={`#${heading.slug}`}
            className={`${linkBaseClasses} ${activeId === heading.slug ? 'text-toc-active' : ''}`}
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

  return (
    <nav aria-labelledby="aside-contents">
      {nestedHeadings.length > 0 ? renderHeadings(nestedHeadings) : null}
    </nav>
  )
}

interface TableOfContentsProps {
  headings: Heading[]
  open?: boolean
}

export default function TableOfContents({
  headings,
  open = false,
}: TableOfContentsProps) {
  const nestedHeadings = createNestedHeadings(headings)
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isSticky = useStickyScroll(wrapperRef)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev
      document.documentElement.setAttribute('data-toc-open', String(next))
      document
        .getElementById('tabbar')
        ?.classList.toggle('max-lg:translate-y-[calc(100%+0.5rem)]')
      return next
    })
  }, [])

  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute('data-toc-open')
      document
        .getElementById('tabbar')
        ?.classList.remove('max-lg:translate-y-[calc(100%+0.5rem)]')
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="max-lg:data-[sticky=true]:h-[54px]"
      data-sticky={isSticky}
    >
      <div
        className={collapsibleClasses}
        data-state={isOpen ? 'open' : 'closed'}
        data-sticky={isSticky}
        style={{
          '--blur-mask':
            'linear-gradient(to top, #000 18%, rgb(0 0 0 /.99) 30%, rgb(0 0 0 /.96) 40%, rgb(0 0 0 /.92) 48%, rgb(0 0 0 /.86) 56%, rgb(0 0 0 /.79) 62%, rgb(0 0 0 /.71) 67%, rgb(0 0 0 /.63) 72%,rgb(0 0 0 /.54) 75.05%, rgb(0 0 0 /.45) 78%, rgb(0 0 0 /.36) 81%, rgb(0 0 0 /.27) 84%, rgb(0 0 0 /.19) 87%, rgb(0 0 0 /.12) 91%, rgb(0 0 0 /.05) 95%, transparent 100%)',
        } as React.CSSProperties}
      >
        <button
          onClick={toggleOpen}
          className={toggleButtonClasses}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <span className="-ml-2 lg:-ml-6 flex items-center justify-center w-6 h-6 relative top-[-2px]">
            <Icon
              icon={isOpen ? 'caret-down' : 'caret-right'}
              size={16}
              variant="header"
              className="relative top-px"
            />
          </span>
          Contents
        </button>
        <div
          id="toc-content"
          ref={contentRef}
          className={contentClasses}
          data-state={isOpen ? 'open' : 'closed'}
          aria-hidden={!isOpen}
        >
          <HeadingList
            nestedHeadings={nestedHeadings}
            headings={headings}
            toggleOpen={toggleOpen}
          />
        </div>
      </div>
    </div>
  )
}
