---
title: "Overcoming a couple of issues with SVG filter effects"
date: "2015-02-03T08:00:00+00:00"
lastmod: "2016-08-28T12:54:02+00:00"
summary: "Using SVG filter effects wasn’t something I was aware of and they have good browser support.However, they are greatly useful when you’re adding illustration with certain details to your website. Even though I only used the gaussian blur filter, I encountered some problems when using it and I’m sure it will apply to using others."
metadesc: SVG filters are really useful for infinitely scalable effects but they come with some issues, such as appearing with lower saturation in Safari and filter clipping at certain sizes."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 59
slug: "overcoming-a-couple-of-issues-with-svg-filter-effects"
---

Using SVG filter effects wasn’t something I was aware of and they have [good browser support](http://caniuse.com/#search=svg%20filters).

However, they are greatly useful when you’re adding illustration with certain details to your website. Even though I only used the gaussian blur filter, I encountered some problems when using it and I’m sure it will apply to using others.

## Using SVG filter effects
The first place I came across SVG filters was in Adobe Illustrator, which makes them quite accessible for ease of use. 

The easiest way to determine whether you should use one is if you’re going to use one of the Photoshop Effects within illustrator. As these will be saved as an actual image and embedded into your SVG should you want to use it that way.

It’s important to try anticipate this as you could end up having to recreate much of your illustration should you want it to be part of an SVG image.

### Why would you want to do this?
- It will be really apparent that vector and raster are mixed within the image
- It won’t scale well
- Can’t animate these areas (without extra images)
- Extra HTTP requests

These are a few of the reasons you would want to keep it all vector.

## Using SVG filters in Adobe Illustrator
<figure>
<img src="/static/images/blog/svg_filters_img1.png" srcset="/static/images/blog/svg_filters_img1.png 1x, /static/images/blog/svg_filters_img1.png 2x">
<figcaption>In the Illustrator menu **Effect > SVG filters > Apply filter**</figcaption>
</figure>

### Creating a filter
<figure>
<img src="/static/images/blog/svg_filters_img2.png" srcset="/static/images/blog/svg_filters_img2.png 1x, /static/images/blog/svg_filters_img2.png 2x">
<figcaption>In the same menu, the second icon creates a new filter (the curled page kind of looking one).</figcaption>
</figure>

<figure>
<img src="/static/images/blog/svg_filters_img3.png" srcset="/static/images/blog/svg_filters_img3.png 1x, /static/images/blog/svg_filters_img3.png 2x">
<figcaption>You’ll open this window, it’s fairly difficult to somehow know what to type for your filter. You can close that window and choose a filter, then click the fx icon and you’ll be given something you can work with. However, I’ll continue on with a gaussian blur example.</figcaption>
</figure>

## Example usage gaussian blur
The simplest way to use an SVG filter is through a gaussian blur. You place all your filters inside your `<defs>` for reuse later, like so:

```.language-markup
<svg>
  <defs>
    <filter id="blur_20">
      <feGaussianBlur stdDeviation="20"></feGaussianBlur>
    </filter>
    …other defs…
  </defs>
  …other SVG stuff…
</svg>
```

> Each filter needs an `id` for later use.

### Gaussian blurs larger than ~12
I have found that when you have a larger blur the filter gets cut off. The only solution I came across which seemed to work most consistently no matter the size of the blur was to add the following:

```.language-markup
width="150%" height="150%" x="-25%" y="-25%"
```

Setting the `x` and `y` attributes to be half of the additional percentage over 100%, seems to offset the filter perfectly. Your mileage may vary with this depending on the size of your blur. 

## sRGB
Another issue I came across in Safari, was the colours of the image seemed to have a much lower saturation than every other browser. I came across the solution to add `color-interpolation-filters="sRGB”`.

### Your final filter would look like
```.language-markup
<filter width="150%" height="150%" x="-25%" y="-25%" id="blur_20" color-interpolation-filters="sRGB">
  <feGaussianBlur stdDeviation="20"></feGaussianBlur>
</filter>
```

Now you should have filter that doesn’t appear cut off or desaturated anywhere!