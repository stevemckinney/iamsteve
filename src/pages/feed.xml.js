// app/feed.xml/route.js: the 60 newest open posts and published notes,
// each with its body as RSS-friendly HTML
import siteMetadata from '@/content/metadata'
import { compileMdxForRssWithMarked } from '../../lib/compile-mdx-for-rss.js'
import { allEntries } from '../lib/content.js'

// computeRssBody from content-collections.ts: the source itself when
// compiling fails or comes back empty
function rssBody(raw, filePath) {
  try {
    const result = compileMdxForRssWithMarked(raw)
    if (!result) {
      console.warn(`RSS body is empty for ${filePath}`)
      return raw
    }
    return result
  } catch (error) {
    console.error(`Error compiling RSS body for ${filePath}:`, error.message)
    return raw
  }
}

function item(entry, base) {
  return {
    ...entry.data,
    slug: `${base}/${entry.id}`,
    rssBody: rssBody(entry.body, entry.filePath),
  }
}

export async function GET() {
  const posts = (await allEntries('blog'))
    .filter(({ data }) => data.status === 'open')
    .map((entry) => ({ ...item(entry, '/blog'), type: 'post' }))

  const notes = (await allEntries('notes'))
    .filter(({ data }) => data.status === 'published')
    .map((entry) => ({ ...item(entry, '/notes'), type: 'note' }))

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
    headers: { 'Content-Type': 'application/xml' },
  })
}

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
