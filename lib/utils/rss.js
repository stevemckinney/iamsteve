import { Feed } from 'feed'
import { allPosts } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils/content'
import siteMetadata from '@/content/metadata'

const postsByDate = sortPosts(allPosts.filter((post) => post.status === 'open'))

export default async function generateFeed() {
  const feedOptions = {
    title: `${siteMetadata.title} • design and code`,
    description: `${siteMetadata.description}`,
    id: `${siteMetadata.siteUrl}`,
    link: `${siteMetadata.siteUrl}`,
    image: `${siteMetadata.siteUrl}/opengraph-image.png`,
    favicon: `${siteMetadata.siteUrl}/favicon.ico`,
    copyright: `iamsteve.me ${new Date().getFullYear()}`,
    generator: 'iamsteve.me',
    feedLinks: {
      rss2: `${siteMetadata.siteUrl}/feed.xml`,
      json: `${siteMetadata.siteUrl}/feed.json`,
      atom: `${siteMetadata.siteUrl}/atom.xml`,
    },
    author: {
      name: `${siteMetadata.first_name} ${siteMetadata.last_name}`,
      email: `${siteMetadata.email}`,
      link: `${siteMetadata.siteUrl}`,
    },
  }

  const feed = new Feed(feedOptions)

  postsByDate.forEach((post) => {
    return feed.addItem({
      title: post.title,
      id: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      link: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      description: post.summary,
      content: post.body.raw,
      date: new Date(post.date),
    })
  })

  return {
    rss: feed.rss2(),
    json: feed.json1(),
    atom: feed.atom1(),
  }
}
