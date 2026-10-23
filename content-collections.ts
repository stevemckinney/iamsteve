import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'

import readingTime from 'reading-time'
import { remarkPlugins, rehypePlugins } from './lib/markdown.js'
import { compileMdxForRssWithMarked } from './lib/compile-mdx-for-rss.js'
import {
  postSchema,
  noteSchema,
  collectionSchema,
  pageSchema,
} from './lib/content-schemas.mjs'
import GithubSlugger from 'github-slugger'
import siteMetadata from './content/metadata'

const mdxOptions = { remarkPlugins, rehypePlugins }

function computeHeadings(raw) {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
  const slugger = new GithubSlugger()
  return Array.from(raw.matchAll(regXHeader)).map(({ groups }) => {
    const flag = groups?.flag
    const content = groups?.content
    const cleanContent = content
      ? content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/<[^>]+>/g, '')
      : ''
    return {
      level:
        flag?.length == 1
          ? 'one'
          : flag?.length == 2
          ? 'two'
          : flag?.length == 3
          ? 'three'
          : 'four',
      text: cleanContent,
      slug: cleanContent ? slugger.slug(cleanContent) : undefined,
    }
  })
}

function computeRssBody(raw, filePath) {
  try {
    const result = compileMdxForRssWithMarked(raw)
    if (!result) {
      console.warn(`RSS body is empty for ${filePath}`)
      return raw
    }
    return result
  } catch (error) {
    console.error(`Error compiling RSS body for ${filePath}:`, error.message)
    return raw
  }
}

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: postSchema,
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    const slugAsParams = doc._meta.path
      .split('/')
      .pop()
      .replace(/^\d{4}-/, '')
    return {
      ...doc,
      mdx,
      headings: computeHeadings(doc.content),
      readingTime: readingTime(doc.content),
      rssBody: computeRssBody(doc.content, doc._meta.filePath),
      slug: `/blog/${slugAsParams}`,
      slugAsParams,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/blog/${slugAsParams}`,
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.ogImage ? doc.ogImage : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/blog/${slugAsParams}`,
        author: [
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Steve McKinney',
            url: `${siteMetadata.siteUrl}`,
          },
        ],
        publisher: [
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Steve',
            logo: {
              '@type': 'ImageObject',
              url: `${siteMetadata.siteUrl}/images/logo.svg`,
            },
          },
        ],
      },
    }
  },
})

const notes = defineCollection({
  name: 'notes',
  directory: 'content/notes',
  include: '**/*.mdx',
  schema: noteSchema,
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    const slugAsParams = doc._meta.path.split('/').pop()
    return {
      ...doc,
      mdx,
      slug: `/notes/${slugAsParams}`,
      slugAsParams,
      rssBody: computeRssBody(doc.content, doc._meta.filePath),
    }
  },
})

const collections = defineCollection({
  name: 'collections',
  directory: 'content/collections',
  include: '**/*.mdx',
  schema: collectionSchema,
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    const slugAsParams = doc._meta.path.split('/').pop()
    return {
      ...doc,
      mdx,
      slug: `/collections/${slugAsParams}`,
      slugAsParams,
    }
  },
})

const pages = defineCollection({
  name: 'pages',
  directory: 'content/pages',
  include: '**/*.mdx',
  schema: pageSchema,
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc, mdxOptions)
    // Compile the slot field separately if it exists
    let slotMdx = null
    if (doc.slot) {
      slotMdx = await compileMDX(ctx, { ...doc, content: doc.slot }, mdxOptions)
    }
    const slugAsParams = doc._meta.path.split('/').pop()
    return {
      ...doc,
      mdx,
      slotMdx,
      slug: `/pages/${slugAsParams}`,
      slugAsParams,
    }
  },
})

export default defineConfig({
  content: [posts, notes, collections, pages],
})
