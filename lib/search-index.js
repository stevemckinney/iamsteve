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

export function buildIndex() {
  const posts = allPosts
    .filter((post) => post.status === 'open')
    .map((post) => ({
      type: 'post',
      title: post.title,
      summary: post.summary || null,
      slug: post.slug,
      categories: post.categories || [],
      tags: post.tags || [],
    }))

  const notes = allNotes
    .filter((note) => note.status === 'published')
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
      icon: config?.icon,
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
  const links = allCollections.map((item) => ({
    type: 'link',
    title: item.title,
    summary: domain(item.url),
    slug: item.url,
    categories: (item.collection || []).map(collectionTitle),
    tags: [],
  }))

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

  return [
    ...posts,
    ...notes,
    ...pages,
    ...categories,
    ...collections,
    ...sections,
    ...links,
  ]
}
