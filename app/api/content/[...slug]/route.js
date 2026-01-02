import { allPosts } from 'contentlayer/generated'
import { NextResponse } from 'next/server'

/**
 * API endpoint to expose markdown content for LLMs and answer engines
 * Usage: /api/content/blog/article-slug
 */
export async function GET(req, { params }) {
  const slug = params.slug.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Only expose published posts
  if (post.status !== 'open') {
    return NextResponse.json({ error: 'Post not available' }, { status: 404 })
  }

  // Return markdown content with metadata
  const content = {
    title: post.title,
    description: post.summary,
    author: 'Steve McKinney',
    published: post.date,
    updated: post.lastmod || post.date,
    url: `https://iamsteve.me${post.slug}`,
    categories: post.categories,
    tags: post.tags || [],
    readingTime: post.readingTime?.text,
    wordCount: post.readingTime?.words,
    markdown: post.body.raw,
  }

  return NextResponse.json(content, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Robots-Tag': 'noindex', // Don't index API endpoints
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
