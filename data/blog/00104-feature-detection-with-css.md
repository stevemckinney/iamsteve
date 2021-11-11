---
title: "Feature detection with CSS using @supports"
date: "2015-12-08T07:30:00+00:00"
lastmod: "2016-12-05T21:18:32+00:00"
summary: "Feature detection is a core part of day to day life as someone who makes websites. It’s one of those features I usually hand off to Modernizr. I recently saw a tweet, which spurred the curiosity to see if we’re ready to use the @supports feature query. Now is definitely a good time to start."
metadesc: "You can now use CSS for feature detection using @supports feature queries. This post shows you how can use it today and replace the likes of Modernizr. "
theme: "#fffbf2"
tags: ["Code", "CSS"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 104
fileroot: "feature-detection-with-css"
---

Feature detection is a core part of day to day life as someone who makes websites. It's one of those features I usually hand off to Modernizr. I recently saw a tweet, which spurred the curiosity to see if we’re ready to use the `@supports` feature query. Now is definitely a good time to start.

The opportunity isn't huge so far, as generally browsers are quite similar in feature sets. Though it's a good practice to get into and I'm hoping to make note to myself and others that CSS feature detection is viable.

## Support
The browser support is more optimistic than I thought. The support is very broad. With globally just short of 70% of browsers supporting it, as of writing. You’re best referring to can I use, <a href="http://caniuse.com/#search=supports">for up to date statistics</a>.

All major modern desktop browsers support it, and iOS Safari, Android Browser and Chrome for Android support it too. So this is a great reason to start using it.

## Usage
Usage is very familiar, it’s similar to media queries and all other conditional rules.

### General
The general usage is checking for a property and value. It isn’t currently possible from my testing to just check for a property eg: `box-shadow` or `transform`.

```css
@supports (display: flex) {
  … }
```

### Prefixed
Prefixes are rarely used now. However, you can check for the existence of those.

```css
@supports (display: -webkit-flex) {
  … }
```

### Not
The way to check whether something doesn’t exist is a matter of putting `not` before the condition.

```css
@supports not (display: flex) {
  … }
```

### This but not that
This is one I was thinking the behaviour would be similar to programming languages. It isn’t. However, the approach works nicely as the code example will demonstrate.

At one point, Firefox didn’t support the flex-wrap property. This made flexbox not an option in that browser.

```css
@supports (display: flex) {
  .supports {
    display: flex; }

  @supports not (flex-wrap: wrap) {
    .supports {
      display: block; } } }
```

### Multiple conditions, `or` and `and`
Multiple conditions can be checked for, this makes `@supports` versatile to many needs. This is an alternative approach to the previous example.

```css
@supports (display: flex) and (flex-wrap: wrap) {
  … }
```

### Multiple grouped conditions
If necessary you can make more complex queries. You can group them together with extra brackets.

```css
@supports (columns: 1) or ((display: flex) and (flex-wrap: wrap)) {
  … }
```

### Mixing with media queries
It’s possible, this is more to cover all bases.

```css
@media (min-width: 600px) {
  @supports (mix-blend-mode: overlay) {
    mix-blend-mode: multiply; } }
```

### Pseudo selectors
There is no mention of this in the [specification](http://www.w3.org/TR/css3-conditional/#at-supports). You can’t currently test for pseudo selectors. I can’t think of any exact use cases where it would be beneficial, because it would be ignored by the browser anyway. 

I feel like there could be some benefit to it, due to new level 4 selectors. For what it’s worth, it’s handy to know that this isn’t currently supported.

## Ideas for usage
Today the usage isn’t too apparent, there are some good uses that I detail. As time passes they will become much more apparent and reduce the reliance on JavaScript.

### Hyphenation
When you hyphenate a block of text, you’re afforded the ability to justify text. With hyphenation you’re not left with the possibility of awkward rivers. Not many browsers support this, but it’s a simple and convenient way to allow it without awkwardness being forced upon other browsers.

```css
@supports (-webkit-hyphens: auto) {
  p { 
    -webkit-hyphens: auto;
    text-align: justify; } }
```

### Background blur with backdrop-filter
As of writing this is only supported in iOS Safari 9 and Safari 9. It’s useful for getting the iOS blur going on with fixed headers. I’ve used it on content regions, with a lower opacity and have retained good legibility. For the non-supporting we can  increase the opacity.

```css
@supports (backdrop-filter: blur(12px)) {
  .content {
    background-color: rgba(255, 255, 255, .3);
    backdrop-filter: blur(12px); } }

@supports not (backdrop-filter: blur(12px)) {
  .content {
    background-color: rgba(255, 255, 255, .8); } }
```

### Unsupported background-blend-mode properties
CSS blend modes still have fairly low support as of writing. In some cases specific modes aren’t supported. This makes for a good use case for `@supports`.

In this example you check for support for `background-blend-mode: color` and apply that in the feature query. This gives us the look we are after. However if we have text over the image it may not be legible. So for our alternate look, you can position a layer over the image.

```css
.image {
  background-image: url(‘my-image.jpg’); }

@supports (background-blend-mode: color) {
  .image {
    background-color: green;
    background-blend-mode: color; } }

@supports not (background-blend-mode: color) {
  .image {
    position: relative; }

  .image:before {
    content: “”;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: red;
    opacity: .8; } }
```

### Exclude IE 11 from flexbox
As no version of IE supports `@supports` and from my experience the most buggy implementation of flexbox is in IE 11. We give ourselves peace of mind. It should go without saying, but you rule out other older browsers with this approach too.

```css
@supports (display: flex) and (flex-wrap: wrap) {
  … }
```

## Final thoughts
I found this to be a valuable topic to explore. `@supports` looks like a great addition for feature detection. It’s going to become a big part of our CSS. While there isn’t too many use cases right now, this will grow and grow over the coming months. With grid layout, shapes and scroll snap points to name a few, there is more opportunity than what I have mentioned.
