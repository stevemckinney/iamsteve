'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const SearchModal = dynamic(() => import('./search-modal'), { ssr: false })
const prefetch = () => import('./search-modal').then((m) => m.fetchIndex())

function Kbd({ children }) {
  return (
    <kbd className="flex items-center font-sans ml-2 hidden lg:flex items-center gap-0.5 text-sm font-medium px-1 bg-neutral-01-100 text-body shadow-placed rounded-xs">
      {children}
    </kbd>
  )
}

function PlatformKey() {
  return <Icon icon="cmd" size={16} variant="none" aria-label="Command" />
}

export default function Search({ className, variant = 'desktop' }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        prefetch()
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Button
        onPress={() => {
          prefetch()
          setIsOpen(true)
        }}
        aria-label="Search"
        className={cn(
          'flex items-center gap-1.5 cursor-pointer outline-none transition-opacity duration-200',
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
          <Kbd suppressHydrationWarning>
            <PlatformKey />
            <span className="relative top-px uppercase">K</span>
          </Kbd>
        )}
      </Button>
      <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
