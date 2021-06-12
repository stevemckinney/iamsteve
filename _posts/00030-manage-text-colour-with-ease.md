---
title: "Manage text colour with ease"
image:
  large: false
  medium: false
  thumbnail: false
excerpt: "When designing a website you can have varied text colours depending on the background colour. This can be an area of frustration due to the unknown elements that could potentially be contained within an area. Here’s a simple technique for overcoming that."
meta:
  description: "How to make text on different backgrounds easily be the colour you require without writing many selectors each time."
design:
  background: "#e9f5f5"
categories: "Code"
date: "2015-02-09T08:00:00+00:00"
updated: "2016-08-28T12:53:46+00:00"
author:
  name: "Steve"
  picture: "[replace-me]"
ogImage:
  url: "/assets/og/cover.jpg"
status: "open"
slug: "manage-text-colour-with-ease"
---

When designing a website you can have varied text colours depending on the background colour. This can be an area of frustration due to the unknown elements that could potentially be contained within an area. Here's a simple technique for overcoming that.

## Your CSS may look similar to this

```.language-css
.panel h1,
.panel h2,
.panel p,
.alltheselectors {
  color: #444; }
```

This is quite tedious to do when it happens in a few situations and can be frustrating when you want to differ one colour. However a better way I have found to set this up is:

```.language-css
body {
  color: #444; }
    
h1, h2, h3, h4, h5, h6 {
  color: inherit; }
    
.panel {
  color: #c0ffee; }
```

Each of your headings and other elements will inherit the colour of the parent element. If you want to change the colour of a specific element, then that can be done by applying the colour by a class. This continues to keep the specificity low and in turn adds more convenience.

It’s a stupidly simple technique and probably why it’s taken the time to discover.
