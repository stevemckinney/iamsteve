---
title: "Using scale-color in Sass"
date: "2012-11-21T19:45:00+00:00"
lastmod: "2016-08-28T12:59:09+00:00"
summary: "I have been recently trying to get a consistent look across my element mixin no matter the colour, without being too inefficient. You could say simply take a base colour, and use darken and lighten on it, to get reasonable variations of the colour, for gradient colour stops. Then throw in some bevels, a border, and you have a nice button."
metadesc: "Don’t use darken or lighten use scale-color! Changing tints and shades will be more predictable, read the post to find out why."
theme: "#e1f7ee"
tags: ["Code", "Sass"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 49
fileroot: "using_scale_color_in_sass"
---

I have been recently trying to get a consistent look across my element mixin no matter the colour, without being too inefficient. You could say simply take a base colour, and use darken and lighten on it, to get reasonable variations of the colour, for gradient colour stops. Then throw in some bevels, a border, and you have a nice button.

There comes a point where you're thinking, the bevel could be less, the shadows are too intense for this colour. How do I solve this without the hassle  of comparing if a colour is a certain saturation, lightness and so on. Difficult right?

## Using scale-color
It isn't difficult with `scale-color`. You pass your colour and adjust as needed with the `$lightness` and `$saturation` parameters (if need be and there are [more parameters](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html#scale_color-instance_method "Full documentation for scale-color")). 

**For example:**
```sass
@include background(linear-gradient($color, scale-color($color, $lightness: -20%)));
```

It might be a little extra to type, but let me show you it's worth it as `scale-color` changes colour differently. Here's some examples.

## Level it out
I have matched the colours best I can to demonstrate from a level point. Other examples will be using the same percentages to change the colour.

<figure class="example-box">
  <span class="e1-scale" role="img" aria-label="Using scale-color to demonstrate a red gradient"></span>
  <figcaption>
    <p>A red gradient using <code>scale-colour</code>.</p>
    <pre class="language-scss"><code>@include background(linear-gradient(scale-color(#dd453d, $lightness: 50%), #dd453d, scale-color(#dd453d, $lightness: -50%)));</code></pre>
  </figcaption>
</figure><figure class="example-box">
  <span class="e1-darken" role="img" aria-label="Using scale-color to demonstrate a red gradient"></span>
  <figcaption>
    <p>A red gradient using <code> darken</code> and <code>lighten</code>.</p>
    <pre class="language-scss"><code>@include background(linear-gradient(lighten(#dd453d, 22.4%), #dd453d, darken(#dd453d, 28%)));</code></pre>
  </figcaption>
</figure>

As you can see the difference in the values to achieve something that is identical. Now you may think that should work fine for any colour. Here are more examples why it won't.


## Example one

<figure class="example-box">
  <span class="e2-scale" role="img" aria-label="Using scale-color to demonstrate a green gradient"></span>
  <figcaption>
    <p>A green gradient using <code>scale-colour</code>.</p>
    <pre class="language-scss"><code>@include background(linear-gradient(scale-color(#88a23d, $lightness: 50%), #88a23d, scale-color(#88a23d, $lightness: -50%)));</code></pre>
  </figcaption>
</figure><figure class="example-box">
  <span class="e2-darken" role="img" aria-label="Using darken/lighten to demonstrate a red gradient"></span>
  <figcaption>
    <p>A green gradient using <code>darken</code> and <code>lighten</code></p>
    <pre class="language-scss"><code>@include background(linear-gradient(lighten(#88a23d, 22.4%), #88a23d, darken(#88a23d, 28%)));</code></pre>
  </figcaption>
</figure>


## Example two

<figure class="example-box">
  <span class="e3-scale" role="img" aria-label="Using scale-color to demonstrate a blue gradient"></span>
  <figcaption>
    <p>A blue gradient using <code>scale-colour</code>.</p> 
    <pre class="language-scss"><code>@include background(linear-gradient(scale-color(#3a9ac9, $lightness: 50%), #3a9ac9, scale-color(#3a9ac9, $lightness: -50%)));</code></pre>
  </figcaption>
</figure><figure class="example-box">
  <span class="e3-darken" role="img" aria-label="Using darken/lighten to demonstrate a blue gradient"></span>
  <figcaption>
    <p>A blue gradient using <code>darken</code> and <code>lighten</code>.</p>
    <pre class="language-scss"><code>@include background(linear-gradient(lighten(#3a9ac9, 22.4%), #dd453d, darken(#3a9ac9, 28%)));</code></pre></figcaption>
</figure>


## Finishing comments
From the examples you'll see their differences along the way from colour to colour. Comparing the examples which aren't using <code>scale-color</code> you'll notice while they may look fairly similar there is a slight difference. It becomes more apparent as you use more colours.

<style>
.example-box{width:48.75%;margin:0 2.5% 1.5em 0;display:inline-block;vertical-align:top}.example-box p:first-child{margin-top:0;font-size:1em}.example-box:nth-of-type(2n){margin-right:0}.example-box [role="img"]{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;display:inline-block;vertical-align:top;width:100%;height:200px;margin:0 0 1.5em}.e1-scale{background:-webkit-linear-gradient(#eea29e,#dd453d,#781a15);background:linear-gradient(#eea29e,#dd453d,#781a15)}.e1-darken{background:-webkit-linear-gradient(#eea29e,#dd453d,#761a15);background:linear-gradient(#eea29e,#dd453d,#761a15)}.e2-scale{background:-webkit-linear-gradient(#c7d897,#88a23d,#44511f);background:linear-gradient(#c7d897,#88a23d,#44511f)}.e2-darken{background:-webkit-linear-gradient(#bcd081,#88a23d,#313a16);background:linear-gradient(#bcd081,#88a23d,#313a16)}.e3-scale{background:-webkit-linear-gradient(#9dcce4,#3a9ac9,#1c4d66);background:linear-gradient(#9dcce4,#3a9ac9,#1c4d66)}.e3-darken{background:-webkit-linear-gradient(#94c8e2,#3a9ac9,#19455b);background:linear-gradient(#94c8e2,#3a9ac9,#19455b)}
</style>