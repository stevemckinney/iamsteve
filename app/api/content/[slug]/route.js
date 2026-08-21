import { allPosts } from 'content-collections'
import { cleanMarkdownForLLMs } from '@/lib/utils/clean-markdown-for-llms'
import { markdownHeaders, markdownNotFound } from '@/lib/agent/markdown'

export async function GET(request, { params }) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === `/blog/${slug}`)

  if (!post) {
    return markdownNotFound(`/blog/${slug}`)
  }

  const cleanedMarkdown = cleanMarkdownForLLMs(post.content)

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

  const output = `${frontmatter}\n\n${cleanedMarkdown}`

  return new Response(output, { headers: markdownHeaders })
}
