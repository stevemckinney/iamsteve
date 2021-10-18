---
title: "Maintenance week #6"
date: "2016-11-15T07:30:00+00:00"
lastmod: "2018-05-18T06:46:20+00:00"
summary: "Maintenance weeks are where detail website tasks, instead of a regular post. I spend time fixing bugs, updating grammar and posts in general, as well as adding featured images. It varies and this type of post details what’s been done."
metadesc: A blog written by Steve McKinney, focused on designing with Illustrator and writing maintainable CSS."
theme: "#f7f2f5"
tags: ["Design"]
categories: ["Design"]
images: ["https://iamsteve.me/uploads/blog/maintenance-week-featured-image%402x.png"]
large: "https://iamsteve.me/uploads/blog/maintenance-week-featured-image%402x.png"
medium: "https://iamsteve.me/uploads/blog/maintenance-week-featured-image-medium%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 152
slug: "maintenance-week-6"
---

Maintenance weeks are where detail website tasks, instead of a regular post. I spend time fixing bugs, updating grammar and posts in general, as well as adding featured images. It varies and this type of post details what’s been done.

So while it’s not a post that directly gives value, it helps me keep on top of the library of content that I am acquiring.

## Subscriber download update
I’ve made the decision to go against coding it up. It’s something I’m figuring out between now and new year the direction for this website.

Code is hugely time consuming, for now, I’m working on making the Illustrator files better designed and more comprehensive. Thinking ahead to coding it up made me scale it back.

I feel like my aim should be by the end of the year, it’s a slow process. Even though it's not a huge amount of work. It's making time.

I want to make it something valuable and a worthwhile download. Whether that be from the structure of the document, to how I've designed the UI kit. 

## Search results spacing bug fix
This was a fix I’d put off through stubbornness. I had to make an awkward code change to accommodate the search pages. It’s probably a CMS bug, but I’m not sure. 

## Better font loading with font face observer
I’d started things off right with the development of this site. The page load times are pretty good. However, I want to improve this further, and fonts are a huge burden on page load.

I've used the [fontfaceobserver](http://fontfaceobserver.com) technique. It makes sure the font is shown when it is downloaded and ready. It is the future for loading of fonts, from what I'm aware. 

### Speedtracker to monitor
Which leads on to [speedtracker](https://stevemckinney.github.io/speedtracker/), which I setup recently. The rendering is certainly an area for improvement. When I was looking at the filmstrip it’s 1.5s before anything is shown. 

Some of that comes from server connection (as it’s testing from the US and the server is UK based) so it would be ideal to get that ~1s and under 1s for UK. Hopefully the font load change improves things. This will help keep track of that.

## Exploring lazy loading gifs/images
Many of my posts contain images now. This means that page weight goes up significantly. I’m looking for a lazy loading image library that is straightforward and accommodates a ‘no-js’ fallback. 

I’ve used Google’s PageSpeed lazy load module before. While it was as simple as it gets, it doesn’t work with srcset and the `?noscript` parameter it adds is undesirable. **If you’ve had any experience with this I would appreciate the heads up on [twitter](https://twitter.com/irsteve)**.

## Two more hamburger alternatives
Basecamp recently redesigned their website and Quartz is another I came across.

[<img src="/static/images/blog/bottom-nav-basecamp.jpg">](https://basecamp.com)

[<img src="/static/images/blog/bottom-nav-quartz.jpg">](http://qz.com)

Both are great navigation examples. [View all the examples in the post]({site_url}blog/entry/websites-using-alternatives-to-the-hamburger).

## That’s it
Next week will be back to the normal schedule. Have a great week.