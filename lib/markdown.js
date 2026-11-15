// The remark and rehype plugins all content is compiled with, in order.
// Both builds read this during the move to Astro (content-collections.ts for
// Next.js, astro.config.mjs for Astro), so they render the same HTML.
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import rehypeSlug from 'rehype-slug'
import rehypeShiki from '@shikijs/rehype'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { codeTheme, codeTransformers } from '@parchment/ui/shiki'
import rehypeHeadingLinks from './rehype-heading-links.js'
import remarkCodeTitles from './remark-code-title.js'
import remarkChat from './remark-chat.js'

export const remarkPlugins = [
  remarkGfm,
  remarkCodeTitles,
  smartypants,
  remarkChat,
]

export const rehypePlugins = [
  rehypeSlug,
  rehypeHeadingLinks,
  [
    rehypeShiki,
    {
      // One theme for light and dark: its colours are the --color-code-* tokens in css/shiki.css
      theme: codeTheme,
      defaultLanguage: 'text',
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
        ...codeTransformers(),
      ],
    },
  ],
]
