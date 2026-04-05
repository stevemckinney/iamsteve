import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog', ({ data }) => data.status === 'open')
  const allNotes = await getCollection('notes', ({ data }) => data.status === 'published')
  const allPages = await getCollection('pages')

  const posts = allPosts.map((post) => ({
    type: 'post',
    title: post.data.title,
    summary: post.data.summary || null,
    slug: `/blog/${post.id.replace(/^\d{4}-/, '')}`,
    categories: post.data.categories || [],
    tags: post.data.tags || [],
  }))

  const notes = allNotes.map((note) => ({
    type: 'note',
    title: note.data.title,
    summary: note.data.summary || null,
    slug: `/notes/${note.id}`,
    categories: [],
    tags: [],
  }))

  const pages = allPages.map((page) => ({
    type: 'page',
    title: page.data.title,
    summary: page.data.description || null,
    slug: `/${page.id}`,
    categories: [],
    tags: [],
  }))

  // Collect unique categories from posts as browsable results
  const categorySet = new Set<string>()
  allPosts.forEach((post) => {
    post.data.categories?.forEach((c: string) => categorySet.add(c))
  })

  const categories = Array.from(categorySet).map((name) => ({
    type: 'category',
    title: name,
    summary: null,
    slug: `/category/${name.toLowerCase()}`,
    categories: [],
    tags: [],
  }))

  const index = [...posts, ...notes, ...pages, ...categories]

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
