import { NextResponse } from 'next/server'
import { allPosts, allNotes, allPages } from 'content-collections'
import categories from '@/content/categories'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const openPosts = allPosts.filter((post) => post.status === 'open')

  const posts = openPosts.map((post) => ({
    type: 'post',
    title: post.title,
    summary: post.summary,
    slug: post.slug,
    categories: post.categories,
    tags: post.tags,
  }))

  const notes = allNotes
    .filter((note) => note.status === 'published')
    .map((note) => ({
      type: 'note',
      title: note.title,
      summary: note.summary,
      slug: note.slug,
    }))

  const pages = allPages
    .filter((page) => !page.noindex)
    .map((page) => ({
      type: 'page',
      title: page.title,
      summary: page.description,
      slug: page.slug,
    }))

  // Only categories that have open posts, using the slugs the routes expect
  const used = new Set(openPosts.flatMap((post) => post.categories ?? []))

  const browsable = categories
    .filter((category) => !category.exclude && used.has(category.title))
    .map((category) => ({
      type: 'category',
      title: category.title,
      summary: category.description,
      slug: category.slug,
    }))

  return NextResponse.json([...posts, ...notes, ...pages, ...browsable], {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
