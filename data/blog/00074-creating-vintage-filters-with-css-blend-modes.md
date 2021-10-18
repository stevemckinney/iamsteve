---
title: "Creating vintage filters with CSS blend modes"
date: "2015-05-12T06:00:00+00:00"
lastmod: "2016-08-28T11:00:12+00:00"
summary: "With blend modes we can apply a vintage style to any image like we would in Photoshop. Blend modes is something I have been looking forward to coming to CSS for a while and this feels like a fitting way for me to share a deeper look at them. You can test them for yourself with the demo at the bottom."
metadesc: CSS is now able to use blend modes. Using mix-blend-mode we can add ’vintage’ style effects to images."
theme: "#e1f7ee"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 74
slug: "creating-vintage-filters-with-css-blend-modes"
---

With blend modes we can apply a vintage style to any image like we would in Photoshop. Blend modes is something I have been looking forward to coming to CSS for a while and this feels like a fitting way for me to share a deeper look at them.

## Decision making for choosing a filter
There are many blend modes and some of them serve better for applying the effect we're going for.

<div class="p-flex">
<div class="p-one-half" markdown="1">
### Modes that tend to be best
- overlay
- soft-light
- lighten
- screen
</div>
<div class="p-one-half" markdown="1">
### Modes with varying success
- exclusion
- multiply
</div>
</div>

### Choosing a suitable colour
Suitable colours tend to be shades of blue, purple, yellow and green. Each colour will be more effective depending on the blend mode, this is a matter of trial and error for the most part. Adjusting the blend mode and opacity to achieve desirable results.

## How to apply blend modes
Blend modes can be applied in two ways, using `background-blend-mode` and `mix-blend-mode`. I’ll be focusing on `mix-blend-mode` due to the flexibility it has over `background-blend-mode` as it can only be applied to elements with a `background`. However should it be a better fit for you it’s not difficult to adjust the code.

### HTML  
I’m working on the basis that we will be applying it over an image. We’ll wrap our image in a `<div>` as it’s not possible to use `:before` and `:after` on `<img>`.

```markup
<div class="blend blend-yellow">
  <img src="…">
</div>
```

### CSS
The CSS is fairly simple, just cover the the image with an empty pseudo element.

```css
.blend {
  position: relative; }

.blend:before {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; }

.blend-yellow:before {
  mix-blend-mode: multiply;
  background-color: #f1ef98;
  opacity: .5; }
```

## Try out the demo
<p data-height="460" data-theme-id="13022" data-slug-hash="gpaXeB" data-default-tab="result" data-user="stevemckinney" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/gpaXeB/">Vintage blend mode creator</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Finishing thoughts and other ideas
I’ve found this a handy little experiment to create. You can experiment further with using colours `:before` and `:after`. You can create some interesting vintage effects. You could also combine a colour and add textures. They would all work great in combination.