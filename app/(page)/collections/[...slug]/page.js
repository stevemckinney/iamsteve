import { cache } from 'react'
import { notFound } from 'next/navigation'
import Image from '@/components/image'
import Card from '@/components/card'
import { allCollections } from 'contentlayer/generated'

const getData = cache(async () => {
  const groupedCollections = allCollections.reduce((acc, item) => {
    item.collections.forEach((collection) => {
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
  const { groupedCollections } = await getData()

  console.log(groupedCollections)
  const slug = params?.slug?.join('/')
  const page = groupedCollections.find(
    (collection) => page.slugAsParams === slug
  )

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
    slot: page.slot,
  }
}

export async function generateStaticParams() {
  return allCollections.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }))
}

async function renderCollections() {
  const { groupedCollections } = await getData()

  return (
    <>
      {Object.entries(groupedCollections).map(([collection, items]) => (
        <div className="flex flex-col gap-2" key={collection}>
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

export default function CollectionsCollectionPage() {
  return renderCollections()
}
