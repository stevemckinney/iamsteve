---
title: About version 8
date: 2023-12-23T10:13:38.269Z
lastmod: 2023-12-23T10:13:38.269Z
summary: Design and development decisions for the 8th version of this website. New design, using Next.js App Router and Tailwind.
metadesc: Design and development decisions for the 8th version of this website. New design, using Next.js App Router and Tailwind.
theme: #e9f5f5
tags: []
categories: ['Website']
large:
medium:
ogImage: '/assets/og/cover.jpg'
status: open
codepen: false
twitter: false
id: 174
fileroot: about-version-8
---

I had been wanting to redesign for a while—it’s been more than enough time. The previous design had been in place since late 2016—along with iterations. I think the design held up well, but it was time for something new. And as with some form of tradition in writing about major changes here, I want to document some of the decisions.

## Goals
There’s always goals when you set out to redesign outside of modernising the design and working towards something fresh.

### More flexibility with images
In terms of the design itself, I think there was aspects I felt limited with when it came to creating images. I wanted a reinvented colour palette. As I found it a challenge creating images with what I would define a richer feeling colour.

I’m not sure I’ve solved this, but I think it’s in a better place.

### A new colour palette
As I look back at the design now it feels washed out, but it might be me. Screens have changed, trends have changed, my eyes have adjusted.

## Design
The design itself is a modernised version of what came before it. When I design something for myself or part of my own projects, I want to utilise the skills I have. It’s what makes it enjoyable.

I have evolved the design through the typography, illustration, colour and layout.

### Typography
I’ve opted to move to two sans serif typefaces. They’re both grotesk’s, so they complement each other. Both are within the trends of where type is at currently.

Roc Grotesk has a strong presence, which I use for headings. The variety in widths and weights give a lot of freedom.

### Colour
The colour palette is familiar but renewed. I felt the older palette lacked some harmony.

### Working towards a digital garden
I like the idea of a digital garden. As Maggie Appleton says articles don’t have to be something complete and can evolve. This is true with much of the web, if I look back at everything that exists here, I could rewrite it with more up to date techniques.

A digital garden promotes more evergreen writing and that’s something I’d like to do.

## Nothing much has changed with the structure
Overall, throughout the website it remains fairly similar. The homepage has a hero introduction, leading into latest posts and popular posts from the main categories.

## Rebuilding and moving to Next.js app router
As part of the last version I decided to move to Next.js. This was a learning curve and using the pages router.

However, for this redesign that was flipped on its head with app router. I was expecting to reuse some of the more challenging elements of initially moving to Next.js.

I did try to transition to app router from pages but for me it didn’t work and as Vercel are clear this is the way forward I decided to do it from scratch.

### View counter
I spent an inordinate amount of time on the view tracking—JavaScript development is not my best skill 😅. I referenced a lot of Lee Robinson’s code as he had one in place, but there was a lot of figuring out required as I was using Supabase over Planetscale.

But this was much easier to setup view count sorting on the homepage which I wasn’t able to achieve previously. Swings and roundabouts.

### Pagination
I felt pagination was surprisingly painful to do. I feel there’s some bugs in it but it seems to do the job. I referred to timlrx’s theme for this and customised to my needs.

### Contentlayer
I discovered Contentlayer, which I really like from a publishing aspect. It adds a lot of flexibility to how you can get your content as there is a JSON representation of it.

You can also make your frontmatter typesafe, which is a nice benefit as I can force myself to make sure all needed frontmatter is present.

Otherwise I’m not bothered about types and typescript, it’s too much for me.

### Better code highlighting
Another place I had a load of faff with getting builds to work on Netlify. But I think in the end this was down to the node version I was using on netlify even though I thought I was on a more up to date version.

I was resigned to using `rehype-pretty-code` but managed to get it all working with rehype-prism-plus. Which I was able to get a decent theme going, pretty code is far too limited in code highlighting.

And personally I find it easier to read when your brackets in html and jsx are the same colour as the tag.

## Using border-image for nicer borders

## Container queries to create large and medium sized cards

## Grid and sub-grid to manage layout

At the time of building this website, `subgrid` had become available, this means I can define the whole layout for the website from the `<body>`. Which makes it quite straightforward to orchestrate your layouts throughout breakpoints.

```css
grid-template-columns:
  [margin-start]
    var(--grid-margin)
    [container-start]
      repeat(2, minmax(0, 1fr))
      [content-start]
        repeat(2, minmax(0, 1fr))
        [prose-start]
          repeat(8, minmax(0, 1fr))
        [prose-end]
        repeat(2, minmax(0, 1fr))
      [content-end]
      repeat(2, minmax(0, 1fr))
    [container-end]
    var(--grid-margin)
  [margin-end];
```

I have defined a few layouts, but the one here is for larger screen layouts. I have a few points where I can decide where to place content.

I still have some things to learn with grid, but I’m fairly confident with it.

## What’s next?
There’s things I decided not to include for launch and spend more time figuring out how I want to approach. But this list comes down to a few things.

- Search
- Different homepage structure
- Notes section for updates and emerging articles
- Links archive
- Publishing new articles
