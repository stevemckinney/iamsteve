import { useState, type ReactNode } from 'react'
import Icon from './Icon'

function SidebarToggle({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="max-lg:hidden flex items-center justify-center w-8 h-8 rounded-sm text-ui-body hover:text-heading hover:bg-neutral-01-100 dark:hover:bg-fern-900/50 transition duration-200 cursor-pointer"
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
    >
      <Icon
        icon={isOpen ? 'sidebar-right' : 'sidebar-left'}
        size={16}
        variant="header"
      />
    </button>
  )
}

interface PostLayoutFrameProps {
  children?: ReactNode
  asideContent?: ReactNode
  afterContent?: ReactNode
  headerContent?: ReactNode
  proseContent?: ReactNode
}

export default function PostLayoutFrame({
  children,
  asideContent,
  afterContent,
  headerContent,
  proseContent,
}: PostLayoutFrameProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    const saved = localStorage.getItem('sidebar-open')
    return saved !== null ? saved === 'true' : true
  })

  const handleToggle = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev
      localStorage.setItem('sidebar-open', String(next))
      return next
    })
  }

  return (
    <>
      <article className="isolate grid col-container grid-cols-subgrid relative">
        <hr className="absolute z-11 top-0 left-0 right-0 col-container md:col-content lg:hidden w-full h-[2px] bg-dash-image border-none" />

        <aside
          aria-label="Table of contents and newsletter subscription form"
          className={[
            'toc',
            'max-md:col-container max-lg:col-content',
            'lg:row-start-1',
            'lg:col-start-page-start xl:col-start-2 lg:col-span-2 xl:col-end-5',
            'lg:h-screen lg:overflow-y-scroll',
            'sticky z-10 top-0 bottom-0 lg:right-0',
            'lg:-mt-12 lg:pt-12 2xl:-mt-10 lg:pb-18',
            'lg:px-6 lg:-mx-6',
            'flex flex-col lg:gap-12',
            'max-h-[100dvh]',
            !isSidebarOpen ? 'max-lg:hidden lg:hidden' : '',
          ].join(' ')}
        >
          {asideContent}
        </aside>

        <hr className="relative col-container md:col-content lg:hidden w-full h-[2px] bg-dash-image border-none" />

        <div
          className={[
            'prose grid grid-cols-subgrid',
            'lg:row-start-1',
            'pb-18',
            'gap-x-8 gap-y-0',
            'col-content lg:col-prose',
            isSidebarOpen
              ? 'lg:col-start-3 lg:col-end-12 xl:col-start-5 xl:col-end-16'
              : 'lg:col-start-5 lg:col-end-13',
          ].join(' ')}
          id="article"
        >
          <header
            className={[
              'flex flex-col max-lg:pt-12 gap-y-4',
              'col-content lg:col-prose',
              isSidebarOpen
                ? 'lg:col-start-6 lg:col-end-14'
                : 'lg:col-start-4 lg:col-end-14',
            ].join(' ')}
          >
            {headerContent}
          </header>
          {proseContent}
        </div>
        {afterContent}
      </article>

      {children}
    </>
  )
}
