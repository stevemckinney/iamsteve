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

function getItemFromParams(params) {
  return (
    allCollections.find(
      (item) => item._raw.sourceFileName.replace('.md', '') === params.slug
    ) || null
  )
}

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
  const item = getItemFromParams(params)
  const kind = getKindFromParams(params)
  const category = getCategoryFromParams(params)

  if (!item || !kind || !category) {
    return {}
  }

  return {
    title: `${item.title} • ${category.title} • Collections • iamsteve`,
    description: `${item.title} from ${category.title} collection`,
  }
}

export async function generateStaticParams() {
  const params = []

  kinds.forEach((kind) => {
    collections.forEach((category) => {
      const categoryItems = allCollections.filter((item) => {
        const itemKind = item.kind || 'website'
        return (
          itemKind === kind.id &&
          item.collection
            .map((c) => c.toLowerCase().replace(/\s+/g, '-'))
            .includes(category.slugAsParams)
        )
      })

      categoryItems.forEach((item) => {
        params.push({
          kind: kind.id,
          category: category.slugAsParams,
          slug: item._raw.sourceFileName.replace('.md', ''),
        })
      })
    })
  })

  return params
}

export default async function LinkPreviewPage(props) {
  const params = await props.params
  const kind = getKindFromParams(params)
  const category = getCategoryFromParams(params)
  const item = getItemFromParams(params)

  if (!kind || !category || !item) {
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
        <a
          href={`/collections/${kind.id}/${category.slugAsParams}`}
          className="hover:text-fern-1100 transition lowercase"
        >
          {category.title}
        </a>
        <span>/</span>
        <span className="text-fern-1100">{item.title}</span>
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
          {items.map((linkItem) => {
            const [y, m, d] = linkItem.date
              .split('-')
              .map((n) => parseInt(n, 10))
            const itemDate = new Date(y, m - 1, d)
            const threeMonthsAgo = subWeeks(new Date(), 12)
            const cutoffDate = isAfter(lastImportDate, threeMonthsAgo)
              ? lastImportDate
              : threeMonthsAgo
            const isNew = isAfter(itemDate, cutoffDate)

            const itemSlug = linkItem._raw.sourceFileName.replace('.md', '')
            const isSelected = itemSlug === params.slug

            return (
              <ColumnItem
                key={linkItem.url}
                label={linkItem.title}
                href={`/collections/${kind.id}/${category.slugAsParams}/${itemSlug}`}
                showExternal
                externalUrl={linkItem.url}
                faviconUrl={linkItem.url}
                isSelected={isSelected}
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

        {/* Preview Column */}
        <div className="flex h-full w-80 min-w-80 flex-col border-r border-neutral-01-500/10 bg-neutral-01-50">
          <div className="border-b border-neutral-01-500/10 px-4 py-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-fern-1100/60 lowercase">
              Preview
            </h2>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-medium text-fern-1100">{item.title}</h3>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-1 text-sm text-cornflour-600 transition-colors hover:text-cornflour-700"
            >
              {item.url
                .replace(/^https?:\/\//, '')
                .replace('www.', '')
                .replace(/\/$/, '')}
              <svg
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
            {item.date && (
              <p className="mt-4 text-sm text-fern-1100/60">
                Added {format(new Date(item.date), 'd MMMM yyyy')}
              </p>
            )}
            <div className="mt-auto pt-6">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium bg-dandelion-500 text-white transition-colors hover:bg-dandelion-600"
              >
                Open link
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </ColumnBrowser>
    </div>
  )
}
