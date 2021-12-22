---
title: "Create a Sass button/element mixin"
date: "2012-11-03T11:39:00+00:00"
lastmod: "2016-08-28T12:59:24+00:00"
summary: "This mixin is one I’ve been using for a few months now to create buttons/anything with a particular style."
theme: "#e9f5f5"
tags: ["Code", "Sass"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 48
fileroot: "create_a_sass_button_element_mixin"
---

import Script from 'next/script'

This mixin is one I've been using for a few months now to create buttons/anything with a particular style. I call it an element mixin, as it's not tied to anything. It started off as a plain button mixin, though I found sometimes I just want a button reset (some padding, no border, etc) or no hover/active states. This a very customisable mixin with simple parameters.

> Note: Some things rely on compass existing, or some variables set such as `$element` for a font family. I've defined them at the top, but you'll probably have your own. The size parameter uses this pixel to em function `@function em($target-px, $context) { @return ($target-px / $context) * 1em; }`.

## The code and explanation
The easiest way to get this across is to give the code and follow up with an explanation for my decisions in the way I have done it. Head over to the github gist, then let's get into the explanation.

<p><a href="https://gist.github.com/4007030.js">View github gist</a></p>

Firstly we have the element base, what every button will contain just separated from the mixin itself.

We have our mixin parameters, which are fairly self explanatory, they all come with a fairly sensible default. The great thing about it is you don't have to remember the order of the parameters you can just do for example `@include element(red, $radius: 10px);`.

I'll guide you through the intentions of each parameter they're fairly easy to grasp:

`$main-color` is self explanatory pass any colour you wish.

`$radius` give your button a radius I have a radius tied to a variable usually to keep it consistent throughout my site.

`$subtle` if you want a discrete button that comes to life on hover set this to true.

`$shadow` disable this if you want a flatter looking button.

`$style` disable this, if you would like a button reset as your starting point. As I've found when making some sites, it wasn't always possible to go with my element style so a quick button base is helpful.

`$size` pass any of the keywords within the `if` statements. This can be added to, if you wish, to have more varied styles.

`$hover` sometimes you don't need hover states. This is also paired with active, as I find for me, at least, I'll always want an active state with a hover state.

`$font-size` sometimes I encountered times where it didn't work to have the font-size set on smaller sizes, so the option is there to make it `false`.

`$weight` like `$font-size` weight can be changed.

`$display` sometimes it's ideal to have a block button. More often than not you'll want inline-block, so that's the default.


## Usage
`@include element(#88a23d, $radius: 4px, $size: normal, $hover: true);`

Chances are I'll be updating this somewhat regularly. To make the code more efficient. You'll be able to see the changes from viewing the [gist](https://gist.github.com/4007030 "The gist for this mixin").
