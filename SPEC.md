# Next.js to Astro migration spec

## Overview

Migrate iamsteve.me from Next.js 16 (App Router) to Astro with hybrid rendering. Full parity migration on a clean branch, keeping React for interactive islands. Hosted on Vercel.

**Current stack:** Next.js 16, React 19, Tailwind v4, @content-collections, Supabase, EmailOctopus
**Target stack:** Astro (hybrid), React 19 (islands only), Tailwind v4, Astro content collections, Supabase, EmailOctopus

---

## Decisions summary

| Area | Decision |
|------|----------|
| Rendering | Hybrid (static default, SSR for API endpoints) |
| UI framework | React (islands for interactive components) |
| Hosting | Vercel (Astro Vercel adapter) |
| API routes | Astro server endpoints |
| View counter | Client-side React island (static post pages) |
| Redirects | Astro config primary + vercel.json fallback |
| Content | Astro native content collections |
| Styling | Tailwind v4 + Astro scoped styles (no CSS Modules) |
| MDX components | Astro for static, React islands for interactive |
| Search | Static JSON index generated at build time |
| Fonts | Keep Adobe Typekit |
| Scripts | Astro native `<script>` tags |
| Layouts | Named layouts (BlogLayout, PostLayout, PageLayout) |
| Navigation | View Transitions API |
| Drafts | Astro native draft flag |
| RSS | Replicate current feed exactly (@astrojs/rss) |
| Images | No format conversion (no WebP). Astro Image for note images only. Blog images served as-is (PNG/SVG) |
| Pagination | Static pages via paginate() |
| Icons | Try astro-icon first, keep sprite system as fallback |
| Newsletter | React island + Astro server endpoint |
| Dark mode | System preference only (prefers-color-scheme) |
| Shiki | Custom rehype plugin (not Astro built-in) |
| SEO | Custom Head.astro component |
| Dev scripts | Update for Astro schema |
| Migration | Clean branch, full parity, big bang |
| Testing | Visual regression + link checking + E2E + manual QA |

---

## Architecture

### Rendering mode

Astro hybrid mode (`output: 'hybrid'` in astro.config.mjs). All pages are static by default. Only API endpoints opt into SSR via `export const prerender = false`.

Static pages:
- Home, blog listing, blog posts, category pages, notes, collections, about, newsletter, thanks, contact
- All pagination routes (/blog/page/2, /category/design/page/2, etc.)
- RSS feed, sitemap, robots.txt, llms.txt

Server-rendered endpoints:
- POST /api/newsletter (EmailOctopus proxy)
- GET /api/newsletter/count (subscriber count)
- POST /api/views/[slug] (Supabase view increment)
- GET /api/views/[slug] (Supabase view fetch)

### Astro adapter

```
@astrojs/vercel
```

Vercel adapter handles deployment, serverless functions for SSR endpoints, and static asset serving.

### Integrations required

```
@astrojs/react        - React islands
@astrojs/mdx          - MDX content
@astrojs/tailwind     - Tailwind v4
@astrojs/sitemap      - Sitemap generation
@astrojs/rss          - RSS feed (used programmatically)
astro-icon            - Icon system (primary)
```

---

## Project structure

