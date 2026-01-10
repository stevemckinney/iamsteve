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
  // Group by category
  const groupedByCategory = allCollections.reduce((acc, item) => {
    item.collection.forEach((collection) => {
      const normalizedKey = collection.toLowerCase().replace(/\s+/g, '-')

      if (!acc[normalizedKey]) {
        acc[normalizedKey] = []
      }
      acc[normalizedKey].push(item)
    })

    return acc
  }, {})

  return { groupedByCategory }
})

export default async function CollectionsPage() {
  const { groupedByCategory } = await getData()

  return (
    <div className="flex h-screen flex-col col-start-container-start col-end-container-end">
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
            .map((category) => {
              const count =
                groupedByCategory[category.slugAsParams]?.length || 0

              return (
                <ColumnItem
                  key={category.id}
                  icon={
                    <Icon
                      icon={category.icon}
                      size={16}
                      className="text-current"
                    />
                  }
                  label={category.title}
                  count={count}
                  hasChildren
                  href={`/collections/${category.slugAsParams}`}
                />
              )
            })}
        </Column>
      </ColumnBrowser>
    </div>
  )
}
