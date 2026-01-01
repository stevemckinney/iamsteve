---
title: "Get up to speed with scroll snap points"
date: "2016-05-31T06:30:00+00:00"
lastmod: "2019-05-28T15:25:10+00:00"
summary: "Scroll snap points is the answer to the need for JavaScript carousels, to an extent. As browsers gain more and more new features in CSS, it’s important to keep up to date with them. As the generalisation is; where you can replace JavaScript with CSS you gain performance improvements. Carousels in my experience are a good chunk of the need for JavaScript on the average website. So I’m very interested at the prospect of using scroll snap points to replace that."
metadesc: "Learn about the scroll snap properties, scroll-snap-type, scroll-snap-points-x scroll-snap-points-y, and scroll-snap-destination. These will be the basics to create a carousel like area with CSS."
theme: "#e9f5f5"
tags: ["Code", "CSS"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
codepen: true
id: 128
fileroot: "get-up-to-speed-with-scroll-snap-points"
---

> **This post is out of date**. Scroll snap points has been updated significantly since this post was written. Many of the properties will no longer work, until this post can be updated, I would advise referring to the [official spec](https://drafts.csswg.org/css-scroll-snap-1/).

Scroll snap points is the answer to the need for JavaScript carousels, to an extent. As browsers gain more and more new features in CSS, it’s important to keep up to date with them. As the generalisation is; where you can replace JavaScript with CSS you gain performance improvements. Carousels in my experience are a good chunk of the need for JavaScript on the average website. So I'm very interested at the prospect of using scroll snap points to replace that.

## Browser support
Currently browser support isn't great (as of writing), due to Chrome not supporting scroll snap points altogether. So this cuts out a massive part of anyone’s audience. Always check [caniuse](http://caniuse.com/#feat=css-snappoints) for up to date usage.

### Prefixes and deprecations
It’s important to note as well Safari is using the `-webkit-` prefix. The properties `scroll-snap-points-x` and `scroll-snap-points-y` are deprecated according to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-points-x).

## The behaviour
Scroll snap points should behave quite familiarly. If you scroll or swipe an area that has it enabled, it will snap to the next area, that has been specified in CSS.

## Properties on the scroll container
There are two types of properties that are necessary for scrolling regions, those on the container and those on the child elements. Some will also have the ability to be used on both the container and child elements.

### Basic CSS required
Part of making this functionality viable means a base level of CSS will be required for the scroll container.

#### Horizontal scroll regions
```css
.scroll-container {
  width: 100vw;
  height: 100vh;
  white-space: nowrap;
  overflow-x: auto; }
```

#### Vertical scroll regions
```css
.scroll-container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto; }
```

Defining a `width`, `height` and `overflow` will give you a basic scrolling area to build upon with snap-points. Additionally if you want it to scroll horizontally, you will need `white-space: nowrap`.

### scroll-snap-type
There are 3 values for the snap type, `none`, `mandatory` and `proximity`. `none` being the more obvious value, in that if there is any snapping, it will be removed. `mandatory` and `proximity` allow for different types of snapping behaviour.

#### Comparisons
When using the values `mandatory` or `proximity`, I found in Safari it didn’t matter too much, but in Firefox it made a clear difference.

`mandatory` definitely had the more expected snapping behaviour, whereas `proximity` felt somewhat broken. `proximity` allows the user to scroll more freely, `mandatory` doesn’t.

#### Differences
Another difference is, when something happens to content, such as adding, moving, deleting or resizing. `mandatory` from my understanding will find the snap point again, whereas `proximity` will remain.

> I imagine this will become more consistent with final implementation.

### scroll-snap-points-x and scroll-snap-points-y
**These properties only work in Safari**, with the `-webkit-` prefix. This allows you to define a distance each scroll should snap to, using the `repeat()` function.

```css
.scroll-container {
  scroll-snap-points-x: repeat(100%);
  scroll-snap-points-y: repeat(100%); }
```

The value can generally be any unit of measurement, `px`, `em`, or `vw`, to name a few. It’s fairly straightforward, but it’s clear why it was deprecated, which I will get into shortly.

### scroll-snap-destination
This is the replacement to `scroll-snap-points-x` and `scroll-snap-points-y`. It’s setup to be more familiar, like `background-position`, as in the first value is the `x` axis and the second is the `y` axis.

By default the value is `0 0`, it also accepts the same position values you would expect of `background-position`. This is the benefit over `scroll-snap-points`, there isn’t any new syntax to learn.

So with that in mind, once you scroll it will snap to that point within the element. If you were to use 200px as a value, it would snap to the element and an additional 200px.

<CodePen slug="Yqvweq" title="Scroll snap points #1" height={300} themeId="23161" editable={true} />

I found the behaviour to work strangely, when experimenting with it within Firefox over Safari. If you compare the difference of the demo in either browser, it will become clearer. It feels like you’re forced towards the child elements taking up the whole browser width to work effectively.

Finally, this property you can animate, whereas  `scroll-snap-points` can’t. That’s for a separate post to explore this capability.

### Summary
- The properties mentioned are the minimum needed to get the scrolling behaviour
- `scroll-snap-points-x` and `scroll-snap-points-y` only work in Safari and are being phased out
- `scroll-snap-destination` is the replacement
- If you want horizontal scrolling extra properties are required
- Similarly for vertical, but less is required

```css
.scroll-container {
  width: 100vw;
  height: 100vh;

  /* Not necessary for overflow-y */
  white-space: nowrap;

  /* Can be overflow-y */
  overflow-x: auto;

  /* Enable scroll snapping */
  scroll-snap-points-x: repeat(100%);
  scroll-snap-points-y: repeat(100%);
  scroll-snap-destination: 0 0; }
```

## On the elements
There are no supported properties, as of yet that are element only.

## All elements
Currently, there is only one element that will apply to all elements.

### scroll-snap-coordinate
This property can be applied to child elements too, it’s usage is similar to `background-position` and you can also pass multiple coordinates.

```css
.scroll-container {
  scroll-snap-coordinate: 0 0, center center; }

.scroll-item {
  scroll-snap-coordinate: 240px 240px; }
```

To be honest I don’t actually know how this property affected anything. It sounds like the behaviour is similar to `scroll-snap-destination`. With it being able to be applied to child elements, I would have expected it to align to each differently if specified.

It feels like this property should clash with `scroll-snap-destination`. I didn’t understand this very well, however it was only mentioned in MDN and supported in Firefox.

## Final demo
This ended up being the best kind of layout for the most consistent behaviour across browsers that support this.

<CodePen slug="qNBPpG" title="Scroll snap points #2" height={300} themeId="23161" editable={true} />

## Future properties
The properties hereon are not currently available in any browser, but the intention is they are going to be part of this module. It may change, until the module is final, that’s where I’ll be keeping this up to date.

Not being able to use them in the browser, means interpreting how they will supposedly work. Which is quite difficult, so I will give a vague overview, particularly focusing on code usage.

### scroll-snap-padding
This is a scroll container property. It works similarly to regular padding.

```css
.scroll-container {
  scroll-snap-padding: 12px;
  scroll-snap-padding: 12px 0; }
```

> The `scroll-snap-padding` property defines the snap alignment container, a region inset from the visual viewport of a scroll container used in calculating its snap positions. The snap alignment container is used as the alignment container when calculating valid snap positions. [^1]

### scroll-snap-margin
This is a child element property. It works similar to the regular margin.

```css
.scroll-container {
  scroll-snap-margin: 12px;
  scroll-snap-margin: 12px 0; }
```

> The scroll-snap-margin property defines the scroll snap margin on elements within a scroll container, used in calculating snap positions for that scroll container.[^2]

### scroll-snap-align
This property applies to all elements, using values `none`, `start`, `end` and `centre`.

```css
.scroll-container {
  scroll-snap-align: centre; }
```

> The `scroll-snap-align` property specifies how an element’s scroll snap margin should align with its ancestor scroll container’s snap alignment container. The two values specify the snapping behavior in the x and y axes, respectively. If only one value is specified, the second value defaults to the same value.[^3]

## Finishing thoughts
The difficulty in researching some of this CSS module tells me it’s going to go through some changes. Like the CSS shapes and exclusions modules, it’s just the start. There is plenty of room for expansion. Such as animation and control over how it’s interacted with. Animation appears possible in Firefox and with future properties.

You may be put off using such CSS, but without experimenting and looking at new properties. You’re not able to form an opinion and join in the future of CSS. You can also see the difficulty in interpreting some of these properties, and the behaviour not being what you may expect. This type of feedback is helpful for CSS spec writers.

[^1]: [Scroll snap padding specification](https://www.w3.org/TR/css-snappoints-1/#scroll-snap-padding)
[^2]: [Scroll snap margin specification](https://www.w3.org/TR/css-snappoints-1/#scroll-snap-margin)
[^3]: [Scroll snap align specification](https://www.w3.org/TR/css-snappoints-1/#scroll-snap-align)
