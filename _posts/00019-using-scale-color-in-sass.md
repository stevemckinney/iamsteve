---
title: "Using scale-color in Sass"
image:
  large: false
  medium: false
  thumbnail: false
excerpt: "I have been recently trying to get a consistent look across my element mixin no matter the colour, without being too inefficient. You could say simply take a base colour, and use darken and lighten on it, to get reasonable variations of the colour, for gradient colour stops. Then throw in some bevels, a border, and you have a nice button."
meta:
  description: "Don’t use darken or lighten use scale-color! Changing tints and shades will be more predictable, read the post to find out why."
design:
  background: "#e9f5f5"
categories: "Code"
date: "2012-11-21T19:45:00+00:00"
updated: "2016-08-28T12:59:09+00:00"
author:
  name: "Steve"
  picture: "[replace-me]"
ogImage:
  url: "/assets/og/cover.jpg"
status: "open"
slug: "using-scale-color-in-sass"
---

I have been curious to try find a solution to having a fluid browser around portfolio images. I have attempted to find a solution which is as simple as I have been able to find. The overall idea uses `:before` to apply the browser and `border-image`, this is purely to offset extra space caused by the widths of the border.

## The idea
Using `border-image` take it's ability to divide an image in 9 slices and repeat it round another image. Simple in theory.

## The solution
Using `:before` to offset the `border-width` apply our browser to a `div` using `border-image`. The reason we can't just apply the `border-image` directly to the image itself is because we have to define slices of the image. Those slice dimensions are used in the `border-width`. As the border is part of the box the image it contains ends up being undesirably offset, which is expected. I wasn't able to find anything to get around this.

### The code
```.language-scss
.browser {
  position: relative;
  width: 50%;
  margin: auto;
  padding: 2.25em 0 .5625em;

  img {
    border-left: 1px solid rgba(black, .4);
    border-right: 1px solid rgba(black, .4); }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-width: 2.25em .5em .5625em 5em;
    border-image: url(http://iamsteve.me/assets/images/browser.png) 72 16 18 160; } }
```

To understand this better the 3 lines of code that really make this work are: 

```.language-scss
padding: 2.25em 0 .5625em;
```

This offsets our image top and bottom the height of the url and status bar in the browsers design.

```.language-scss
border-width: 2.25em .5em .5625em 5em;
```

This is the size of the border corresponding to the size of each slice of the border image.

```.language-scss
border-image: url(http://iamsteve.me/assets/images/browser.png) 72 16 18 160;
```

Our border image and with the slices.


## Codepen
<pre class="codepen" data-height="300" data-type="result" data-href="vuCea" data-user="stevemckinney" data-safe="true"><code></code><a href="http://codepen.io/stevemckinney/pen/vuCea">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

## Justifications
Pseudo elements can't be applied to `img` elements so the use of the extra div is necessary.

<figure>
<img src="{filedir_3}Screen_Shot_2013-03-24_at_13.36.28.png" height="392" width="566">
<figcaption>Demonstrates what happens when applying border-image directly to the image</figcaption>
</figure>

We can actually apply the border to the image and generally make it work. With using negative margins to offset the `border-width` and giving the `img` and `div` fixed widths. As I need it to be fluid this cancels it out.