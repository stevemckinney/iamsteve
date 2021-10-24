---
title: "Adobe generator syntax ‘cheatsheet’"
date: "2015-03-17T08:00:00+00:00"
lastmod: "2018-06-01T08:49:16+00:00"
summary: "I’m always looking up the Adobe generator syntax and yet I never bookmark it. I feel like it would be a valuable resource to clearly show. Something I think the Adobe documentation lacks. This could be the reason I haven’t bookmarked it."
metadesc: A cheatsheet for Adobe’s generator syntax, with examples for common use cases."
theme: "#e1f7ee"
tags: ["Design"]
categories: ["Design"]
images: ["/static/images/blog/ps-generator-featured-image-v2%402x.png"]
large: "/static/images/blog/ps-generator-featured-image-v2%402x.png"
medium: "/static/images/blog/ps-generator-featured-image-medium-v2%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 66
slug: "adobe-generator-syntax-cheatsheet"
---

I'm always looking up the Adobe generator syntax and yet I never bookmark it. I feel like it would be a valuable resource to clearly show. Something I think the Adobe documentation lacks. This could be the reason I haven't bookmarked it. 

## Overview
Each image is made up of dimensions, filename and quality.

<p data-height="268" data-theme-id="13022" data-slug-hash="raZgNL" data-default-tab="result" data-user="stevemckinney" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/raZgNL/">raZgNL</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Dimensions
It's necessary to have a space after the dimensions. Don't put a space between the dimensions where width and height are specified. px is assumed if no measurement is specified. To have the image width or height calculated automatically, use a ‘?’ for the value. Like so `?x1200 name.jpg` or `1200x? name.jpg`.

### File quality
The quality can’t have a space between it. Quality can be a number `8` or percentage `80%`. For filetypes like png you can specify png-8, png-32, etc.

## 1x, 2x and beyond
```markup
filename.jpg, 200% filename@2x.jpg, 300% filename@3x.jpg
```

### Comma separate your list
This is a comma separated list of values. Using percentage as the size.

## SVG
```markup
filename.svg
```

### Take care
I’ve found simpler shapes work for the SVG export. A common use I think would be icon fonts. Make sure you convert these layers to a shape, otherwise it will try make it into an SVG using the font.