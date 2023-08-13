![iamsteve.me banner](/public/static/images/twitter-card.png)

# iamsteve.me design & code blog
A design and code blog using Next.js. The codebase started from the excellent [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

[![Netlify Status](https://api.netlify.com/api/v1/badges/520edf5b-5787-4b69-a2f0-7ae1efdc3df3/deploy-status)](https://app.netlify.com/sites/iamsteve/deploys)

## Development
First, run the development server:

```bash
npm start
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Post

### Frontmatter
Here's an example of a post's frontmatter:

```
---
title: "Visual design tips you can apply immediately"
date: "2017-07-04T11:51:00+00:00"
lastmod: "2019-10-04T07:24:49+00:00"
summary: "Add a little extra polish to any of your designs with these tips."
metadesc: "When designing there are things you can rely upon regardless of the situation. These are things which add extra polish, and are generally hidden to the untrained eye."
theme: "#fff7e0"
tags: ["Design"]
categories: ["Design"]
images: ["/images/blog/visual-design-tips-featured-image.png"]
large: "/images/blog/visual-design-tips-featured-image.png"
medium: "/images/blog/visual-design-tips-featured-image-medium.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 164
fileroot: "visual-design-tips-you-can-apply-immediately"
---
```

Some of this frontmatter is excessive, but necessary for futureproofing to an extent. The less obvious ones are detailed below:

- `images` is an array and is only the main image and should be `1476x984` @2x which is `738x492` @1x
- `large` will be for legacy posts only as it won’t be needed
- `medium` is for images in /blog or the homepage at `756x504` @2x which is `378x252` @1x
- `ogImage` acts as a placeholder for custom opengraph images and isn’t used currently
- `status` is a carry over from the previous expressionengine days `open`, `draft` or `closed` are options
- `id` use the latest post as reference (I wish there was a better way)
- `fileroot` is a slug and again acts like a placeholder

### Compose

Run `node ./scripts/compose.js` to begin a new post.

This will offer prompts for a few frontmatter and generate dates for you.
