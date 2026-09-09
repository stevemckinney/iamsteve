'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
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
import { search, groupResults, typeIcon } from '@/lib/search'
import Icon from '@/components/icon'
import { navigation, library } from '@/content/navigation'
import collectionsConfig from '@/content/collections'
import categoriesConfig from '@/content/categories'
import { readRecents, addRecent } from '@/lib/recents'
import siteMetadata from '@/content/metadata'

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
  blog: {
    label: 'Blog',
    types: ['post', 'category'],
    placeholder: 'Search the blog…',
    items: categoriesConfig
      .filter((item) => !item.exclude)
      .map((item) => ({
        type: 'category',
        title: item.title,
        slug: item.slug,
        icon: item.icon,
      })),
  },
  notes: {
    label: 'Notes',
    types: ['note'],
    placeholder: 'Search notes…',
    items: [],
  },
}

// Typing a scope's name and pressing Tab drops into it, the way a filter token
// is committed elsewhere. Backspace on the empty field takes you back out.
function matchScope(query) {
  const typed = query.trim().toLowerCase()
  if (!typed) return null
  return Object.keys(scopes).find((name) => name.startsWith(typed)) ?? null
}

// Posts and notes are the only content served as markdown, and the index is
// the only thing that knows a path is really one of them.
function markdownUrl(pathname, index) {
  const type = index?.find((item) => item.slug === pathname)?.type
  if (type === 'post') return pathname.replace('/blog/', '/api/content/')
  if (type === 'note') return pathname.replace('/notes/', '/api/content/notes/')
  return null
}

// The menu opens over the page without moving it, so where the reader had got
// to is still there to be read. The last heading, or note, scrolled past is the
// one they are on.
function nearestAnchor(pathname) {
  const line = window.innerHeight / 3
  const pick = (selector) => {
    let passed = null
    for (const el of document.querySelectorAll(selector)) {
      if (el.getBoundingClientRect().top > line) return passed ?? el
      passed = el
    }
    return passed
  }

  if (pathname.startsWith('/blog/')) {
    const heading = pick('.prose h2[id], .prose h3[id]')
    return (
      heading && {
        title: heading.textContent.trim(),
        url: `${siteMetadata.siteUrl}${pathname}#${heading.id}`,
      }
    )
  }

  // Notes are listed in full, so a link to the page is a link to the feed. The
  // one in view has its own page worth pointing at.
  if (pathname === '/notes') {
    const link = pick('article')?.querySelector('h2 a')
    return (
      link && {
        title: link.textContent.trim(),
        url: `${siteMetadata.siteUrl}${link.getAttribute('href')}`,
      }
    )
  }

  return null
}

function pageActions(pathname, index, nearest) {
  const url = `${siteMetadata.siteUrl}${pathname}`
  const markdown = markdownUrl(pathname, index)

  return [
    {
      id: 'action:copy-link',
      title: 'Copy link to this page',
      confirms: true,
      icon: 'link',
      run: () => navigator.clipboard.writeText(url),
    },
    nearest && {
      id: 'action:copy-anchor',
      title: `Copy link to “${nearest.title}”`,
      confirms: true,
      icon: 'link',
      run: () => navigator.clipboard.writeText(nearest.url),
    },
    // Safari and Android hand this to the system share sheet. Everywhere else
    // the row would go nowhere, so it isn't offered.
    typeof navigator !== 'undefined' &&
      navigator.share && {
        id: 'action:share',
        title: 'Share this page',
        icon: 'share',
        run: () => navigator.share({ url }),
      },
    markdown && {
      id: 'action:copy-markdown',
      title: 'Copy this page as markdown',
      confirms: true,
      icon: 'copy',
      run: async () => {
        const response = await fetch(markdown)
        navigator.clipboard.writeText(await response.text())
      },
    },
  ].filter(Boolean)
}

