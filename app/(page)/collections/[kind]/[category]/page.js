import { cache } from 'react'
import { notFound } from 'next/navigation'
import { format, subWeeks, isAfter, parseISO } from 'date-fns'
import fs from 'fs'
import path from 'path'

import { allCollections } from 'contentlayer/generated'
import collections from '@/content/collections'
import Icon from '@/components/icon'
import { ColumnBrowser } from '@/components/column-browser'
import { Column } from '@/components/collections/column'
import { ColumnItem } from '@/components/collections/column-item'

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
    groupedByKind,
    lastImportDate,
  }
})

function getKindFromParams(params) {
  const kindId = params?.kind
  return kinds.find((k) => k.id === kindId) || null
}

function getCategoryFromParams(params) {
  const category = params?.category
  return collections.find((c) => c.slugAsParams === category) || null
}

export async function generateMetadata(props) {
  const params = await props.params
  const kind = getKindFromParams(params)
  const category = getCategoryFromParams(params)

  if (!kind || !category) {
    return {}
  }

  return {
    title: `${category.title} ${kind.title} • Collections • iamsteve`,
    description: `Browse ${kind.title.toLowerCase()} in ${category.title}`,
  }
}

export async function generateStaticParams() {
  const params = []

  kinds.forEach((kind) => {
    collections.forEach((category) => {
      params.push({
        kind: kind.id,
        category: category.slugAsParams,
      })
    })
  })

  return params
}

export default async function CategoryPage(props) {
  const params = await props.params
  const kind = getKindFromParams(params)
  const category = getCategoryFromParams(params)

  if (!kind || !category) {
    notFound()
  }

  const { groupedByKind, lastImportDate } = await getData()
  const items = groupedByKind[kind.id]?.[category.slugAsParams] || []

  return (
    <div className="flex h-screen flex-col col-start-container-start col-end-container-end">
      {/* Header with breadcrumb */}
      <header className="flex items-center border-b border-neutral-01-500/10 px-6 py-4 gap-2 text-sm text-fern-1100/60">
        <a href="/collections" className="hover:text-fern-1100 transition">
          Collections
        </a>
        <span>/</span>
        <a
          href={`/collections/${kind.id}`}
          className="hover:text-fern-1100 transition lowercase"
        >
          {kind.title}
        </a>
        <span>/</span>
        <span className="text-fern-1100 lowercase">{category.title}</span>
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
            .map((c) => {
              const count =
                groupedByKind[kind.id]?.[c.slugAsParams]?.length || 0
              const isSelected = c.slugAsParams === category.slugAsParams

              return (
                <ColumnItem
                  key={c.id}
                  icon={
                    <Icon icon={c.icon} size={16} className="text-current" />
                  }
                  label={c.title}
                  count={count}
                  hasChildren
                  isSelected={isSelected}
                  href={`/collections/${kind.id}/${c.slugAsParams}`}
                />
              )
            })}
        </Column>

        {/* Links Column */}
        <Column title={category.title} count={items.length}>
          {items.map((item) => {
            const [y, m, d] = item.date.split('-').map((n) => parseInt(n, 10))
            const itemDate = new Date(y, m - 1, d)
            const threeMonthsAgo = subWeeks(new Date(), 12)
            const cutoffDate = isAfter(lastImportDate, threeMonthsAgo)
              ? lastImportDate
              : threeMonthsAgo
            const isNew = isAfter(itemDate, cutoffDate)

            const itemSlug = item._raw.sourceFileName.replace('.md', '')

            return (
              <ColumnItem
                key={item.url}
                label={item.title}
                href={`/collections/${kind.id}/${category.slugAsParams}/${itemSlug}`}
                showExternal
                externalUrl={item.url}
                faviconUrl={item.url}
                badge={
                  isNew ? (
                    <span className="px-2 pt-1.5 pb-1 text-xs font-sans font-medium lowercase bg-cornflour-100 leading-none text-cornflour-600 rounded-sm">
                      New
                    </span>
                  ) : null
                }
              />
            )
          })}
        </Column>
      </ColumnBrowser>
    </div>
  )
}
