/**
 * Single blog post
 * See (blog)/layout.js for controlling page frame
 * #single #post
 */

import { notFound } from 'next/navigation'
import { allPosts } from 'content-collections'
import siteMetadata from '@/content/metadata'

import PostBody from './post-body'

export const revalidate = 86400

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.status === 'open' || post.status === 'unlisted')
    .map((post) => ({
      slug: post.slugAsParams.split('/'),
    }))
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  return allPosts.find(
    (post) =>
      post.slugAsParams === slug &&
      (post.status === 'open' || post.status === 'unlisted')
  )
}

export async function generateMetadata(props) {
  const params = await props.params
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.metadesc,
    alternates: {
      canonical: post.slug,
    },
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
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.ogImage],
    },
    ...(post.noindex && {
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }),
  }
}

export default async function PostPage(props) {
  const params = await props.params
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const enableViewCounting =
    process.env.NEXT_PUBLIC_ENABLE_VIEW_COUNTING === 'true'

  const jsonLD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${siteMetadata.siteUrl}${post.slug}#article`,
        isPartOf: {
          '@id': `${siteMetadata.siteUrl}/#website`,
        },
        author: {
          '@type': 'Person',
          name: siteMetadata.author,
          '@id': `${siteMetadata.siteUrl}/#person`,
        },
        headline: post.title,
        datePublished: post.date,
        dateModified: post.lastmod,
        description: post.summary,
        wordCount: post.content.split(/\s+/).length,
        keywords: post.tags?.join(', '),
        articleSection: post.categories[0],
        image: {
          '@type': 'ImageObject',
          url: post.ogImage,
          width: 1200,
          height: 630,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}${post.slug}`,
        },
        publisher: {
          '@id': `${siteMetadata.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteMetadata.siteUrl}${post.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'iamsteve.me',
            item: `${siteMetadata.siteUrl}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteMetadata.siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${siteMetadata.siteUrl}${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <PostBody post={post} showViews={enableViewCounting} />
    </>
  )
}
