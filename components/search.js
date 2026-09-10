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

function Kbd({ children }) {
  return (
    <kbd className="hidden any-pointer-fine:flex items-center font-sans gap-0.5 text-sm font-medium px-1 bg-surface-raised text-body shadow-placed rounded-xs">
      {children}
    </kbd>
  )
}

export default function Search({ className, variant = 'desktop' }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // The header renders a desktop and a tab bar trigger, both always
    // mounted. Only one may own the shortcut, or cmd K opens two dialogs.
    if (variant !== 'desktop') return

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        warm()
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [variant])

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
        aria-label="Search"
        className={cn(
          'flex items-center gap-2 cursor-pointer outline-none transition-opacity duration-200',
          className
        )}
      >
        <Icon
          icon="search"
          size={24}
          className="text-current"
          variant="header"
          aria-hidden="true"
        />
        {variant === 'desktop' && (
          <Kbd>
            <Icon icon="cmd" size={16} variant="none" aria-label="Command" />
            <span className="relative top-px uppercase">K</span>
          </Kbd>
        )}
        {variant === 'tabbar' && 'Search'}
      </Button>
      <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
