// components/search-field.js: a button dressed as a search field. The
// header owns the cmd K shortcut, so this only opens on press, standing in
// the scope it was given
import { lazy, Suspense, useState, useEffect } from 'react'
import { Button } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { fetchIndex } from '@/lib/search-cache'
import { fieldStyle } from '../../lib/field-style.js'
import Icon from './icon.jsx'
import Locale from './locale.jsx'

const SearchModal = lazy(() => import('./search-modal.jsx'))
// A warm-up only, of the index and the menu’s code side by side. If either
// fails the menu’s own load and fetch retry, so nothing hears about it here.
const warm = () => {
  fetchIndex().catch(() => {})
  import('./search-modal.jsx').catch(() => {})
}

export default function SearchField({ scope, className, children }) {
  const [isOpen, setIsOpen] = useState(false)
  // The menu mounts the first time it opens, so its code loads on first use
  // rather than with the page
  const [used, setUsed] = useState(false)

  // This field is the page’s own search, so the index comes in once the page
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
        className={cn(fieldStyle, 'cursor-default', className)}
      >
        <Icon icon="search" size={24} variant="header" aria-hidden="true" />
        {children}
      </Button>
      {used && (
        <Suspense>
          <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} scope={scope} />
        </Suspense>
      )}
    </Locale>
  )
}
