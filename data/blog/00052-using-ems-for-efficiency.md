---
title: "Using em’s for efficiency"
date: "2013-04-02T11:55:00+00:00"
lastmod: "2016-08-28T12:58:40+00:00"
summary: "There are a lot of CSS frameworks out there that are great, but their biggest flaw to me is their insistence to override styles and not use a relative measurement like em’s to adjust the styles when needed. I realise a lot of the way frameworks are made are to dummy proof them and to provide as much freedom as possible with their use. I still think there is an extent to which it can be done better."
metadesc: "How using em's you can create scalable elements with very little code."
theme: "#e9f5f5"
tags: ["Code", "CSS", "Sass"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 52
fileroot: "using_ems_for_efficiency"
---

There are a lot of CSS frameworks out there that are great, but their biggest flaw to me is their insistence to override styles and not use a relative measurement like em's to adjust the styles when needed. I realise a lot of the way frameworks are made are to dummy proof them and to provide as much freedom as possible with their use. I still think there is an extent to which it can be done better.

## What am I getting at here?
Well using buttons as an example, a typical framework will do something like this:

```css
.button {
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 5px;
  /* .button styles */ }

.button-red {
  /* styles overriding .button */ }

.button-large {
  font-size: 21px;
  padding: 8px 16px;
  border-radius: 7px; }
```

And you'll be expected to do something like `<a href="page.html" class="button button-red button-large">My link</a>`.

## What I think you should be doing
This still works without using Sass, and with Sass reduces the need for adding the extra class name entirely.

```sass
%button-base {
  font-size: 1em;
  padding: .75em 1.5em;
  border-radius: .3125em; }
  
.button {
  @extend %button-base;
  background: linear-gradient(#eee, #ccc);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  border: 1px solid #ddd; }

.button-red {
  @extend %button-base;
  /* red button styles */ }

.large {
  font-size: 150%; }
```

Now we can do `<a href="page.html" class="button large">My link</a>`.

## Summary
The reason this works so well to me is the simple modifier class which contains one adjusting property. Isn't this far better? You're also not overriding any styles that exist in a previous class apart from font-size, keeping code reusable, and not having to worry about some style overriding another later on.

This may not seem a huge deal here but when you apply this across the board to adjust the size of form elements, paragraphs, etc. You will realise how powerful these simple adjustment classes are.

Personally I keep my border-radius fixed, nonetheless give it a try!