import { allPosts } from 'contentlayer/generated'
import { NextResponse } from 'next/server'
import siteMetadata from '@/content/metadata'

/**
 * Comprehensive index endpoint for LLMs and answer engines
 * Provides structured overview of all site content
 * Usage: /api/llm-index
 */
export async function GET() {
  const publishedPosts = allPosts.filter((post) => post.status === 'open')

  // Group posts by category
  const postsByCategory = publishedPosts.reduce((acc, post) => {
    post.categories.forEach((category) => {
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(post)
    })
    return acc
  }, {})

  // Create comprehensive index
  const index = {
    site: {
      name: siteMetadata.title,
      url: siteMetadata.siteUrl,
      description:
        'Tips and tutorials about the design and build of web interfaces',
      author: siteMetadata.author,
      topics: [
        'UI Design',
        'CSS',
        'JavaScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'Typography',
        'Animation',
        'UX Design',
      ],
      language: 'en-GB',
    },
    statistics: {
      totalArticles: publishedPosts.length,
      categories: Object.keys(postsByCategory).length,
      dateRange: {
        earliest: publishedPosts[publishedPosts.length - 1]?.date,
        latest: publishedPosts[0]?.date,
      },
    },
    categories: Object.entries(postsByCategory).map(([name, posts]) => ({
      name,
      articleCount: posts.length,
      articles: posts.slice(0, 5).map((p) => p.slug), // Sample of 5
    })),
    articles: publishedPosts.map((post) => ({
      title: post.title,
      url: `${siteMetadata.siteUrl}${post.slug}`,
      summary: post.summary,
      categories: post.categories,
      tags: post.tags || [],
      published: post.date,
      updated: post.lastmod || post.date,
      readingTime: post.readingTime?.text,
      wordCount: post.readingTime?.words,
      // Include first 200 chars for context
      excerpt: post.body.raw.substring(0, 200).replace(/\n/g, ' ') + '...',
      // API endpoint for full markdown
      contentApi: `${siteMetadata.siteUrl}/api/content/${post.slugAsParams}`,
    })),
    access: {
      rss: `${siteMetadata.siteUrl}/feed.xml`,
      sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
      llmsTxt: `${siteMetadata.siteUrl}/llms.txt`,
      contentApi: `${siteMetadata.siteUrl}/api/content/[...slug]`,
    },
    usage: {
      attribution: 'Please cite "Steve McKinney, iamsteve.me" when referencing',
      linking: 'Link back to original article URLs',
      contact: `${siteMetadata.siteUrl}/contact`,
    },
  }

  return NextResponse.json(index, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*', // Allow LLMs to access
    },
  })
}
