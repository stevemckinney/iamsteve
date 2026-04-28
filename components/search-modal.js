'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ModalOverlay, Modal as AriaModal, Dialog } from 'react-aria-components'
import { cn } from '@/lib/utils'
import { search } from '@/lib/search'
import Icon from '@/components/icon'
import { navigation, library } from '@/content/navigation'

let cache = null

export async function fetchIndex() {
  if (cache) return cache
  const response = await fetch('/api/search')
  cache = await response.json()
  return cache
}

function label(type) {
  switch (type) {
    case 'post':
      return 'Blog'
    case 'note':
      return 'Note'
    case 'page':
      return 'Page'
    case 'category':
      return 'Category'
    case 'collection':
      return 'Collection'
    default:
      return type
  }
}

function icon(type) {
  switch (type) {
    case 'post':
      return 'pen'
    case 'note':
      return 'notepad'
    case 'page':
      return 'home'
    case 'category':
      return 'folder'
    case 'collection':
      return 'collections'
    default:
      return 'search'
  }
}

function Kbd({ children, className }) {
  const isText = typeof children === 'string'
  return (
    // className="flex items-center font-sans ml-2 hidden lg:flex items-center gap-0.5 text-sm font-medium px-1 bg-neutral-01-100 text-body shadow-picked rounded-xs"
    <kbd
      className={cn(
        'flex items-center',
        'hidden lg:flex',
        'font-sans text-xs font-medium uppercase',
        'bg-neutral-01-50 text-body',
        //'shadow-[var(--shadow-placed),inset_0_1px_0_theme(--color-white/0.5),inset_0_-1px_0.1px_theme(--color-neutral-01-900/.08)]',
        'shadow-placed',
        'rounded-xs',
        'px-1.5 py-0.5',
        className
      )}
    >
      {isText ? <span className="relative top-px">{children}</span> : children}
    </kbd>
  )
}

function Result({ result, isSelected, onSelect, onHover }) {
  const ref = useRef(null)

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
        'flex items-center cursor-default p-2 gap-2',
        isSelected
          ? 'bg-neutral-01-50 dark:bg-fern-1000'
          : 'hover:bg-white dark:hover:bg-fern-1100'
      )}
      onClick={onSelect}
      onMouseMove={onHover}
    >
      <span className="flex shrink-0">
        <Icon
          icon={result.icon || icon(result.type)}
          size={16}
          variant="none"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-heading truncate">
          {result.title}
        </span>
        {/*(result.summary || result.description) && (
          <span className="text-xs text-ui-body truncate">
            {result.summary || result.description}
          </span>
        )*/}
      </span>
      {result.type && (
        <span className="flex shrink-0 items-center gap-2">
          {result.categories?.length > 0 && (
            <span className="text-xs text-ui-body hidden sm:inline">
              {result.categories[0]}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider text-ui-body font-medium">
            {label(result.type)}
          </span>
        </span>
      )}
    </li>
  )
}

