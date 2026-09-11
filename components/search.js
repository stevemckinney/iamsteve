'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  ModalOverlay,
  Modal as AriaModal,
  Dialog,
  Button,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const types = {
  post: { label: 'Blog', icon: 'pen' },
  note: { label: 'Note', icon: 'notepad' },
  page: { label: 'Page', icon: 'home' },
  category: { label: 'Category', icon: 'folder' },
}

const fields = [
  ['title', 3],
  ['summary', 2],
  ['tags', 1],
  ['categories', 1],
]

const MAX_RESULTS = 20
const MIN_QUERY_LENGTH = 2

/**
 * Search index
 *
 * Fetched once per page load and shared across opens. The promise is
 * cached so a failed fetch is retried next time the modal opens.
 */
let indexPromise = null
let resolvedIndex = null

function prepare(item) {
  return {
    item,
    searchable: {
      title: item.title.toLowerCase(),
      summary: (item.summary ?? '').toLowerCase(),
      tags: (item.tags ?? []).join(' ').toLowerCase(),
      categories: (item.categories ?? []).join(' ').toLowerCase(),
    },
  }
}

function getSearchIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/api/search')
      .then((response) => {
        if (!response.ok) throw new Error(`Search index ${response.status}`)
        return response.json()
      })
      .then((items) => {
        resolvedIndex = items.map(prepare)
        return resolvedIndex
      })
      .catch((error) => {
        indexPromise = null
        throw error
      })
  }
  return indexPromise
}

function searchIndex(index, query) {
  const terms = query.toLowerCase().trim().split(/\s+/)

  return index
    .map(({ item, searchable }) => {
      let score = 0
      for (const [field, weight] of fields) {
        for (const term of terms) {
          if (searchable[field].includes(term)) score += weight
        }
      }
      return { item, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((result) => result.item)
}

/**
 * Search state
 *
 * One modal and one keyboard shortcut for the page. Triggers can be
 * mounted anywhere inside the provider.
 */
const SearchContext = createContext(null)

function usePlatform() {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform))
  }, [])
  return isMac
}

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const isMac = usePlatform()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const value = useMemo(() => ({ setIsOpen, isMac }), [isMac])

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} isMac={isMac} />
    </SearchContext.Provider>
  )
}

function Kbd({ className, children }) {
  return (
    <kbd
      className={cn(
        'font-sans normal-case border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5',
        className
      )}
    >
      {children}
    </kbd>
  )
}

function ModifierKey({ isMac }) {
  return isMac ? '⌘' : 'ctrl'
}

export function SearchTrigger({ className, variant = 'desktop' }) {
  const { setIsOpen, isMac } = useContext(SearchContext)

  return (
    <Button
      onPress={() => setIsOpen(true)}
      aria-label="Search"
      className={cn(
        'flex items-center gap-1.5 cursor-pointer outline-none transition-opacity duration-200 hover:opacity-70',
        'focus-visible:ring-2 focus-visible:ring-fern-900 dark:focus-visible:ring-fern-400 focus-visible:ring-offset-2 rounded-sm',
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
        <Kbd className="hidden lg:flex items-center gap-0.5 text-[11px] text-ui-body/40 border-current/15 px-1.5 -mr-0.5">
          <span>
            <ModifierKey isMac={isMac} />
          </span>
          <span>K</span>
        </Kbd>
      )}
    </Button>
  )
}

