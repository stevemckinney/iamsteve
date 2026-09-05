import MiniSearch from 'minisearch'

// Ranking by BM25 rather than counting substring hits: a term that appears in
// most entries counts for less than a rare one, and a long summary no longer
// beats a short exact title by sheer surface area.
const options = {
  fields: ['title', 'summary', 'keywords'],
  storeFields: ['type', 'title', 'summary', 'slug', 'icon', 'categories'],
  idField: 'slug',
  searchOptions: {
    boost: { title: 3, summary: 2 },
    prefix: true,
    fuzzy: 0.2,
  },
}

// Order sections so the places you can go come before the things written about
// them. Anything not listed is dropped from the grouped view.
const groups = [
  ['page', 'Pages'],
  ['collection', 'Collections'],
  ['category', 'Categories'],
  ['post', 'Blog'],
  ['note', 'Notes'],
  ['link', 'Links'],
]

let engine = null
let indexed = null

function build(index) {
  const mini = new MiniSearch(options)
  mini.addAll(
    index.map((item) => ({
      ...item,
      keywords: [...(item.tags || []), ...(item.categories || [])].join(' '),
    }))
  )
  return mini
}

export function search(index, query, limit = 20) {
  if (!index || !query || query.trim().length < 2) return []
  if (indexed !== index) {
    engine = build(index)
    indexed = index
  }
  return engine.search(query).slice(0, limit)
}

export function groupResults(results) {
  return groups
    .map(([type, title]) => ({
      type,
      title,
      items: results.filter((result) => result.type === type),
    }))
    .filter((group) => group.items.length > 0)
}
