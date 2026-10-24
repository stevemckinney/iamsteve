// The bookmarks on the collections pages, grouped the way both Next.js
// pages grouped them, and the dates the “New” badge reads
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { subWeeks, isAfter, parseISO } from 'date-fns'
import { allEntries } from './content.js'

// Each topic a bookmark is filed under, keyed as written, so `motion` and
// `Motion` are separate groups. Keys and items keep file order
export async function groupBookmarks() {
  const entries = await allEntries('collections')
  return entries.reduce((acc, { data: item }) => {
    item.collection.forEach((collection) => {
      if (!acc[collection]) {
        acc[collection] = []
      }
      acc[collection].push(item)
    })
    return acc
  }, {})
}

// The day of the last import, or 12 weeks ago without the file
export async function lastImport() {
  try {
    const file = path.join(process.cwd(), '.last-collection-import')
    return parseISO((await readFile(file, 'utf-8')).trim())
  } catch {
    return subWeeks(new Date(), 12)
  }
}

// New when added after the last import or in the last 12 weeks, whichever
// is later. The time is ignored, so the import day itself isn’t new. This
// reads the clock, so a build shows what was new on the day it ran
export function isNew(date, lastImportDate) {
  const [y, m, d] = date.split('-').map((n) => parseInt(n, 10))
  const itemDate = new Date(y, m - 1, d)
  const threeMonthsAgo = subWeeks(new Date(), 12)
  const cutoffDate = isAfter(lastImportDate, threeMonthsAgo)
    ? lastImportDate
    : threeMonthsAgo
  return isAfter(itemDate, cutoffDate)
}

// The address as the list shows it
export const displayUrl = (url) =>
  url.replace('https://', '').replace('www.', '').replace(/\/$/, '')
