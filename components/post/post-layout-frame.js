'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { SidebarToggle } from './sidebar-toggle'

export function PostLayoutFrame({
  styles = {},
  children,
  toolbar,
  asideContent,
  afterContent,
  headerContent,
  proseContent,
}) {
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
      {/* Sticky top bar */}
      {/* <div className="max-lg:hidden col-content grid grid-cols-subgrid">
        <div className="col-content flex flex-row items-center justify-between gap-4 py-3">
          <SidebarToggle isOpen={isSidebarOpen} onToggle={handleToggle} />
          {toolbar}
        </div>
      </div> */}

      <article
        className={`${
          styles.article || ''
        } isolate grid col-container grid-cols-subgrid relative`}
      >
        <hr className="absolute z-11 top-0 left-0 right-0 col-container md:col-content lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] dark:bg-[url(/images/dash-dark.svg)] border-none" />

        <aside
          aria-label="Table of contents and newsletter subscription form"
          className={cn(
            'toc',
            'max-md:col-container max-lg:col-content',
            'lg:row-start-1',
            'lg:col-start-page-start lg:col-span-2 xl:col-span-3',
            'lg:h-screen lg:overflow-y-scroll',
            'sticky z-10 top-0 bottom-0 lg:right-0',
            'lg:-mt-12 lg:pt-12 2xl:-mt-10 lg:pb-18',
            'lg:px-6 lg:-mx-6',
            'flex flex-col lg:gap-12',
            'max-h-[100dvh]',
            {
              'max-lg:hidden lg:hidden': !isSidebarOpen,
            }
          )}
        >
          {asideContent}
        </aside>

        <hr className="relative col-container md:col-content lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] dark:bg-[url(/images/dash-dark.svg)] border-none" />

        <div
          className={cn(
            styles.prose,
            styles.content,
            'prose grid grid-cols-subgrid',
            'lg:row-start-1',
            'pb-18',
            'gap-x-8 gap-y-0',
            'col-content lg:col-prose',
            {
              'lg:col-start-3 lg:col-end-12 xl:col-start-5 xl:col-end-16':
                isSidebarOpen,
              'lg:col-start-5 lg:col-end-13': !isSidebarOpen,

              // 'outline xl:outline-red-500 2xl:outline-blue-500'
            }
          )}
          id="article"
        >
          <header
            className={cn(
              styles.header,
              'flex flex-col max-lg:pt-12 gap-y-4',
              'col-content lg:col-prose',
              {
                'lg:col-start-6 lg:col-end-14': isSidebarOpen,
                'lg:col-start-4 lg:col-end-14': !isSidebarOpen,
              }
            )}
          >
            {headerContent}
          </header>
          {proseContent}
        </div>
        {afterContent && afterContent}
      </article>

      {children}
    </>
  )
}
