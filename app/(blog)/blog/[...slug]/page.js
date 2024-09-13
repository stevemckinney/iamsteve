import { notFound } from 'next/navigation'
import { getPostFromParams } from '@/lib/utils/content'
import siteMetadata from '@/content/metadata'

import styles from './post.module.scss'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.metadesc,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastmod,
      authors: [siteMetadata.author],
      url: `${post.slug}`,
      images: [
        {
          url: post.ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.ogImage],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  // This page doesn't render any visible content
  // It's used for handling the route and potentially setting up any shared data
  return null
}