```
/
├── astro.config.mjs
├── tailwind.config.mjs (or CSS-based v4 config)
├── tsconfig.json
├── package.json
├── public/
│   ├── images/          (unchanged)
│   ├── icon/16/         (source SVGs, kept for fallback sprite)
│   ├── icon/24/         (source SVGs, kept for fallback sprite)
│   └── favicons/
├── src/
│   ├── content/
│   │   ├── config.ts         (Astro content collection schemas)
│   │   ├── blog/             (moved from /content/blog)
│   │   ├── notes/            (moved from /content/notes)
│   │   ├── collections/      (moved from /content/collections)
│   │   └── pages/            (moved from /content/pages)
│   ├── layouts/
│   │   ├── Base.astro        (html/head/body shell)
│   │   ├── Blog.astro        (blog listing layout)
│   │   ├── Post.astro        (single post with sidebar)
│   │   └── Page.astro        (generic page)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── page/[page].astro
│   │   │   ├── drafts.astro
│   │   │   └── [...slug].astro
│   │   ├── notes/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       ├── index.astro
│   │   │       └── page/[page].astro
│   │   ├── collections/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── newsletter.astro
│   │   ├── thanks.astro
│   │   ├── [...slug].astro       (catch-all for pages)
│   │   ├── feed.xml.ts           (RSS endpoint)
│   │   ├── sitemap-index.xml.ts  (if not using integration)
│   │   ├── robots.txt.ts
│   │   ├── llms.txt.ts
│   │   └── api/
│   │       ├── newsletter.ts
│   │       ├── newsletter/count.ts
│   │       └── views/[slug].ts
│   ├── components/
│   │   ├── Head.astro            (SEO/meta/structured data)
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── Card.astro
│   │   ├── Icon.astro            (astro-icon wrapper)
│   │   ├── mdx/                  (MDX component overrides)
│   │   │   ├── Blockquote.astro
│   │   │   ├── Code.astro
│   │   │   ├── Image.astro
│   │   │   ├── Link.astro
│   │   │   └── List.astro
│   │   ├── react/                (client-side React islands)
│   │   │   ├── Search.tsx
│   │   │   ├── NavigationMobile.tsx
│   │   │   ├── NewsletterForm.tsx
│   │   │   ├── ViewCounter.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── CopyCode.tsx
│   │   │   ├── CopyLink.tsx
│   │   │   ├── FigureModal.tsx
│   │   │   ├── CategoryTabs.tsx
│   │   │   ├── CategorySelect.tsx
│   │   │   ├── CodePen.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── PostLayoutFrame.tsx
│   │   │   ├── SidebarToggle.tsx
│   │   │   ├── Popular.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── shiki-theme.js       (unchanged)
│   │   ├── shiki-plugin.ts      (custom rehype plugin)
│   │   ├── supabase.ts
│   │   ├── metadata.ts
│   │   └── utils/
│   ├── css/
│   │   ├── primitives.css
│   │   ├── theme.css
│   │   ├── utilities.css
│   │   ├── code.css
│   │   ├── shiki.css
│   │   └── typography.css
│   └── icons/                    (astro-icon local set)
│       ├── 16/
│       └── 24/
├── scripts/
│   ├── generate-icon-sprite.js   (fallback)
│   ├── compose-post.js           (updated for Astro schema)
│   ├── compose-note.js           (updated for Astro schema)
│   ├── validate-links.js
│   └── generate-search-index.ts  (build-time search index)
└── tests/
    ├── e2e/
    └── regression/
```

---

## Content collections

### Schema definitions (src/content/config.ts)

**Posts collection** (`src/content/blog/`):

```ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
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
    images: z.array(z.string()).optional(),
  }),
})
```

- `draft` status maps to Astro's draft concept — excluded from production builds
- Slug generation: strip the numeric prefix from filename (e.g. `0168-nice-and-easy-lazy-loading.md` becomes `nice-and-easy-lazy-loading`)

**Notes collection** (`src/content/notes/`):

```ts
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    status: z.enum(['draft', 'published']).default('published'),
  }),
})
```

**Collections collection** (`src/content/collections/`):

```ts
const collections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    date: z.coerce.date(),
    collection: z.array(z.string()).default([]),
    kind: z.enum(['website', 'article', 'resource', 'tool']).default('website'),
  }),
})
```

**Pages collection** (`src/content/pages/`):

```ts
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
})
```

### Content file changes

- Move `/content/blog/` to `/src/content/blog/`
- Move `/content/notes/` to `/src/content/notes/`
- Move `/content/collections/` to `/src/content/collections/`
- Move `/content/pages/` to `/src/content/pages/`
- MDX files remain unchanged — Astro's MDX integration handles compilation
- Slug generation handled via a custom `slug` function in the collection config or via `getStaticPaths`

### Computed fields (handled at query time, not in schema)

These fields were computed in `content-collections.ts` and need to be replicated as utility functions:

- **Reading time**: Calculate from content length at render time
- **Headings**: Extract from rendered MDX for table of contents
- **RSS body**: Compile markdown to HTML via `marked` for feed generation
- **Structured data**: Generate JSON-LD at render time in Head.astro

---

## Component migration

### Static components (convert to .astro)

These are server-rendered only and should become .astro files:

