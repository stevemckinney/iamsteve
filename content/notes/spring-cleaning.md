---
title: 'Spring cleaning'
date: '2026-03-29T12:00:00.000Z'
status: published
summary: "A roundup of under the hood improvements I've made to the site recently."
---

Spring cleaning is possibly the wrong word but as we’re heading into spring it works… I’ve made a conscious effort since starting this notes section since the start of the year to work on some design improvements. 

There’s a lot of papercuts, general polish required and and endless list of things to make better as my opinions have evolved since this current design was released in early 2024. 

## Moving to Content Collections

The biggest change was **migrating from Contentlayer to Content Collections**. Contentlayer hasn't been actively maintained for a while, so I moved to Content Collections which has a cleaner API with Zod schemas. Alongside that, I **upgraded Next.js to 16.2**.

## Post layout improvements 
One of the things that bugged me for a good while was the post layout. I’ve changed things up slightly. 

For larger screens you had the table of contents on the right, it’s now on the left. I also managed to get it to feel better when scrolling. 

Scroll driven animations are a real nice addition—which allowed me to blur the contents on exit. It creates a more seamless feel that was lacking previously. 

It cleaned up the code massively from having a janky masking implementation that masks the scroll bar and there’s not really a way to get that to work nicely

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

## Small fixes

- Fixed mobile nav not closing on route change
- Fixed heading link icon alignment and scroll margin
- Preserved straight quotes in chat blocks by running smartypants before the chat remark plugin
