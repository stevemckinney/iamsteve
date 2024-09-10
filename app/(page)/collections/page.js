// Main collections page
// at /collections
import { cache } from 'react'
import { Header, Title, Description } from '@/components/page'
import Icon from '@/components/icon'
import Link from '@/components/link'
import { allCollections } from 'contentlayer/generated'
import { collections, kinds } from '@/content/collections'
import CollectionsList from '@/components/collections-list'
import KindFilter from '@/components/kind-filter'

export const metadata = {
  title: 'Collections • iamsteve',
  description: 'Curated links to all things design and development.',
}

const getData = cache(async () => {
  const groupedCollections = allCollections.reduce((acc, item) => {
    item.collection.forEach((collection) => {
      if (!acc[collection]) {
        acc[collection] = {}
      }
      const kind = item.kind || 'website'
      if (!acc[collection][kind]) {
        acc[collection][kind] = []
      }
      acc[collection][kind].push(item)
    })
    return acc
  }, {})

  return { groupedCollections }
})

export default async function CollectionsPage() {
  const { groupedCollections } = await getData()

  return (
    <>
      <Header className="max-sm:frame max-sm:frame-24 max-sm:px-8 max-sm:py-12 flex flex-col gap-2 col-start-content-start col-end-content-end md:col-end-7 sticky top-8 self-start">
        <Title className="font-variation-bold text-5xl">Collections</Title>
        <Description>
          Curated links to all things design. If you're looking for inspiration
          start here.
        </Description>
        <ul className="grid grid-cols-2 gap-x-8 md:-mt-1 -mb-2 column-categories">
          {collections
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((collection) => (
              <li key={collection.id} className="self-end">
                <Link
                  href={collection.slug}
                  className="py-2 md:py-3 text-base md:text-lg lg:text-xl hover:text-dandelion-600 transition duration-200 ease-linear font-ui lowercase leading-none rounded flex gap-2 items-center text-current"
                >
                  <Icon
                    icon={collection.icon}
                    size={24}
                    className="text-current shrink-0"
                  />
                  {collection.title}
                </Link>
              </li>
            ))}
        </ul>
        <KindFilter kinds={kinds} pageSlug="/collections" />
      </Header>
      <section className="flex flex-col col-start-content-start md:col-start-8 col-end-content-end gap-y-10">
        <CollectionsList groupedCollections={groupedCollections} />
      </section>
    </>
  )
}
