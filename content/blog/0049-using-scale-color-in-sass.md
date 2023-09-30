---
title: "Using scale-color in Sass"
date: "2012-11-21T19:45:00+00:00"
lastmod: "2016-08-28T12:59:09+00:00"
summary: "I have been recently trying to get a consistent look across my element mixin no matter the colour. That’s where scale-color comes in."
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

### For example
```scss
@include background(linear-gradient($color, scale-color($color, $lightness: -20%)));
```

It might be a little extra to type, but let me show you it's worth it as `scale-color` changes colour differently. Here's some examples.

## Level it out
I have matched the colours best I can to demonstrate from a level point. Other examples will be using the same percentages to change the colour.

<div className="flex sc-examples">
<figure className="flex-auto example-box">
  <span className="e1-scale" role="img" aria-label="Using scale-color to demonstrate a red gradient"></span>
  <figcaption>
    A red gradient using `scale-colour`.
    ```scss
    @include background(linear-gradient(scale-color(#dd453d, $lightness: 50%), #dd453d, scale-color(#dd453d, $lightness: -50%)));
    ```
  </figcaption>
</figure>
<figure className="flex-auto example-box">
  <span className="e1-darken" role="img" aria-label="Using scale-color to demonstrate a red gradient"></span>
  <figcaption>
    A red gradient using ` darken` and `lighten`.
    ```scss
    @include background(linear-gradient(lighten(#dd453d, 22.4%), #dd453d, darken(#dd453d, 28%)));
    ```
  </figcaption>
</figure>
</div>

As you can see the difference in the values to achieve something that is identical. Now you may think that should work fine for any colour. Here are more examples why it won't.


## Example one

<div className="flex sc-examples">
<figure className="flex-auto example-box">
  <span className="e2-scale" role="img" aria-label="Using scale-color to demonstrate a green gradient"></span>
  <figcaption>
    A green gradient using `scale-colour`.
    ```scss
    @include background(linear-gradient(scale-color(#88a23d, $lightness: 50%), #88a23d, scale-color(#88a23d, $lightness: -50%)));
    ```
  </figcaption>
</figure>
<figure className="flex-auto example-box">
  <span className="e2-darken" role="img" aria-label="Using darken/lighten to demonstrate a red gradient"></span>
  <figcaption>
    A green gradient using `darken` and `lighten`
    ```scss
    @include background(linear-gradient(lighten(#88a23d, 22.4%), #88a23d, darken(#88a23d, 28%)));
    ```
  </figcaption>
</figure>
</div>

## Example two

<div className="flex sc-examples">
<figure className="flex-auto example-box">
  <span className="e3-scale" role="img" aria-label="Using scale-color to demonstrate a blue gradient"></span>
  <figcaption>
    A blue gradient using `scale-colour`.
    ```scss
@include background(linear-gradient(scale-color(#3a9ac9, $lightness: 50%), #3a9ac9, scale-color(#3a9ac9, $lightness: -50%)));
```
  </figcaption>
</figure>
<figure className="flex-auto example-box">
  <span className="e3-darken" role="img" aria-label="Using darken/lighten to demonstrate a blue gradient"></span>
  <figcaption>
    A blue gradient using `darken` and `lighten`.
    ```scss
    @include background(linear-gradient(lighten(#3a9ac9, 22.4%), #dd453d, darken(#3a9ac9, 28%)));
    ```
  </figcaption>
</figure>
</div>


## Finishing comments
From the examples you'll see their differences along the way from colour to colour. Comparing the examples which aren't using `scale-color` you'll notice while they may look fairly similar there is a slight difference. It becomes more apparent as you use more colours.
