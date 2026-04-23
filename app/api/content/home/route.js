import { allPosts } from 'content-collections'
import { createClient } from '@supabase/supabase-js'

import siteMetadata from '@/content/metadata'

export const revalidate = 86400
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

  const open = allPosts.filter((post) => post.status === 'open')

  const latest = [...open]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)

  const popular = [...open]
    .map((post) => ({
      ...post,
      view_count: dbPosts?.find((p) => p.slug === post.slug)?.view_count || 0,
    }))
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 10)

  const line = (post) =>
    `- [${post.title}](${siteMetadata.siteUrl}${post.slug})`

  const markdown = `---
title: ${siteMetadata.title}
description: ${siteMetadata.description}
url: ${siteMetadata.siteUrl}/
---

# ${siteMetadata.title}

${siteMetadata.description}

## Latest posts

${latest.map(line).join('\n')}

## Popular posts

${popular.map(line).join('\n')}

## Browse

- [Full archive](${siteMetadata.siteUrl}/blog)
- [Notes](${siteMetadata.siteUrl}/notes)
- [Design articles](${siteMetadata.siteUrl}/category/design)
- [Code articles](${siteMetadata.siteUrl}/category/code)
- [Typography articles](${siteMetadata.siteUrl}/category/typography)
- [About](${siteMetadata.siteUrl}/about)

## Feeds

- [RSS feed](${siteMetadata.siteUrl}/feed.xml)
- [llms.txt](${siteMetadata.siteUrl}/llms.txt)
`

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
