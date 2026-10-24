// Which content each kind of page shows, in the order Next.js listed it.
// content-collections loaded files in path order and pages sorted that by
// date, so posts with the same date stay in file order
import { getCollection } from 'astro:content'
import categories from '@/content/categories'

const byPath = (a, b) => a.filePath.localeCompare(b.filePath)
const byDate = (a, b) => new Date(b.data.date) - new Date(a.data.date)

// Listed in archives, feeds and search
export const isOpen = ({ data }) => data.status === 'open'

// Has a page: open posts, and unlisted ones reachable by URL
export const isRoutable = ({ data }) =>
  data.status === 'open' || data.status === 'unlisted'

// Notes are published or drafts
export const isPublished = ({ data }) => data.status === 'published'

// Every entry, in the file order content-collections gave them
export async function allEntries(collection) {
  return (await getCollection(collection)).sort(byPath)
}

// Newest first. The sort is stable, so equal dates keep file order
// Cards on each archive page
export const perPage = 12

export function sortByDate(entries) {
  return [...entries].sort(byDate)
}

export async function openPosts() {
  return sortByDate((await allEntries('blog')).filter(isOpen))
}

// lib/utils/content.js getCategories: categories not set aside in config,
// with at least one open post to show for themselves
export async function listedCategories() {
  const open = (await allEntries('blog')).filter(isOpen)
  return categories.filter(
    (category) =>
      !category.exclude &&
      open.some((post) => post.data.categories.includes(category.title))
  )
}

// The shape the cards read, as content-collections documents had it
export function cardData(entry) {
  return {
    ...entry.data,
    slug: `/blog/${entry.id}`,
    _meta: { filePath: entry.filePath.replace(/^content\/blog\//, '') },
  }
}

// Whether a post is in the category with this slug. Both category routes
// use it; Next.js’s paged route capitalised the slug instead, which found
// nothing for multi-word or capitalised categories
export const inCategory = (slug) => (post) =>
  post.data.categories.some(
    (category) => category.replace(' ', '-').toLowerCase() === slug
  )

// An archive’s LCP image: the first card’s medium image, which React
// preloaded because it loads eagerly. Cards without both images show a
// lazy placeholder instead
export function cardPreloads(post) {
  return post?.data.large && post?.data.medium
    ? [{ href: post.data.medium }]
    : []
}
