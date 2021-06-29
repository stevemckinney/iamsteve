---
title: "Hero area series: designing for small screens"
image:
  large: "https://iamsteve.test/uploads/blog/_large-2x/hero-area-post-images-01.png"
  medium: "https://iamsteve.test/uploads/blog/hero-area-post-images-01.png"
  thumbnail: "https://iamsteve.test/uploads/blog/hero-area-post-images-02.png"
excerpt: "
The focus has been very much desktop so far, but considerations have been highlighted throughout for smaller screens. I will only cover ‘mobile’ sized resolutions, as for this particular layout you will only need to make minor adjustments for ‘tablet’ sized resolutions.


"
meta:
  description: "Part two of designing a hero area, the smaller screen layout phase. Adapting a layout to smaller screens."
design:
  background: "#e9f5f5"
categories: "Design"
date: "2016-03-29T06:30:00+00:00"
updated: "2020-03-24T19:50:55+00:00"
author:
  name: "Steve"
  picture: "[replace-me]"
ogImage:
  url: "/assets/og/cover.jpg"
status: "open"
slug: "hero-area-series-designing-for-small-screens"
---

The second post in this series the focus switches to small screens. The previous post was primarily on desktop so far, but considerations have been highlighted throughout for smaller screens. I will only cover ‘mobile’ sized resolutions, as for this particular layout you will only need to make minor adjustments for ‘tablet’ sized resolutions.

## What we’re designing
<img src="{filedir_3}ch-final-small.png">

## Don’t want to do the tutorial?
If you'd like to skip ahead, [download the completed Illustrator file](https://www.dropbox.com/s/2r51igxo8824ug5/customizer-hero.ai?dl=0){.data-download}.

## Refresher on the sketches
<img src="{filedir_3}ch-sketches.jpg">

Referring back to the sketch, the aim is to keep the same kind of layout. It will be tricky to achieve for the 320px to 380px wide screens, you will have to use the space efficiently.

## New artboard
You will want to create a new artboard <kbd>shift</kbd> + <kbd>o</kbd>. Modify the size to be 320px by 568px. 

I’ve chosen the iPhone 5s resolution size, at 320px wide it gives us a minimum to work with. Like earlier with our main artboard, it’s just an estimation and serves as a guide.

## Add a background layer
<img src="{filedir_3}ch-new-layer-rename-lock.gif">

If you’re carrying on [from the previous post]({site_url}blog/entry/hero-area-series-plan-design). You added a ‘small-screen’ layer, add the same blue background as our ‘large-screen’ layer, appropriately sized to the artboard.

## Copy your title, description & button
In the ‘small-screen’ layer we made earlier, copy the text layers and paste them with the layer selected. Drag them over to the left of the artboard.

### Title
Change the font size and leading to 24px. The width shouldn’t need to be adjusted.

### Description
Change the font size to 12px and the line height to 18px. The width of this text area needs to be adjusted to closely match the width of the title.

### Button
Similarly the button needs adjusting, it needs to feel apart of the layout proportionally. The width I ended up with was 108px and 30px height. This should equate padding to around 9px at the top and bottom and 24px left and right. The font size is also adjusted to 12px to match the description.

### Where you should be
<img src="{filedir_3}ch-without-image.png">

We’re aiming for the text and button to occupy just over 50% of the space. For such a narrow screen, it’s important to maintain some kind of line length. The image will occupy enough of the space to be purposeful too.

## Adjusting the image
The image doesn’t seem straight forward, but if you think the whole of the image isn’t 100% crucial to be shown. It’s a complement to our text and post. So you can afford to crop some off, and that’s what we will do in this case.

### Make a symbol
Making a symbol allows us to make adjustments to both images from one place, should we need to in future. Go to Window > Symbols, select the image from the larger artboard and drag it into the Symbols panel.

<img src="{filedir_3}ch-add-symbol.png">

You’ll be presented with Symbol Options, give it a name, and change the registration by clicking the top left. Finally, click OK.

### Adding the symbol
<img src="{filedir_3}ch-symbol-panel.png">

With your ‘small-screen’ artboard selected, drag the symbol into your document to your small screen artboard.

## Masking the artboard
<img src="{filedir_3}ch-rough-position.png">

You’ll have the image roughly positioned. For completeness, we want that to only show. The easiest way to do this is with a mask.

### Paste the background layer on top
<img src="{filedir_3}ch-everything-selected.png">

Select the background layer, and paste it in place by pressing <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd>. Now select everything on that artboard by clicking and dragging to select.

Finally, press <kbd>cmd</kbd> + <kbd>7</kbd> this makes a mask.

## What you should end up with
<img src="{filedir_3}ch-final-small.png">

As the image demonstrates the Customizer UI is still showing. This is a nice balance of image against text. It won’t always work this favourably, however, if we try, our layouts are much more coherent.

## In the next post
The next post we will look at writing the necessary CSS and HTML to make it usable. 
