import siteMetadata from '@/content/metadata'
import { allPosts, allNotes } from 'contentlayer/generated'

export default async function generateSitemap() {
  let posts = allPosts
    .filter((post) => post.status === 'open')
    .map((post) => ({
      url: `${siteMetadata.siteUrl}${post.slug}`,
      lastModified: post.lastmod,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  let notes = allNotes
    .filter((note) => note.status === 'published')
    .map((note) => ({
      url: `${siteMetadata.siteUrl}${note.slug}`,
      lastModified: note.date,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  let routes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' },
    { route: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { route: '/collections', priority: 0.7, changeFrequency: 'weekly' },
    { route: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { route: '/uses', priority: 0.4, changeFrequency: 'monthly' },
    { route: '/contact', priority: 0.4, changeFrequency: 'yearly' },
    { route: '/newsletter', priority: 0.5, changeFrequency: 'monthly' },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency,
    priority,
  }))

  let categories = ['design', 'code', 'typography'].map((cat) => ({
    url: `${siteMetadata.siteUrl}/category/${cat}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...routes, ...categories, ...posts, ...notes]
}
