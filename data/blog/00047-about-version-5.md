---
title: "About version 5"
date: "2012-11-03T09:16:00+00:00"
lastmod: "2021-06-08T06:51:09+00:00"
summary: "Another redesign, another blog post. It’s the majority of what my blog posts are based around. With each version I say I’m going to blog more, but the redesign has never really focused on it. This was one of my main goals, to bring more focus to the blog. Then maybe it would add to making me write more."
metadesc: "Another redesign, another blog post. This is a write up on my decisions behind version 5 of iamsteve."
theme: "#fffbf2"
tags: ["Website"]
categories: ["Website"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 47
fileroot: "about_version_5"
---

Another redesign, another blog post. It’s the majority of what my blog posts are based around. With each version I say I'm going to blog more, but the redesign has never really focused on it. This was one of my main goals, to bring more focus to the blog. Then maybe it would add to making me write more.

The design has a similar basis to the majority of previous versions, especially V4. I'm at a stage where I'm quite happy with the position of content around the site. So things are mostly a visual refresh. 

## My goals
My goals were fairly simple, I think I’ve achieved a few so far but others are long term. 

- Bring focus to the blog
- Reduce emphasis on hiring me, but still be open to it
- Clean up the portfolio
- Make it more mobile friendly (image size)
- Try increase traffic over time
- Learn more and become a better designer
- Think more about the details
- Try add some new stuff to my portfolio


The first 3 I’m confident I've met as they were somewhat the simplest. Through adding a blog post to the homepage, this in turn reduced emphasis on hiring me and I've taken some things out of my portfolio and gave it a better layout.

Making the portfolio more mobile friendly is a work in progress still, I'm going to be cropping a few sizes and using picturefill to ensure this is pretty good.

The biggest one to do with the site I feel is to try increase traffic. I'll have to blog more frequently than I do to remotely achieve this. I plan to, I don't want to say I will as I've done it in the past and got nowhere. 

The last few are more personal goals. Thinking about the details, is something I'll get better at with time. It's more of a joint personal and site goal. I felt I've added a lot more focus to this design and getting things right.

Becoming a better designer and adding to the portfolio are fairly obvious. I hope through blogging more this will kind of come with it. 

## Wrap up & design decisions
Overall I'm pretty happy with this change to my website. I've still got a bit of work to do, I want to add custom page banners. I want to put some real effort into them and try make them great. Also the left over things to do in my portfolio.

From the last version of this site I've tried yet again to go mobile first. With better decisions made. I've gone for an off canvas navigation this time:

<figure>
![](/static/images/blog/v5_nav.png)
<figcaption>I'm using what's becoming the standard three line icon.</figcaption>
</figure>

I've pretty much gone all em based. Although I've mostly used rems, without a px fallback (I don't care for < IE8, besides IE is about 3-4% of my site traffic). Sass makes it a breeze too with using a function that converts the numbers passed. As what convinced me was [this article](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/ "The EMs have it: Proportional Media Queries FTW!"). It ensures that nothing breaks if you zoom in (although in Chrome you have to refresh for it to work).

I think that's it another bit for the history of the website!