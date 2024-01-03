import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import path from 'path'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import parse from 'rehype-parse'
import slug from 'rehype-slug'
import stringify from 'rehype-stringify'

// import rehypeToc from '@jsdevtools/rehype-toc'
// import rehypeCitation from 'rehype-citation'

// import rehypePrism from 'rehype-prism-plus'
import remarkCodeTitles from './lib/remark-code-title'
// import customizeTOC from './lib/customise-toc'

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
    categories: { type: 'list', of: { type: 'string' }, required: true },
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
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: 'string',
      resolve: (doc) =>
        '/' + doc._raw.flattenedPath.replace(/^(blog\/)(?:\d{4}-)?/, '$1'),
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) =>
        doc._raw.flattenedPath
          .split('/')
          .slice(1)
          .join('/')
          .replace(/^(?:\d\d\d\d-)?/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  contentDirExclude: ['./content/draft'],
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm, smartypants, [remarkCodeTitles], remarkRehype],
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
      [
        rehypePrettyCode,
        {
          theme: 'css-variables',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line-highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word-highlighted']
          },
        },
      ],
      // [rehypeCitation, { path: path.join(root, 'data') }],
      // [rehypePrism, { ignoreMissing: true }],
      // [rehypeToc, { customizeTOC }],
    ],
  },
})