// A scope opens on what it holds rather than a blank list. Everything is a
// keystroke away, so this only has to be enough to browse — 217 collection
// rows cost a second to paint on a slow phone, 40 cost nothing.
const SCOPE_ROWS = 40

let cache = null
let pending = null

export async function fetchIndex() {
  if (cache) return cache
  pending ??= fetch('/api/search').then((response) => response.json())
  cache = await pending
  pending = null
  return cache
}

function Kbd({ children }) {
  const isText = typeof children === 'string'
  return (
    <kbd
      className={cn(
        'flex items-center',
        'font-sans text-xs font-medium uppercase',
        'bg-surface-raised text-body',
        'shadow-placed',
        'rounded-xs',
        'px-1.5 py-0.5'
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
          icon={item.icon || typeIcon(item.type)}
          size={16}
          variant="none"
          aria-hidden="true"
        />
      </span>
      <span className="flex items-baseline gap-2 min-w-0 flex-1">
        <span
          className={cn(
            'relative top-px text-sm truncate',
            item.muted ? 'text-body' : 'font-medium text-heading'
          )}
        >
          {item.title}
        </span>
        {item.summary && (
          <span className="relative top-px text-xs text-ui-body truncate">
            {item.summary}
          </span>
        )}
      </span>
      {item.hint && (
        <span className="hidden any-pointer-fine:flex shrink-0">
          <Kbd>
            <Icon icon={item.hint} size={16} variant="none" aria-label="Tab" />
          </Kbd>
        </span>
      )}
      {item.categories?.length > 0 && (
        <span className="flex shrink-0 text-xs text-ui-body hidden sm:inline">
          {item.categories[0]}
        </span>
      )}
    </>
  )
}

const rowStyle = ({ isHovered, isFocused, isPressed }) => {
  const active = isHovered || isFocused
  return cn(
    'flex items-center cursor-default p-2 gap-2 outline-none rounded-sm',
    'transition-all duration-100 ease-linear',
    active && 'bg-white dark:bg-fern-1000 dark:shadow-none',
    active && (isPressed ? 'shadow-reduced' : 'shadow-picked')
  )
}

export default function SearchModal({ isOpen, onOpenChange, scope = null }) {
  const [query, setQuery] = useState('')
  const [activeName, setActiveName] = useState(scope)
  const [index, setIndex] = useState(cache)
  const inputRef = useRef(null)
  const router = useRouter()
  const activeScope = scopes[activeName] || null

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

  // The on-screen keyboard does not shrink the layout viewport on iOS, so dvh
  // alone leaves the dialog running underneath it. visualViewport is the only
  // thing that reports the area actually left to draw in.
  const [visible, setVisible] = useState(null)

  useEffect(() => {
    const viewport = globalThis.visualViewport
    if (!isOpen || !viewport) return
    const update = () => setVisible(viewport.height)
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [isOpen])

  const [recents, setRecents] = useState([])
  const [done, setDone] = useState(null)
  const [nearest, setNearest] = useState(null)
  const pathname = usePathname()

  // Closed does not mean unmounted, so anything that should not survive an
  // open is cleared here rather than by each caller's press handler.
  useEffect(() => {
    if (!isOpen) return
    setRecents(readRecents())
    setActiveName(scope)
    setQuery('')
  }, [isOpen, scope])

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setDone(null), 1600)
    return () => clearTimeout(timer)
  }, [done])

  useEffect(() => {
    if (!isOpen) {
      setDone(null)
      return
    }
    setNearest(nearestAnchor(pathname))
  }, [isOpen, pathname])

  const isSearching = query.trim().length >= 2

  const sections = useMemo(() => {
    if (!isSearching) {
      const items = activeScope
        ? [
            // the scope's own topics draw before the index lands; its content
            // follows once it has, newest first
            ...activeScope.items,
            ...(index ?? []).filter((entry) =>
              activeScope.types.includes(entry.type)
            ),
          ]
        : [...navigation.filter((item) => item.href !== '#'), ...library].map(
            ({ href, ...rest }) => ({ ...rest, slug: href })
          )
      const seen = new Set(recents.map((recent) => recent.slug))
      const rest = []
      for (const item of items) {
        if (seen.has(item.slug)) continue
        seen.add(item.slug)
        rest.push({ ...item, id: item.slug })
        if (activeScope && rest.length === SCOPE_ROWS) break
      }

      const actions = (
        activeScope ? [] : pageActions(pathname, index, nearest)
      ).map((action) =>
        done === action.id ? { ...action, title: 'Copied' } : action
      )

      return [
        recents.length && {
          id: 'recent',
          title: 'Recent',
          items: recents.map((recent) => ({ ...recent, id: recent.slug })),
        },
        rest.length && {
          id: 'default',
          title: activeScope?.label ?? 'Pages',
          items: rest,
        },
        !activeScope && {
          id: 'scopes',
          title: 'Search in',
          items: Object.entries(scopes).map(([name, { label, types }]) => ({
            id: `scope:${name}`,
            title: label,
            // the row wears the icon of the results it will produce
            icon: typeIcon(types[0]),
            hint: 'tab',
            scope: name,
            run: () => {
              setActiveName(name)
              setQuery('')
            },
          })),
        },
        actions.length && { id: 'actions', title: 'Actions', items: actions },
      ].filter(Boolean)
    }
    if (!index) return []
    const suggestion = activeScope ? null : matchScope(query)
    const found = groupResults(
      search(index, query, { types: activeScope?.types })
    ).map((group) => ({
      id: group.type,
      title: group.title,
      items: group.items.map((item) => ({ ...item, id: item.slug })),
    }))

    return [
      suggestion && {
        id: 'scope',
        items: [
          {
            id: `scope:${suggestion}`,
            title: `Search ${scopes[suggestion].label} only`,
            icon: 'folder',
            run: () => {
              setActiveName(suggestion)
              setQuery('')
            },
          },
        ],
      },
      ...found,
      {
        id: 'all',
        items: [
          {
            id: 'search:all',
            title: `See all results for “${query.trim()}”`,
            muted: true,
            run: () => {
              router.push(`/search?q=${encodeURIComponent(query.trim())}`)
              onOpenChange(false)
            },
          },
        ],
      },
    ].filter(Boolean)
  }, [
    index,
    query,
    isSearching,
    activeScope,
    recents,
    pathname,
    nearest,
    done,
    router,
    onOpenChange,
  ])

  // ListBox hands back the key of the chosen row, so keep a way back to the item
  const byKey = useMemo(() => {
    const map = new Map()
    for (const section of sections) {
      for (const item of section.items) map.set(item.id, item)
    }
    return map
  }, [sections])

  const noResults = sections.every((section) =>
    section.items.every((item) => item.run)
  )

  const modified = useRef(false)
  const rememberModifier = (event) => {
    modified.current = event.metaKey || event.ctrlKey
  }

  const navigate = (id) => {
    const item = byKey.get(id)
    if (!item) return

    // A row either does something or goes somewhere. Only the ones that go
    // somewhere are worth remembering.
    if (item.run) {
      Promise.resolve(item.run()).then(
        () => setDone(item.confirms ? item.id : null),
        () => setDone(null)
      )
      inputRef.current?.focus()
      return
    }

    const newTab = modified.current
    modified.current = false
    setRecents(addRecent(item))

    // Most of the index is links out. Opening one in the background leaves the
    // menu where it was, so a run through a collection is one visit, not ten.
    if (newTab) {
      window.open(item.slug, '_blank', 'noopener,noreferrer')
      inputRef.current?.focus()
      return
    }

    if (item.slug.startsWith('http')) {
      window.location.href = item.slug
    } else {
      router.push(item.slug)
    }
    onOpenChange(false)
  }

  const clearScope = () => {
    setActiveName(null)
    inputRef.current?.focus()
  }

  // react-aria walks the list with Tab and handles it before our own keydown,
  // so a scope row has to be caught on the way down or it has already moved on.
  const onKeyDownCapture = (event) => {
    if (event.key !== 'Tab' || event.shiftKey || activeScope) return
    const focused = document.getElementById(
      event.currentTarget.getAttribute('aria-activedescendant')
    )
    const name = byKey.get(focused?.dataset.key)?.scope
    if (!name) return
    event.preventDefault()
    event.stopPropagation()
    setActiveName(name)
    setQuery('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') rememberModifier(event)

    if (event.key === 'Tab' && !event.shiftKey && !activeScope) {
      const match = matchScope(query)
      if (match) {
        event.preventDefault()
        setActiveName(match)
        setQuery('')
        return
      }
    }

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
          'flex items-start justify-center px-4 py-4 sm:pt-[15vh] sm:pb-8',
          'h-dvh',
          'transition-[opacity,transform] duration-200',
          'data-[entering]:opacity-0 data-[entering]:-translate-y-2',
          'data-[exiting]:opacity-0 data-[exiting]:duration-150'
        )}
        style={visible ? { height: `${visible}px` } : undefined}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onOpenChange(false)
        }}
      >
        <Dialog
          className={cn(
            'aura w-full max-w-xl outline-none',
            'flex flex-col min-h-0 max-h-full',
            'pointer-coarse:max-h-[min(50dvh,100%)] sm:max-h-[min(36rem,100%)]'
          )}
          aria-label="Search"
        >
          <div
            className={cn(
              'search-dialog relative flex min-h-0 flex-col p-2',
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
                  'search-field relative z-10 shrink-0',
                  'flex items-center gap-2 px-4 cursor-text',
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
                      'flex items-center gap-0.5 shrink-0',
                      'px-1 rounded-xs',
                      'bg-surface-raised text-body shadow-placed',
                      'text-sm font-medium'
                    )}
                  >
                    <span className="relative top-px">{activeScope.label}</span>
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
                  onKeyDownCapture={onKeyDownCapture}
                  onKeyDown={onKeyDown}
                  placeholder={
                    activeScope ? activeScope.placeholder : 'Search everything…'
                  }
                  className={cn(
                    'relative top-px flex-1 px-0 py-3.5 bg-transparent',
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

              <div
                className="search-body relative z-1 min-h-0 flex-1 overflow-y-auto"
                onPointerDownCapture={rememberModifier}
              >
                <div className="w-full">
                  {isSearching && !index && (
                    <div className="px-4 py-8 text-center text-sm text-body">
                      Loading&hellip;
                    </div>
                  )}
                  {isSearching && index && noResults && (
                    <div className="px-4 py-8 text-center text-sm text-body">
                      No results found for &ldquo;{query}&rdquo;
                    </div>
                  )}
                  <ListBox
                    items={sections}
                    onAction={navigate}
                    aria-label={isSearching ? 'Search results' : 'Pages'}
                    // shadow-picked reaches 12px below a row, so the last one
                    // needs that much room or the scroll edge cuts it
                    className="px-1.5 pt-2 pb-3 m-0 outline-none"
                  >
                    {(section) => (
                      <ListBoxSection
                        id={section.id}
                        className="flex flex-col gap-px"
                      >
                        {section.title &&
                          (isSearching || sections.length > 1) && (
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
                'search-footer hidden any-pointer-fine:flex shrink-0',
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
                  <span className="relative top-px mr-2">Open</span>
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <Kbd>
                    <Icon
                      icon="cmd"
                      size={16}
                      variant="none"
                      aria-label="Command"
                    />
                  </Kbd>
                  <Kbd>
                    <Icon
                      icon="enter"
                      size={16}
                      variant="none"
                      aria-label="Enter"
                    />
                  </Kbd>
                  <span className="relative top-px ml-1">New tab</span>
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
