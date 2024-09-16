import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/content/metadata'
import { marked } from 'marked'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  // Check if this is a revalidation request
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret) {
    // This is a revalidation request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    revalidatePath('/feed.xml')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }

  // If not a revalidation request, generate the feed
  const posts = allPosts
    .filter((post) => post.status === 'open')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10) // Get the latest 10 posts

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteMetadata.title}</title>
    <link>${siteMetadata.siteUrl}</link>
    <description>${siteMetadata.description}</description>
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${
      siteMetadata.siteUrl
    }/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteMetadata.siteUrl}${post.slug}</link>
      <guid isPermaLink="true">${siteMetadata.siteUrl}${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
      <content:encoded><![CDATA[${marked(post.body.raw)}]]></content:encoded>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
    },
    status: 200,
  })
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
    }
  })
}

export const revalidate = 2592000 // Revalidate every month (30 days)
