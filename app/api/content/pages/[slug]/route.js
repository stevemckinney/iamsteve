import { allPages } from 'content-collections'
import { cleanMarkdownForLLMs } from '@/lib/utils/clean-markdown-for-llms'
import { markdownHeaders, markdownNotFound } from '@/lib/agent/markdown'

export async function GET(request, { params }) {
  const { slug } = await params
  const page = allPages.find((p) => p.slugAsParams === slug)

  if (!page) {
    return markdownNotFound(`/${slug}`)
  }

  const cleanedMarkdown = cleanMarkdownForLLMs(page.content)

  const frontmatter = [
    '---',
    `title: "${page.title.replace(/"/g, '\\"')}"`,
    `author: Steve McKinney`,
    page.description
      ? `description: "${page.description.replace(/"/g, '\\"')}"`
      : null,
    `url: https://iamsteve.me/${slug}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n')

  const output = `${frontmatter}\n\n${cleanedMarkdown}`

  return new Response(output, { headers: markdownHeaders })
}