| Current (React) | Target (Astro) | Notes |
|-----------------|----------------|-------|
| `components/header.js` | `Navigation.astro` | Active state via `Astro.url.pathname` |
| `components/footer.js` | `Footer.astro` | |
| `components/footer-profile.js` | `FooterProfile.astro` | |
| `components/hero.js` | `Hero.astro` | |
| `components/card.js` (+ card/) | `Card.astro` | |
| `components/page.js` | Absorbed into layouts | |
| `components/PageHeader.js` | `PageHeader.astro` | |
| `components/PageTitle.js` | `PageTitle.astro` | |
| `components/Badge.js` | `Badge.astro` | |
| `components/Category.js` | `Category.astro` | |
| `components/Tag.js` | `Tag.astro` | |
| `components/Figure.js` | `Figure.astro` | |
| `components/Image.js` | `Image.astro` | |
| `components/Link.js` | `Link.astro` | |
| `components/SEO.js` | `Head.astro` | SEO meta, OG, structured data |
| `components/mdx-post.js` | Inline in Post.astro | Astro renders MDX natively |
| `components/icon/index.js` | `Icon.astro` | Wrap astro-icon, fallback to sprite |

### Interactive components (keep as React islands)

These use client-side state/effects and stay as React with `client:` directives:

| Component | Astro directive | Rationale |
|-----------|----------------|-----------|
| `Search.js` | `client:idle` | Non-critical, load when idle |
| `NavigationMobile` (from header.js) | `client:media="(max-width: 768px)"` | Only needed on mobile |
| `NewsletterForm.js` | `client:visible` | Load when scrolled into view |
| `ViewCounter` (new) | `client:idle` | Fetches/increments view count |
| `TableOfContents` (collapsible + heading-list) | `client:idle` | Scroll tracking, collapsible |
| `CopyCode.js` | `client:visible` | Clipboard API |
| `CopyLink.js` | `client:visible` | Clipboard API |
| `FigureModal.js` | `client:visible` | Click-to-expand images |
| `CategoryTabs.js` | `client:load` | Navigation interaction |
| `CategorySelect.js` | `client:load` | Dropdown interaction |
| `CodePen.tsx` | `client:visible` | Third-party embed |
| `ContactForm.js` | `client:visible` | Form interaction |
| `Pagination.js` | `client:load` | Navigation |
| `PostLayoutFrame.js` | `client:load` | Layout interaction |
| `SidebarToggle.js` | `client:media="(max-width: 1024px)"` | Mobile sidebar |
| `Popular.js` | `client:visible` | SWR data fetching |
| `Modal.js` | `client:idle` | React Aria dialog |
| `ErrorBoundary.js` | `client:load` | Error catching |

### MDX component mapping

In Astro, MDX components are passed via the `components` prop or configured globally. Static MDX overrides become .astro files:

```astro
<!-- In Post.astro layout -->
---
import Blockquote from '@/components/mdx/Blockquote.astro'
import CodeBlock from '@/components/mdx/Code.astro'
import MdxImage from '@/components/mdx/Image.astro'
import MdxLink from '@/components/mdx/Link.astro'
// React islands for interactive MDX components
import CodePen from '@/components/react/CodePen'
import ContactForm from '@/components/react/ContactForm'
---

<Content components={{
  blockquote: Blockquote,
  pre: CodeBlock,
  img: MdxImage,
  a: MdxLink,
  CodePen,
  ContactForm,
}} />
```

---

## Routing

### Page routes

| URL pattern | Astro file | Source |
|-------------|-----------|--------|
| `/` | `src/pages/index.astro` | Home page |
| `/blog` | `src/pages/blog/index.astro` | Blog listing (page 1) |
| `/blog/page/[page]` | `src/pages/blog/page/[page].astro` | Blog pagination |
| `/blog/drafts` | `src/pages/blog/drafts.astro` | Draft posts (dev only) |
| `/blog/[...slug]` | `src/pages/blog/[...slug].astro` | Single blog post |
| `/notes` | `src/pages/notes/index.astro` | Notes listing |
| `/notes/[...slug]` | `src/pages/notes/[...slug].astro` | Single note |
| `/category/[slug]` | `src/pages/category/[slug]/index.astro` | Category listing |
| `/category/[slug]/page/[page]` | `src/pages/category/[slug]/page/[page].astro` | Category pagination |
| `/collections` | `src/pages/collections/index.astro` | Collections listing |
| `/collections/[...slug]` | `src/pages/collections/[...slug].astro` | Single collection |
| `/newsletter` | `src/pages/newsletter.astro` | Newsletter signup |
| `/thanks` | `src/pages/thanks.astro` | Confirmation page |
| `/[...slug]` | `src/pages/[...slug].astro` | Catch-all (about, contact, uses) |

### API endpoints

