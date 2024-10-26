import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import Chip from '@/components/chip'
import Card from '@/components/card'
import Icon from '@/components/icon'

import { format, subWeeks, isAfter } from 'date-fns'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'

export const revalidate = false

export const metadata = {
  title: 'Collections • iamsteve',
  description:
    'Curated links to all things design and development. There’s links to specific articles and websites with further curation.',
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

  return {
    groupedCollections,
  }
})

async function Collections() {
  const { groupedCollections } = await getData()

  return (
    <>
      {Object.entries(groupedCollections)
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([collection, items]) => (
          <div className="flex flex-col gap-4" key={collection}>
            <h2 className="flex justify-between text-xl md:text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 pt-2">
              {collection}

              <span className="text-cornflour-600">{items.length}</span>
            </h2>
            <ul className="bg-white shadow-placed rounded-md flex flex-col overflow-hidden">
              {items.map((item) => {
                const [y, m, d] = item.date
                  .split('-')
                  .map((n) => parseInt(n, 10))
                const itemDate = new Date(y, m, d)
                const isNew = isAfter(itemDate, subWeeks(new Date(), 5))

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
                    {/*isNew && (
                    <span className="flex self-center px-2 py-1 font-ui lowercase bg-fern-200/50 leading-none text-fern-800 justify-center rounded-sm absolute top-1/2 right-3 -translate-y-1/2">
                      New
                    </span>
                  )*/}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
    </>
  )
}

export default async function CollectionsPage({ params }) {
  return (
    <>
      <Header className="max-sm:frame max-sm:frame-24 max-sm:px-8 max-sm:py-12 flex flex-col gap-2 col-start-content-start col-end-content-end md:col-end-7 md:sticky top-8 self-start">
        <Title className="font-variation-bold text-5xl">Collections</Title>
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
        <Collections />
      </section>
    </>
  )
}
