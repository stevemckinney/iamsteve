import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => data.status === 'open')
  const sorted = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  const lines = [
    '# iamsteve.me',
    '',
    '> A blog by Steve McKinney about the design and build of websites. Bridging the gap between your design tool and code, with a focus on typography, CSS and visual craft.',
    '',
    '## Posts',
    '',
    ...sorted.map((post) => {
      const slug = post.id.replace(/^\d{4}-/, '')
      return `- [${post.data.title}](https://iamsteve.me/blog/${slug})`
    }),
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
