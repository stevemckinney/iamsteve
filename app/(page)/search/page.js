import { Suspense, cache } from 'react'

import { buildIndex } from '@/lib/search-index'
import { search } from '@/lib/search'
import { answer, spent } from '@/lib/search-ai'
import { cn } from '@/lib/utils'

import { Header, Title, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
import Icon from '@/components/icon'
import Link from '@/components/link'
import Results from './results'

export const dynamic = 'force-dynamic'

const RESULT_LIMIT = 40

// Claude is asked once there is enough of a search to go on
const asks = (q) =>
  !!process.env.AI_GATEWAY_API_KEY && q.length >= 3 && q.length <= 200

// Claude’s picks lead, then whatever the keywords found that it did not.
// Switched off, out of budget, failing or slow, it is the keyword search
// alone. The count and the list share the one answer.
const find = cache(async (q) => {
  const found = search(buildIndex(), q, { limit: RESULT_LIMIT })
  if (!asks(q)) return found
  const best = []
  const signal = AbortSignal.timeout(10_000)
  try {
    for await (const match of answer(q, null, { signal })) best.push(match)
  } catch (error) {
    if (!signal.aborted && !spent(error)) {
      console.error('AI search failed', error)
    }
  }
  const taken = new Set(best.map((match) => match.slug))
  return [...best, ...found.filter((result) => !taken.has(result.slug))].slice(
    0,
    RESULT_LIMIT
  )
})

const countOf = (results, q) =>
  results.length === 0
    ? `No results for “${q}”`
    : `${results.length} ${
        results.length === 1 ? 'result' : 'results'
      } for “${q}”`

async function Count({ q }) {
  return countOf(await find(q), q)
}

// With nothing found yet and Claude still to answer, there is nothing to say
function List({ items, waiting = false }) {
  if (items.length > 0) return <Results items={items} />
  if (waiting) return null
  return (
    <p className="text-ui-body md:text-lg">
      {'Try another word, or browse the '}
      <Link href="/blog">blog archive</Link>.
    </p>
  )
}

async function Found({ q }) {
  return <List items={await find(q)} />
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
  // The keyword results stand in until Claude has answered
  const found = q ? search(buildIndex(), q, { limit: RESULT_LIMIT }) : []
  const waiting = asks(q) && found.length === 0

  return (
    <>
      <PencilMono
        width={962}
        height={46}
        className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
      />
      <Header className="max-md:frame max-md:frame-24 max-md:px-8 max-md:py-8 flex flex-col gap-2 col-container md:col-content md:col-end-7 md:sticky top-8 self-start">
        <Title className="font-variation-bold text-5xl">Search</Title>
        <Description className="desc max-md:mb-2">
          {/* Once there is a search, what it found says more than what the
              page is for */}
          {q ? (
            <Suspense
              fallback={waiting ? `Searching for “${q}”…` : countOf(found, q)}
            >
              <Count q={q} />
            </Suspense>
          ) : (
            'Find blog posts, notes, categories and collections across the site'
          )}
        </Description>
        <form
          role="search"
          method="get"
          action="/search"
          className={cn(
            'search-field relative flex items-center gap-2 mt-4 pl-4 pr-2 cursor-text',
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
            placeholder={
              process.env.AI_GATEWAY_API_KEY
                ? 'Prompt to find something…'
                : 'Search everything…'
            }
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className={cn(
              'flex-1 min-w-0 px-0 py-3.5 bg-transparent',
              'text-base text-heading placeholder:text-body',
              'outline-none focus:ring-0 border-0'
            )}
          />
          {/* An arrow, so the field keeps its width for the words in it */}
          <button
            type="submit"
            aria-label="Search"
            className={cn(
              'flex shrink-0 p-1.5 rounded-xs cursor-pointer',
              'bg-surface-raised text-heading shadow-placed',
              'hover:shadow-picked active:shadow-reduced',
              'transition duration-200 ease-out'
            )}
          >
            <Icon
              icon="arrow-right"
              size={24}
              variant="none"
              aria-hidden="true"
            />
          </button>
        </form>
      </Header>

      <section className="flex flex-col col-start-content-start md:col-start-8 col-end-content-end gap-y-10">
        {!q && (
          // The field is on screen already; the shortcut is the one thing
          // left to say, and only to a keyboard
          <p className="hidden any-pointer-fine:block text-ui-body md:text-lg">
            Press
            <kbd
              className={cn(
                'mx-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5',
                'font-sans text-xs font-variation-medium uppercase',
                'bg-surface-raised text-body shadow-placed rounded-xs'
              )}
            >
              <Icon icon="cmd" size={16} variant="none" aria-label="Command" />
              <span className="relative top-px">K</span>
            </kbd>
            anywhere on the site to open the quick search.
          </p>
        )}

        {q && (
          <>
            <h2 className="sr-only">Results</h2>
            <Suspense fallback={<List items={found} waiting={waiting} />}>
              <Found q={q} />
            </Suspense>
          </>
        )}
      </section>
    </>
  )
}
