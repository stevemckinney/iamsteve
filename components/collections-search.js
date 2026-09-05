'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const SearchModal = dynamic(() => import('./search-modal'), { ssr: false })
const prefetch = () => import('./search-modal').then((m) => m.fetchIndex())

// A button dressed as a search field. The header owns the cmd K shortcut, so
// this only opens on press, scoped to collections until the scope is removed.
export default function CollectionsSearch({ className }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scope, setScope] = useState('collections')

  return (
    <>
      <Button
        onPress={() => {
          prefetch()
          setScope('collections')
          setIsOpen(true)
        }}
        className={cn(
          'flex items-center gap-2 w-full cursor-text text-left',
          'px-3 py-2.5 rounded-sm bg-surface shadow-placed',
          'text-base lg:text-lg font-ui lowercase leading-none text-body',
          'hover:text-heading transition-colors duration-200 ease-linear',
          'outline-none focus-visible:ring-2 focus-visible:ring-cornflour-600 dark:focus-visible:ring-fern-400',
          className
        )}
      >
        <Icon icon="search" size={24} variant="header" aria-hidden="true" />
        Search collections
      </Button>
      <SearchModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        scope={scope}
        onScopeChange={setScope}
      />
    </>
  )
}
