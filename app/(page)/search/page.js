import { buildIndex } from '@/lib/search-index'
import { search, groupResults } from '@/lib/search'
import { cn } from '@/lib/utils'

import { Header, Title, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
import Icon from '@/components/icon'
import Link from '@/components/link'

export const dynamic = 'force-dynamic'

const RESULT_LIMIT = 40

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

// One result, as a row of a card list like those on /collections. A link
// out shows its domain beside the title; everything else has a summary.
function Result({ result }) {
  const isLink = result.type === 'link'

  return (
    <li className="border-b last:border-0 border-neutral-01-500/10">
      <Link
        href={result.slug}
        className={cn(
          'group flex flex-col gap-1 px-4 py-3 md:px-5 md:py-4',
          'hover:bg-neutral-01-50 dark:hover:bg-surface-02/20',
          'transition duration-200 ease-linear',
          // The card clips what reaches past it, so the ring sits inside
          'focus-visible:-outline-offset-2'
        )}
      >
        <span className="flex items-baseline gap-2 min-w-0">
          <span className="text-heading lg:text-lg leading-snug">
            {result.title}
          </span>
          {isLink && result.summary && (
            <span className="text-emphasis/40 group-hover:text-emphasis/80 transition duration-200 ease-linear truncate">
              {result.summary}
            </span>
          )}
        </span>
        {!isLink && result.summary && (
          <span className="text-sm md:text-base text-ui-body line-clamp-2">
            {result.summary}
          </span>
        )}
      </Link>
    </li>
  )
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams
  const q = typeof params?.q === 'string' ? params.q.trim() : ''
  const index = buildIndex()
  const results = q ? search(index, q, { limit: RESULT_LIMIT }) : []

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
          Find blog posts, notes, categories and collections across the site
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
            placeholder="Search everything…"
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

        {q && results.length === 0 && (
          <p className="text-ui-body md:text-lg">
            {`No results for “${q}”. Try another word, or browse the `}
            <Link href="/blog">blog archive</Link>.
          </p>
        )}

        {q && results.length > 0 && (
          <>
            {/* One string, as split JSX text loses the space before “for” */}
            <p className="text-ui-body md:text-lg">
              {`${results.length} ${
                results.length === 1 ? 'result' : 'results'
              } for “${q}”`}
            </p>
            {groupResults(results).map((group) => (
              <div className="flex flex-col gap-4" key={group.type}>
                <h2 className="flex justify-between text-xl md:text-3xl font-display font-variation-bold leading-none lowercase text-heading m-0 pt-2">
                  {group.title}
                  <span className="text-cornflour-600">
                    {group.items.length}
                  </span>
                </h2>
                <ul className="bg-surface shadow-placed rounded-md flex flex-col overflow-hidden m-0 p-0 list-none">
                  {group.items.map((result) => (
                    <Result result={result} key={result.slug} />
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  )
}