| URL pattern | Astro file | Method | SSR |
|-------------|-----------|--------|-----|
| `/api/newsletter` | `src/pages/api/newsletter.ts` | POST | Yes |
| `/api/newsletter/count` | `src/pages/api/newsletter/count.ts` | GET | Yes |
| `/api/views/[slug]` | `src/pages/api/views/[slug].ts` | GET/POST | Yes |
| `/feed.xml` | `src/pages/feed.xml.ts` | GET | No (static) |
| `/sitemap-index.xml` | Via @astrojs/sitemap | GET | No (static) |
| `/robots.txt` | `src/pages/robots.txt.ts` | GET | No (static) |
| `/llms.txt` | `src/pages/llms.txt.ts` | GET | No (static) |

### Static data endpoints (build time)

| URL pattern | Astro file | Notes |
|-------------|-----------|-------|
| `/search-index.json` | Generated by build script | Static JSON, replaces /api/search |

### Pagination implementation

Use Astro's `paginate()` in `getStaticPaths`:

```ts
// src/pages/blog/page/[page].astro
export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog', ({ data }) =>
    data.status === 'open'
  )
  const sorted = posts.sort((a, b) => b.data.date - a.data.date)
  return paginate(sorted, { pageSize: 12 })
}
```

Category pagination follows the same pattern with an additional slug parameter.

---

## Redirects

### Astro config redirects (astro.config.mjs)

All 70+ redirects from next.config.js converted to Astro format:

```ts
export default defineConfig({
  redirects: {
    '/blog/entry/[...slug]': '/blog/[...slug]',
    '/blog/how-to-use-kerning-tracking': '/blog/kerning-vs-tracking',
    '/portfolio': '/about',
    '/design': '/category/design',
    // ... all 70+ redirects
  },
})
```

### Vercel fallback (vercel.json)

Legacy redirects and junk request handling (WordPress paths, xmlrpc.php) defined in vercel.json as a safety net, handled at the edge before Astro.

### Feed redirects

All RSS/feed URL variations redirect to `/feed.xml`:
- `/rss`, `/feed`, `/feeds`, `/blog/feed`, `/blog/rss` etc.

---

## Styling

### Tailwind v4

Tailwind v4 works with Astro via `@astrojs/tailwind` or direct PostCSS config. All existing CSS files are preserved:

- `css/primitives.css` — design tokens (CSS custom properties)
- `css/theme.css` — colour scheme (light/dark via prefers-color-scheme)
- `css/utilities.css` — custom utility classes
- `css/code.css` — code block styles
- `css/shiki.css` — syntax highlighting
- `css/typography.css` — text styles

### CSS Module conversion

Three CSS Modules files are converted to Astro scoped styles:

| Current file | Migration approach |
|-------------|-------------------|
| `components/header.module.css` | Inline into `Navigation.astro` `<style>` block |
| `components/mdx-note.module.css` | Inline into relevant `.astro` component |
| `app/(post)/blog/[...slug]/post.module.css` | Inline into `Post.astro` layout `<style>` block |

Astro's `<style>` blocks are scoped by default — same isolation as CSS Modules without the import ceremony.

### Dark mode

System preference only via `prefers-color-scheme` media query. No JS toggle. CSS custom properties in `theme.css` handle colour switching. The `color-dodge` blend mode and `texture-dark.png` background remain unchanged.

---

## Images

### Strategy

- **Blog post images**: Served as-is from `/public/images/blog/`. No format conversion (no WebP/AVIF). PNG and SVG preserved exactly. Colour accuracy is critical.
- **Note images**: Can use Astro's `<Image>` component for responsive sizing, but no format conversion.
- **Illustrations/SVGs**: Served directly from `/public/images/illustration/`. No processing.
- **Favicons**: Unchanged in `/public/favicons/`.

### Astro Image config

```ts
// astro.config.mjs
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Never convert to WebP or AVIF
      },
    },
  },
})
```

For blog post images, use standard `<img>` tags rather than Astro's `<Image>` component to avoid any format transformation.

---

## Syntax highlighting

### Custom Shiki rehype plugin

Retain full control over Shiki by using a custom rehype plugin rather than Astro's built-in Shiki integration. This preserves the existing transformer configuration.

**Plugin location**: `src/lib/shiki-plugin.ts`

