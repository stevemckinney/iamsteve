// The markdown documents app/api/content/* served, which the .md URLs
// serve too: a post, a note, and the home page’s summary of the site
import siteMetadata from '@/content/metadata'
import { cleanMarkdownForLLMs } from '../../lib/utils/clean-markdown-for-llms.js'
import { allEntries } from './content.js'
import { pageViews } from './views.js'

// app/api/content/[slug]/route.js
export function postMarkdown(entry) {
  const post = { ...entry.data, slug: `/blog/${entry.id}` }
  const cleanedMarkdown = cleanMarkdownForLLMs(entry.body)

  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `author: Steve McKinney`,
    `date: ${post.date}`,
    post.lastmod ? `lastmod: ${post.lastmod}` : null,
    post.description
      ? `description: "${post.description.replace(/"/g, '\\"')}"`
      : null,
    `categories: [${post.categories.map((c) => `"${c}"`).join(', ')}]`,
    `url: https://iamsteve.me${post.slug}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  return `${frontmatter}\n\n${cleanedMarkdown}`
}

// app/api/content/notes/[slug]/route.js
export function noteMarkdown(entry) {
  const note = { ...entry.data, slug: `/notes/${entry.id}` }
  const cleanedMarkdown = cleanMarkdownForLLMs(entry.body)

  const frontmatter = [
    '---',
    `title: "${note.title.replace(/"/g, '\\"')}"`,
    `author: Steve McKinney`,
    `date: ${note.date}`,
    note.summary ? `summary: "${note.summary.replace(/"/g, '\\"')}"` : null,
    `url: https://iamsteve.me${note.slug}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  return `${frontmatter}\n\n${cleanedMarkdown}`
}

// app/api/content/home/route.js. Views are looked up by the post’s
// /blog/ path, which the bare slugs in the table never match, as on the
// Next.js site
export async function homeMarkdown() {
  const views = await pageViews()
  const open = (await allEntries('blog'))
    .filter(({ data }) => data.status === 'open')
    .map(({ id, data }) => ({ ...data, slug: `/blog/${id}` }))

  const latest = [...open]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)

  const popular = [...open]
    .map((post) => ({ ...post, view_count: views.get(post.slug) || 0 }))
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 10)

  const line = (post) =>
    `- [${post.title}](${siteMetadata.siteUrl}${post.slug})`

  return `---
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
}
