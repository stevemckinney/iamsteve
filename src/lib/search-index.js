// lib/search-index.js for Astro: every item search looks through, from the
// content collections in the shapes lib/search-items.js reads. /api/search
// serves it and /search queries it. Content is fixed once built, so it’s
// made once per process
import { searchItems } from '../../lib/search-items.js'
import { allEntries } from './content.js'

const shaped = async (collection, shape) =>
  (await allEntries(collection)).map(shape)

async function build() {
  return searchItems({
    allPosts: await shaped('blog', ({ id, data }) => ({
      ...data,
      slug: `/blog/${id}`,
    })),
    allNotes: await shaped('notes', ({ id, data }) => ({
      ...data,
      slug: `/notes/${id}`,
    })),
    allPages: await shaped('pages', ({ id, data }) => ({
      ...data,
      slugAsParams: id,
    })),
    allCollections: await shaped('collections', ({ data }) => data),
  })
}

let built = null

export function buildIndex() {
  built ??= build()
  return built
}
