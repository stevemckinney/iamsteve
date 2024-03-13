import { defineCollection, defineConfig, s } from 'velite'

import siteMetadata from './content/metadata'

import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import stringify from 'rehype-stringify'
import rehypePrism from 'rehype-prism-plus'
import remarkCodeTitles from './lib/remark-code-title'

const slugify = (input) =>
  input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const count = s
  .object({ total: s.number(), posts: s.number() })
  .default({ total: 0, posts: 0 })

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.md',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(),
      categories: s.array(s.string()).default(['Website']),
      date: s.isodate(),
      lastmod: s.isodate(),
      metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
      excerpt: s.excerpt(), // excerpt of markdown content
      body: s.mdx(),
      status: s
        .union([s.literal('draft'), s.literal('open'), s.literal('closed')])
        .default('draft'),
      large: s.image().optional(), // input image relpath, output image object with blurImage.
      medium: s.image().optional(),
      theme: s.string(),
      codepen: s.boolean().optional(),
      twitter: s.boolean().optional(),
      // reevaluate
      metadesc: s.string().nullish(),
      summary: s.string().nullish(),
      // unused beyond here
      fileroot: s.string('posts'),
      id: s.number('posts'),
      images: s.array(s.string()).nullish(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^(blog\/)(?:\d{4}-)?/, '$1'),
      slugAsParams: data.slug
        .split('/')
        .slice(1)
        .join('/')
        .replace(/^(?:\d\d\d\d-)?/, ''),
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteMetadata.siteUrl}/${data.slug.replace(
            /^(blog\/)(?:\d{4}-)?/,
            '$1'
          )}`,
        },
        headline: data.title,
        datePublished: data.date,
        dateModified: data.lastmod || data.date,
        description: data.summary,
        image: data.ogImage ? data.ogImage : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/blog/${data.slug
          .split('/')
          .slice(1)
          .join('/')
          .replace(/^(?:\d\d\d\d-)?/, '')}`,
        author: [
          {
            '@type': 'Person',
            name: 'Steve McKinney',
          },
        ],
        publisher: [
          {
            '@type': 'Organization',
            name: 'Steve',
            logo: {
              '@type': 'ImageObject',
              url: `${siteMetadata.siteUrl}/images/logo.svg`,
            },
          },
        ],
      },
    })),
})

const pages = defineCollection({
  name: 'Page',
  pattern: 'page/**/*.md',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.path(),
      description: s.string().max(999).optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split('/').slice(1).join('/'),
    })),
})

const categories = defineCollection({
  name: 'Category',
  pattern: 'categories/index.yml',
  schema: s
    .object({
      title: s.string().max(32),
      slug: s.slug('global'),
      description: s.string().max(140).nullish(),
      count,
    })
    .transform((data) => ({
      ...data,
      slug: `category/${data.slug}`,
      slugAsParams: data.slug.split('/').slice(1).join('/'),
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, pages, categories },
  mdx: {
    remarkPlugins: [remarkGfm, remarkCodeTitles, smartypants, remarkRehype],
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
  },
})
