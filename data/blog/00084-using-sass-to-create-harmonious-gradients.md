---
title: "Using Sass to create harmonious gradients"
date: "2015-07-21T07:00:00+00:00"
lastmod: "2016-08-28T10:55:32+00:00"
summary: "One of the best things about Sass, is the ability to adjust colour nicely and be able to apply that, consistently across, many colours.In this post I’m going to demonstrate, as I have in the past with scale-color. How you can create gradients, that look much more harmonious. Instead of the standard, take the colour and darken it. Using adjust-hue and scale-color we can achieve this."
metadesc: "The trouble with darkening your gradients is they can look dirty and feel off, I show you how to avoid that. Using adjust-hue and scale-color in Sass to create harmonious gradients."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 84
fileroot: "using-sass-to-create-harmonious-gradients"
---

import Script from 'next/script'

<Script async src="https://assets.codepen.io/assets/embed/ei.js" strategy="lazyOnload" />

One of the best things about Sass is the ability to adjust colour nicely and be able to apply that, consistently across, many colours.

In this post, I’m going to demonstrate, as I have [in the past with scale-color](http://iamsteve.me/blog/entry/using_scale_color_in_sass). How you can create gradients, that look much more harmonious. Instead of the standard, take the colour and darken it. Using `adjust-hue` and `scale-color`, we can achieve this.

## Why adjust the hue?
Adjusting hue over lightness allows for a perceived shift in lightness. So the transition between colour is there, but aesthetically they are much nicer.

While just darkening it isn’t the worst thing and can be the right choice. This method is an alternative approach to creating gradients.

## Examples
Each of these examples the gradient to the right is the harmonious one. Although I would hope this is obvious!

### Blue example
<p data-height="280" data-theme-id="13022" data-slug-hash="oXPLZW" data-default-tab="result" data-user="stevemckinney" className="codepen">See the Pen <a href='http://codepen.io/stevemckinney/pen/oXPLZW/'>oXPLZW</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Green example
<p data-height="280" data-theme-id="13022" data-slug-hash="JdaKWb" data-default-tab="result" data-user="stevemckinney" className="codepen">See the Pen <a href='http://codepen.io/stevemckinney/pen/JdaKWb/'>JdaKWb</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### Red example
<p data-height="280" data-theme-id="13022" data-slug-hash="EjeyWK" data-default-tab="result" data-user="stevemckinney" className="codepen">See the Pen <a href='http://codepen.io/stevemckinney/pen/EjeyWK/'>EjeyWK</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Tips
Here are some of the things I encounter when using this method.

## Flip the gradient
Sometimes your starting colour can look wrong. Flip the gradient. This is particularly the case with red.

### Use scale-color to darken
You can improve how they appear by using scale-color to darken. Instead of only darkening, we can adjust-hue and scale-color.  You will find gradients feel less ‘muddy’/‘dirty’.

### YIQ colour model

Although the colours may be of a similar saturation and hue. Our eyes are more sensitive to colour changes, in some, more than others.

Colours on the orange to blue range are the ones our eyes are most sensitive to. So the amount of hue we will need to adjust these by will be smaller. Up to 30 degrees will generally be more than enough. Colours on the purple to green range our eyes are least sensitive to, so the adjustment it will need to be more.

Having a brief understanding of the [YIQ colour model](https://en.wikipedia.org/wiki/YIQ) we can understand how our eyes perceive colour better. Understanding this further can help with automating the process within Sass. By having a rough idea how the colour will react to having its hue adjusted.

## Hopefully this helps
I find this technique great for creating nicer, less muddy looking gradients.
