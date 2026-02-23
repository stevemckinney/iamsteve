'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import HeadingList from './heading-list'

function useStickyScroll(wrapperRef) {
  const initialTopRef = useRef(null)

  const subscribe = useCallback((callback) => {
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

const collapsibleClasses = cn(
  'collapsible isolate overscroll-contain [scroll-padding:4rem]',
  'max-lg:z-250',
  'transition duration-200 ease',
  'max-lg:pt-4 max-lg:pb-3.5',
  'max-lg:overflow-x-clip max-lg:overflow-y-auto',
  'max-lg:data-[sticky=true]:px-5',

  'max-lg:data-[sticky=false]:relative',
  'max-lg:data-[sticky=true]:fixed',
  'max-lg:data-[sticky=true]:top-0 max-lg:data-[sticky=true]:left-0 max-lg:data-[sticky=true]:right-0',

  // Sticky + open
  'max-lg:data-[sticky=true]:data-[state=open]:inset-0',
  'max-lg:data-[state=open]:max-h-dvh max-lg:data-[state=open]:h-dvh',

  // Background/effects
  'before:bg-canvas before:mask-(--blur-mask)',
  'max-lg:data-[sticky=true]:backdrop-blur-md',
  'max-lg:data-[sticky=true]:bg-gradient-to-b max-lg:data-[sticky=true]:from-[light-dark(var(--color-canvas-light),var(--color-canvas-dark))] max-lg:data-[sticky=true]:from-50% max-lg:data-[sticky=true]:to-transparent',
  'max-lg:data-[sticky=true]:shadow-reduced',
  'max-lg:will-change-transform'
)

const toggleButtonClasses = cn(
  'max-lg:sticky top-0 z-10',
  'text-emphasis font-bold cursor-pointer',
  'flex flex-row items-center w-full text-left'
)

const contentClasses = cn(
  'data-[state=closed]:transform-[scale3d(0.5,.6,1.7)] data-[state=closed]:perspective-[1000px] data-[state=closed]:opacity-0 origin-top-left',
  'transition duration-200 ease-[cubic-bezier(.165,.84,.44,1)]',
  'max-lg:data-[state=open]:h-min data-[state=closed]:h-0 data-[state=closed]:overflow-clip'
)

export default function Collapsible({
  nestedHeadings,
  headings,
  open = false,
}) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef(null)
  const wrapperRef = useRef(null)
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
        }}
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
