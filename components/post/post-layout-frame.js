'use client'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { SidebarToggle } from './sidebar-toggle'

export function PostLayoutFrame({
  styles = {},
  children,
  toolbar,
  asideContent,
  headerContent,
  proseContent,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Optional: Persist sidebar state to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open')
    if (saved !== null) {
      setIsSidebarOpen(saved === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebar-open', String(isSidebarOpen))
  }, [isSidebarOpen])

  const handleToggle = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <>
      {/* Sticky top bar */}
      <div className="max-lg:hidden col-content grid grid-cols-subgrid">
        <div className="col-content flex flex-row items-center justify-between gap-4 py-3">
          {toolbar}
          <SidebarToggle isOpen={isSidebarOpen} onToggle={handleToggle} />
        </div>
      </div>

      <article
        className={`${
          styles.article || ''
        } isolate grid col-container grid-cols-subgrid relative`}
      >
        <hr className="absolute z-11 top-0 left-0 right-0 col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] dark:bg-[url(/images/dash-dark.svg)] border-none" />

        <aside
          aria-label="Table of contents and newsletter subscription form"
          className={cn(
            'max-lg:col-container',
            'lg:col-start-10 lg:col-span-2',
            'xl:col-start-12 xl:col-span-3',
            'lg:row-span-5',
            'lg:h-screen lg:overflow-y-scroll',
            'sticky z-10 top-0 bottom-0 lg:right-0',
            'lg:py-12 lg:-mt-12',
            'flex flex-col lg:gap-12 lg:pb-16',
            'lg:px-6 lg:-mx-6',
            'lg:mask-[linear-gradient(180deg,transparent,#000_64px,#000_calc(100%-10vh),transparent)]',
            {
              'max-lg:hidden lg:hidden': !isSidebarOpen,
            }
          )}
        >
          {asideContent}
        </aside>

        <hr className="relative col-container lg:hidden w-full h-[2px] bg-[url(/images/dash.svg)] dark:bg-[url(/images/dash-dark.svg)] border-none" />

        <header
          className={cn(
            styles.header,
            'lg:row-start-1 lg:row-span-1',
            'flex flex-col max-lg:pt-12 gap-y-4 mb-12',
            'col-start-1 col-end-12',
            {
              'lg:col-start-2 lg:col-end-11': isSidebarOpen,
              'lg:col-start-4 lg:col-end-14': !isSidebarOpen,
            }
          )}
        >
          {headerContent}
        </header>

        <div
          className={cn(
            styles.prose,
            styles.content,
            'prose grid grid-cols-subgrid',
            'gap-x-8 gap-y-0',
            {
              'col-start-1 col-end-11': isSidebarOpen,
              'col-start-5 col-end-13': !isSidebarOpen,
            }
          )}
          id="article"
        >
          {proseContent}
        </div>
      </article>

      {children}
    </>
  )
}