export default function SearchModal({ isOpen, onOpenChange }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [index, setIndex] = useState(cache)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (index) return
    let cancelled = false
    fetchIndex().then((data) => {
      if (!cancelled) setIndex(data)
    })
    return () => {
      cancelled = true
    }
  }, [index])

  const results = index ? search(index, query) : []
  const pages = [...navigation.filter((n) => n.href !== '#'), ...library]
  const isSearching = query.trim().length >= 2
  const activeItems = isSearching ? results : pages
  const itemsRef = useRef(activeItems)
  itemsRef.current = activeItems
  const selectedRef = useRef(selected)
  selectedRef.current = selected

  const navigate = (result) => {
    router.push(result.slug || result.href)
    onOpenChange(false)
  }

  const onKeyDown = (e) => {
    const items = itemsRef.current
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelected((prev) => (prev < items.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelected((prev) => (prev > 0 ? prev - 1 : items.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (items[selectedRef.current]) {
          navigate(items[selectedRef.current])
        }
        break
    }
  }

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className={cn(
        'fixed inset-0 z-50',
        'transition-[opacity] duration-150',
        'data-[entering]:opacity-0 data-[exiting]:opacity-0'
      )}
    >
      <AriaModal
        className={cn(
          'fixed inset-0 z-50 outline-none',
          'flex items-start justify-center pt-[15vh] px-4',
          'transition-[opacity,transform] duration-200',
          'data-[entering]:opacity-0 data-[entering]:-translate-y-2',
          'data-[exiting]:opacity-0 data-[exiting]:duration-150'
        )}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onOpenChange(false)
        }}
      >
        <Dialog
          className="aura w-full max-w-xl outline-none"
          aria-label="Search"
        >
          <div
            className={cn(
              'search-dialog relative p-2',
              'bg-neutral-01-100 dark:bg-fern-1100',
              'rounded-md shadow-picked'
            )}
          >
            <label
              className={cn(
                'search-field relative z-10',
                'flex items-center px-4 cursor-text',
                'bg-white dark:bg-fern-1000',
                'rounded-sm shadow-placed dark:shadow-[0_0_0_1px_var(--color-fern-900)]',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cornflour-600 dark:has-[:focus-visible]:ring-fern-400'
              )}
            >
              <Icon
                icon="search"
                size={24}
                variant="none"
                aria-hidden="true"
                className="text-body shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelected(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Search everything…"
                className={cn(
                  'flex-1 py-3.5 bg-transparent',
                  'text-base text-heading placeholder:text-body',
                  'outline-none focus:ring-0 border-0'
                )}
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
                  className={cn(
                    'p-1 rounded cursor-pointer',
                    'hover:bg-neutral-01-50 dark:hover:bg-fern-1100',
                    'transition-colors'
                  )}
                  aria-label="Clear search"
                >
                  <Icon
                    icon="close"
                    size={16}
                    variant="none"
                    aria-hidden="true"
                    className="text-body"
                  />
                </button>
              )}
            </label>

            <div className="search-body relative z-1">
              {!index && (
                <div className="px-4 py-8 text-center text-sm text-body">
                  Loading&hellip;
                </div>
              )}

              {index && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {isSearching && activeItems.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-body">
                      No results found for &ldquo;{query}&rdquo;
                    </div>
                  )}
                  {activeItems.length > 0 && (
                    <ul
                      role="listbox"
                      className="px-0 py-2 m-0"
                      aria-label={isSearching ? 'Search results' : 'Pages'}
                    >
                      {activeItems.map((item, i) => (
                        <Result
                          key={item.slug || item.href}
                          result={item}
                          isSelected={i === selected}
                          onSelect={() => navigate(item)}
                          onHover={() => setSelected(i)}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div
              className={cn(
                'search-footer flex items-center justify-between gap-4',
                'text-ui-body text-sm font-medium pt-2 pb-0.5 mx-1.5',
                'shadow-[0_-1px_light-dark(var(--color-neutral-01-200),var(--color-fern-1000))]'
              )}
            >
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Kbd>
                    <Icon
                      icon="arrow-up"
                      size={16}
                      variant="none"
                      aria-label="Up"
                    />
                  </Kbd>
                  <Kbd>
                    <Icon
                      icon="arrow-down"
                      size={16}
                      variant="none"
                      aria-label="Down"
                    />
                  </Kbd>
                </span>
                <span className="ml-0 mr-2 relative top-px">Navigate</span>
                <span className="flex items-center gap-2">
                  <Kbd>
                    <Icon
                      icon="enter"
                      size={16}
                      variant="none"
                      aria-label="Enter"
                    />
                  </Kbd>
                  <span className="relative top-px">Open</span>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="relative top-px">Close</span>
                <Kbd>esc</Kbd>
              </span>
            </div>
          </div>
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  )
}
