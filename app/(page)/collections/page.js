import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import Chip from '@/components/chip'
import Card from '@/components/card'
import Icon from '@/components/icon'

import { format, subWeeks, isAfter, parseISO } from 'date-fns'
import fs from 'fs'
import path from 'path'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'

export const revalidate = false

export const metadata = {
  title: 'Collections • iamsteve',
  description:
    'Curated design resources organised by topic, from typography and color to tools and techniques.',
}

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

async function Collections() {
  const { groupedCollections, lastImportDate } = await getData()

  return (
    <>
      {Object.entries(groupedCollections)
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([collection, items]) => (
          <div className="flex flex-col gap-4" key={collection}>
            <h2 className="flex justify-between text-xl md:text-3xl font-display font-variation-bold leading-none lowercase text-heading m-0 pt-2">
              {collection}

              <span className="text-cornflour-600">{items.length}</span>
            </h2>
            <ul className="bg-surface shadow-placed rounded-md flex flex-col overflow-hidden">
              {items.map((item) => {
                const [y, m, d] = item.date
                  .split('-')
                  .map((n) => parseInt(n, 10))
                const itemDate = new Date(y, m - 1, d)
                // Show "New" if item is after last import date OR within 3 months (whichever is more recent)
                const threeMonthsAgo = subWeeks(new Date(), 12)
                const cutoffDate = isAfter(lastImportDate, threeMonthsAgo)
                  ? lastImportDate
                  : threeMonthsAgo
                const isNew = isAfter(itemDate, cutoffDate)

                return (
                  <li
                    key={item.url}
                    className="flex items-center border-b last:border-0 border-neutral-01-500/10 leading-loose relative lg:text-lg"
                  >
                    <a
                      href={item.url}
                      className="flex whitespace-nowrap flex-1 gap-2 group hover:bg-neutral-01-50 dark:hover:bg-surface-02/20 transition duration-200 linear items-baseline py-2.5 px-4 w-full [mask:linear-gradient(90deg,black_80%,transparent)]"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                      <span className="text-emphasis/40 group-hover:text-emphasis/80 transition duration-200 linear line-clamp-1">
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
        ))}
    </>
  )
}

export default async function CollectionsPage(props) {
  const params = await props.params
  return (
    <>
      <Header className="max-md:frame max-md:frame-24 max-md:px-8 max-md:py-12 flex flex-col gap-2 col-container md:col-content md:col-end-7 md:sticky top-8 self-start">
        <Title className="font-variation-bold text-5xl">Collections</Title>
        <Description>
          Curated design resources organised by topic, from typography and color
          to tools and techniques.
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
                    className={`py-2 md:py-3 text-base md:text-lg lg:text-xl text-current hover:text-link-hover transition duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center`}
                  >
                    <Icon icon={collection.icon} size={24} variant="header" />
                    {collection.title}
                  </a>
                </li>
              )
            })}
        </ul>
      </Header>
      <section className="flex flex-col col-start-content-start md:col-start-8 col-end-content-end gap-y-10">
        <Collections />
      </section>
    </>
  )
}
