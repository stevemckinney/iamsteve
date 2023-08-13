---
title: "Illustrator quick tip: export a colour palette quickly"
date: "2017-05-09T06:25:00+00:00"
lastmod: "2019-10-04T07:27:04+00:00"
summary: "In Illustrator it appears more difficult than it needs to be to export a colour palette to hex values, here’s a quick way."
metadesc: "Using Illustrator there isn't a way to export a colour palette quickly. However, there is a way to do it less tediously than opening and closing the fill window. This post shows you how."
theme: "#fefbed"
tags: ["Design"]
categories: ["Design"]
images: ["/images/blog/illustrator-tip-featured-image@2x.png"]
large: "/images/blog/illustrator-tip-featured-image@2x.png"
medium: "/images/blog/illustrator-tip-featured-image-medium@2x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 162
fileroot: "illustrator-quick-tip-export-a-colour-palette-quickly"
---

In Illustrator it seems to be more difficult than it needs to be to export a colour palette to hex values. Using swatches gives you access to everything except hex. It’s tedious to go through the usual object, click fill, copy and paste routine. Here’s a way to export your colours quickly.

## Have your colour palette ready
You may be using swatches already, or have a bunch of shapes which are filled with the colours. If you don’t draw some shapes now with each of your colours.

<figure>
<Image src="/images/blog/colour-export-ready@2x.png" width={738} height={492} />
<figcaption>A simple set of shapes is all that is needed.</figcaption>
</figure>

## Select the objects and copy
Next copy each of the objects. This will copy an SVG version of your colour palette to the clipboard.

## Open your text editor
It doesn't matter what app you use here you need something to paste in what you've copied.

```markup
<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In  -->
<svg version="1.1"
   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
   x="0px" y="0px" width="546px" height="98px" viewBox="0 0 546 98" style="enable-background:new 0 0 546 98;"
   xml:space="preserve">
<style type="text/css">
  .st0{fill:#FF7E6D;}
  .st1{fill:#553143;}
  .st2{fill:#FFDB6D;}
  .st3{fill:#09465C;}
  .st4{fill:#27CBA4;}
</style>
<defs>
</defs>
<circle class="st0" cx="48" cy="48" r="48"/>
<circle class="st1" cx="162" cy="48" r="48"/>
<circle class="st2" cx="274" cy="48" r="48"/>
<circle class="st3" cx="386" cy="50" r="48"/>
<circle class="st4" cx="498" cy="50" r="48"/>
</svg>
```

Yours will resemble something similar to this code.

## Grab the CSS
Copy the code between `<style type="text/css">` and `<style>`. Delete the rest, paste it back in and tidy it up so you have the hex codes left.

```markup
#FF7E6D
#553143
#FFDB6D
#09465C
#27CBA4
```

## Each colour should correspond with Illustrator
The order each colour is should be how you made them in Illustrator. That’s all you need to know, you’ve got your hex codes. 

This is something I find less tedious than selecting the object, opening the fill window and pasting the value elsewhere. It’s a technique I consider to be one of those: “why didn’t I think of this sooner”.