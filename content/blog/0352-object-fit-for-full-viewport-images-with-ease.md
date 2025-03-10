---
title: "Object fit for full viewport images with ease"
date: "2015-03-03T08:00:00+00:00"
lastmod: "2016-08-28T12:52:37+00:00"
summary: "Discovering this CSS feature will make my life much easier where it concerns the positioning of images. It’s like background-size for background images. It’s easy to use and behaves in a similar way albeit different naming. I’m going to show how object-fit and viewport relative units can allow us, to size inline images, without worrying about distortion."
metadesc: "How to use object-fit to make images using the <img> tag fill the viewport. This method is like background-size but for the img tag."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code", "CSS"]
ogImage: "/opengraph-image.png"
status: "open"
codepen: true
id: 352
fileroot: "object-fit-for-full-viewport-images-with-ease"
---

This CSS feature will make life much easier where it concerns the size of images. It’s like background-size for background images. It’s easy to use and behaves in a similar way albeit different naming. I’m going to show how `object-fit` and viewport relative units allow, without distortion, sizing inline images, to a more fluid aspect ratio.

## The major use case
I’m sure you have wanted images to be updateable through your CMS.  You want them to be responsive and fill the container it’s in. As a result you have had to make some kind of sacrifice. `object-fit` solves this.

## Usage
`object-fit` has options  `none`, `contain`, `scale-down` and `fill` (which is the initial value).

```css
.fitted-image {
  object-fit: cover; }
```

### `object-position`
If you notice the crop position isn’t ideal for your image, `object-position` can help to fix this. It works in a similar way to background position. The initial value is `50% 50%`.

```css
.fit-top-center {
  object-position: top center; }
```

## Creating full width/height viewport images

To make an image fill the viewport and avoid distortion, we need to use viewport units and `object-fit`.

```css
.fitted-image {
  width: 100%;
  height: 100vh;
  object-fit: cover; }
```

### Putting it together

<p data-height="464" data-theme-id="13022" data-slug-hash="NPmgNB" data-default-tab="result" data-user="stevemckinney" className="codepen">See the Pen <a href='http://codepen.io/stevemckinney/pen/NPmgNB/'>NPmgNB</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Browser support
As of writing the only downsides are IE doesn’t support it and Safari on Mac and iOS don’t support object-position. [Updated support is always available on caniuse](http://caniuse.com/#search=object-fit)

[There are polyfills available](https://github.com/anselmh/object-fit), if it’s crucial to you. I’m yet to use them, so I’m not able to provide an opinion.
