import { allNotes } from 'contentlayer/generated'
import { cleanMarkdownForLLMs } from '@/lib/utils/clean-markdown-for-llms'

export async function GET(request, { params }) {
  const { slug } = await params
  const note = allNotes.find((n) => n.slug === `/notes/${slug}`)

  if (!note) {
    return new Response('# Not Found\n\nThe requested note does not exist.', {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    })
  }

  const cleanedMarkdown = cleanMarkdownForLLMs(note.body.raw)

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

  const output = `${frontmatter}\n\n${cleanedMarkdown}`

  return new Response(output, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