function SearchResult({ id, result, isSelected, onSelect, onHover }) {
  const type = types[result.type] ?? { label: result.type, icon: 'search' }

  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      className={cn(
        'flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-colors duration-100',
        isSelected
          ? 'bg-fern-100 dark:bg-fern-1100'
          : 'hover:bg-neutral-01-50 dark:hover:bg-fern-1100/50'
      )}
      onClick={onSelect}
      onMouseMove={onHover}
    >
      <span className="flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-neutral-01-50 dark:bg-fern-1100">
        <Icon icon={type.icon} size={16} variant="default" aria-hidden="true" />
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-heading truncate">
          {result.title}
        </span>
        {result.summary && (
          <span className="text-xs text-ui-body truncate">
            {result.summary}
          </span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {result.categories?.length > 0 && (
          <span className="text-xs text-ui-body/60 hidden sm:inline">
            {result.categories[0]}
          </span>
        )}
        <span className="text-[10px] uppercase tracking-wider text-ui-body/50 font-medium">
          {type.label}
        </span>
      </span>
    </li>
  )
}

/**
 * Search panel
 *
 * Mounted while the modal is open, so query and selection reset on close.
 */
function SearchPanel({ close, isMac }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [index, setIndex] = useState(resolvedIndex)
  const [failed, setFailed] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (index) return
    let active = true
    getSearchIndex()
      .then((data) => active && setIndex(data))
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [index])

  const hasQuery = query.trim().length >= MIN_QUERY_LENGTH
  const results = useMemo(
    () => (index && hasQuery ? searchIndex(index, query) : []),
    [index, hasQuery, query]
  )
  const selected = Math.min(selectedIndex, Math.max(results.length - 1, 0))
  const selectedId =
    results.length > 0 ? `search-option-${selected}` : undefined

  useEffect(() => {
    if (selectedId) {
      document.getElementById(selectedId)?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedId])

  const navigateToResult = useCallback(
    (result) => {
      router.push(result.slug)
      close()
    },
    [router, close]
  )

  const handleChange = (e) => {
    setQuery(e.target.value)
    setSelectedIndex(0)
  }

  const handleKeyDown = (e) => {
    if (results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(selected < results.length - 1 ? selected + 1 : 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(selected > 0 ? selected - 1 : results.length - 1)
        break
      case 'Enter':
        e.preventDefault()
        navigateToResult(results[selected])
        break
    }
  }

  const loading = !index && !failed
  const message = failed
    ? 'Search is unavailable right now'
    : loading
    ? 'Loading…'
    : !hasQuery
    ? 'Type to search across all content'
    : results.length === 0
    ? `No results found for “${query}”`
    : null

  return (
    <div className="bg-surface rounded-xl shadow-picked overflow-hidden">
      <div className="flex items-center gap-3 px-4 border-b border-neutral-01-100 dark:border-fern-1100">
        <Icon
          icon="search"
          size={16}
          variant="default"
          aria-hidden="true"
          className="text-ui-body/50 shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={results.length > 0}
          aria-activedescendant={selectedId}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search posts, notes, pages…"
          className="flex-1 py-3.5 bg-transparent text-base text-heading placeholder:text-ui-body/40 outline-none border-0"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="p-1 rounded-sm hover:bg-neutral-01-50 dark:hover:bg-fern-1100 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <Icon
              icon="close"
              size={16}
              variant="default"
              aria-hidden="true"
              className="text-ui-body/50"
            />
          </button>
        )}
        <Kbd className="hidden sm:flex items-center text-[11px] text-ui-body/40 px-1.5">
          esc
        </Kbd>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {message ? (
          <div className="px-4 py-8 text-center text-sm text-ui-body/50">
            {message}
          </div>
        ) : (
          <ul
            id="search-results"
            role="listbox"
            className="p-2"
            aria-label="Search results"
          >
            {results.map((result, i) => (
              <SearchResult
                key={`${result.type}-${result.slug}`}
                id={`search-option-${i}`}
                result={result}
                isSelected={i === selected}
                onSelect={() => navigateToResult(result)}
                onHover={() => setSelectedIndex(i)}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-neutral-01-100 dark:border-fern-1100 text-[11px] text-ui-body/40">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Kbd>&uarr;</Kbd>
            <Kbd>&darr;</Kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <Kbd>&crarr;</Kbd>
            open
          </span>
        </span>
        <span className="flex items-center gap-1">
          <Kbd>
            <ModifierKey isMac={isMac} />
          </Kbd>
          <Kbd>K</Kbd>
          to toggle
        </span>
      </div>
    </div>
  )
}

function SearchModal({ isOpen, onOpenChange, isMac }) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-50 bg-neutral-01-900/60 backdrop-blur-sm transition-opacity duration-200 data-[entering]:opacity-0 data-[exiting]:opacity-0"
    >
      <AriaModal className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 outline-none transition-all duration-200 data-[entering]:opacity-0 data-[entering]:-translate-y-2 data-[exiting]:opacity-0 data-[exiting]:-translate-y-2">
        <Dialog className="w-full max-w-xl outline-none" aria-label="Search">
          {({ close }) => <SearchPanel close={close} isMac={isMac} />}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  )
}
