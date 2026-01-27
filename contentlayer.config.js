import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import path from 'path'
import siteMetadata from './content/metadata'
import categories from './content/categories'
import collections from './content/collections'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import GithubSlugger from 'github-slugger'
import parse from 'rehype-parse'
import stringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import { compileMdxForRssWithMarked } from './lib/compile-mdx-for-rss.js'

// import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeCitation from 'rehype-citation'

import rehypePrism from 'rehype-prism-plus'
import remarkCodeTitles from './lib/remark-code-title'

const root = process.cwd()

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    slot: {
      type: 'mdx',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => '/' + doc._raw.flattenedPath,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}))

export const Collections = defineDocumentType(() => ({
  name: 'Collections',
  filePathPattern: `collections/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    url: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    collection: {
      type: 'list',
      of: {
        type: 'enum',
        options: [collections.map((collection) => collection.title)],
        required: true,
      },
    },
    kind: {
      type: 'enum',
      options: ['website', 'article', 'resource', 'tool'],
      default: 'website',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => '/' + doc._raw.flattenedPath,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    summary: { type: 'string' },
    metadesc: { type: 'string' },
    theme: { type: 'string' },
    fileroot: { type: 'string' },
    medium: { type: 'string' },
    large: { type: 'string' },
    ogImage: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    date: { type: 'date', required: true },
    lastmod: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    categories: {
      type: 'list',
      of: {
        type: 'enum',
        options: [categories.map((category) => category.title)],
      },
      required: true,
    },
    codepen: { type: 'boolean' },
    twitter: { type: 'boolean' },
    id: { type: 'number', required: true },
    status: {
      type: 'enum',
      options: ['draft', 'open', 'closed'],
      default: 'draft',
    },
  },
  computedFields: {
    // https://yusuf.fyi/posts/contentlayer-table-of-contents/
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
        const slugger = new GithubSlugger()
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content

            // Remove markdown links and HTML tags from the content
            const cleanContent = content
              ? content
                  .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
                  .replace(/<[^>]+>/g, '') // Remove HTML tags
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
          }
        )
        return headings
      },
    },
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    rssBody: {
      type: 'string',
      resolve: (doc) => {
        try {
          const result = compileMdxForRssWithMarked(doc.body.raw)
          if (!result) {
            console.warn(`RSS body is empty for ${doc._raw.flattenedPath}`)
            return doc.body.raw
          }
          return result
        } catch (error) {
          console.error(
            `Error compiling RSS body for ${doc._raw.flattenedPath}:`,
            error.message
          )
          return doc.body.raw
        }
      },
    },
    slug: {
      type: 'string',
      resolve: (doc) =>
        `/blog/${doc._raw.flattenedPath
          .split('/')
          .pop()
          .replace(/^\d{4}-/, '')}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.flattenedPath
          .split('/')
          .pop()
          .replace(/^\d{4}-/, ''),
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/${doc._raw.flattenedPath.replace(
            /^(blog\/)(?:\d{4}-)?/,
            '$1'
          )}`,
        },
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.ogImage ? doc.ogImage : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/blog/${doc._raw.flattenedPath
          .split('/')
          .slice(1)
          .join('/')
          .replace(/^(?:\d\d\d\d-)?/, '')}`,
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
      }),
    },
  },
}))

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `notes/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    status: {
      type: 'enum',
      options: ['draft', 'published'],
      default: 'published',
    },
    summary: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/notes/${doc._raw.flattenedPath.split('/').pop()}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').pop(),
    },
    rssBody: {
      type: 'string',
      resolve: (doc) => {
        try {
          const result = compileMdxForRssWithMarked(doc.body.raw)
          if (!result) {
            return doc.body.raw
          }
          return result
        } catch (error) {
          console.error(
            `Error compiling RSS body for note ${doc._raw.flattenedPath}:`,
            error.message
          )
          return doc.body.raw
        }
      },
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  contentDirExclude: ['./content/draft'],
  documentTypes: [Post, Page, Collections, Note],
  mdx: {
    remarkPlugins: [remarkGfm, remarkCodeTitles, smartypants],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['fragment'],
            ariaHidden: true,
            tabIndex: -1,
          },
        },
      ],
      [rehypePrism, { ignoreMissing: true }],
    ],
    // Add this configuration
    options: {
      jsx: true,
      providerImportSource: '@mdx-js/react',
    },
  },
})
