import siteMetadata from '@/content/metadata'

export const revalidate = 86400
export const dynamic = 'force-static'

/**
 * RFC 9727 API catalog. Lists machine-discoverable APIs offered by the site.
 * Returned as `application/linkset+json` per RFC 9264.
 */
export async function GET() {
  const base = siteMetadata.siteUrl

  const linkset = {
    linkset: [
      {
        anchor: `${base}/api/content`,
        'service-doc': [
          {
            href: `${base}/llms.txt`,
            type: 'text/plain',
            title: 'LLM-friendly content index',
          },
        ],
        item: [
          {
            href: `${base}/api/content/{slug}`,
            title: 'Get a blog article as markdown',
            type: 'text/markdown',
          },
          {
            href: `${base}/api/content/notes/{slug}`,
            title: 'Get a note as markdown',
            type: 'text/markdown',
          },
        ],
      },
      {
        anchor: `${base}/api/newsletter`,
        item: [
          {
            href: `${base}/api/newsletter`,
            title: 'Subscribe to the newsletter',
            type: 'application/json',
            'http-method': 'POST',
          },
          {
            href: `${base}/api/newsletter/count`,
            title: 'Subscriber count',
            type: 'application/json',
            'http-method': 'GET',
          },
        ],
      },
      {
        anchor: `${base}/feed.xml`,
        item: [
          {
            href: `${base}/feed.xml`,
            title: 'RSS feed of posts and notes',
            type: 'application/rss+xml',
          },
        ],
      },
    ],
  }

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
