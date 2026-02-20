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
            'max-md:col-container max-lg:col-content',
            'lg:col-start-page-start lg:col-span-3',
            'lg:row-span-5',
            'lg:h-screen lg:overflow-y-scroll',
            'sticky z-10 top-0 bottom-0 lg:right-0',
            'lg:py-12 lg:-mt-12',
            'lg:px-6 lg:-mx-6',
            'flex flex-col lg:gap-12 lg:pb-16',
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
            'lg:row-start-1 lg:row-span-1',
            'gap-x-8 gap-y-0',
            'col-prose',
            {
              'lg:col-start-4 lg:col-end-14': isSidebarOpen,
              'lg:col-start-5 lg:col-end-13': !isSidebarOpen,
            }
          )}
          id="article"
        >
          <header
            className={cn(
              styles.header,
              'flex flex-col max-lg:pt-12 gap-y-4 mb-12',
              'col-prose',
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
      </article>

      {children}
    </>
  )
}
