import { defineCollection, defineConfig, s } from 'velite'

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

const computedFields = (data) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
})

export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post', // collection type name
      pattern: 'blog/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string('global').max(140), // Zod primitive type
          slug: s.slug('post'),
          date: s.isodate(), // input Date-like string, output ISO Date string.
          large: s.image().optional(), // input image relpath, output image object with blurImage.
          medium: s.image().optional(),
          theme: s.string(),
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.mdx(), // transform markdown to html
          codepen: s.boolean().optional(),
          twitter: s.boolean().optional(),
          categories: s.array(s.string()).default(['Website']),
          status: s
            .union([s.literal('draft'), s.literal('open'), s.literal('closed')])
            .default('draft'),
          body: s.mdx(),
          // reevaluate
          metadesc: s.string().nullish(),
          summary: s.string().nullish(),
          // unused beyond here
          fileroot: s.string('posts'),
          id: s.number('posts'),
          images: s.array(s.string()).nullish(),
        })
        // more additional fields (computed fields)
        .transform((data) => ({
          ...data,
          slugAsParams: `${data.slug.replace(/^(blog\/)(?:\d{4}-)?/, '$1')}`,
        })),
    },
    pages: {
      name: 'Page', // collection type name
      pattern: 'pages/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(140), // Zod primitive type
          slug: s.slug('page'),
          description: s.string().max(140).nullish(),
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          body: s.mdx(), // transform markdown to html
        })
        // more additional fields (computed fields)
        .transform((data) => ({
          ...data,
          slugAsParams: data.slug.split('/').slice(1).join('/'),
        })),
    },
    categories: {
      name: 'Category',
      pattern: 'categories/index.yml',
      schema: s
        .object({
          name: s.string().max(32),
          slug: s.slug('global'),
          description: s.string().max(140).nullish(),
          count,
        })
        .transform((data) => ({
          ...data,
          slugAsParams: data.slug.split('/').slice(1).join('/'),
        })),
    },
  },
  prepare: ({ categories, tags, posts }) => {
    const docs = posts.filter(
      (i) =>
        process.env.NODE_ENV !== 'production' ||
        !i.status.includes('draft') ||
        !i.status.includes('closed')
    )

    // missing categories, tags from posts or courses inlined
    const categoriesFromDoc = Array.from(
      new Set(docs.map((item) => item.categories).flat())
    ).filter((i) => categories.find((j) => j.name === i) == null)
    categories.push(
      ...categoriesFromDoc.map((name) => ({
        name,
        slug: slugify(name),
        permalink: '',
        count: { total: 0, posts: 0 },
      }))
    )
    categories.forEach((i) => {
      i.count.posts = posts.filter((j) => j.categories.includes(i.name)).length
      i.count.total = i.count.posts
      i.permalink = `/${i.slug}`
    })
  },
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
