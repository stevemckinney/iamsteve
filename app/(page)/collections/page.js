import { cache } from 'react'
import Icon from '@/components/icon'
import { ColumnBrowser } from '@/components/column-browser'
import { Column } from '@/components/collections/column'
import { ColumnItem } from '@/components/collections/column-item'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'

export const revalidate = false

export const metadata = {
  title: 'Collections • iamsteve',
  description:
    "Curated links to all things design and development. There's links to specific articles and websites with further curation.",
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

  return { groupedCollections }
})

export default async function CollectionsPage() {
  const { groupedCollections } = await getData()

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-01-500/10 px-6 py-4">
        <h1 className="text-lg font-medium text-fern-1100 lowercase">
          Collections
        </h1>
      </header>

      {/* Column Browser */}
      <ColumnBrowser>
        {/* Categories Column */}
        <Column title="Categories">
          {collections
            .sort((a, b) =>
              a.title < b.title ? -1 : a.title > b.title ? 1 : 0
            )
            .map((collection) => {
              const count =
                groupedCollections[collection.slugAsParams]?.length || 0
              return (
                <ColumnItem
                  key={collection.id}
                  icon={
                    <Icon
                      icon={collection.icon}
                      size={16}
                      className="text-current"
                    />
                  }
                  label={collection.title}
                  count={count}
                  hasChildren
                  href={collection.slug}
                />
              )
            })}
        </Column>
      </ColumnBrowser>
    </div>
  )
}
