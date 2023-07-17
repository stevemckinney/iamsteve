import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import smartypants from "remark-smartypants"
import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

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
  computedFields,
}))

/*
---
title: "11 resources for colour inspiration"
date: "2016-01-19T07:30:00+00:00"
lastmod: "2019-04-24T08:31:45+00:00"
summary: "Following on from the colour series I have a selection of websites that can help inspire your colour palettes. There is a variety between inspiration, resources and tools to pick colours."
metadesc: "11 resources, tools and guides that will help reinforce your colour knowledge."
theme: "#fff5f3"
tags: ["Design"]
categories: ["Design"]
images: ["/images/blog/colour-inspiration-featured-image@2x.png"]
large: "/images/blog/colour-inspiration-featured-image@2x.png"
medium: "/images/blog/colour-inspiration-featured-image-medium@2x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 110
fileroot: "11-resources-for-colour-inspiration"
---
*/

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
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      smartypants
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
    ],
  },
})
