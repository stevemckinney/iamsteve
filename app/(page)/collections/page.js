import { cache } from 'react'
import Icon from '@/components/icon'
import { ColumnBrowser } from '@/components/column-browser'
import { Column } from '@/components/collections/column'
import { ColumnItem } from '@/components/collections/column-item'

import { allCollections } from 'contentlayer/generated'

export const revalidate = false

export const metadata = {
  title: 'Collections • iamsteve',
  description:
    "Curated links to all things design and development. There's links to specific articles and websites with further curation.",
}

// Kind types in display order
const kinds = [
  { id: 'website', title: 'Website', icon: 'globe' },
  { id: 'article', title: 'Article', icon: 'publication' },
  { id: 'tool', title: 'Tool', icon: 'code' },
  { id: 'resource', title: 'Resource', icon: 'bookmark' },
]

const getData = cache(async () => {
  // Group by kind → category
  const groupedByKind = allCollections.reduce((acc, item) => {
    // Get kind from item (defaults to 'website' via contentlayer schema)
    const kind = item.kind || 'website'

    if (!acc[kind]) {
      acc[kind] = {}
    }

    // Then group by category within kind
    item.collection.forEach((collection) => {
      const normalizedKey = collection.toLowerCase().replace(/\s+/g, '-')

      if (!acc[kind][normalizedKey]) {
        acc[kind][normalizedKey] = []
      }
      acc[kind][normalizedKey].push(item)
    })

    return acc
  }, {})

  return { groupedByKind }
})

export default async function CollectionsPage() {
  const { groupedByKind } = await getData()

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
        {/* Kind Column */}
        <Column title="Kind">
          {kinds.map((kind) => {
            // Count total items for this kind across all categories
            const categories = groupedByKind[kind.id] || {}
            const count = Object.values(categories).reduce(
              (sum, items) => sum + items.length,
              0
            )

            return (
              <ColumnItem
                key={kind.id}
                icon={
                  <Icon icon={kind.icon} size={16} className="text-current" />
                }
                label={kind.title}
                count={count}
                hasChildren
                href={`/collections/${kind.id}`}
              />
            )
          })}
        </Column>
      </ColumnBrowser>
    </div>
  )
}