**Transformers to port:**
1. `transformerMetaHighlight` — line highlighting via `{2,4}` meta
2. `transformerNotationDiff` — `// [!code ++]` / `// [!code --]`
3. `transformerNotationFocus` — `// [!code focus]`
4. `transformerNotationErrorLevel` — `// [!code error]` / `// [!code warning]`
5. `transformerNotationWordHighlight` — `// [!code word:variable]`
6. CSS partial properties transformer
7. CSS theme directive transformer
8. Line numbers transformer (with `showLineNumbers` and `startLineNumber` meta)

**Themes**: Custom light (`iamsteve-light`) and dark (`iamsteve-dark`) themes from `lib/shiki-theme.js`. These use CSS custom properties for colours so they respond to prefers-color-scheme automatically.

**Astro MDX config:**

```ts
// astro.config.mjs
export default defineConfig({
  markdown: {
    syntaxHighlight: false, // Disable built-in, use custom
    rehypePlugins: [rehypeShikiPlugin],
    remarkPlugins: [remarkGfm, remarkCodeTitles, remarkSmartypants],
  },
})
```

---

## Icon system

### Primary: astro-icon

Attempt to use the `astro-icon` package with local icon sets:

```ts
// astro.config.mjs
import icon from 'astro-icon'

export default defineConfig({
  integrations: [
    icon({
      iconDir: 'src/icons',
    }),
  ],
})
```

Place SVGs in `src/icons/16/` and `src/icons/24/` mirroring the current `/public/icon/` structure.

**Icon.astro wrapper:**

```astro
---
import { Icon as AstroIcon } from 'astro-icon/components'

interface Props {
  icon: string
  size?: 16 | 24
  variant?: 'default' | 'header' | 'on-light' | 'none'
  class?: string
}

const { icon, size = 24, variant = 'default', class: className } = Astro.props

// Preserve existing aliases
const aliases = {
  everything: 'folder', archive: 'folder', all: 'folder', folder: 'folder',
  design: 'pen', pen: 'pen',
}
const resolved = aliases[icon] ?? icon

const variantClass = {
  default: 'icon',
  header: 'icon-header',
  'on-light': 'icon-on-light',
  none: '',
}[variant]
---

<AstroIcon
  name={`${size}/${resolved}`}
  width={size}
  height={size}
  class:list={[variantClass, className]}
/>
```

### Fallback: SVG sprite system

If astro-icon doesn't support specific use cases (e.g. dynamic icon names, special styling), keep the existing sprite system:

- Retain `scripts/generate-icon-sprite.js`
- Generate sprite components as `.astro` files instead of React
- Mount sprite once in `Base.astro` layout
- Reference icons via `<use xlink:href="#name-size" />`

---

## SEO and metadata

### Head.astro component

Replaces `components/SEO.js`. Generates:

- `<title>` and `<meta name="description">`
- Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:site_name)
- Twitter Card tags (twitter:card, twitter:site, twitter:title, twitter:description, twitter:image)
- Canonical URL
- robots meta (respects `noindex` field)
- JSON-LD structured data:
  - **Person** schema (author info, social URLs, Manchester location)
  - **Organization** schema (site logo)
  - **BlogPosting** schema (for posts: datePublished, dateModified, author, images)
  - **BreadcrumbList** schema (for posts)

### Per-page metadata

Each page passes props to Head.astro:

```astro
<!-- In Post layout -->
<Head
  title={post.data.title}
  description={post.data.metadesc}
  ogImage={post.data.ogImage}
  ogType="article"
  publishedTime={post.data.date}
  modifiedTime={post.data.lastmod}
  noindex={post.data.noindex}
/>
```

---

## View Transitions

### Setup

```astro
<!-- Base.astro -->
---
import { ViewTransitions } from 'astro:transitions'
---
<html>
  <head>
    <ViewTransitions />
  </head>
  ...
</html>
```

### Navigation active states

Currently handled by `usePathname()` in React. In Astro, use `Astro.url.pathname` in the server-rendered Navigation.astro:

```astro
---
const currentPath = Astro.url.pathname
const isActive = (href) => currentPath === href || currentPath.startsWith(href + '/')
---
<nav>
  <a href="/blog" class:list={[{ 'is-active': isActive('/blog') }]}>Blog</a>
  ...
</nav>
```

View Transitions preserve active state styling across navigations without client-side routing.

---

## RSS feed

### Implementation (src/pages/feed.xml.ts)

Replicate the current feed exactly using `@astrojs/rss`:

