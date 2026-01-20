import { allPosts } from 'contentlayer/generated'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 86400 // Revalidate daily
export const dynamic = 'force-static'

export async function GET() {
  // Get view counts from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data: dbPosts } = await supabase
    .from(process.env.NEXT_PUBLIC_DB_VIEWS_TABLE)
    .select()

  const postsWithViews = allPosts
    .filter((post) => post.status === 'open')
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

  const content = `# iamsteve.me

> Tips and tutorials about the design and build of web interfaces. Through design and code tutorials focused on maintainable CSS, good typography and UI fundamentals by Steve McKinney.

## Best articles

${featured.map((post) => `- [${post.title}](${post.slug})`).join('\n')}

## Categories

- [Design articles](/category/design)
- [Code articles](/category/code)
- [Typography articles](/category/typography)

## Optional

- [Full archive](/blog)
- [RSS feed](/feed.xml)
- [About](/about)
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
