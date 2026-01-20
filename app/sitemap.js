import siteMetadata from '@/content/metadata'
import { allPosts } from 'contentlayer/generated'

export default async function generateSitemap() {
  let posts = allPosts
    .filter((post) => post.status === 'open')
    .map((post) => ({
      url: `${siteMetadata.siteUrl}${post.slug}`,
      lastModified: post.lastmod,
    }))

  let routes = [
    '',
    '/blog',
    '/collections',
    '/about',
    '/uses',
    '/contact',
    '/newsletter',
    '/subscribe',
  ].map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let categories = ['design', 'code', 'typography'].map((cat) => ({
    url: `${siteMetadata.siteUrl}/category/${cat}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...categories, ...posts]
}
