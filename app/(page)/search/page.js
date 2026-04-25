import { cache } from 'react'

import { buildIndex } from '@/lib/search-index'
import { search } from '@/lib/search'
import { cn } from '@/lib/utils'

import { Header, Title, Column, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
import Icon from '@/components/icon'
import Link from '@/components/link'

export const dynamic = 'force-dynamic'

const RESULT_LIMIT = 40

const getIndex = cache(() => buildIndex())

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

export async function generateMetadata({ searchParams }) {
  const params = await searchParams
  const q = typeof params?.q === 'string' ? params.q.trim() : ''

  if (q) {
    return {
      title: `Search: ${q}`,
      description: `Search results for “${q}” across blog, notes and collections`,
      robots: { index: false, follow: true },
    }
  }

  return {
    title: 'Search',
    description:
      'Search blog posts, notes, categories and collections across iamsteve',
  }
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const q = typeof params?.q === 'string' ? params.q.trim() : ''
  const index = getIndex()
  const results = q ? search(index, q, RESULT_LIMIT) : []

  return (
    <>
      <PencilMono
        width={962}
        height={46}
        className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
      />
      <Header>
        <Column>
          <Title>Search</Title>
          <Description>
            Find blog posts, notes, categories and collections across the site
          </Description>
        </Column>
      </Header>

      <div className="col-content flex flex-col gap-8">
        <form
          role="search"
          method="get"
          action="/search"
          className={cn(
            'search-field relative flex items-center px-4 cursor-text',
            'bg-surface rounded-sm shadow-placed',
            'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cornflour-600 dark:has-[:focus-visible]:ring-fern-400'
          )}
        >
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <Icon
            icon="search"
            size={24}
            variant="none"
            aria-hidden="true"
            className="text-body shrink-0"
          />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search everything…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className={cn(
              'flex-1 py-3.5 bg-transparent',
              'text-base text-heading placeholder:text-body',
              'outline-none focus:ring-0 border-0'
            )}
          />
          <button
            type="submit"
            className={cn(
              'ml-2 px-3 py-1.5 rounded-xs cursor-pointer',
              'text-sm font-variation-medium',
              'bg-neutral-01-100 text-heading',
              'hover:bg-neutral-01-50 transition-colors'
            )}
          >
            Search
          </button>
        </form>

        {q && results.length === 0 && (
          <p className="text-body">
            No results found for &ldquo;{q}&rdquo;. Try a different term or
            browse the <Link href="/blog">blog archive</Link>.
          </p>
        )}

        {q && results.length > 0 && (
          <>
            <p className="text-body text-sm">
              {results.length} result{results.length === 1 ? '' : 's'} for
              &ldquo;{q}&rdquo;
            </p>
            <ul className="flex flex-col gap-2 m-0 p-0 list-none">
              {results.map((result) => (
                <li key={`${result.type}-${result.slug}`}>
                  <Link
                    href={result.slug}
                    className={cn(
                      'group flex items-start gap-3 p-3 -mx-3 rounded',
                      'hover:bg-surface transition-colors'
                    )}
                  >
                    <span className="flex shrink-0 mt-1">
                      <Icon
                        icon={icon(result.type)}
                        size={16}
                        variant="none"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex flex-col min-w-0 flex-1 gap-1">
                      <span className="flex items-center gap-2">
                        <span className="text-base font-variation-medium text-heading group-hover:text-link">
                          {result.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-ui-body font-medium">
                          {label(result.type)}
                        </span>
                      </span>
                      {result.summary && (
                        <span className="text-sm text-body">
                          {result.summary}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {!q && (
          <div className="flex flex-col gap-4">
            <p className="text-body">
              Type a query above to search posts, notes, categories and
              collections. You can also press
              <kbd
                className={cn(
                  'mx-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5',
                  'font-sans text-xs font-variation-medium uppercase',
                  'bg-neutral-01-50 text-body shadow-placed rounded-xs'
                )}
              >
                <Icon icon="cmd" size={16} variant="none" aria-label="Command" />
                <span className="relative top-px">K</span>
              </kbd>
              anywhere on the site to open the quick search.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
