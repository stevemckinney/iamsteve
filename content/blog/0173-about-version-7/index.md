---
title: About version 7
date: 2024-02-29T10:13:38.269Z
lastmod: 2024-02-29T10:13:38.269Z
summary: 'How I moved 140 posts from a database CMS to a static site in Next.js. No redesign just website rebuild and some hindsight into the decision making.'
metadesc: 'How I moved 140 posts from a database CMS to a static site in Next.js. No redesign just website rebuild and some hindsight into the decision making.'
theme: '#f9f3f1'
tags: ['Website']
categories: ['Website']
large: /images/blog/about-version-7-featured-image-large.svg
medium: /images/blog/about-version-7-featured-image-medium.svg
ogImage: '/assets/og/cover.jpg'
status: open
codepen: false
twitter: false
id: 173
fileroot: 'about-version-7'
---

With this version there was little to no visual change. I say was, as this post was created after going live. The purpose was to move from ExpressionEngine to Next.js. It was an important change as I felt at the time at a dead end with ExpressionEngine.

## Why rebuild the website?
ExpressionEngine was no longer cutting it for me. I had reached a point where things were breaking and I couldn’t replace those things in ExpressionEngine.

The lack of community around ExpressionEngine made things really difficult for me. I rely on a community that shares how to do things or plugins for getting by with a lot of my development work. So even simpler things like RSS and getting structured data to output were no longer working.

### I wanted a better deploy system
This was another important thing, being able to deploy and have rollbacks, preview branches, etc. for convenience. Which is where moving to a host like Netlify was ideal. I had given this a try with my portfolio. The ease of it all was great.

I’m wary of cost here, as it can easily escalate, but for now it’s in line with what I was paying previously. I’ve also seen a lot around Cloudflare being a good alternative and this is something I may explore.

### Being able to use MDX
If you’re unfamiliar with MDX it allows you to use JSX in your markdown files. So with it you’re able to use components within posts and can make them much more interactive.

For where I use code demos this is really useful. I can keep the code in here for the most part without need for an external service. I intend to do this with simpler examples as I will have greater control over the integration into the article.

### It was time to go static
So round mid-2021 (see, it’s taken a while to write about), I decided it was time to get it over with if I ever planned to redesign the website. And I decided to go the static route—if you can call Next.js a static site generator.

Theres always been a lot of hype around static site generators, from the original popularity of Jekyll. And I feel I had always avoided it due to having to go all in on the static side, but that’s not the case anymore.

I was torn between Gatsby and Next.

I had built my portfolio in Gatsby a year earlier, so I felt ok with the React world. Gatsby was a strong choice, I liked the way GraphQL worked to a degree and the community around it seemed to be thriving at the time.

### Choosing Next.js
However, I went for Next.js because on reading it seemed it was better for sites with more pages, such as a blog.

Other than that I didn’t think too much of it. But I am so glad I didn’t pick Gatsby. It’s turned out to be a wise decision as Gatsby has lost all of that momentum.

But importantly my content is much more portable and there’s a great community around Next.js and React in general. So if it all changes and we’re all building sites on Astro or something else, I know the change won’t be as painful.

## Before the rebuild
I had 2 major tasks before I could start rebuilding, future self stuff. Changing the URL structure and exporting all post files from a database in to text files.

Thankfully one was far easier than the others.

### Preparing a URL structure change
One of the things I felt ~~could~~ would be a problem was the current URL structure surrounding blog posts. And I didn’t want to have that as a problem on top of moving to Next.js and a new hosting platform.

The structure was `/blog/entry/[slug]` and was moving to `/blog/[slug]`.

I was aware this would break links from other websites, for which I setup redirects. And knew by the time I’d finally finish redeveloping the website on Next all the issues will have been ironed out.

Eventually, on the move over to Netlify it was easy to switch up and knowing that was done was something I thanked my past self for doing.

All it takes is a few lines of code in `netlify.toml` and using `:splat`

```toml:netlify.toml showLineNumbers
[[redirects]]
  from = "/blog/entry/*"
  to = "/blog/:splat"
  status = 301
  force = true
```

### Manually exporting posts to a file
I knew there was a tedious task ahead getting each post into markdown files. This was not straightforward and had me debate whether it was the right thing to do. I persevered and I ended up creating an export template in ExpressionEngine which allowed me to format everything as plain markdown with frontmatter.

```yaml:example-frontmatter.md
---
title:
date:
lastmod:
summary:
metadesc:
theme: "#fff7e0"
tags: ["Design"]
categories: ["Design", "Visual design"]
images:
large:
medium:
ogImage: "/assets/og/cover.jpg"
status: "open"
id:
fileroot:
---
```

I went overboard with this as I was unsure what I would and wouldn’t need. Which was better than figuring it out later and having to edit ~140 files again.

I went as far as using `fileroot` to avoid naming it as  `slug`, `slugAsParams` or `url` or something likely to conflict with anything. Separate `summary` and `metadesc`. A lot of the stuff I anticipated needing, I didn’t. I’ll eventually clean this up.

By far the most tedious part of this job.

## Finally… the build
Everything beyond the point of code was a much nicer in terms of effort required. I did have to compromise in areas, I didn’t want this to take any longer as I wanted to redesign the website. On top of having to get to grips with Next and how to build a blog website.

### Using a starter
I found an [excellent Next.js starter](https://github.com/timlrx/tailwind-nextjs-starter-blog) which covered the unfamiliar parts for me. It set me off immediately with Tailwind, search, MDX, newsletter handling and publishing script.

### Making components and keeping CSS as is
I was able to move all CSS over as a global import and continue with Sass as this had always been.

I begun to break down the previous HTML and begin to create components. A lot of stuff was in partials previously in ExpressionEngine but it needed converting to React based components. This way of working is something I have desired for a while.

It was all ready to use and convert to a combination of CSS modules and Tailwind. For me, I like the way the components are managed, you keep all the associated style and behaviour closer together.

### Failing to sort posts
The painful parts were sorting the posts on the homepage by view count, I couldn’t figure out a solution to this. I was able to track them without too much trouble following an article by [Corey O’Donnell](https://codebycorey.com/blog/page-views-nextjs-supabase). I used Supabase and it was linking the data together that wouldn’t happen for me.

Fortunately for version 8, I was able to get this working.

### Setting up the newsletter
The newsletter subscription was challenging too. I did manage to figure it out and then it broke afterwards around 8 months later and took me a while to realise. Far better developers than I would probably say you need tests or something. Which is something I would like to explore.

But this is something I felt a real achievement in doing the overall behaviour of this is much more seamless and nicer. No third party JavaScript to insert anything. Just post from the page and update the state.

### Compromising on the search overlay
I had to compromise on the search, I wasn’t able to get it to work as an overlay anymore. However, I was able to get it to search through the posts and show thanks to the starter.

It offered more of a live search experience which is a win. Not many use search, it worked and I wasn’t willing to put more time in to delay—so I accepted the tradeoff.

## Database to static complete
But that’s my experience of moving from a database CMS to React framework. I find a lot of the additional conveniences a beneficial for developing the website and fixing small bugs here and there.
