// components/search.js: the button that opens cmd+K search, in the header
// and the tab bar
import { lazy, Suspense, useState, useEffect } from 'react'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fetchIndex } from '@/lib/search-cache'
import Icon from './icon.jsx'
import Locale from './locale.jsx'

const SearchModal = lazy(() => import('./search-modal.jsx'))
// A warm-up only, of the index and the menu’s code side by side. If either
// fails the menu’s own load and fetch retry, so nothing hears about it here.
const warm = () => {
  fetchIndex().catch(() => {})
  import('./search-modal.jsx').catch(() => {})
}

function Kbd({ children }) {
  return (
    <kbd className="hidden any-pointer-fine:flex items-center font-sans gap-0.5 text-base/5 font-medium px-1 bg-surface-raised text-body shadow-placed rounded-xs">
      {children}
    </kbd>
  )
}

export default function SearchTrigger({ className, variant = 'desktop' }) {
  const [isOpen, setIsOpen] = useState(false)
  // The menu mounts the first time it opens, so its code loads on first use
  // rather than with the page
  const [used, setUsed] = useState(false)

  useEffect(() => {
    // The header renders a desktop and a tab bar trigger, both always
    // mounted. Only one may own the shortcut, or cmd K opens two dialogs.
    if (variant !== 'desktop') return

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        warm()
        setUsed(true)
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [variant])

  return (
    <Locale>
      <Button
        onPressStart={warm}
        onHoverStart={warm}
        onFocus={warm}
        onPress={() => {
          warm()
          setUsed(true)
          setIsOpen(true)
        }}
        aria-label="Search"
        className={cn(
          'flex items-center gap-2 cursor-default transition-opacity duration-200',
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
            {/* 14px, so the ⌘ matches the K in height and weight */}
            <Icon
              icon="cmd"
              size={16}
              variant="none"
              aria-label="Command"
              className="size-3.5"
            />
            <span className="uppercase">K</span>
          </Kbd>
        )}
        {variant === 'tabbar' && 'Search'}
      </Button>
      {used && (
        <Suspense>
          <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      )}
    </Locale>
  )
}
