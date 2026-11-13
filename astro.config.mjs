import { createHash } from 'node:crypto'
import path from 'node:path'
import { defineConfig, envField } from 'astro/config'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import { Features } from 'lightningcss'
import { unified } from '@astrojs/markdown-remark'
import { remarkPlugins, rehypePlugins } from './lib/markdown.js'
import remarkDropKeys from './src/lib/remark-drop-keys.js'

// Server values for the endpoints that run on demand, read when they run.
// They keep the names Vercel has today until the cutover renames them.
// Pages read what they need at build through import.meta.env, and islands
// get flags as props
const secret = () =>
  envField.string({ context: 'server', access: 'secret', optional: true })

export default defineConfig({
  site: 'https://iamsteve.me',
  // /blog/ redirects to /blog, as it does on the Next.js site
  trailingSlash: 'never',
  // Pages are prerendered. Routes with prerender = false run in one function
  adapter: vercel(),
  integrations: [react(), mdx()],
  env: {
    schema: {
      NEXT_PUBLIC_SUPABASE_URL: secret(),
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: secret(),
      NEXT_PUBLIC_ENABLE_VIEW_COUNTING: secret(),
      NEXT_PUBLIC_ENABLE_TURNSTILE: secret(),
      TURNSTILE_SECRET_KEY: secret(),
      CLOUDFLARE_ACCOUNT_ID: secret(),
      CLOUDFLARE_EMAIL_TOKEN: secret(),
      CONTACT_TO: secret(),
      EMAILOCTOPUS_API_URL: secret(),
      EMAILOCTOPUS_API_KEY: secret(),
      EMAILOCTOPUS_LIST_ID: secret(),
      VERCEL_ENV: secret(),
    },
  },
  markdown: {
    // Shiki runs as a rehype plugin, with the site’s own themes and transformers
    syntaxHighlight: false,
    // Astro 7 defaults to Sätteri, which doesn’t run remark or rehype plugins.
    // unified() keeps the pipeline content-collections uses, and its own GFM
    // and smartypants are off so the versions in lib/markdown.js run instead
    processor: unified({
      gfm: false,
      smartypants: false,
      remarkPlugins: [...remarkPlugins, remarkDropKeys],
      rehypePlugins,
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    // Astro gathers CSS in its server build, which targets Node, so CSS
    // modules would ship their nesting as written. Minify with the targets
    // and features Tailwind’s own optimiser uses, which flattened them in
    // the Next.js build
    build: { cssTarget: ['chrome111', 'firefox128', 'safari16.4', 'ios16.4'] },
    css: {
      lightningcss: {
        include: Features.Nesting | Features.MediaQueries,
        exclude:
          Features.LogicalProperties | Features.DirSelector | Features.LightDark,
      },
      // postcss.config.js runs Tailwind for Next.js. An inline config stops
      // Vite loading it, so Tailwind doesn’t run twice
      postcss: { plugins: [] },
      // Named like Next.js’s, six characters and the class, so parity
      // checks can match them. Digits become letters, as a class can’t
      // start with one
      modules: {
        generateScopedName: (name, filename) => {
          const file = path.relative(process.cwd(), filename)
          const hash = createHash('sha256').update(file).digest('hex')
          return `${hash
            .slice(0, 6)
            .replace(/\d/g, (d) => 'ghijklmnop'[d])}_${name}`
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
