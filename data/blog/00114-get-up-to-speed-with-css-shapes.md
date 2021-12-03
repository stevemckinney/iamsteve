---
title: "Get up to speed with CSS shapes"
date: "2016-02-23T07:25:00+00:00"
lastmod: "2018-01-29T07:56:54+00:00"
summary: "I’ve wanted to explore CSS shapes for a little while now and get a good understanding for it. Find potential use cases, strengths and weaknesses. In this post I’m going to cover the level one properties. At the time of writing level two is in the editors draft and looks to be bringing much more power to them."
metadesc: "Learn how to use CSS to make shapes like polygon, circle, inset and ellipse using shape-inside. Then use clipping masks to wrap content round the shape with clip-path."
theme: "#f2fcfa"
tags: ["Code", "CSS"]
categories: ["Code"]
images: ["/static/images/blog/update-css-shapes-featured-image%402x.png"]
large: "/static/images/blog/update-css-shapes-featured-image%402x.png"
medium: "/static/images/blog/css-shapes-featured-image-medium-v2%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 114
fileroot: "get-up-to-speed-with-css-shapes"
---

I’ve wanted to explore CSS shapes for a little while now and get a good understanding of it. Find potential use cases, strengths and weaknesses. In this post, I’m going to cover the level one properties. At the time of writing level two is in the editors draft and looks to be bringing much more power to them.

Currently, we have a reasonable set of flexibility with shapes, and understanding what’s available now will give you a leg up on future additions to CSS shapes.

<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-intro.png" width={640} height={360} />
</div>

## Introduction to shape properties
All shape properties throughout this article rely on the use of floats to work. In future expansion to CSS shapes this won’t be the case, but for now, it’s floats.

## shape-outside
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-initial.jpg" width={640} height={360} />
</div>

It's the property you will use for creating shapes. Through `shape-outside` you define the `basic-shape`, `shape-box` and an `image`. You can’t set these individually currently. Additionally, you have properties `shape-margin` and `shape-image-threshold`.

```css
.shape {
  shape-outside: circle(50%) border-box; }

.image {
  shape-outside: url(path/to/image.png); }
```
### Clipping the shape
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-clip-mask.jpg" width={640} height={360} />
</div>

**If you have a square image it will remain square, despite the shape being set**. If you want it to appear that shape, you can use `clip-path`, `border-radius` (if circular), or save the image as the shape you want.

## shape-box
This works similarly to properties like `border-box` and `background-clip`.  The values that can be set are `margin-box`, `border-box`, `padding-box`, and `content-box`.

```css
.shape {
  shape-outside: circle(50%) border-box; }
```

## shape-margin
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-shape-margin.jpg" width={640} height={360} />
</div>

It will add a margin to the shape that takes into account all the points and draws it directly outwards from those points. As circles do not have points, it will draw it from the centre.

```css
.shape {
  shape-margin: 12px; }
```

My success with this is mixed. I found that most of the time, **adding a regular margin to the image was more favourable in positioning the text**.

## Shape options
There are four ways you can create a shape.

- polygon
- circle
- inset
- ellipse

### Polygon
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-hexagon.png" width={640} height={360} />
</div>

A polygon can create the most complex shapes. It requires, at least, three points. Each point requires two numbers.

#### To create a triangle
```css
.triangle {
  shape-outside: polygon(50% 0%, 0% 100%, 100% 100%); }
```

#### To create a hexagon
```css
.hexagon {
  shape-outside: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
```

### Circle
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-circle.png" width={640} height={360} />
</div>

You can base a circle only on the radius. The outermost point will define this. The centre point determines the position. The syntax is similar to that of gradients and background positioning.

```css
.circle {
  shape-outside: circle(50%);
  shape-outside: cricle(at right 12px top 25%); }
```

### Inset
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-inset.png" width={640} height={360} />
</div>

Inset works by creating a rectangular shape. The values work in a familiar fashion: top, right, bottom and left. There is an optional `border-radius` parameter, which can’t be negative.

```css
.inset {
  shape-outside: inset(5% 10% 20% 10% round 6px); }
```

### Ellipse
<div className="article-image flex center">
  <Image src="/static/images/blog/css-shapes-ellipse.png" width={640} height={360} />
</div>

An ellipse is similar to a circle in the sense you set the position to form the shape from the same way. However to get the ellipse shape two points are passed.

```css
.ellipse {
  shape-outside: ellipse(25% 50% at right top); }
```

### Tips for creating shapes
When using one of the shape options, on an image or element, (if part of the text flow), it’s best to accompany it with the equivalent `clip-path`. This way you will get the desired effects.

> It’s quite difficult to make shapes without seeing, I recommend using [Clippy by Bennett Feely](http://bennettfeely.com/clippy/). It’s for `clip-path`, but it’s the same idea.

## Image
There are two methods for using an image. One isn’t supported, and the other is one we’re already familiar with. To get images to work, I found it very tricky and didn’t work as I’d expected more often than not.

> The most important thing I can tell you is that the image must be on the same server. It requires a CORS enabled server, to be hosted elsewhere. While I was trying to create a demo on CodePen, I found this not working for that reason.

### Using a URL
This method is like any image we would use.

```css
.image {
  shape-outside: url(path/to/image.png); }
```

### Using the image src attribute
The method uses the reference image src attribute. This will add some convenience, **it's not supported currently**.

```css
.image {
  shape-outside: attr(src url); }
```

### shape-image-threshold
When using an image, you can set the threshold to a value between 0 and 1. If you have a threshold of .5, the shape will form around pixels that are more than 50% opaque. As you would expect this leaves us only using png or gif images. From what referencing <a href="http://caniuse.com/#search=shape">caniuse</a> resources gif isn’t supported, yet.

```css
.image {
  shape-image: url(path/to/image.png);
  shape-image-threshold: .5; }
```

If you have a particular part of an image, you want the text to flow around. Take the image and delete the area that isn't the area you want the image to flow round. Once you have done that, make the remaining area black.

<figure>
<Image src="/static/images/blog/css-shapes-image-mask.gif" width={640} height={360} />
<figcaption>Fill the area you don’t want the text to flow in black. Export the image including the transparent area.</figcaption>
</figure>

## Things I found that may not be obvious right away
- If your shape has space on both sides, your text won't flow around it
- Text flows on the opposite side of the float
- In most cases it will make sense to use an actual shape over an image
- You have to take care to make it work across all screen sizes
- Again if you don't have a CORS enabled server, make sure your images are on the same server
- Use a `clip-path` along with `shape-outside`
- Combining `clip-path` and `shape-outside` can help make more interesting layouts
- [Use Clippy by Bennett Feely it will save you time](http://bennettfeely.com/clippy/)

## Thoughts
My opinion on this initially is it’s very limiting. While I have seen other examples out there that work well, these are only within an article itself to complement the page better. There isn’t currently any use cases that I have found myself that can benefit layout.

However, this isn’t the intention of `shape-outside`. Soon, exclusions will be more beneficial, to do what I was hoping. I had too high expectations. It was certainly worth exploring this topic and it's something I'm going to think about more while designing. The ability to clip and have layout flow round shapes is something to experiment more with.
