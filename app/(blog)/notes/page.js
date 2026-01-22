/**
 * Notes page
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { allNotes } from 'contentlayer/generated'

import { sortPosts } from '@/lib/utils/content'

import { Header, Title, Column, Description } from '@/components/page'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import Icon from '@/components/icon'
import Link from '@/components/link'

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

// Group notes by year and month
function groupNotesByYearAndMonth(notes) {
  const grouped = {}

  notes.forEach((note) => {
    const date = new Date(note.date)
    const year = date.getFullYear()
    const month = date.toLocaleString('en-GB', { month: 'long' })

    if (!grouped[year]) {
      grouped[year] = {}
    }

    if (!grouped[year][month]) {
      grouped[year][month] = []
    }

    grouped[year][month].push(note)
  })

  return grouped
}

// Format day with ordinal suffix
function formatDay(date) {
  const d = new Date(date)
  const day = d.getDate()

  const ordinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  return ordinal(day)
}

// Basic MDX components for note content
const mdxComponents = {
  h2: (props) => (
    <h2
      className="text-xl font-variation-bold font-display lowercase text-heading mt-6 mb-3"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-variation-bold font-display lowercase text-heading mt-5 mb-2"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-base font-variation-bold font-display lowercase text-heading mt-4 mb-2"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-02 rounded-sm p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  code: (props) => <code className="font-mono text-sm" {...props} />,
  a: (props) => (
    <a
      className="text-link underline hover:text-link-hover hover:no-underline has-[svg]:inline-flex has-[svg]:gap-0 has-[svg]:items-center has-[svg]:align-middle"
      {...props}
    />
  ),
  img: (props) => <img className="rounded-sm my-4" {...props} />,
  Icon,
}

function NoteContent({ note }) {
  const MDXContent = useMDXComponent(note.body.code)
  return <MDXContent components={mdxComponents} />
}

export default async function NotesIndex() {
  const allData = await getData()
  const notes = allData.notesByDate

  // Empty state check
  if (notes.length === 0) {
    return (
      <>
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

  const groupedNotes = groupNotesByYearAndMonth(notes)

  return (
    <>
      <Header>
        <Column>
          <Title>Notes</Title>
          <Description>
            Quick, short and simple posts, a feed for everything outside design
            and code
          </Description>
        </Column>
      </Header>

      <div className="col-content">
        {Object.keys(groupedNotes)
          .sort((a, b) => b - a)
          .map((year) => {
            const monthsInYear = groupedNotes[year]
            const months = Object.keys(monthsInYear)

            return (
              <section
                key={year}
                className="grid grid-cols-[auto_1fr] lg:grid-cols-[80px_120px_1fr] gap-x-6"
              >
                <h2 className="sticky top-0 self-start py-4 text-xl font-variation-bold font-display lowercase text-heading">
                  <time dateTime={year}>{year}</time>
                </h2>

                <div className="col-span-1 lg:col-span-2 grid grid-cols-subgrid">
                  {months.map((month, monthIndex) => {
                    const notesInMonth = monthsInYear[month]

                    return (
                      <div
                        key={month}
                        className="grid grid-cols-subgrid col-span-1 lg:col-span-2"
                      >
                        <h3 className="sticky top-0 self-start py-4 text-xl font-variation-bold font-display lowercase text-heading">
                          <time
                            dateTime={`${year}-${String(
                              months.indexOf(month) + 1
                            ).padStart(2, '0')}`}
                          >
                            {month}
                          </time>
                        </h3>

                        <div className="flex flex-col">
                          {notesInMonth.map((note, noteIndex) => (
                            <article
                              key={note._id}
                              className="relative py-6 not-last:after:content-[''] not-last:after:absolute not-last:after:bottom-0 not-last:after:left-0 not-last:after:right-0 not-last:after:h-[2px] not-last:after:bg-[url(/images/dash.svg)] dark:not-last:after:bg-[url(/images/dash-dark.svg)]"
                            >
                              <div className="flex gap-2 mb-2">
                                <time
                                  dateTime={note.date}
                                  className="text-sm text-ui-body"
                                >
                                  {formatDay(note.date)}
                                </time>
                                <span
                                  className="text-body-60"
                                  aria-hidden="true"
                                >
                                  •
                                </span>
                                <h4 className="font-medium">
                                  <Link
                                    href={note.slug}
                                    className="hover:text-link"
                                  >
                                    {note.title}
                                  </Link>
                                </h4>
                              </div>
                              <NoteContent note={note} />
                            </article>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
      </div>
    </>
  )
}
