---
title: "Illustrator quick tip: export 2x with a 1x canvas"
date: "2016-05-02T06:30:00+00:00"
lastmod: "2017-02-08T19:41:08+00:00"
summary: "So you use Illustrator for designing websites, and that could be because you’re on a retina screen and Illustrator is vector. So you can design at 1x and it not matter, at least that’s the case for me. However, when it comes to exporting it’s a pain, you can use ‘Save to Web’ and increase the size to 200%, but that’s tedious. You know how to export SVG, but exporting PNG files is the issue at retina sizes. In this post I will show you how to overcome that."
metadesc: "In Adobe Illustrator it isn't readily obvious how to export a 1x canvas at 2x. In this quick tip I show you how."
theme: "#fefbed"
tags: ["Design"]
categories: ["Design"]
images: ["/static/images/blog/illustrator-tip-featured-image%402x.png"]
large: "/static/images/blog/illustrator-tip-featured-image%402x.png"
medium: "/static/images/blog/illustrator-tip-featured-image-medium%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 124
fileroot: "illustrator-export-2x-with-a-1x-canvas"
---

> This method is no longer relevant with Illustrator CC export for screens.

So you use Illustrator for designing websites, and that could be because you’re on a retina screen and Illustrator is vector. So you can design at 1x and it not matter, at least that’s the case for me. However, when it comes to exporting it’s a pain, you can use ‘Save to Web’ and increase the size to 200%, but that’s tedious. You know [how to export SVG](/blog/three-ways-to-export-svg-in-illustrator), but exporting PNG files is the issue at retina sizes. In this post I will show you how to overcome that.

Previously covering ways of exporting SVG in Illustrator led me to realise, that it’s actually not readily apparent how to export at 2x or other higher density sizes. If you need to export PNG files it’s not as convenient as Photoshop’s generator functionality. This quick tip will show you how to work around the lack of generator style functionality in Illustrator.

## Using export
Export is part of Adobe Illustrator CC, if you don’t have that then skip to the ’Save As’ section. To export a set of artboards at a larger size, you follow the regular path of using export.

To export press <kbd>cmd</kbd> + <kbd>alt</kbd> + <kbd>e</kbd> or go to file > export.

### Use artboards
You will be presented with a window to choose your file name and location. **Modify this as necessary, then select ’Use Artboards’**.

<Image src="/static/images/blog/export-2x-png-post-image_use-artboards.png" width={738} height={492} />

### Changing the resolution
**This next step is the most important**, as this is what allows us to export at a different size. The dropdown menu has a few options, **in this case you want to select ‘Other’**.

<Image src="/static/images/blog/export-2x-png-post-image_ppi.png" width={738} height={492} />

In the ppi field add 144. The current resolution is Screen 72 ppi, so with doubling it, this will get you the 2x size. 

## Things to watch out for
If you have any images, if they are at their maximum size in the file they will be scaled up. So their quality may appear poorer in the 2x version. The way to get round this is to make sure the images are large enough and resize them down. 

That‘s everything, an easy to overlook part of the process of exporting in Illustrator.
