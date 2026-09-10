'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'
import { fetchIndex } from '@/lib/search-cache'

const SearchModal = dynamic(() => import('./search-modal'), { ssr: false })
// A warm-up only, of the index and the menu's code side by side. If either
// fails the menu's own load and fetch retry, so nothing hears about it here.
const warm = () => {
  fetchIndex().catch(() => {})
  import('./search-modal').catch(() => {})
}

// Shared with the topics menu, so the two read as one row when paired
export const fieldStyle = cn(
  'flex items-center gap-2 w-full text-left',
  'px-3 py-2.5 rounded-sm bg-surface shadow-placed',
  'text-base lg:text-lg font-ui lowercase leading-none text-body',
  'hover:text-heading transition-colors duration-200 ease-linear',
  'outline-none focus-visible:ring-2 focus-visible:ring-cornflour-600 dark:focus-visible:ring-fern-400'
)

// A button dressed as a search field. The header owns the cmd K shortcut, so
// this only opens on press, standing in the scope it was given.
export default function SearchField({ scope, className, children }) {
  const [isOpen, setIsOpen] = useState(false)

  // This field is the page's own search, so the index comes in once the page
  // has settled rather than on the first tap. Safari has no idle callback.
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(warm, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(warm, 1500)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Button
        onPressStart={warm}
        onHoverStart={warm}
        onFocus={warm}
        onPress={() => {
          warm()
          setIsOpen(true)
        }}
        className={cn(fieldStyle, 'cursor-text', className)}
      >
        <Icon icon="search" size={24} variant="header" aria-hidden="true" />
        {children}
      </Button>
      <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} scope={scope} />
    </>
  )
}
