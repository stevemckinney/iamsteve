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
import { shikiLightTheme, shikiDarkTheme } from './shiki-theme.js'
import {
  transformerCSSPartialProperties,
  transformerCSSThemeDirective,
  transformerLineNumbers,
} from './shiki-transformers.js'
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
      themes: {
        light: shikiLightTheme,
        dark: shikiDarkTheme,
      },
      defaultColor: false,
      defaultLanguage: 'text',
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
        transformerCSSPartialProperties(),
        transformerCSSThemeDirective(),
        transformerLineNumbers(),
      ],
      parseMetaString: (str) => {
        const meta = {}
        const lineNumMatch = str.match(/showLineNumbers(?:=(\d+))?/)
        if (lineNumMatch) {
          meta.showLineNumbers = true
          if (lineNumMatch[1]) {
            meta.startLineNumber = parseInt(lineNumMatch[1], 10)
          }
        }
        return meta
      },
    },
  ],
]
