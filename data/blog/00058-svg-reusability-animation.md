---
title: "SVG reusability & animation"
date: "2015-01-27T08:00:00+00:00"
lastmod: "2021-06-11T06:05:56+00:00"
summary: "The great thing about SVG is CSS can modify it. Which allows you to modify the way paths look quite drastically. This is really handy for saving on page weight because you don’t have to load multiple images and it looks like it was meant to happen."
metadesc: How to animate and change fill colours on inline SVG. Using currentcolor and groups we can animate and manipulate SVG unlike any other image type."
theme: "#ffede5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 58
slug: "svg-reusability-animation"
---

If you haven’t read the previous posts, I have spent the best part of my free time building a portfolio, where I focused on performance. These posts covered [asynchronous and critical path CSS](http://iamsteve.me/blog/entry/critical-asynchronous-css), [Javascript](http://iamsteve.me/blog/entry/javascript-without-jquery) and [images with srcset & picture](http://iamsteve.me/blog/entry/images-with-srcset-picture).

The great thing about SVG is CSS can modify it. Which allows you to modify the way paths look quite drastically. This is really handy for saving on page weight because you don’t have to load multiple images and it looks like the changes were meant to happen, as it tends to look unnatural when you use a bunch of PNGs.

## Replacing icon fonts and png sprites with SVG
The main way I would do this is I created an SVG file to contain all of my paths (paths have been excluded for conciseness).

```.language-markup
<svg style="display:none">
  <symbol id="icon-inspiration" viewBox="0 0 12 32">
    <path class="fill-grey" d="…"/>
    <path class="fill-orange" d="…"/>
    <path class="fill-blue" d="…"/>
  </symbol>
  …
</svg>
```

### `style="display:none"` 
This basically makes sure you’re not left with a blank space in your document. An alternative to this could be using [the `.visuallyhidden` technique](http://a11yproject.com/posts/how-to-hide-content/).

### The `class` attribute
This allows us to apply a fill colour in our CSS to keep it a bit more manageable. More about styling shortly.

### The `id` attribute
This is so you have something to reference when using it in code.

### The `viewBox` attribute
This is to make sure it displays correctly. You don’t have use the `viewBox` in your HTML either, which is nice.

## `<use>` your SVG
Using your SVG sprite in HTML is simple, just add a new SVG element. Except inside this you use the `<use>` element to reference the `id` you gave to your symbols.

```.language-markup
<svg class="icon">
  <use xlink:href="#icon-inspiration"></use>
</svg>
```

> Make sure you place your SVG sprite before the earliest `<use>` across your website. There’s a bug in Safari on iOS as of writing this post.

## Filling your SVG with CSS
However we can keep the fills in a more maintainable state by using the class names we applied earlier.

```.language-css
.fill-grey {
  fill: grey; }
```

### Changing fill on hover
This highlights the limitations of the `<use>` tag. It’s great for reusability, but if you need to do more complex things like animation and multiple colour changes, it may not the best use of this tag.

For a simpler use case like one colour icons, taking the SVG we created earlier with a class on each path. Replace the class with `fill="currentcolor"`. This gets around not being able to change the fill in CSS. As a result our CSS must be on the SVG element itself rather than the path.

```.language-css
.icon {
  color: grey; }

.icon:hover,
.icon:focus {
  color: red; }
```

> How do you handle this? I’d like to hear your tips [@irsteve](http://twitter.com/irsteve)

## Animating SVG
For [Lily’s website](http://lilyjavanda.com), I created an illustration of a face chart. They start as a blank canvas for experimenting with looks as a makeup artist. It makes for a fitting way to introduce the website.

The aim was to transition from a blank face chart to a filled in face chart. This involved animating fills and strokes. Something that the `<use>` element would make difficult. So you embed the SVG into the page as you would export it.

### Changing the opacity and fill
One of the things I needed to fill in was the eyebrows. They start off as an outline and finish at a fill with no outline.

#### A concise version of the eyebrow paths
```.language-css
<path id="brow_right" class="brow" fill="transparent" stroke="#4C4B5A" stroke-opacity=".2" d="…"/>
<path id="brow_left" class="brow" fill="transparent" stroke="#4C4B5A" stroke-opacity=".2" d="…"/>
```

#### The CSS required for animating
With the CSS we change the stroke to be transparent and fill in the eyebrows with a solid colour.

```.language-css
    @keyframes brow {
        to {
            fill: #726A62;
            fill-opacity: 0.8;
            stroke: rgba(0, 0, 0, 0); } }

    .brow {
        animation: brow 2s 3s ease forwards; }
```

### The full animation
This was only a brief look into what I have done, it’s like any animation you would do, just there are specific SVG properties you can use. Have a dig through the CSS on CodePen to get a better idea.

<p data-height="480" data-theme-id="13022" data-slug-hash="GgNyBo" data-default-tab="result" data-user="stevemckinney" class='codepen'>See the Pen <a href='http://codepen.io/stevemckinney/pen/GgNyBo/'>GgNyBo</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## SVG can be accessible too
If your SVG has more purpose other than decoration you will want to [make it accessible](http://www.sitepoint.com/tips-accessible-svg/). The article by Léonie Watson provides great insight to making them accessible.