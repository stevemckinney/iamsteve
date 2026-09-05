import { allPosts, allNotes, allPages } from 'content-collections'
import collectionsConfig from '@/content/collections'

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

  const categories = Array.from(categorySet).map((name) => ({
    type: 'category',
    title: name,
    summary: null,
    slug: `/category/${name.toLowerCase()}`,
    categories: [],
    tags: [],
  }))

  const collections = collectionsConfig.map((item) => ({
    type: 'collection',
    title: item.title,
    summary: null,
    slug: item.slug,
    categories: [],
    tags: [],
  }))

  return [...posts, ...notes, ...pages, ...categories, ...collections]
}
