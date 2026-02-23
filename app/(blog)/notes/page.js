/**
 * Notes page
 * See (blog)/layout.js for controlling page frame
 */

import { cache } from 'react'
import { allNotes } from 'contentlayer/generated'

import { sortPosts } from '@/lib/utils/content'
import { format, parseISO } from 'date-fns'

import { Header, Title, Column, Description } from '@/components/page'
import { PencilMono } from '@/components/illustration'
import Badge from '@/components/badge'
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

// Basic MDX components for note content
const mdxComponents = {
  h2: (props) => (
    <h2
      className="text-lg lg:text-2xl font-variation-bold font-display lowercase text-heading mt-6 mb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-5 mb-2"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-4 mb-2"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-02 rounded-sm p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  p: (props) => <p className="not-first:indent-8 [&>a]:indent-0" {...props} />,
  code: (props) => (
    <code
      className="font-mono bg-fern-500/12 dark:bg-dandelion-400/12 text-fern-800 dark:text-dandelion-400 rounded-sm px-1"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-link underline [text-underline-offset:15%] [text-decoration-thickness:1px] hover:text-link-hover hover:no-underline has-[svg]:inline-flex has-[svg]:gap-0 has-[svg]:items-center has-[svg]:align-middle transition duration-200 ease-out"
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

      {notes.map((note) => (
        <article
          key={note._id}
          className="col-content grid grid-cols-subgrid relative pt-8 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[url(/images/dash.svg)] dark:before:bg-[url(/images/dash-dark.svg)]"
        >
          <div className="flex flex-col gap-4 mb-2 col-span-full lg:col-span-4">
            <div className="flex flex-row gap-4 lg:order-2">
              <Badge size={16} theme="cornflour" iconStart="calendar">
                <time dateTime={note.date}>
                  {format(parseISO(note.date), 'do LLL yyyy')}
                </time>
              </Badge>
              <Badge size={16} theme="lavender" iconStart="views">
                {note.body.raw.split(/\s+/).length} words
              </Badge>
            </div>
            <h2 className="font-display font-variation-bold lowercase text-3xl">
              <Link href={note.slug} className="hover:text-link">
                {note.title}
              </Link>
            </h2>
          </div>
          <div className="col-span-full lg:col-span-6 lg:text-xl">
            <NoteContent note={note} />
          </div>
        </article>
      ))}
    </>
  )
}
