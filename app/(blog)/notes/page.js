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

// Format date as "21st January, 2025"
function formatDate(date) {
  const d = new Date(date)
  const day = d.getDate()
  const month = d.toLocaleString('en-GB', { month: 'long' })
  const year = d.getFullYear()

  const ordinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  return `${ordinal(day)} ${month}, ${year}`
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
  p: (props) => <p className="not-first:not-a:indent-8" {...props} />,
  code: (props) => (
    <code
      className="font-mono bg-fern-500/12 text-fern-800 rounded-sm px-1"
      {...props}
    />
  ),
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

      {notes.map((note) => (
        <article
          key={note._id}
          className="col-content grid grid-cols-subgrid relative pt-8 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[url(/images/dash.svg)] dark:before:bg-[url(/images/dash-dark.svg)]"
        >
          <div className="flex flex-col mb-2 col-span-4">
            <time dateTime={note.date} className="text-xl text-ui-body">
              {formatDate(note.date)}
            </time>
            <h2 className="font-medium text-xl">
              <Link href={note.slug} className="hover:text-link">
                {note.title}
              </Link>
            </h2>
          </div>
          <div class="col-span-6 text-xl">
            <NoteContent note={note} />
          </div>
        </article>
      ))}
    </>
  )
}
