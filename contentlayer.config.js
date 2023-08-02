import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypePrism from 'rehype-prism-plus'
import remarkRehype from 'remark-rehype';
import remarkCodeTitles from 'remark-flexible-code-titles';
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

import { visit } from 'unist-util-visit'

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => '/' + doc._raw.flattenedPath,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
    },
    metadesc: {
      type: "string",
    },
    theme: {
      type: "string",
    },
    fileroot: {
      type: "string",
    },
    medium: {
      type: "string",
    },
    large: {
      type: "string",
    },
    ogImage: {
      type: "string",
    },
    images: {
      type: "list",
      of: { type: "string" },
    },
    date: {
      type: "date",
      required: true,
    },
    lastmod: {
      type: "date",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
    categories: {
      type: "list",
      of: { type: "string" },
    },
    codepen: {
      type: "boolean",
    },
    twitter: {
      type: "boolean",
    },
    id: {
      type: "number",
      required: true,
    },
    status: {
      type: 'enum',
      options: ['draft', 'open', 'closed'],
      default: 'draft',
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => '/' + doc._raw.flattenedPath.replace(/^(blog\/)(?:\d{4}\-)?/, '$1'),
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/").replace(/^(?:\d\d\d\d\-)?/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      smartypants,
      [
        remarkCodeTitles,
      ],
      remarkRehype,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["fragment"],
            ariaLabel: "Link to section",
          },
        },
      ],
      [rehypeToc, { customizeTOC }],
      rehypePrism,
    ],
  },
})

const customizeTOC = (toc) => {
  try {
    const { children } = toc;
    const childrenOfChildren = children?.[0]?.children;
    if (!children?.length || !childrenOfChildren?.length) return null;
  } catch (e) {}
  return {
    type: "element",
    tagName: "div",
    properties: { className: "toc" },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: "title" },
        children: [
          {
            type: "text",
            value: "Table of Contents",
          },
        ],
      },
      ...(toc.children || []),
    ],
  }
}
