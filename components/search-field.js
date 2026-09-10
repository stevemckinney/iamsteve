'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const SearchModal = dynamic(() => import('./search-modal'), { ssr: false })
// A warm-up only: if it fails the modal's own load retries, so nothing
// should hear about it here
const prefetch = () =>
  import('./search-modal')
    .then((m) => m.fetchIndex())
    .catch(() => {})

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

  return (
    <>
      <Button
        onPress={() => {
          prefetch()
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