```ts
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { marked } from 'marked'

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => data.status === 'open')
  const notes = await getCollection('notes', ({ data }) => data.status === 'published')

  const items = [...posts, ...notes]
    .sort((a, b) => b.data.date - a.data.date)
    .slice(0, 60)
    .map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      link: `/blog/${item.slug}`, // or /notes/ for notes
      description: item.data.summary,
      content: marked.parse(item.body), // Full HTML content
    }))

  return rss({
    title: 'iamsteve',
    description: 'A blog about design and build of websites',
    site: context.site,
    items,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
  })
}
```

**Requirements:**
- RSS 2.0 format with Atom namespace
- Last 60 items combining posts and notes
- Full HTML content in `content:encoded` (CDATA)
- `application/xml` content type

---

## Search

### Build-time index generation

Replace the `/api/search` endpoint with a static JSON file generated at build time.

**Script**: `scripts/generate-search-index.ts`

Runs as part of the build process (add to `package.json` build script).

**Index structure** (matches current format):

```json
[
  {
    "type": "post",
    "title": "Post title",
    "summary": "Post summary",
    "slug": "/blog/post-slug",
    "tags": ["Design"],
    "categories": ["Design"],
    "date": "2024-01-15"
  }
]
```

**Scoring** (preserved from current implementation):
- Title match: 3x weight
- Summary match: 2x weight
- Tags/Categories: 1x weight

**Output**: `public/search-index.json` (generated pre-build, committed or gitignored)

**Client-side Search component**: React island (`client:idle`) that fetches `/search-index.json`, caches it, and provides instant results.

---

## Newsletter

### React island + Astro endpoint

**Client component** (`src/components/react/NewsletterForm.tsx`):
- Port existing `newsletter-form.js`
- Form with name + email fields
- Client-side validation
- Posts to `/api/newsletter`
- Loading/success/error states
- Mounted with `client:visible`

**Server endpoint** (`src/pages/api/newsletter.ts`):

```ts
export const prerender = false

export async function POST({ request }) {
  const { email, name, source } = await request.json()

  // Validate
  if (!email || !name) {
    return new Response(JSON.stringify({ error: 'Email and name required' }), { status: 400 })
  }

  // Proxy to EmailOctopus
  const response = await fetch(`${EMAILOCTOPUS_API_URL}/lists/${EMAILOCTOPUS_LIST_ID}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: EMAILOCTOPUS_API_KEY,
      email_address: email,
      fields: { FirstName: name },
      tags: [source],
    }),
  })

  // Handle duplicate, error, success
  return new Response(JSON.stringify(result), { status: response.status })
}
```

---

## View counter

### Client-side React island

**Component** (`src/components/react/ViewCounter.tsx`):
- Fetches view count from `/api/views/[slug]` on mount
- Increments via POST to same endpoint
- Displays count (or nothing while loading)
- Mounted with `client:idle` on post pages

**Server endpoint** (`src/pages/api/views/[slug].ts`):

```ts
export const prerender = false

// GET: fetch view count
export async function GET({ params }) {
  const { slug } = params
  const { data } = await supabase
    .from(DB_VIEWS_TABLE)
    .select('view_count')
    .eq('slug', slug)
    .single()
  return new Response(JSON.stringify({ count: data?.view_count ?? 0 }))
}

