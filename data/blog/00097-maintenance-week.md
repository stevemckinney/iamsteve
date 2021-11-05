---
title: "Maintenance week #1"
date: "2015-10-20T06:30:00+00:00"
lastmod: "2017-02-09T07:32:48+00:00"
summary: "I’ve been thinking about doing this for a little while over the course of posting regularly. I feel it a duty to go back and refine some posts or make additions to them to improve them.So there is no post as such this week. I’ve decided to go back and update some. I’ve listed each of the posts and changes I’ve made for you."
metadesc: "When you have an active blog, this is something you have to do as articles can become out of date or new information becomes available."
theme: "#f7f2f5"
tags: ["Website"]
categories: ["Website"]
images: ["/static/images/blog/maintenance-week-featured-image%402x.png"]
large: "/static/images/blog/maintenance-week-featured-image%402x.png"
medium: "/static/images/blog/maintenance-week-featured-image-medium%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 97
slug: "maintenance-week"
---

I've been thinking about doing this for a little while over the course of posting regularly. I feel it a duty to go back and refine some posts or make additions to them to improve them. 

So there is no post as such this week. I've decided to go back and update some. I've listed each of the posts and changes I've made for you.

## Remove letter-spacing from the last letter
It never occurred to me that `text-decoration: underline` would behave similarly in creating undesired behaviour. It occupies the excess space we’re trying to remove.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/tunghsiao">@tunghsiao</a> good question, I can&#39;t think of anything off the top of my head. Possibly a pseudo element with border, just initial thoughts</p>&mdash; Steve McKinney (@irsteve) <a href="https://twitter.com/irsteve/status/646652913775939584">September 23, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I suggested a pseudo element with a border. However, if you're relying on the benefits of using an underline. That's not good enough. The solution is to continue with a pseudo element but use the background colour to hide the excess.

I've also done the original method I had suggested. As an alternative, as both have advantages and disadvantages.

[See how to remove excess text decoration](/blog/remove-letter-spacing-from-last-letter)

## Adobe generator syntax cheatsheet
I’ve improved the layout of this post, on reflection it was pretty poor. Hopefully, this makes it easier to read.

[See the updated cheatsheet](/blog/adobe-generator-syntax-cheatsheet)

## Creating custom stroke width profiles in Illustrator
I have always wondered how to make a stroke align inside or outside when it's not a closed path. The answer was in this post I had already made. It, like the letter spacing update probably could justify a post on its own.

[See how to align strokes on unclosed paths](/blog/adobe-generator-syntax-cheatsheet)

## Using Sass to create harmonious gradients
I have made a few grammatical changes. Hopefully, it makes this post easier to understand.

[See how to create harmonious gradients](/blog/using-sass-to-create-harmonious-gradients)

## Horizontal scrolling navigation techniques
I've written twice on this. With two different methods. Recently I found out that Edge and IE have a way to hide the scroll bar. Which is a great addition to Windows users that use Edge and IE 10 or 11. 

While there are ways to do it in Firefox and Chrome on Windows it removes scroll functionality altogether.

```css
  -ms-overflow-style: -ms-autohiding-scrollbar;
```

See how to make horizontal scrolling navigation with [flexbox](/blog/using-flexbox-for-horizontal-scrolling-navigation) or [display](/blog/horizontal-scrolling-responsive-menu). 

## That’s it
Maintenance weeks are something I'm going to do every couple of months or so. I will update posts that could be outdated or have better information, and grammar too.