import { allPosts } from 'content-collections'
import { createClient } from '@supabase/supabase-js'
import siteMetadata from '@/content/metadata'

export const revalidate = 86400 // Revalidate daily
export const dynamic = 'force-static'

export async function GET() {
  let dbPosts = null

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data } = await supabase
      .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
      .select()

    dbPosts = data
  }

  const cutoffDate = new Date('2015-01-01')

  const postsWithViews = allPosts
    .filter(
      (post) => post.status === 'open' && new Date(post.date) >= cutoffDate
    )
    .map((post) => ({
      ...post,
      view_count: dbPosts?.find((p) => p.slug === post.slug)?.view_count || 0,
    }))

  // Get top 15 by views + 15 most recent
  const topByViews = postsWithViews
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 15)

  const mostRecent = postsWithViews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 15)

  // Combine and deduplicate
  const featured = [
    ...new Map([...topByViews, ...mostRecent].map((p) => [p.slug, p])).values(),
  ]

  const base = siteMetadata.siteUrl

  const content = `# iamsteve.me

> Tips and tutorials about the design and build of web interfaces. Through design and code tutorials focused on maintainable CSS, good typography and UI fundamentals by Steve McKinney.

## Best articles

${featured
  .map(
    (post) =>
      `- [${post.title}](${base}${post.slug}): markdown at ${base}/api/content/${post.slugAsParams}`
  )
  .join('\n')}

## Categories

- [Design articles](${base}/category/design)
- [Code articles](${base}/category/code)
- [Typography articles](${base}/category/typography)

## Optional

- [Full archive](${base}/blog)
- [RSS feed](${base}/feed.xml)
- [About](${base}/about)
- [OpenAPI description](${base}/openapi.json)
- [API catalog](${base}/.well-known/api-catalog)
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
