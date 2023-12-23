---
title: About version 7
date: "2023-12-23T10:11:40.788Z"
lastmod: "2023-12-23T10:11:40.788Z"
summary:
metadesc:
theme: "#e9f5f5"
tags: ["Website"]
categories: ["Website"]
images: ["/images/blog/ink-trap-post-image.png"]
ogImage: "/assets/og/cover.jpg"
status: open
codepen: false
twitter: false
id: 173
fileroot: about-version-7
---

With this version there was little to no visual change. I say was as, in writing this way beyond the launch of this. The purpose was to move from ExpressionEngine to Next. It was an important change as I felt at the time at a dead end with ExpressionEngine.

## Why rebuild the website?
I had finally gotten sick of ExpressionEngine and things breaking for no apparent reason. Plug-ins that were relied on were breaking and stopping useful functionality.

### Moving away from managing your own VPS and awkward deployments
This was another strong driver, I simply didn’t want the server burden being on me anymore. I used DigitalOcean and ServerPilot and this gave peace of mind to a degree.

Not to mention, to get a flawless deployment system, without paying on top of what you’re paying for was to be out of reach for me.

That’s where moving to a host like Netlify was ideal. I’d experienced the ease of deployments with my portfolio—plus there’s a bunch of other benefits.

### Time to go static
So round mid-2021 (it’s taken a while to write about), I decided it was time to move off. And I decided to go the static route. Theres always been a lot of hype around static site generators, from the original popularity of Jekyll.

I was torn between Gatsby and Next.

I had built my portfolio in Gatsby a year earlier, so I felt ok with the React world. Gatsby was a strong choice, I liked the way GraphQL worked to a degree and the community around it seemed to be thriving at the time.

### Choosing Next
However, I went for Next because on reading it seemed it was better for sites with more pages, such as a blog.

Other than that I didn’t think too much of it.

It turned out to be a wise decision as Gatsby has lost all of that momentum.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/13d4d02a-9cc1-4853-af00-1366f489f4b7/c2ef1e61-5ea6-4bc7-99ab-875d7dc088e5/Untitled.png)

It could turn out to be not a great decision. As I see the possibility of moving to Astro in the future as I will move my portfolio due to what I mentioned earlier about Gatsby.

But importantly my content is much more portable.

## Prepping a URL structure change
One of the things I felt could be a problem was the current URL structure surrounding blog posts. And I didn’t want to have that as a problem on top of moving to Next.js and hosting platform.

The structure was `/blog/entry/[slug]` and moving to `/blog/[slug]`.

I was aware this would break links from other websites, for which I setup redirects. And knew by the time I’d finally finish redeveloping the website on Next all the issues will have been ironed out.

Eventually, on the move over to Netlify it was easy to switch up and knowing that was done was something I thanked my past self for doing.

## Beginning the rebuild

I knew there was a tedious task ahead getting each post into markdown files. This was not straightforward and had me debate whether it was the right thing to do.

### Manually export post to a file

I persevered and I ended up creating an export template in ExpressionEngine which allowed me to format everything as plain markdown with frontmatter.

I went overboard with this as I was unsure what I would and wouldn’t need. Which was better than figuring it out later and having to edit ~140 files again.

### Update

## Getting to the point of code

Everything beyond the point of code was fine in terms of effort required. I did have to compromise in areas, I didn’t want this to take any longer as I wanted to redesign the website. On top of having to get to grips with Next and how to build a blog website.

I found an [excellent Next starter](https://github.com/timlrx/tailwind-nextjs-starter-blog) which covered the unfamiliar parts for me. It set me off immediately with Tailwind, search, MDX, newsletter handling and more.

I was able to move all CSS over and begin creating components. A lot of stuff was componentised previously (to a degree) in ExpressionEngine but it needed converting to React code. But the component way of working is something I have desired for a while.

Keeping everything contained to the component in terms of style and behaviour works well for me. I like a combination of CSS modules and Tailwind, albeit there wasn’t much use here.

The painful parts were sorting the posts on the homepage by view count, I couldn’t figure out a solution to this. I was able to track them without too much trouble. I used Supabase and it was linking the data together that wouldn’t happen for me.

Fortunately for version 8, I was able to get this working.

The newsletter subscription was challenging too. I did manage to figure it out and then it broke afterwards around 8 months later and took me a while to realise. Far better developers than I would likely say you need to write tests. Which is something I would like to explore.

I had to compromise on the search, I wasn’t able to get it to work as an overlay anymore. However, I was able to get it to search through the posts and show thanks to the starter.

- I found a great starter in https://github.com/timlrx/tailwind-nextjs-starter-blog
- Rebuilt the design for the most part in components
    - This wasn’t bad, I didn’t need to throw any of my current Sass away I could include that
- Tricky bits were
    - Making the newsletter work
    - Tracking post view count
    - Sorting posts by view count
    - Search
