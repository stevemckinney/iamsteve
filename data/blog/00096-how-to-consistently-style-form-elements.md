---
title: "How to consistently style form elements"
date: "2015-10-13T06:29:00+00:00"
lastmod: "2016-08-28T10:50:39+00:00"
summary: "One of the trickiest things to deal with cross browser is the styling of form elements. All browsers influence these strictly, but over the years the ‘appearance’ property has been present in WebKit and Blink browsers, and Firefox to help gain some control. More recently it’s been added to Edge. It is a little more to it than just using this property. I’ll explain the advantages and drawbacks to this and how I handle it. The goal of this post is to give you the base for you to apply your visual style on top of. I will be covering text, button and select elements."
metadesc: Here's a list of tips for styling input, select and submit buttons across Safari, Chrome, Firefox & Edge."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 96
slug: "how-to-consistently-style-form-elements"
---

One of the trickiest things to deal with cross browser is the styling of form elements. All browsers influence these strictly, but over the years the ‘appearance’ property has been present in WebKit and Blink browsers, and Firefox to help gain some control. More recently it's been added to Edge. 

It has a little more to it, than just using this property. I’ll explain the advantages and drawbacks to this and how I handle it. The goal of this post is to give you the base for you to apply your visual style on top of. I will be covering text, button and select elements.

## Starting with a base
The first thing you need to do is set up a good base. To freely style your form elements we need to use `appearance: none`. <a href="http://caniuse.com/#feat=css-appearance">The support is good</a>, and this does much of the hard work for us.

> Prefixes are necessary, `-webkit-` and `-moz-`. Also, as noted by Can I use, Edge and IE Mobile support the `-webkit-` prefix.

However, there will be some more visual browser defaults that are in place. That is `border`, `box-shadow` and `border-radius`, `background-colour ` and `font-family`. Replacing these with your own preferences, or removing altogether solves that.

```css
.input-base {
  appearance: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background-color: #fff;
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif; }
```

## Getting a consistent height in Firefox
Firefox has long been known to be a pain for its default `line-height`. As of Firefox 41, this is still present in `<select>` elements, you have the freedom to change it on the majority of text/button like elements from what I have found.

The `line-height` is set to normal by default. I stick with this if I’m not going to be using `<select>` anywhere. If I’m using `<select>`, I will set a `height`, equivalent `line-height` and only apply `padding` to the sides.

I'm not a huge fan of setting the height, for a few reasons. 

- It means you need to change more, to adapt it at a later point
- You have to introduce another set of CSS for a textarea
- If button text breaks on to a new line it's less graceful

## Getting a consistent height in Edge
Edge is all well and good until it concerns select elements, like Firefox. So the same recommendation stands, setting the `height`.

## Base without `<select>`
```css
.input-base {
  appearance: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background-color: #fff;
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  line-height: normal;
  padding: 12px; }
```

## Base with `<select>`
```css
.input-base {
  appearance: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background-color: #fff;
  font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  line-height: normal;
  padding: 0 12px;
  height: 44px;
  line-height: 44px; }
```

## Drawbacks
WebKit and Blink based browsers will handle all form elements much nicer and more consistently, than the likes of Edge and Firefox. With the two applying harder to adjust styles (particularly where it concerns `<select>`). So while I favour an approach which applies the littlest amount of CSS initially. You may find the `height` and `line-height` approach serves you better in the long run.

## Other comments
I have seen other approaches for [handling the Firefox issue](http://davidwalsh.name/firefox-buttons). This only appears to apply to `type=submit`, so it may be possible to line it up next to a `<select>` by applying additional `padding`.

If you view the following pen in Firefox it demonstrates this. I think this approach may vary, and I may explore it further and update this post with a more definitive answer.
<p data-height="268" data-theme-id="13022" data-slug-hash="vNJLwm" data-default-tab="result" data-user="stevemckinney" class='codepen'>See the Pen <a href='http://codepen.io/stevemckinney/pen/vNJLwm/'>vNJLwm</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Hopefully, this helps with your styling troubles.