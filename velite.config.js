import { defineCollection, defineConfig, s } from 'velite'

import siteMetadata from './content/metadata'
import categories from './content/categories'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import parse from 'rehype-parse'
import stringify from 'rehype-stringify'

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const icon = s.enum(['github', 'instagram', 'medium', 'twitter', 'youtube'])
const count = s.object({ total: s.number(), posts: s.number() }).default({ total: 0, posts: 0 })

const meta = s
  .object({
    title: s.string().optional(),
    description: s.string().optional(),
    keywords: s.array(s.string()).optional()
  })
  .default({})

const options = defineCollection({
  name: 'Options',
  pattern: 'options/index.yml',
  single: true,
  schema: s.object({
    name: s.string().max(20),
    title: s.string().max(99),
    description: s.string().max(999).optional(),
    keywords: s.array(s.string()),
    author: s.object({ name: s.string(), email: s.string().email(), url: s.string().url() }),
    links: s.array(s.object({ text: s.string(), link: s.string(), type: s.enum(['navigation', 'footer', 'copyright']) })),
    socials: s.array(s.object({ name: s.string(), icon, link: s.string().optional(), image: s.image().optional() }))
  })
})

const categories = defineCollection({
  name: 'Category',
  pattern: 'categories/*.yml',
  schema: s
    .object({
      name: s.string().max(20),
      slug: s.slug('global', ['admin', 'login']),
      cover: s.image().optional(),
      description: s.string().max(999).optional(),
      count
    })
    .transform(data => ({ ...data, permalink: `/${data.slug}` }))
})

const tags = defineCollection({
  name: 'Tag',
  pattern: 'tags/index.yml',
  schema: s
    .object({
      name: s.string().max(20),
      slug: s.slug('global', ['admin', 'login']),
      cover: s.image().optional(),
      description: s.string().max(999).optional(),
      count
    })
    .transform(data => ({ ...data, permalink: `/${data.slug}` }))
})

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('global', ['admin', 'login']),
      body: s.mdx()
    })
    .transform((data, { meta }) => ({ ...data, permalink: `/${data.slug}`, path: meta.path }))
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.md',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('post'),
      date: s.isodate(),
      updated: s.isodate().optional(),
      cover: s.image().optional(),
      video: s.file().optional(),
      description: s.string().max(999).optional(),
      draft: s.boolean().default(false),
      featured: s.boolean().default(false),
      categories: s.array(s.string()).default(['Journal']),
      tags: s.array(s.string()).default([]),
      meta: meta,
      toc: s.toc(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown()
    })
    .transform(data => ({ ...data, permalink: `/blog/${data.slug}` }))
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: { options, categories, tags, pages, posts },
  markdown: { rehypePlugins: [rehypePrettyCode] },
  prepare: ({ categories, tags, posts }) => {
    const docs = posts.filter(i => process.env.NODE_ENV !== 'production' || !i.draft)

    // missing categories, tags from posts or courses inlined
    const categoriesFromDoc = Array.from(new Set(docs.map(item => item.categories).flat())).filter(i => categories.find(j => j.name === i) == null)
    categories.push(...categoriesFromDoc.map(name => ({ name, slug: slugify(name), permalink: '', count: { total: 0, posts: 0 } })))
    categories.forEach(i => {
      i.count.posts = posts.filter(j => j.categories.includes(i.name)).length
      i.count.total = i.count.posts
      i.permalink = `/${i.slug}`
    })

    const tagsFromDoc = Array.from(new Set(docs.map(item => item.tags).flat())).filter(i => tags.find(j => j.name === i) == null)
    tags.push(...tagsFromDoc.map(name => ({ name, slug: slugify(name), permalink: '', count: { total: 0, posts: 0 } })))
    tags.forEach(i => {
      i.count.posts = posts.filter(j => j.tags.includes(i.name)).length
      i.count.total = i.count.posts
      i.permalink = `/${i.slug}`
    })

    // return false // return false to prevent velite from writing data to disk
  }
})

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

/*

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

*/
export default defineConfig({
  collections: {
    posts: {
      name: 'Post', // collection type name
      pattern: 'blog/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug('posts'), // validate format, unique in posts collection
          date: s.isodate(), // input Date-like string, output ISO Date string.
          large: s.image().optional(), // input image relpath, output image object with blurImage.
          medium: s.image().optional(),
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown(), // transform markdown to html
          codepen: s.boolean().optional(),
          twitter: s.boolean().optional(),
          categories: s.union([
            categories.map((category) => z.literal(category.title)),
          ]),
          status: s
            .union([z.literal('draft'), z.literal('open'), z.literal('closed')])
            .default('draft'),
        })
        // more additional fields (computed fields)
        .transform((data) => ({
          ...data,
          permalink: `/blog/${data.slug.replace(/^(blog\/)(?:\d{4}-)?/, '$1')}`,
        })),
    },
    pages: {
      name: 'Post', // collection type name
      pattern: 'blog/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug('posts'), // validate format, unique in posts collection
          date: s.isodate(), // input Date-like string, output ISO Date string.
          cover: s.image().optional(), // input image relpath, output image object with blurImage.
          video: s.file().optional(), // input file relpath, output file public path.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown(), // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform((data) => ({ ...data, permalink: `${data.slug}` })),
    },
  },
})
