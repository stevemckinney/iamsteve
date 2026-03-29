---
title: 'Spring cleaning'
date: '2026-03-29T12:00:00.000Z'
status: published
summary: "A roundup of under the hood improvements I've made to the site recently."
---

It's been a productive few weeks for this site. Most of the changes aren't visible on the surface, but they make a real difference to how things work behind the scenes&thinsp;&mdash;&thinsp;and set things up nicely for future posts.

## Content infrastructure

The biggest change was **migrating from Contentlayer to Content Collections**. Contentlayer hasn't been actively maintained for a while, so I moved to Content Collections which has a cleaner API with Zod schemas. Alongside that, I **upgraded Next.js to 16.2**.

## Syntax highlighting

I replaced Prism with **Shiki** for syntax highlighting. This was a multi-step effort that ended up touching nearly every code block across the site:

- **Dual light/dark themes** using CSS `light-dark()`, so code blocks respect your colour scheme without a flash of the wrong theme
- **Line numbers** via a custom transformer that creates a two-column grid layout&thinsp;&mdash;&thinsp;only the code side scrolls horizontally
- **Code block titles** now render as a proper title bar rather than a floating pill
- **Copy button** on titled code blocks, matching the style of the copy feed URL button
- Enabled **diff notation** (`++`/`--`), **focus**, **error/warning levels**, and **word highlighting**
- Fixed Tailwind's `@theme` directive highlighting with a custom transformer that swaps it for `@font-face` during tokenisation

## Design refinements

- **Notes** got their own MDX component and styling improvements
- **Homepage, article pages and notes layouts** were refined across breakpoints
- **Table of contents** was split into server and client components
- **Picture panning** on the about page gained wheel zoom support
- Extracted **dark mode colour pairs into `light-dark()` tokens** across the theme, reducing scattered `dark:` utility overrides
- **Chat message component** with a remark plugin for Apple Messages-style conversations in notes

## SEO and indexing

- Improved sitemap, metadata, and robots configuration
- Fixed indexing issues: stripping spam parameters, adding redirects, blocking unwanted crawl paths
- Added `noindex` support for specific pages
- Moved Simple Analytics to a **custom CNAME**

## Small fixes

- Fixed mobile nav not closing on route change
- Fixed heading link icon alignment and scroll margin
- Preserved straight quotes in chat blocks by running smartypants before the chat remark plugin