// POST: increment view count
export async function POST({ params }) {
  const { slug } = params
  await supabase.rpc(DB_VIEWS_RPC, { page_slug: slug })
  return new Response(JSON.stringify({ success: true }))
}
```

---

## Environment variables

### Rename convention

Astro uses `PUBLIC_` prefix instead of `NEXT_PUBLIC_`:

| Current | Astro |
|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `PUBLIC_SUPABASE_URL` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `PUBLIC_SUPABASE_ANON_KEY` |
| `NEXT_PUBLIC_ENABLE_VIEW_COUNTING` | `PUBLIC_ENABLE_VIEW_COUNTING` |
| `NEXT_PUBLIC_DB_VIEWS_TABLE` | `DB_VIEWS_TABLE` (server only) |
| `NEXT_PUBLIC_DB_VIEWS_RPC` | `DB_VIEWS_RPC` (server only) |

### Server-only variables (unchanged)

- `EMAILOCTOPUS_API_URL`
- `EMAILOCTOPUS_API_KEY`
- `EMAILOCTOPUS_LIST_ID`
- `REVALIDATION_SECRET` (may not be needed — no ISR in Astro)

### Vercel environment variables

Update in Vercel dashboard to match new names. Keep old names during transition if needed.

---

## Third-party scripts

### Analytics

```astro
<!-- Base.astro -->
<script src="https://api.iamsteve.me/latest.js" defer></script>
```

Astro processes `<script>` tags — external scripts with `src` are left as-is.

### Twitter widgets

Conditionally loaded on posts with `twitter: true` frontmatter:

```astro
<!-- Post.astro -->
{post.data.twitter && (
  <script src="https://platform.twitter.com/widgets.js" async></script>
)}
```

### CodePen embeds

Handled by the React `CodePen` island component. The embed script is loaded within the component.

---

## Security headers

### Vercel config

Maintain current security headers in `vercel.json`:

- `Content-Security-Policy`: script-src allowing `api.iamsteve.me`, `codepen.io`, `typekit.net`, `twitter`, `vercel.live`
- `Referrer-Policy`: strict-origin-when-cross-origin
- `X-Frame-Options`: DENY
- `Strict-Transport-Security`: max-age=31536000; includeSubDomains
- `X-Content-Type-Options`: nosniff

### Cache headers

- Static assets (images, fonts): `max-age=31536000, immutable`
- Feed: `max-age=86400, s-maxage=2592000, stale-while-revalidate=604800`
- Default: `max-age=0, s-maxage=3600, stale-while-revalidate=60`

---

## Build and deployment

### Astro config (astro.config.mjs)

```ts
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import icon from 'astro-icon'

export default defineConfig({
  site: 'https://iamsteve.me',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    tailwind(),
    sitemap(),
    icon({ iconDir: 'src/icons' }),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeShikiPlugin, rehypeSlug, rehypeAutolinkHeadings],
    remarkPlugins: [remarkGfm, remarkCodeTitles, remarkSmartypants],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  redirects: {
    // ... all 70+ redirects
  },
  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },
})
```

### Package.json scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && node scripts/generate-search-index.ts && astro build",
    "preview": "astro preview",
    "lint": "eslint --fix src/",
    "icons": "node scripts/generate-icon-sprite.js",
    "post": "node scripts/compose-post.js",
    "note": "node scripts/compose-note.js",
    "validate:links": "node scripts/validate-links.js",
    "test:e2e": "playwright test",
    "test:links": "node scripts/check-links.js"
  }
}
```

### Key dependencies to add

```
astro
@astrojs/react
@astrojs/mdx
@astrojs/tailwind
@astrojs/sitemap
@astrojs/rss
@astrojs/vercel
@astrojs/check
astro-icon
@iconify-json/local (if needed)
playwright (testing)
```

### Key dependencies to remove

```
next
@content-collections/core
@content-collections/next
@content-collections/mdx
contentlayer2
next-contentlayer2
@next/bundle-analyzer
@next/eslint-plugin-next
eslint-config-next
```

---

## Dev script updates

### compose-post.js

Update frontmatter template to match Astro content collection schema. Key change: ensure `status: 'draft'` maps to Astro draft handling.

### compose-note.js

Same — update frontmatter template for Astro schema.

### generate-search-index.ts

New script that reads from `src/content/blog/`, `src/content/notes/`, `src/content/pages/` and generates `public/search-index.json`. Runs before `astro build`.

### validate-links.js

Update file paths from `/content/collections/` to `/src/content/collections/`.

---

## Testing strategy

### 1. Link checking

Crawl the built site and verify:
- All internal links resolve (no 404s)
- All redirect chains work
- RSS feed is valid XML
- Sitemap is valid XML
- All image references resolve

**Tool**: Custom script or `broken-link-checker` / `linkinator`

### 2. Visual regression

Compare screenshots of key pages between the Next.js and Astro versions:

**Pages to test:**
- Home page
- Blog listing (page 1 and page 2)
- A blog post with code blocks
- A blog post with images
- A blog post with CodePen embed
- Category page (design, code)
- Notes listing and single note
- Collections page
- About page
- Newsletter page
- Search results
- Mobile viewport (375px) for all above
- Dark mode for all above

**Tool**: Playwright visual comparison or Percy/Chromatic

### 3. E2E tests (Playwright)

