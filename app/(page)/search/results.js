import { allPosts, allNotes } from 'content-collections'

import { typeIcon } from '@/lib/search'
import categories from '@/content/categories'
import { mobile } from '@/content/navigation'
import Card from '@/components/card'
import Icon from '@/components/icon'
import Link from '@/components/link'
import Date from '@/components/date'
import { ChipIcon } from '@/components/chip'

const posts = new Map(allPosts.map((post) => [post.slug, post]))
const notes = new Map(allNotes.map((note) => [note.slug, note]))
const pageIcons = new Map(mobile.map((item) => [item.href, item.icon]))

// Shaped like the small post card, so the notes, categories, collections and
// pages a search finds sit among its posts as one of them. Where a post has
// its date, the rest say what they are.
function Result({ item }) {
  const note = notes.get(item.slug)
  const theme =
    item.type === 'category'
      ? categories.find((category) => category.slug === item.slug)?.theme
      : null

  return (
    <div className="relative flex gap-4 rounded-lg shadow-placed hover:shadow-picked active:shadow-reduced dark:active:shadow-[inset_0_0_0_1px_var(--color-surface-02)] bg-surface active:bg-surface-pressed active:scale-[.99375] bg-clip-padding transition ease-linear duration-200 overflow-hidden p-8">
      <ChipIcon size={24} theme={theme}>
        <Icon
          icon={item.icon || pageIcons.get(item.slug) || typeIcon(item.type)}
          size={24}
          variant="on-light"
          className="dark:text-fern-1100"
        />
      </ChipIcon>
      <div className="flex flex-1 flex-col gap-[.5625rem] min-w-0">
        <h3 className="font-display font-variation-bold text-xl leading-xl lowercase m-0 p-0">
          <Link
            href={item.slug}
            className="text-heading before:content-[''] before:absolute before:inset-0 before:cursor-pointer before:rounded-lg before:z-1"
          >
            {item.title}
          </Link>
        </h3>
        <span className="flex gap-1 items-center text-sm leading-none font-ui lowercase text-ui-body">
          {note ? (
            <>
              <Icon
                icon="calendar"
                size={16}
                className="text-ui-body relative -top-px"
                variant="header"
              />
              <Date dateString={note.date} />
            </>
          ) : (
            item.type
          )}
        </span>
      </div>
    </div>
  )
}

// Links that come one after another share a card, the way the collections
// page lists them. The corners and inset are the post card's, and the link
// icon sits where a card's chip does, so the titles line up with theirs.
function Links({ items }) {
  return (
    <ul className="bg-surface shadow-placed rounded-lg flex flex-col overflow-hidden m-0 p-0 list-none">
      {items.map((item) => (
        <li
          key={item.slug}
          className="flex items-center border-b last:border-0 border-neutral-01-500/10 leading-loose relative lg:text-lg"
        >
          <Link
            href={item.slug}
            className="flex flex-1 items-center gap-4 group hover:bg-neutral-01-50 dark:hover:bg-surface-02/20 transition duration-200 ease-linear py-2.5 px-8 w-full focus-visible:-outline-offset-2"
          >
            <span className="flex justify-center w-8 shrink-0">
              <Icon
                icon="link"
                size={24}
                variant="none"
                aria-hidden="true"
                className="text-ui-body"
              />
            </span>
            <span className="flex items-baseline gap-2 min-w-0 whitespace-nowrap overflow-hidden [mask:linear-gradient(90deg,black_80%,transparent)]">
              {item.title}
              <span className="text-emphasis/40 group-hover:text-emphasis/80 transition duration-200 ease-linear line-clamp-1">
                {item.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Everything a search found, best first and in one list. A post is a post
// card, a run of links is a collections list, and the rest are cards shaped
// like a post's.
export default function Results({ items }) {
  const runs = []
  for (const item of items) {
    const last = runs.at(-1)
    if (item.type === 'link' && Array.isArray(last)) last.push(item)
    else runs.push(item.type === 'link' ? [item] : item)
  }

  return (
    <div className="flex flex-col gap-4">
      {runs.map((run) => {
        if (Array.isArray(run)) return <Links items={run} key={run[0].slug} />
        const post = posts.get(run.slug)
        return post ? (
          // Narrowest category first, as the index has them, so the chip
          // says Colour rather than Design
          <Card
            size="small"
            frontmatter={{ ...post, categories: run.categories }}
            key={run.slug}
          />
        ) : (
          <Result item={run} key={run.slug} />
        )
      })}
    </div>
  )
}
