import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ModalOverlay,
  Modal as AriaModal,
  Dialog,
  Button,
} from 'react-aria-components'
import { cn } from '../../../lib/utils'
import Icon from './Icon'

let indexCache: any = null

async function getSearchIndex() {
  if (indexCache) return indexCache
  const response = await fetch('/search-index.json')
  indexCache = await response.json()
  return indexCache
}

function searchIndex(index: any[], query: string) {
  if (!query || query.trim().length < 2) return []

  const terms = query.toLowerCase().trim().split(/\s+/)

  const matchScore = (text: string) => {
    if (!text) return 0
    const lower = text.toLowerCase()
    let score = 0
    for (const term of terms) {
      if (lower.includes(term)) score++
    }
    return score
  }

  return index
    .map((item) => {
      const titleScore = matchScore(item.title) * 3
      const summaryScore = matchScore(item.summary) * 2
      const tagScore = matchScore(item.tags?.join(' '))
      const categoryScore = matchScore(item.categories?.join(' '))
      const total = titleScore + summaryScore + tagScore + categoryScore
      return { ...item, score: total }
    })
    .filter((r: any) => r.score > 0)
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 20)
    .map(({ score, ...rest }: any) => rest)
}

function typeLabel(type: string) {
  switch (type) {
    case 'post': return 'Blog'
    case 'note': return 'Note'
    case 'page': return 'Page'
    case 'category': return 'Category'
    default: return type
  }
}

function typeIcon(type: string) {
  switch (type) {
    case 'post': return 'pen'
    case 'note': return 'notepad'
    case 'page': return 'home'
    case 'category': return 'folder'
    default: return 'search'
  }
}

function SearchResult({ result, isSelected, onSelect, onHover }: any) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' })
    }
  }, [isSelected])

  return (
    <li
      ref={ref}
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
        <Icon icon={typeIcon(result.type)} size={16} variant="default" aria-hidden="true" />
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-heading truncate">{result.title}</span>
        {result.summary && (
          <span className="text-xs text-ui-body truncate">{result.summary}</span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {result.categories?.length > 0 && (
          <span className="text-xs text-ui-body/60 hidden sm:inline">{result.categories[0]}</span>
        )}
        <span className="text-[10px] uppercase tracking-wider text-ui-body/50 font-medium">
          {typeLabel(result.type)}
        </span>
      </span>
    </li>
  )
}

function usePlatform() {
  const [isMac, setIsMac] = useState(false)
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform))
  }, [])
  return isMac
}

function SearchModal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState<any[] | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !index) {
      setLoading(true)
      getSearchIndex().then((data: any) => {
        setIndex(data)
        setLoading(false)
      })
    }
  }, [isOpen, index])

  useEffect(() => {
    if (!index) return
    const filtered = searchIndex(index, query)
    setResults(filtered)
    setSelectedIndex(0)
  }, [query, index])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  const navigateToResult = useCallback(
    (result: any) => {
      window.location.href = result.slug
      onOpenChange(false)
    },
    [onOpenChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            navigateToResult(results[selectedIndex])
          }
          break
      }
    },
    [results, selectedIndex, navigateToResult]
  )

  const isMac = usePlatform()

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-50 bg-neutral-01-900/60 backdrop-blur-sm transition-opacity duration-200 data-[entering]:opacity-0 data-[exiting]:opacity-0"
    >
      <AriaModal className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 outline-none transition-all duration-200 data-[entering]:opacity-0 data-[entering]:-translate-y-2 data-[exiting]:opacity-0 data-[exiting]:-translate-y-2">
        <Dialog className="w-full max-w-xl outline-none" aria-label="Search">
          <div className="bg-surface rounded-xl shadow-picked overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-neutral-01-100 dark:border-fern-1100">
              <Icon icon="search" size={16} variant="default" aria-hidden="true" className="text-ui-body/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search posts, notes, pages\u2026"
                className="flex-1 py-3.5 bg-transparent text-base text-heading placeholder:text-ui-body/40 outline-none border-0"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus() }}
                  className="p-1 rounded-sm hover:bg-neutral-01-50 dark:hover:bg-fern-1100 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <Icon icon="close" size={16} variant="default" aria-hidden="true" className="text-ui-body/50" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-0.5 text-[11px] text-ui-body/40 font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1.5 py-0.5">esc</kbd>
            </div>

            {loading && (
              <div className="px-4 py-8 text-center text-sm text-ui-body/50">Loading&hellip;</div>
            )}

            {!loading && query.trim().length >= 2 && (
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-ui-body/50">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                )}
                {results.length > 0 && (
                  <ul role="listbox" className="p-2" aria-label="Search results">
                    {results.map((result, index) => (
                      <SearchResult
                        key={`${result.type}-${result.slug}`}
                        result={result}
                        isSelected={index === selectedIndex}
                        onSelect={() => navigateToResult(result)}
                        onHover={() => setSelectedIndex(index)}
                      />
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!loading && query.trim().length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-ui-body/40">
                Type to search across all content
              </div>
            )}

            <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-neutral-01-100 dark:border-fern-1100 text-[11px] text-ui-body/40">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5">&uarr;</kbd>
                  <kbd className="font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5">&darr;</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5">&crarr;</kbd>
                  open
                </span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5">{isMac ? '\u2318' : 'ctrl'}</kbd>
                <kbd className="font-sans border border-neutral-01-100 dark:border-fern-1100 rounded px-1 py-0.5">K</kbd>
                to toggle
              </span>
            </div>
          </div>
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  )
}

export default function Search({ className, variant = 'desktop' }: { className?: string; variant?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isMac = usePlatform()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        aria-label="Search"
        className={cn(
          'flex items-center gap-1.5 cursor-pointer outline-none transition-opacity duration-200 hover:opacity-70',
          'focus-visible:ring-2 focus-visible:ring-fern-900 dark:focus-visible:ring-fern-400 focus-visible:ring-offset-2 rounded-sm',
          className
        )}
      >
        <Icon icon="search" size={24} className="text-current" variant="header" aria-hidden="true" />
        {variant === 'desktop' && (
          <kbd className="hidden lg:flex items-center gap-0.5 text-[11px] text-ui-body/40 font-sans border border-current/15 rounded px-1.5 py-0.5 -mr-0.5">
            <span>{isMac ? '\u2318' : 'ctrl'}</span>
            <span>K</span>
          </kbd>
        )}
      </Button>
      <SearchModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