```
tests/e2e/
├── navigation.spec.ts      (menu, active states, mobile menu)
├── blog.spec.ts             (listing, pagination, single post)
├── search.spec.ts           (open search, type query, results appear)
├── newsletter.spec.ts       (form validation, submit flow)
├── view-counter.spec.ts     (counter renders, increments)
├── code-blocks.spec.ts      (syntax highlighting, copy button, line numbers)
├── rss.spec.ts              (feed.xml returns valid RSS)
├── sitemap.spec.ts          (sitemap returns valid XML)
├── redirects.spec.ts        (sample of legacy URLs redirect correctly)
├── seo.spec.ts              (meta tags, OG tags, JSON-LD present)
├── dark-mode.spec.ts        (colour scheme switches with prefers-color-scheme)
└── accessibility.spec.ts    (keyboard nav, focus indicators, heading hierarchy)
```

### 4. Manual QA

After automated tests pass, manually verify:
- Typography rendering (Typekit fonts load correctly)
- Colour accuracy on blog images (no WebP conversion artefacts)
- Code block themes (light and dark)
- All interactive features (search, newsletter, copy buttons, modals)
- View Transitions feel smooth
- Mobile experience on real device

---

## Migration phases

Even though this is a "big bang" migration (full parity before switch-over), the work should be done in a logical order on the feature branch.

### Phase 1: Foundation

1. Initialise Astro project in `src/` directory
2. Configure `astro.config.mjs` with all integrations
3. Set up Tailwind v4 with existing CSS files
4. Create `Base.astro` layout (HTML shell, head, View Transitions, fonts, analytics)
5. Create `Head.astro` SEO component
6. Port `content/metadata.js`

### Phase 2: Content collections

1. Create `src/content/config.ts` with all four collection schemas
2. Move content files to `src/content/`
3. Verify all 144 posts, 7 notes, 192 collections, 5 pages parse correctly
4. Set up custom Shiki rehype plugin with themes and transformers
5. Configure MDX with remark/rehype plugins

### Phase 3: Static components

1. Convert server components to `.astro` files (Navigation, Footer, Card, etc.)
2. Create named layouts (Blog, Post, Page)
3. Port MDX component overrides to `.astro` files
4. Set up icon system (astro-icon primary, sprite fallback)

### Phase 4: Pages and routing

1. Build all page routes (home, blog listing, post, notes, categories, collections, catch-all)
2. Implement pagination with `paginate()`
3. Set up all redirects
4. Build static endpoints (RSS, sitemap, robots.txt, llms.txt)

### Phase 5: Interactive features

1. Port React island components (search, newsletter, TOC, copy buttons, modals)
2. Build view counter (React island + API endpoint)
3. Build newsletter endpoint (Astro server endpoint + EmailOctopus proxy)
4. Generate static search index
5. Set up View Transitions

### Phase 6: Polish and testing

1. Port all security headers and cache rules to vercel.json
2. Update environment variables
3. Update dev scripts (compose-post, compose-note, validate-links)
4. Write E2E tests
5. Run link checker
6. Run visual regression tests
7. Manual QA
8. Performance audit (Lighthouse)

### Phase 7: Deploy

1. Update Vercel project settings (build command, output directory)
2. Update environment variables in Vercel dashboard
3. Deploy to preview URL
4. Final verification on preview
5. Merge and deploy to production
6. Monitor for 404s, errors, performance regressions

---

## Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Astro content collection slug generation differs from current | Broken URLs, lost SEO | Custom slug function that strips numeric prefix, verify all URLs match |
| Shiki transformer incompatibility | Broken code blocks | Test all transformer features against sample posts before full migration |
| React island hydration issues | Interactive features broken | Test each island in isolation, use appropriate `client:` directives |
| astro-icon doesn't support all icon use cases | Missing icons | Sprite system fallback ready, test all icon variants early |
| View Transitions break React islands | State loss on navigation | Test island persistence, use `transition:persist` where needed |
| 70+ redirects have edge cases | 404s for legacy URLs | Automated redirect tests, monitor 404 logs post-deploy |
| Image colour accuracy | Visual degradation | No format conversion, verify PNG/SVG rendering matches current site |
| Build time increases with 344 content files | Slow deploys | Astro's static builds are typically fast; monitor and optimise if needed |
| EmailOctopus API changes | Newsletter broken | Same API, just different endpoint wrapper; test in staging |
| Supabase connection from Vercel serverless | View counter fails | Same setup as current; test endpoint in preview deployment |

---

## Out of scope

- CMS migration (content stays as markdown/MDX files)
- Design changes (1:1 visual parity)
- New features
- Database changes (Supabase schema unchanged)
- Domain/DNS changes (staying on Vercel)
- Content editing or restructuring
