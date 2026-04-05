import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

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
import { shikiLightTheme, shikiDarkTheme } from './lib/shiki-theme.js'
import {
  transformerCSSPartialProperties,
  transformerCSSThemeDirective,
  transformerLineNumbers,
} from './lib/shiki-transformers.js'
import rehypeHeadingLinks from './lib/rehype-heading-links.js'
import remarkCodeTitles from './lib/remark-code-title.js'
import remarkChat from './lib/remark-chat.js'

export default defineConfig({
  site: 'https://iamsteve.me',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm, remarkCodeTitles, smartypants, remarkChat],
    rehypePlugins: [
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
    ],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  redirects: {
    '/blog/how-to-use-kerning-tracking': '/blog/kerning-vs-tracking',
    '/blog/entry/horizontal-scrolling-responsive-menu': '/blog/horizontal-scrolling-responsive-menu',
    '/blog/about_version_six': '/blog/about-version-six',
    '/blog/compass_mixins_you_should_know_about': '/blog/compass-mixins-you-should-know-about',
    '/downloads': '/',
    '/blog/entry/buttons': '/blog/buttons',
    '/blog/my_svg_workflow_from_awkward_to_simple': '/blog/my-svg-workflow-from-awkward-to-simple',
    '/blog/typekit-gems': '/blog/typekit-gems-number-one',
    '/blog/stop-headroom.js-hiding-when-your-navigation-is-open': '/blog/stop-headroom-hiding-when-your-navigation-is-open',
    '/blog/inline_block': '/blog/inline-block',
    '/blog/entry/inline_block': '/blog/inline-block',
    '/blog/using_scale_color_in_sass': '/blog/using-scale-color-in-sass',
    '/blog/entry/using_scale_color_in_sass': '/blog/using-scale-color-in-sass',
    '/blog/create_a_sass_button_element_mixin': '/blog/create-a-sass-button-element-mixin',
    '/blog/entry/create_a_sass_button_element_mixin': '/blog/create-a-sass-button-element-mixin',
    '/blog/entry/[...slug]': '/blog/[...slug]',
    '/rss': '/feed.xml',
    '/public/feed': '/feed.xml',
    '/feed': '/feed.xml',
    '/feeds': '/feed.xml',
    '/blog/feed': '/feed.xml',
    '/static/favicon.ico': '/favicon.ico',
    '/design': '/category/design',
    '/portfolio': '/about',
    '/blog/{site_url}': '/blog',
    // '/category/css/page/[num]' redirect handled by Vercel
    '/mo': '/',
    '/blog/entry/sass_hints_tips': '/blog/sass-hints-and-tips',
    '/2': '/',
    '/subscribe': '/newsletter',
    '/blog/about-version-6': '/blog/about-version-six',
    '/blog/category/[slug]': '/category/[slug]',
    '/category/everything': '/blog',
  },
  vite: {
    css: {
      postcss: './postcss.config.cjs',
    },
  },
})
