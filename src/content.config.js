import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'zod'
import {
  postSchema,
  noteSchema,
  collectionSchema,
  pageSchema,
} from '../lib/content-schemas.mjs'

// Each id is the slug in the URL, worked out the way content-collections
// does it: the file name, or the folder name for an index.mdx. Posts also
// lose the four-digit number that orders them
function slugFrom(entry, { stripNumber = false } = {}) {
  const slug = entry
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '')
    .split('/')
    .pop()
  return stripNumber ? slug.replace(/^\d{4}-/, '') : slug
}

function loader(directory, options) {
  return glob({
    pattern: '**/*.mdx',
    base: `./content/${directory}`,
    generateId: ({ entry }) => slugFrom(entry, options),
  })
}

// Astro reads an unquoted date as a Date, where content-collections keeps
// the string, so turn it back into one
const date = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString() : value),
  z.string()
)

// content-collections checks the body as `content`. Astro only checks
// frontmatter, so the shared schemas drop it
const blog = defineCollection({
  loader: loader('blog', { stripNumber: true }),
  schema: postSchema.omit({ content: true }).extend({ date, lastmod: date }),
})

const notes = defineCollection({
  loader: loader('notes'),
  schema: noteSchema.omit({ content: true }).extend({ date }),
})

// Bookmarks, listed on /collections
const bookmarks = defineCollection({
  loader: loader('collections'),
  schema: collectionSchema.omit({ content: true }).extend({ date }),
})

const pages = defineCollection({
  loader: loader('pages'),
  schema: pageSchema.omit({ content: true }),
})

export const collections = { blog, notes, collections: bookmarks, pages }
