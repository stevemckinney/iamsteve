---
title: "3D like buttons with CSS"
date: "2010-09-23T20:50:00+00:00"
lastmod: "2019-12-03T19:16:00+00:00"
summary: "In this tutorial I will show you how to make buttons in CSS with a nice 3D like effect. It’s really simple and all it takes is understanding where and when you need box-shadow. It’s all dependent on preference too and how you would like them."
metadesc: "In this tutorial I will show you how to make buttons in CSS with a nice 3D like effect"
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 187
fileroot: "buttons"
---

In this tutorial, I will show you how to make buttons in CSS with a nice 3D like effect. It's really simple and all it takes is understanding where and when you need box-shadow. It's all dependent on preference too and how you would like them.

## Firstly; the button
We need a button this can be done with either the actual `<button>` or just a plain `<div>`. Though it is possible to use for example a `<section>` it's not very semantic, if you were wondering. Though if you are intending on applying this to a section of content for styling then by all means do so.

I'm going to use a button for this example:
```markup
<button>Do something!</button>
```

Now we have our button, albeit bland. Now we  want to add some styling, you can also add a class of choice, or if you want to have all buttons styled the way we will do so now, then you might just want to target the `button`  element.

## Styling
Looking at the button now to make it 3D, the main make up of the code is the box-shadow. I've commented the box-shadow area to show which part of the shadow is doing what. Anyway here's my code:

```css
button {
  padding: 10px;
  background: #ec6161;
  border: none;
  font: 900 12px/normal Helvetica, Arial, sans-serif;
  color: rgba(255,255,255,0.85);
  text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  border-radius: 10px;
  box-shadow:
    inset 0 -2px 5px rgba(0,0,0,0.1), /* a little shading to add a better effect */
    inset 0 -1px 0 #ff8d8d, /* adds a highlight at the bottom */
    0 4px 0 #b64a4a, /* adds the 3D depth */
    0 6px 4px rgba(0,0,0,0.3); /* makes it seem slightly raised */  }
```

> Note: if you do it with a `<div>` you will want to put `display: inline-block;` into your div CSS.

That's the great thing about box-shadow. You could also add some texture by adding an image into the background. It's quite versatile in what you may want to do.

## Final code
That's the basics above, but you may want to make them feel more button like. This is also just as simple, it requires changing the shadow on the hover and active states slightly. So here's the full code and of course a demo too.

```css
button {
   padding: 10px;
   background: #ec6161;
   border: none;
   font: 900 12px/normal Helvetica, Arial, sans-serif;
   color: rgba(255,255,255,0.85);
   text-shadow: 0 1px 1px rgba(0,0,0,0.2);
   border-radius: 10px;
   box-shadow: inset 0 -2px 5px rgba(0,0,0,0.1), inset 0 -1px 0 #ff8d8d, 0 4px 0 #b64a4a, 0 6px 4px rgba(0,0,0,0.3);
   transition: background .2s ease-out; }

button:hover {
   background: #da5959; }

button:active {
   box-shadow: inset 0 -2px 5px rgba(0,0,0,0.1), inset 0 -1px 0 #ff8d8d, 0 4px 0 #b64a4a, 0 5px 2px rgba(0,0,0,0.3); }
```

[View the 3D button demo](https://assets.iamsteve.me/archive/tutorials/button/).
