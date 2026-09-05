/**
 * Search accuracy check.
 *
 * Navigational queries only — ones where the right answer is a fact, not a
 * matter of taste. Add topical queries as you decide what should win them;
 * that decision is the point of this file.
 *
 *   node lib/search.eval.js
 */
import { search, groupResults } from './search.js'

export const queries = [
  ['collections', '/collections'],
  ['notes', '/notes'],
  ['blog', '/blog'],
  ['newsletter', '/newsletter'],
  ['uses', '/uses'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['ux design', '/collections/ux-design'],
  ['motion', '/collections/motion'],
  ['foundry', '/collections/foundry'],
  ['inspiration', '/collections/inspiration'],
  ['favourites', '/collections/favourites'],
  ['lawsofux', 'https://lawsofux.com/'],
  ['laws of ux', 'https://lawsofux.com/'],
  ['quick tip', '/category/quick-tip'],
  ['visual design', '/category/visual-design'],
  // typos should still find their target
  ['typograpy', '/collections/typography'],
  ['collectons', '/collections'],
]

export function evaluate(index) {
  const rows = queries.map(([query, want]) => {
    const results = search(index, query)
    const heads = groupResults(results).map((group) => group.items[0].slug)
    return {
      query,
      want,
      got: results[0]?.slug ?? null,
      rank1: results[0]?.slug === want,
      grouped: heads.includes(want),
      top5: results.slice(0, 5).some((result) => result.slug === want),
    }
  })
  return {
    rows,
    rank1: rows.filter((row) => row.rank1).length,
    grouped: rows.filter((row) => row.grouped).length,
    top5: rows.filter((row) => row.top5).length,
    total: rows.length,
  }
}
