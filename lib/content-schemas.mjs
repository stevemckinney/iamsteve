/**
 * Frontmatter schemas for every content collection.
 *
 * These live apart from content-collections.ts so scripts/validate-content.mjs
 * can check a file against the same rules the build uses. One copy means a
 * note that passes the pre-commit check cannot then fail on Vercel.
 *
 * The .mjs extension is deliberate: package.json has no "type": "module", so
 * a plain node script can only import this file if it says so in the name.
 */
import { z } from 'zod'

export const postSchema = z.object({
  content: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  metadesc: z.string().optional(),
  theme: z.string().optional(),
  fileroot: z.string().optional(),
  medium: z.string().optional(),
  large: z.string().optional(),
  ogImage: z.string().optional(),
  images: z.array(z.string()).nullable().optional(),
  date: z.string(),
  lastmod: z.string(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()),
  codepen: z.boolean().optional(),
  twitter: z.boolean().optional(),
  id: z.number(),
  status: z.enum(['draft', 'open', 'closed', 'unlisted']).default('draft'),
  noindex: z.boolean().optional(),
})

export const noteSchema = z.object({
  content: z.string(),
  title: z.string(),
  date: z.string(),
  status: z.enum(['draft', 'published']).default('draft'),
  summary: z.string().nullable().optional(),
})

export const collectionSchema = z.object({
  content: z.string(),
  title: z.string(),
  url: z.string(),
  date: z.string(),
  collection: z.array(z.string()).optional(),
  kind: z
    .enum(['website', 'article', 'resource', 'tool'])
    .default('website')
    .optional(),
})

export const pageSchema = z.object({
  content: z.string(),
  title: z.string(),
  description: z.string().optional(),
  slot: z.string().optional(),
})
