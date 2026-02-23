/**
 * Single note page
 * See (blog)/layout.js for controlling page frame
 */

import { notFound } from 'next/navigation'
import { PencilMono } from '@/components/illustration'
import { allNotes } from 'contentlayer/generated'
import { PostMdx } from '@/components/mdx-components'
import siteMetadata from '@/content/metadata'

import Badge from '@/components/badge'
import PageTitle from '@/components/page-title'
import { format, parseISO } from 'date-fns'
import Icon from '@/components/icon'
import Link from '@/components/link'

export const revalidate = 86400

export async function generateStaticParams() {
  return allNotes
    .filter((note) => note.status === 'published')
    .map((note) => ({
      slug: note.slugAsParams.split('/'),
    }))
}

async function getNoteFromParams(params) {
  const slug = params?.slug?.join('/')
  const note = allNotes.find((note) => {
    const slugMatch = note.slugAsParams === slug
    const statusMatch = note.status === 'published'
    return slugMatch && statusMatch
  })

  return note
}

export async function generateMetadata(props) {
  const params = await props.params
  const note = await getNoteFromParams(params)

  if (!note) {
    return {}
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: note.slug,
    },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: 'article',
      publishedTime: note.date,
      authors: [siteMetadata.author],
      url: `${note.slug}`,
    },
    twitter: {
      card: 'summary',
      title: note.title,
      description: note.summary,
    },
  }
}

export default async function NotePage(props) {
  const params = await props.params
  const note = await getNoteFromParams(params)

  if (!note) {
    notFound()
  }

  const date = parseISO(note.date)

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteMetadata.siteUrl}${note.slug}#article`,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    headline: note.title,
    datePublished: note.date,
    description: note.summary,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}${note.slug}`,
    },
  }

  return (
    <>
      <PencilMono
        width={962}
        height={46}
        className="col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <article className="col-content flex flex-col gap-6 max-w-prose mx-auto">
        <header className="flex flex-col gap-4">
          <Link
            href="/notes"
            className="flex items-center content-center gap-2 text-ui-body hover:text-link font-medium text-base leading-normal"
          >
            <Icon icon="arrow-left" size={24} className="relative -top-px" />
            <span>Notes</span>
          </Link>
          <PageTitle>{note.title}</PageTitle>
          {note.summary && (
            <p className="text-lg text-pretty text-emphasis">{note.summary}</p>
          )}
        </header>
        <div className="prose">
          <PostMdx code={note.body.code} />
        </div>
        <footer className="flex items-center gap-4 pt-6 border-t border-neutral-01-400/20">
          <Badge size={16} theme="cornflour" iconStart="calendar">
            <time dateTime={note.date}>{format(date, 'do LLL yyyy')}</time>
          </Badge>
        </footer>
      </article>
    </>
  )
}
