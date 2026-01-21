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

export const metadata = {
  title: 'Notes',
  description: 'Quick posts, streams of consciousness, not main feed worthy',
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

// Group notes by year
function groupNotesByDate(notes) {
  const grouped = {}

  notes.forEach((note) => {
    const date = new Date(note.date)
    const year = date.getFullYear()

    if (!grouped[year]) {
      grouped[year] = []
    }

    grouped[year].push(note)
  })

  return grouped
}

// Format day with ordinal suffix
function formatDate(date) {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.toLocaleString('en-GB', { month: 'long' })

  const ordinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  return `${ordinal(day)} ${month}`
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
              Quick posts, streams of consciousness, not main feed worthy
            </Description>
          </Column>
        </Header>
        <div className="col-content">
          <p className="text-ui-body">No notes yet.</p>
        </div>
      </>
    )
  }

  const groupedNotes = groupNotesByDate(notes)

  return (
    <>
      <Header>
        <Column>
          <Title>Notes</Title>
          <Description>
            Quick posts, streams of consciousness, not main feed worthy
          </Description>
        </Column>
      </Header>

      <div className="col-content space-y-12">
        {Object.keys(groupedNotes)
          .sort((a, b) => b - a)
          .map((year) => {
            const yearNotes = groupedNotes[year]

            return (
              <section key={year}>
                <h2 className="text-2xl font-variation-bold font-display lowercase text-heading mb-6">
                  {year} ({yearNotes.length})
                </h2>

                <div className="space-y-6">
                  {yearNotes.map((note) => (
                    <article key={note._id} className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <time className="font-medium">
                          {formatDate(note.date)}
                        </time>
                        <span className="text-body-60">•</span>
                        <h3 className="font-medium">{note.title}</h3>
                      </div>
                      <NoteContent note={note} />
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
      </div>
    </>
  )
}
