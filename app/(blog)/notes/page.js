/**
 * Notes page
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { allNotes } from 'content-collections'

import { sortPosts } from '@/lib/utils/content'
import { format, parseISO } from 'date-fns'

import { Header, Title, Column, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
import Badge from '@/components/badge'
import Link from '@/components/link'
import { NoteFeedContent } from '@/components/note-feed-content'
import CopyLink from '@/components/button/copy-link'

export const metadata = {
  title: 'Notes',
  description:
    'Quick, short and simple posts, a feed for everything outside design and code',
}

export const dynamic = 'force-static'
export const revalidate = 2592000

const getData = cache(async () => {
  const notesByDate = sortPosts(
    allNotes.filter((note) => note.status === 'published')
  )

  return {
    notesByDate,
  }
})

export default async function NotesIndex() {
  const allData = await getData()
  const notes = allData.notesByDate

  // Empty state check
  if (notes.length === 0) {
    return (
      <>
        <PencilMono
          width={962}
          height={46}
          className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
        />
        <Header>
          <Column>
            <Title>Notes</Title>
            <Description>
              Quick, short and simple posts, a feed for everything outside
              design and code
            </Description>
          </Column>
        </Header>
        <div className="col-content">
          <p className="text-ui-body">No notes yet.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <PencilMono
        width={962}
        height={46}
        className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
      />
      <Header>
        <Column>
          <Title>Notes</Title>
          <Description>
            Quick, short and simple posts, a feed for everything outside design
            and code
          </Description>
        </Column>
      </Header>

      <div className="col-content flex flex-col">
        {notes.map((note, index) => (
          <article
            key={note._meta.filePath}
            className={`grid grid-cols-1 md:grid-cols-[minmax(8rem,_auto)_24px_1fr_auto] gap-x-4 lg:gap-x-6 ${
              index > 0 ? 'pt-8' : ''
            }`}
          >
            {/* Date column — hidden on mobile */}
            <div
              className={`hidden md:flex items-start sticky top-8 self-start pb-8 justify-end ${
                index > 0 ? 'mt-[11px]' : ''
              }`}
            >
              <time
                dateTime={note.date}
                className="text-sm font-variation-medium text-emphasis leading-tight text-right"
              >
                {format(parseISO(note.date), 'do LLLL yyyy')}
              </time>
            </div>

            {/* Timeline line + dot */}
            <div className="hidden md:flex relative justify-center">
              <div
                className={`absolute w-px bg-subtle ${
                  index === 0 ? 'top-0' : '-top-8'
                } bottom-0`}
              />
              {/* Dot */}
              <div
                className={`sticky top-8 self-start mb-12 size-2.5 rounded-full bg-border-medium ring-4 ring-canvas shrink-0 ${
                  index > 0 ? 'mt-3' : ''
                }`}
              />
            </div>

            {/* Content column */}
            <div className="pb-12 max-w-prose mx-auto w-full">
              {/* Mobile date */}
              <time
                dateTime={note.date}
                className="block md:hidden text-sm font-variation-medium text-body-60 mb-2"
              >
                {format(parseISO(note.date), 'do LLLL yyyy')}
              </time>
              <h2 className="text-heading font-display font-variation-bold lowercase text-2xl/tight lg:text-3xl/tight mb-4">
                <Link href={note.slug} className="hover:text-link">
                  {note.title}
                </Link>
              </h2>
              <div className="lg:text-xl">
                <NoteFeedContent code={note.mdx} />
              </div>
              {/* Mobile meta */}
              <div className="flex items-center gap-4 mt-6 md:hidden">
                <Badge size={16} theme="lavender" iconStart="views">
                  {note.content.split(/\s+/).length} words
                </Badge>
                <CopyLink slug={note.slug} />
              </div>
            </div>

            {/* Desktop meta column */}
            <div
              className={`hidden md:flex flex-col gap-3 sticky top-8 self-start pb-12 ${
                index > 0 ? 'mt-1.5' : ''
              }`}
            >
              <Badge size={16} theme="lavender" iconStart="views">
                {note.content.split(/\s+/).length} words
              </Badge>
              <CopyLink slug={note.slug} />
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
