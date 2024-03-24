import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import Chip from '@/components/chip'
import Card from '@/components/card'

import { format, subWeeks, isAfter } from 'date-fns'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'

export const metadata = {
  title: 'Collections • iamsteve',
  description:
    'Curated links to all things design. If you’re looking for inspiration start here.',
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
      {Object.entries(groupedCollections).map(([collection, items]) => (
        <div
          className="flex flex-col bg-neutral-01-500/5 px-2 pb-2 rounded-lg"
          key={collection}
        >
          <h2 className="lg:text-xl leading-xl font-ui lowercase py-2 px-4 flex justify-between">
            {collection}

            <span>{items.length}</span>
          </h2>
          <ul className="bg-white rounded-md shadow-subtle overflow-hidden">
            {items.map((item) => {
              const [y, m, d] = item.date.split('-').map((n) => parseInt(n, 10))
              const itemDate = new Date(y, m, d)
              const isNew = isAfter(itemDate, subWeeks(new Date(), 5))

              return (
                <li
                  key={item.url}
                  className="flex items-center border-b last:border-0 border-neutral-01-500/10 leading-loose relative lg:text-lg"
                >
                  <a
                    href={item.url}
                    className="flex whitespace-nowrap flex-1 gap-2 group hover:bg-neutral-01-50 transition duration-200 linear items-center leading-[1.3333333] py-2.5 px-4"
                    rel="noopener noreferrer"
                  >
                    {item.title}
                    <span className="text-fern-1100/40 group-hover:text-fern-1100/80 transition duration-200 linear line-clamp-1 leading-loose">
                      {item.url
                        .replace('https://', '')
                        .replace('www.', '')
                        .replace(/\/$/, '')}
                    </span>
                  </a>
                  {isNew && (
                    <span className="flex self-center px-2 py-1 font-ui lowercase bg-fern-200/50 leading-none text-fern-800 justify-center rounded-sm absolute top-1/2 right-3 -translate-y-1/2">
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

export default async function CollectionsPage({ params }) {
  return (
    <>
      <Header className="sm:row-start-1 flex flex-col gap-4 md:gap-8 col-start-content-start col-end-content-end sm:col-end-7">
        <Column className="gap-2">
          <Title className="font-variation-bold text-5xl">Collections</Title>
          <Description>
            Curated links to all things design. If you’re looking for
            inspiration start here.
          </Description>
          <ul className="list-categories">
            {collections.map((collection) => (
              <li key={collection.id} className="self-end">
                <a
                  href={collection.slug}
                  className="py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
                >
                  {collection.title}
                </a>
              </li>
            ))}
          </ul>
        </Column>
      </Header>
      <section className="flex flex-col col-start-content-start sm:col-start-8 col-end-content-end sm:row-start-1 lg:pb-18 gap-y-10 lg:gap-y-18">
        <Collections />
      </section>
    </>
  )
}
