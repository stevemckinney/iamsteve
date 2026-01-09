import { cache } from 'react'
import { notFound } from 'next/navigation'
import Icon from '@/components/icon'
import { ColumnBrowser } from '@/components/column-browser'
import { Column } from '@/components/collections/column'
import { ColumnItem } from '@/components/collections/column-item'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'

export const dynamic = 'force-static'
export const revalidate = 2592000

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
    const kind = item.kind || 'website'

    if (!acc[kind]) {
      acc[kind] = {}
    }

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

function getKindFromParams(params) {
  const kindId = params?.kind
  const kind = kinds.find((k) => k.id === kindId)

  if (!kind) {
    return null
  }

  return kind
}

export async function generateMetadata(props) {
  const params = await props.params
  const kind = getKindFromParams(params)

  if (!kind) {
    return {}
  }

  return {
    title: `${kind.title} • Collections • iamsteve`,
    description: `Browse ${kind.title.toLowerCase()} collections`,
  }
}

export async function generateStaticParams() {
  return kinds.map((kind) => ({
    kind: kind.id,
  }))
}

export default async function KindPage(props) {
  const params = await props.params
  const kind = getKindFromParams(params)

  if (!kind) {
    notFound()
  }

  const { groupedByKind } = await getData()
  const categories = groupedByKind[kind.id] || {}

  return (
    <div className="flex h-screen flex-col col-start-container-start col-end-container-end">
      {/* Header with breadcrumb */}
      <header className="flex items-center border-b border-neutral-01-500/10 px-6 py-4 gap-2 text-sm text-fern-1100/60">
        <a href="/collections" className="hover:text-fern-1100 transition">
          Collections
        </a>
        <span>/</span>
        <span className="text-fern-1100 lowercase">{kind.title}</span>
      </header>

      {/* Column Browser */}
      <ColumnBrowser>
        {/* Kind Column */}
        <Column title="Kind">
          {kinds.map((k) => {
            const kindCategories = groupedByKind[k.id] || {}
            const count = Object.values(kindCategories).reduce(
              (sum, items) => sum + items.length,
              0
            )
            const isSelected = k.id === kind.id

            return (
              <ColumnItem
                key={k.id}
                icon={<Icon icon={k.icon} size={16} className="text-current" />}
                label={k.title}
                count={count}
                hasChildren
                isSelected={isSelected}
                href={`/collections/${k.id}`}
              />
            )
          })}
        </Column>

        {/* Categories Column */}
        <Column title="Categories">
          {collections
            .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))
            .map((collection) => {
              const count = categories[collection.slugAsParams]?.length || 0

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
                  href={`/collections/${kind.id}/${collection.slugAsParams}`}
                />
              )
            })}
        </Column>
      </ColumnBrowser>
    </div>
  )
}
