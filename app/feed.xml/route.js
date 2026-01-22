import { allPosts, allNotes } from 'contentlayer/generated'
import siteMetadata from '@/content/metadata'

export const revalidate = 2592000

export async function GET() {
  // Combine posts and notes
  const posts = allPosts
    .filter((post) => post.status === 'open')
    .map((post) => ({ ...post, type: 'post' }))

  const notes = allNotes
    .filter((note) => note.status === 'published')
    .map((note) => ({ ...note, type: 'note' }))

  const items = [...posts, ...notes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 60)

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteMetadata.title} • RSS feed</title>
    <link>${siteMetadata.siteUrl}</link>
    <description>${siteMetadata.description}</description>
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${
      siteMetadata.siteUrl
    }/feed.xml" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${siteMetadata.siteUrl}${item.slug}</link>
      <guid isPermaLink="true">${siteMetadata.siteUrl}${item.slug}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.summary || '')}</description>
      <content:encoded><![CDATA[${item.rssBody}]]></content:encoded>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
    status: 200,
  })
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
    }
  })
}
