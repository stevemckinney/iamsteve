![iamsteve.me banner](/app/opengraph-image.png)

# iamsteve.me design & code blog
A design and code blog using Next.js with App Router.

[![Netlify Status](https://api.netlify.com/api/v1/badges/520edf5b-5787-4b69-a2f0-7ae1efdc3df3/deploy-status)](https://app.netlify.com/sites/iamsteve/deploys)

## Development
First, run the development server:

```bash
yarn build
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Post
Posts are made up of a bunch of frontmatter, some of it isn’t required, but was more for futureproofing when moving from a database to file based editing.

### To start
Run `node ./scripts/compose.js` to begin a new post.

This will offer prompts for a few frontmatter and generate dates for you.

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
ogImage: "/opengraph-image.png"
status: "open"
id: 164
fileroot: "visual-design-tips-you-can-apply-immediately"
---
```

Some of this frontmatter is excessive, but necessary for futureproofing to an extent. The less obvious ones are detailed below:

- `images` isn’t to be used, I had plans to use it as an array but it felt clunky
- `large` the main image and should be `592x368` in SVG
- `medium` `384x240` in SVG
- `ogImage` for custom post opengraph images, not required, but there if needed
- `status` is a carry over from the previous expressionengine days `open`, `draft` or `closed` are options
- `id` this will be unique and update the `.current-post-id` file with this to keep track, a rudimentary way of keeping track
- `fileroot` is a slug and again acts like a placeholder, I personally use this to grab the filename without `id` to use for naming images

## Credits
The codebase started from the excellent [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) and has since evolved from that.
