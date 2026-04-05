import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { marked } from 'marked'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.status === 'open')
  const notes = await getCollection('notes', ({ data }) => data.status === 'published')

  const blogItems = await Promise.all(
    posts.map(async (post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.id.replace(/^\d{4}-/, '')}`,
      description: post.data.summary,
      content: await marked.parse(post.body || ''),
    }))
  )

  const noteItems = await Promise.all(
    notes.map(async (note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      link: `/notes/${note.id}`,
      description: note.data.summary || '',
      content: await marked.parse(note.body || ''),
    }))
  )

  const items = [...blogItems, ...noteItems]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 60)

  return rss({
    title: 'iamsteve',
    description: 'A blog about design and build of websites',
    site: context.site!,
    items,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
  })
}
