import { allPosts } from 'contentlayer/generated'
import { cleanMarkdownForLLMs } from '@/lib/utils/clean-markdown-for-llms'

export async function GET(request, { params }) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === `/blog/${slug}`)

  if (!post) {
    return new Response('# Not Found\n\nThe requested article does not exist.', {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  const cleanedMarkdown = cleanMarkdownForLLMs(post.body.raw)

  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `author: Steve McKinney`,
    `date: ${post.date}`,
    post.lastmod ? `lastmod: ${post.lastmod}` : null,
    post.description ? `description: "${post.description.replace(/"/g, '\\"')}"` : null,
    `categories: [${post.categories.map((c) => `"${c}"`).join(', ')}]`,
    `url: https://iamsteve.me${post.slug}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  const output = `${frontmatter}\n\n${cleanedMarkdown}`

  return new Response(output, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
