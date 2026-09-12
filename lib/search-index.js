import {
  allPosts,
  allNotes,
  allPages,
  allCollections,
} from 'content-collections'
import collectionsConfig from '@/content/collections'
import categoriesConfig from '@/content/categories'
import { footer } from '@/content/navigation'
import { collectionTitle } from '@/lib/collections'

function domain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

// Scoped browsing shows the head of the list, so it has to be the newest end.
// filter() already copied the array, so sorting here leaves allPosts alone.
const newestFirst = (a, b) => new Date(b.date) - new Date(a.date)

let built = null

// content-collections data is fixed at build time, so this only needs doing
// once per process — react's cache() is request-scoped and rebuilt every time.
export function buildIndex() {
  if (built) return built

  // The icon of the category a post is filed under, which a row shows
  // beside its title, so the two agree
  const iconFor = (name) =>
    categoriesConfig.find((item) => item.title === name)?.icon

  const posts = allPosts
    .filter((post) => post.status === 'open')
    .sort(newestFirst)
    .map((post) => ({
      type: 'post',
      title: post.title,
      summary: post.summary || null,
      slug: post.slug,
      icon: iconFor(post.categories?.[0]),
      categories: post.categories || [],
      tags: post.tags || [],
    }))

  const notes = allNotes
    .filter((note) => note.status === 'published')
    .sort(newestFirst)
    .map((note) => ({
      type: 'note',
      title: note.title,
      summary: note.summary || null,
      slug: note.slug,
      categories: [],
      tags: [],
    }))

  const pages = allPages.map((page) => ({
    type: 'page',
    title: page.title,
    summary: page.description || null,
    slug: `/${page.slugAsParams}`,
    categories: [],
    tags: [],
  }))

  const categorySet = new Set()
  allPosts
    .filter((post) => post.status === 'open')
    .forEach((post) => {
      post.categories?.forEach((c) => categorySet.add(c))
    })

  const categories = Array.from(categorySet).map((name) => {
    const config = categoriesConfig.find((item) => item.title === name)
    return {
      type: 'category',
      title: name,
      summary: config?.description ?? null,
      slug: config
        ? config.slug
        : `/category/${name.toLowerCase().replace(/\s+/g, '-')}`,
      icon: iconFor(name),
      categories: [],
      tags: [],
    }
  })

  const collections = collectionsConfig.map((item) => ({
    type: 'collection',
    title: item.title,
    summary: null,
    slug: item.slug,
    icon: item.icon,
    categories: [],
    tags: [],
  }))

  // The curated links themselves, so a scoped collections search has something
  // to find. The domain doubles as the visible subtitle and a search term.
  // MiniSearch keys on slug and a link's slug is its URL, so two items for
  // one URL would throw on indexing. The first one stands for both.
  const seen = new Set()
  const links = []
  for (const item of allCollections) {
    if (seen.has(item.url)) continue
    seen.add(item.url)
    links.push({
      type: 'link',
      title: item.title,
      summary: domain(item.url),
      slug: item.url,
      categories: (item.collection || []).map(collectionTitle),
      tags: [],
    })
  }

  // The section pages themselves — /collections, /notes, /blog and the rest.
  // Without these, searching for a part of the site found its contents but
  // never the page you were after. The path goes in tags so /blog answers to
  // "blog" even though it is titled Archive.
  const taken = new Set(
    [...pages, ...categories, ...collections].map((item) => item.slug)
  )
  const sections = footer
    .filter((item) => !taken.has(item.href))
    .map((item) => ({
      type: 'page',
      title: item.title,
      summary: null,
      slug: item.href,
      icon: item.icon,
      categories: [],
      tags: [item.href],
    }))

  built = [
    ...posts,
    ...notes,
    ...pages,
    ...categories,
    ...collections,
    ...sections,
    ...links,
  ]
  return built
}
