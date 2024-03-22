import { cache } from 'react'
import { notFound } from 'next/navigation'
import { allCollections } from 'contentlayer/generated'

import { Mdx } from '@/components/mdx-components'
import { Header, Title, Column, Description } from '@/components/page'
import Image from '@/components/image'
import collections from '@/content/collections'

export const dynamic = 'force-static'
export const revalidate = 86400

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

async function getPageFromParams(params) {
  const slug = params?.slug?.join('/')
  const page = collections.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({ params }) {
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

async function renderCollection(params) {
  const { groupedCollections } = await getData()
  const slug = params?.slug?.join('/')

  console.log(groupedCollections.hasOwnProperty(slug))
  return (
    <>
      {Object.entries(groupedCollections).map(([collection, items]) => (
        <div className="w-full flex flex-col gap-2" key={collection}>
          <h2 className="text-xl">{collection}</h2>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.url} className="flex flex-1 justify-between">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default async function CollectionPage({ params }) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Image
        src="/images/illustration/pencil-mono.svg"
        width={962}
        height={46}
        className={`col-start-1 col-end-3 row-start-1 max-w-[initial] justify-self-end self-start mt-3 drop-shadow-placed max-2xl:hidden`}
        alt=" "
        aria-hidden="true"
      />
      <article className="grid grid-cols-subgrid col-container row-start-1 pb-18 gap-y-10 lg:gap-y-18">
        <Header>
          <Column className="md:col-span-1">
            <Title>{page.title}</Title>
            {page.description && <Description>{page.description}</Description>}
          </Column>
        </Header>
        {renderCollection(params)}
      </article>
    </>
  )
}
