'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ModalOverlay,
  Modal as AriaModal,
  Dialog,
  Autocomplete,
  TextField,
  Input,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Collection,
  Header,
} from 'react-aria-components'
import { cn } from '@/lib/utils'
import { search, groupResults } from '@/lib/search'
import Icon from '@/components/icon'
import { navigation, library } from '@/content/navigation'
import collectionsConfig from '@/content/collections'

// Opening the menu from a scoped trigger limits it to these types. Its default
// list, shown before anyone types, comes from config rather than the fetched
// index so the menu has something to draw the moment it opens.
const scopes = {
  collections: {
    label: 'Collections',
    types: ['collection', 'link'],
    placeholder: 'Search collections…',
    items: collectionsConfig.map((item) => ({
      type: 'collection',
      title: item.title,
      slug: item.slug,
      icon: item.icon,
    })),
  },
}

let cache = null
let pending = null

export async function fetchIndex() {
  if (cache) return cache
  pending ??= fetch('/api/search').then((response) => response.json())
  cache = await pending
  pending = null
  return cache
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
    case 'link':
      return 'link'
    default:
      return 'search'
  }
}

function key(item) {
  return item.slug || item.href
}

function Kbd({ children, className }) {
  const isText = typeof children === 'string'
  return (
    <kbd
      className={cn(
        'flex items-center',
        'font-sans text-xs font-medium uppercase',
        'bg-neutral-01-50 text-body',
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

function ResultContent({ item }) {
  return (
    <>
      <span className="flex shrink-0">
        <Icon
          icon={item.icon || icon(item.type)}
          size={16}
          variant="none"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="flex items-baseline gap-2 min-w-0">
          <span className="text-sm font-medium text-heading truncate">
            {item.title}
          </span>
          {item.type === 'link' && item.summary && (
            <span className="text-xs text-ui-body truncate">
              {item.summary}
            </span>
          )}
        </span>
      </span>
      {item.categories?.length > 0 && (
        <span className="flex shrink-0 text-xs text-ui-body hidden sm:inline">
          {item.categories[0]}
        </span>
      )}
    </>
  )
}

const rowStyle = ({ isFocused }) =>
  cn(
    'flex items-center cursor-default p-2 gap-2 outline-none',
    isFocused
      ? 'bg-neutral-01-50 dark:bg-fern-1000'
      : 'hover:bg-white dark:hover:bg-fern-1100'
  )

export default function SearchModal({
  isOpen,
  onOpenChange,
  scope,
  onScopeChange,
}) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(cache)
  const inputRef = useRef(null)
  const router = useRouter()
  const activeScope = scopes[scope] || null

  useEffect(() => {
    if (index || !isOpen) return
    let cancelled = false
    fetchIndex().then((data) => {
      if (!cancelled) setIndex(data)
    })
    return () => {
      cancelled = true
    }
  }, [index, isOpen])

  const isSearching = query.trim().length >= 2

  const sections = useMemo(() => {
    if (!isSearching) {
      const items = activeScope
        ? activeScope.items
        : [...navigation.filter((item) => item.href !== '#'), ...library]
      return [
        {
          id: 'default',
          title: activeScope?.label ?? 'Pages',
          items: items.map((item) => ({ ...item, id: key(item) })),
        },
      ]
    }
    if (!index) return []
    const scoped = activeScope
      ? index.filter((item) => activeScope.types.includes(item.type))
      : index
    return groupResults(search(scoped, query)).map((group) => ({
      id: group.type,
      title: group.title,
      items: group.items.map((item) => ({ ...item, id: key(item) })),
    }))
  }, [index, query, isSearching, activeScope])

  // ListBox hands back the key of the chosen row, so keep a way back to the item
  const byKey = useMemo(() => {
    const map = new Map()
    for (const section of sections) {
      for (const item of section.items) map.set(key(item), item)
    }
    return map
  }, [sections])

  const isEmpty = sections.every((section) => section.items.length === 0)

  const navigate = (id) => {
    const item = byKey.get(id)
    if (!item) return
    const href = key(item)
    if (href.startsWith('http')) {
      window.location.href = href
    } else {
      router.push(href)
    }
    onOpenChange(false)
  }

  const clearScope = () => {
    onScopeChange?.(null)
    inputRef.current?.focus()
  }

  const onKeyDown = (event) => {
    // Backspace on an empty field drops the scope, the way a removable token
    // behaves elsewhere. Escape closes rather than only clearing the input.
    if (event.key === 'Backspace' && !query && activeScope) {
      event.preventDefault()
      clearScope()
    }
    if (event.key === 'Escape' && !query) {
      event.preventDefault()
      onOpenChange(false)
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
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onOpenChange(false)
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
            <Autocomplete inputValue={query} onInputChange={setQuery}>
              <TextField
                aria-label={
                  activeScope ? `Search ${activeScope.label}` : 'Search'
                }
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
                {activeScope && (
                  <span
                    className={cn(
                      'flex items-center gap-1 shrink-0 ml-2 -mr-1',
                      'pl-2 pr-1 py-1 rounded-xs',
                      'bg-neutral-01-100 dark:bg-fern-1100',
                      'text-sm font-medium text-heading'
                    )}
                  >
                    {activeScope.label}
                    <button
                      type="button"
                      onClick={clearScope}
                      className={cn(
                        'flex rounded-xs cursor-pointer',
                        'hover:bg-neutral-01-50 dark:hover:bg-fern-1000',
                        'transition-colors'
                      )}
                      aria-label={`Search everything instead of ${activeScope.label.toLowerCase()}`}
                    >
                      <Icon
                        icon="close"
                        size={16}
                        variant="none"
                        aria-hidden="true"
                        className="text-body"
                      />
                    </button>
                  </span>
                )}
                <Input
                  ref={inputRef}
                  onKeyDown={onKeyDown}
                  placeholder={
                    activeScope ? activeScope.placeholder : 'Search everything…'
                  }
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
              </TextField>

              <div className="search-body relative z-1">
                <div className="max-h-[60vh] overflow-y-auto">
                  {isSearching && !index && (
                    <div className="px-4 py-8 text-center text-sm text-body">
                      Loading&hellip;
                    </div>
                  )}
                  {isSearching && index && isEmpty && (
                    <div className="px-4 py-8 text-center text-sm text-body">
                      No results found for &ldquo;{query}&rdquo;
                    </div>
                  )}
                  <ListBox
                    items={sections}
                    onAction={navigate}
                    aria-label={isSearching ? 'Search results' : 'Pages'}
                    className="px-0 py-2 m-0 outline-none"
                  >
                    {(section) => (
                      <ListBoxSection id={section.id}>
                        {isSearching && (
                          <Header className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wider text-ui-body font-medium">
                            {section.title}
                          </Header>
                        )}
                        <Collection items={section.items}>
                          {(item) => (
                            <ListBoxItem
                              id={item.id}
                              textValue={item.title}
                              className={rowStyle}
                            >
                              <ResultContent item={item} />
                            </ListBoxItem>
                          )}
                        </Collection>
                      </ListBoxSection>
                    )}
                  </ListBox>
                </div>
              </div>
            </Autocomplete>

            <div
              className={cn(
                'search-footer hidden any-pointer-fine:flex',
                'items-center justify-between gap-4',
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
