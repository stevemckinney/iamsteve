import { createHash } from 'node:crypto'
import path from 'node:path'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { unified } from '@astrojs/markdown-remark'
import { remarkPlugins, rehypePlugins } from './lib/markdown.js'

export default defineConfig({
  site: 'https://iamsteve.me',
  // /blog/ redirects to /blog, as it does on the Next.js site
  trailingSlash: 'never',
  integrations: [react(), mdx()],
  markdown: {
    // Shiki runs as a rehype plugin, with the site’s own themes and transformers
    syntaxHighlight: false,
    // Astro 7 defaults to Sätteri, which doesn’t run remark or rehype plugins.
    // unified() keeps the pipeline content-collections uses, and its own GFM
    // and smartypants are off so the versions in lib/markdown.js run instead
    processor: unified({
      gfm: false,
      smartypants: false,
      remarkPlugins,
      rehypePlugins,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    // postcss.config.js runs Tailwind for Next.js. An inline config stops
    // Vite loading it, so Tailwind doesn’t run twice
    css: {
      postcss: { plugins: [] },
      // Named like Next.js’s, six characters and the class, so parity
      // checks can match them. Digits become letters, as a class can’t
      // start with one
      modules: {
        generateScopedName: (name, filename) => {
          const file = path.relative(process.cwd(), filename)
          const hash = createHash('sha256').update(file).digest('hex')
          return `${hash.slice(0, 6).replace(/\d/g, (d) => 'ghijklmnop'[d])}_${name}`
        },
      },
    },
    // While Next.js is installed, shamefully-hoist puts @supabase/ssr’s
    // cookie 0.7 at the root, where Astro’s server bundles would find it
    // instead of its own 2.x. Bundling it avoids that until the cutover
    environments: {
      ssr: { resolve: { noExternal: ['cookie'] } },
      prerender: { resolve: { noExternal: ['cookie'] } },
    },
  },
})
