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
    groupedCollections,
    lastImportDate,
  }
})

function getCategoryFromParams(params) {
  const category = params?.category
  const page = collections.find((page) => page.slugAsParams === category)

  if (!page) {
    return null
  }

  return page
}

export async function generateMetadata(props) {
  const params = await props.params
  const page = getCategoryFromParams(params)

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
    category: page.slugAsParams,
  }))
}

export default async function CategoryPage(props) {
  const params = await props.params
  const page = getCategoryFromParams(params)

  if (!page) {
    notFound()
  }

  const { groupedCollections, lastImportDate } = await getData()
  const categoryKey = page.slugAsParams
  const items = groupedCollections[categoryKey] || []

  return (
    <div className="flex h-screen flex-col col-start-container-start col-end-container-end -mx-8 sm:-mx-12 2xl:-mx-20">
      {/* Header with breadcrumb */}
      <header className="flex items-center border-b border-neutral-01-500/10 px-6 py-4 gap-2 text-sm text-fern-1100/60">
        <a href="/collections" className="hover:text-fern-1100 transition">
          Collections
        </a>
        <span>/</span>
        <span className="text-fern-1100 lowercase">{page.title}</span>
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
              const isSelected = collection.slugAsParams === categoryKey
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
                  isSelected={isSelected}
                  href={collection.slug}
                />
              )
            })}
        </Column>

        {/* Links Column */}
        <Column title={page.title} count={items.length}>
          {items.map((item) => {
            const [y, m, d] = item.date.split('-').map((n) => parseInt(n, 10))
            const itemDate = new Date(y, m - 1, d)
            const threeMonthsAgo = subWeeks(new Date(), 12)
            const cutoffDate = isAfter(lastImportDate, threeMonthsAgo)
              ? lastImportDate
              : threeMonthsAgo
            const isNew = isAfter(itemDate, cutoffDate)

            // Create URL-safe slug from title
            const itemSlug = item._raw.sourceFileName.replace('.md', '')

            return (
              <ColumnItem
                key={item.url}
                label={item.title}
                href={`/collections/${categoryKey}/${itemSlug}`}
                showExternal
                externalUrl={item.url}
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
