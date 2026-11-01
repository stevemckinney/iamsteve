// app/llms.txt/route.js. “Best articles” is the 15 most viewed posts and
// the 15 newest. The Next.js route looked views up by the /blog/ path,
// which the bare slugs in the table never match, so it listed file order
import siteMetadata from '@/content/metadata'
import { allEntries } from '../lib/content.js'
import { pageViews } from '../lib/views.js'

export async function GET() {
  const views = await pageViews()
  const cutoffDate = new Date('2015-01-01')

  const postsWithViews = (await allEntries('blog'))
    .map(({ id, data }) => ({ ...data, slug: `/blog/${id}`, slugAsParams: id }))
    .filter(
      (post) => post.status === 'open' && new Date(post.date) >= cutoffDate
    )
    .map((post) => ({
      ...post,
      view_count: views.get(post.slugAsParams) || 0,
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
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
