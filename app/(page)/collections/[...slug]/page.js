import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allCollections } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import Link from '@/components/link'
import collections from '@/content/collections'
import Icon from '@/components/icon'

import { format, subWeeks, isAfter, parseISO } from 'date-fns'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'
export const revalidate = 2592000

const getData = cache(async () => {
  const groupedCollections = allCollections.reduce((acc, item) => {
    item.collection.forEach((collection) => {
      if (!acc[collection]) {
        acc[collection] = []
      }
      acc[collection].push(item)
    })
    return acc
  }, {})

  // Read last import date
  let lastImportDate
  try {
    const importDatePath = path.join(process.cwd(), '.last-collection-import')
    const importDateContent = fs.readFileSync(importDatePath, 'utf-8').trim()
    lastImportDate = parseISO(importDateContent)
  } catch (error) {
    // Fall back to 12 weeks if file doesn't exist
    lastImportDate = subWeeks(new Date(), 12)
  }

  return {
    groupedCollections,
    lastImportDate,
  }
})

async function getPageFromParams(params) {
  const slug = params?.slug?.join('/')
  const page = collections.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata(props) {
  const params = await props.params
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    template: '%s • iamsteve',
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams() {
  return collections.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }))
}

async function Collections({ page }) {
  const { groupedCollections, lastImportDate } = await getData()
  const lowercasePage = page.join('/').toLowerCase()

  // Check if the current page exists in the groupedCollections object
  const collectionKey = Object.keys(groupedCollections).find(
    (key) => key.toLowerCase() === lowercasePage
  )

  if (!collectionKey) {
    return <div>No collections found for the current page.</div>
  }

  // Get the proper title from collections config
  const collectionConfig = collections.find(
    (c) => c.slugAsParams === lowercasePage
  )
  const displayTitle = collectionConfig ? collectionConfig.title : collectionKey

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex justify-between text-xl md:text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 pt-2">
        {displayTitle}

        <span className="text-cornflour-600">
          {groupedCollections[collectionKey].length}
        </span>
      </h2>
      <ul className="bg-white shadow-placed rounded-lg flex flex-col overflow-hidden">
        {groupedCollections[collectionKey].map((item) => {
          const [y, m, d] = item.date.split('-').map((n) => parseInt(n, 10))
          const itemDate = new Date(y, m, d)
          // Show "New" if item is after last import date OR within 3 months (whichever is more recent)
          const threeMonthsAgo = subWeeks(new Date(), 12)
          const cutoffDate = isAfter(lastImportDate, threeMonthsAgo) ? lastImportDate : threeMonthsAgo
          const isNew = isAfter(itemDate, cutoffDate)

          return (
            <li
              key={item.url}
              className="flex items-center border-b last:border-0 border-neutral-01-500/10 leading-loose relative lg:text-lg"
            >
              <a
                href={item.url}
                className="flex whitespace-nowrap flex-1 gap-2 group hover:bg-neutral-01-50 transition duration-200 linear items-baseline py-2.5 px-4 w-full [mask:linear-gradient(90deg,black_80%,transparent)]"
                rel="noopener noreferrer"
              >
                {item.title}
                <span className="text-fern-1100/40 group-hover:text-fern-1100/80 transition duration-200 linear line-clamp-1">
                  {item.url
                    .replace('https://', '')
                    .replace('www.', '')
                    .replace(/\/$/, '')}
                </span>
              </a>
              {isNew && (
                <span className="flex self-center px-2 pt-1.5 pb-1 text-sm font-sans font-medium lowercase bg-cornflour-100 leading-none text-cornflour-600 justify-center rounded-sm absolute top-1/2 right-3 -translate-y-1/2">
                  New
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default async function CollectionPage(props) {
  const params = await props.params
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Header className="max-sm:frame max-sm:frame-24 max-sm:px-8 max-sm:py-12 flex flex-col gap-2 col-start-content-start col-end-content-end md:col-end-7 md:sticky top-8 self-start">
        <Title className="font-variation-bold text-5xl">
          {/* <Link
              href="/collections"
              className="text-xl font-ui tracking-normal"
            >
              Collections
            </Link>
            <span>/</span> */}
          Collections
        </Title>
        <Description>
          Curated links to all things design. If you’re looking for inspiration
          start here.
        </Description>
        <ul className="grid grid-cols-2 gap-x-8 md:-mt-1 -mb-2 column-categories">
          {collections
            .sort((a, b) =>
              a.title < b.title ? -1 : a.title > b.title ? 1 : 0
            )
            .map((collection) => {
              return (
                <li key={collection.id} className="self-end">
                  <a
                    href={collection.slug}
                    className={`py-2 md:py-3 text-base md:text-lg lg:text-xl hover:text-dandelion-600 transition duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current`}
                  >
                    <Icon
                      icon={collection.icon}
                      size={24}
                      className="text-current shrink-0"
                    />
                    {collection.title}
                  </a>
                </li>
              )
            })}
        </ul>
      </Header>
      <section className="flex flex-col col-start-content-start md:col-start-8 col-end-content-end gap-y-10">
        <Collections page={params.slug} />
      </section>
    </>
  )
}
