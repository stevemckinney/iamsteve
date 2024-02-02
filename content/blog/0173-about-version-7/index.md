---
title: About version 7
date: '2023-12-23T10:11:40.788Z'
lastmod: '2023-12-23T10:11:40.788Z'
summary: 'How I moved 140 posts from a database CMS to a static site in Next.js. No redesign just website rebuild.'
metadesc: 'How I moved 140 posts from a database CMS to a static site in Next.js. No redesign just website rebuild.'
theme: '#e9f5f5'
tags: ['Website']
categories: ['Website']
large:
medium:
ogImage: '/assets/og/cover.jpg'
status: open
codepen: false
twitter: false
id: 173
fileroot: 'about-version-7'
---

With this version there was little to no visual change. I say was as, in writing this way beyond the launch of this. The purpose was to move from ExpressionEngine to Next.js. It was an important change as I felt at the time at a dead end with ExpressionEngine.

## Why rebuild the website?
I had reached a point where things were breaking and I couldn’t replace those things in ExpressionEngine.

Simple things like RSS and getting structured data to output were no longer working.

### Moving away from managing your own VPS and awkward deployments
This was another strong driver, I didn’t want the server burden being on me anymore. I used DigitalOcean and ServerPilot and this gave peace of mind to a degree.

Not to mention, to get a flawless deployment system, without paying on top of what you’re paying for was to be out of reach for me.

That’s where moving to a host like Netlify was ideal. I’d experienced the ease of deployments with my portfolio—plus there’s a bunch of other benefits.

I’m wary of cost here, as it can easily escalate, but I’ve heard Cloudflare is a good alternative and this is something I may explore.

### Time to go static
So round mid-2021 (it’s taken a while to write about), I decided it was time to move off. And I decided to go the static route. Theres always been a lot of hype around static site generators, from the original popularity of Jekyll.

I was torn between Gatsby and Next.

I had built my portfolio in Gatsby a year earlier, so I felt ok with the React world. Gatsby was a strong choice, I liked the way GraphQL worked to a degree and the community around it seemed to be thriving at the time.

### Choosing Next.js
However, I went for Next because on reading it seemed it was better for sites with more pages, such as a blog.

Other than that I didn’t think too much of it.

It turned out to be a wise decision as Gatsby has lost all of that momentum.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/13d4d02a-9cc1-4853-af00-1366f489f4b7/c2ef1e61-5ea6-4bc7-99ab-875d7dc088e5/Untitled.png)

However, I see the possibility of moving to Astro in the future as I will move my portfolio due to what I mentioned earlier about Gatsby.

But importantly my content is much more portable and there’s a great community around Next.js and React in general.

## Prepping a URL structure change
One of the things I felt ~~could~~ would be a problem was the current URL structure surrounding blog posts. And I didn’t want to have that as a problem on top of moving to Next.js and a new hosting platform.

The structure was `/blog/entry/[slug]` and was moving to `/blog/[slug]`.

I was aware this would break links from other websites, for which I setup redirects. And knew by the time I’d finally finish redeveloping the website on Next all the issues will have been ironed out.

Eventually, on the move over to Netlify it was easy to switch up and knowing that was done was something I thanked my past self for doing.

## Beginning the rebuild
I knew there was a tedious task ahead getting each post into markdown files. This was not straightforward and had me debate whether it was the right thing to do.

### Manually export post to a file
I persevered and I ended up creating an export template in ExpressionEngine which allowed me to format everything as plain markdown with frontmatter.

I went overboard with this as I was unsure what I would and wouldn’t need. Which was better than figuring it out later and having to edit ~140 files again.

By far the most tedious part of this job.

## Finally getting to the point of code
Everything beyond the point of code was a much nicer in terms of effort required. I did have to compromise in areas, I didn’t want this to take any longer as I wanted to redesign the website. On top of having to get to grips with Next and how to build a blog website.

### Using a starter
I found an [excellent Next.js starter](https://github.com/timlrx/tailwind-nextjs-starter-blog) which covered the unfamiliar parts for me. It set me off immediately with Tailwind, search, MDX, newsletter handling and publishing script.

### Making components and keeping CSS as is
I was able to move all CSS over as a global import and continue with Sass as this had always been.

I begun to break down the previous HTML and begin to create components. A lot of stuff was componentised previously (to a degree) in ExpressionEngine but it needed converting to React code. The component way of working is something I have desired for a while.

It was all ready to use and convert to a combination of CSS modules and Tailwind. For me I like the way the components are managed, you keep all the associated style and behaviour close together.

### Failing to sort posts
The painful parts were sorting the posts on the homepage by view count, I couldn’t figure out a solution to this. I was able to track them without too much trouble. I used Supabase and it was linking the data together that wouldn’t happen for me.

Fortunately for version 8, I was able to get this working.

### Getting the newsletter to work
The newsletter subscription was challenging too. I did manage to figure it out and then it broke afterwards around 8 months later and took me a while to realise. Far better developers than I would likely say you need to write tests. Which is something I would like to explore.

But this is something I felt a real achievement in doing the overall behaviour of this is much more seamless and nicer. No third party JavaScript to insert anything. Just post from the page and update the state.

### Getting something similar to the search overlay
I had to compromise on the search, I wasn’t able to get it to work as an overlay anymore. However, I was able to get it to search through the posts and show thanks to the starter.

It offers more of a live search experience which is a win. But not many use search and it still works so I accepted the change.

But that’s my experience of moving from a database CMS to React framework.
