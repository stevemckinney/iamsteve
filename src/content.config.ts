import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    summary: z.string().optional(),
    metadesc: z.string().optional(),
    theme: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()),
    status: z.enum(['draft', 'open', 'closed']).default('draft'),
    id: z.number(),
    codepen: z.boolean().optional(),
    twitter: z.boolean().optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().optional(),
    fileroot: z.string().optional(),
    medium: z.string().optional(),
    large: z.string().optional(),
    images: z.array(z.string()).nullable().optional(),
  }),
})

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().nullable().optional(),
    status: z.enum(['draft', 'published']).default('published'),
  }),
})

const collectionsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/collections' }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    date: z.coerce.date(),
    collection: z.array(z.string()).optional(),
    kind: z
      .enum(['website', 'article', 'resource', 'tool'])
      .default('website')
      .optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slot: z.string().optional(),
  }),
})

export const collections = { blog, notes, collections: collectionsCollection, pages }
