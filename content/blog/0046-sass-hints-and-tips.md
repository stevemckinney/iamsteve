---
title: "Sass hints & tips"
date: "2012-03-07T20:23:00+00:00"
lastmod: "2016-08-28T12:59:47+00:00"
summary: "A selection of tips for those getting started with a Sass."
metadesc: "Some tips for beginners using Sass. You'll learn how to use color, mixins and how Sass can help control responsive code."
theme: "#ffede5"
tags: ["Code", "Sass"]
categories: ["Code", "CSS"]
ogImage: "/opengraph-image.png"
status: "open"
id: 46
fileroot: "sass_hints_tips"
---

Sass/Compass are all the rage lately, well, CSS preprocessors in general. I have been planning to share my knowledge for a while and now feels a good time. This could be a biased approach but I can't really see a downside to using a preprocessor, when we're in a world where getting things done quickly is key. So I'm not going to put my pros and cons, just some general thoughts, hints, and tips.

## You learn as you go
The great thing about Sass is you don't have to change anything about the way you write CSS. You can write CSS normally. As I've gone along and noticed things that have felt a bit repetitive/could be done more efficiently, I've gone into the Sass or Compass documentation and looked to see if there is a way.

## Setting up a reusable base
You probably have used either a framework or have your own premade frequently used styles now. With Sass you will probably be able to shove a lot of that stuff into mixins, variables and possibly extendable classes.

The obvious examples are colours and fonts. I usually have `$primary` and `$secondary` colours. I set up my sans-serif, serif and monospace font stacks and apply them to `$sans`, `$serif` and `$monospace` variables.

### Using complement to build a palette
A tip for a quick colour palette is to use the Sass complement function. Like so:

```scss
$primary: #f00;
$secondary: complement($primary);
```

Although it's uses can vary as your primary colour may be too dark for a great difference. It's wise to set some other colours you will use a lot such as hover/focus colours. Sass has many useful colour adjustment functions.

I also set a base line height variable to use throughout. Though when using that with the font shorthand make sure you wrap the font size and line height in ( & ), as it will end up dividing the two values. Like so: `font: 900 (16px/$base-line-height) $sans;`. Sometimes you may need to use interpolation, where it concerns using two variables like so: `font: 900 $font-size/#{$base-line-height} $sans;`

#### Sass and Compass interactive
These modes are great when dealing with a big chain of `lighten(darken(saturate(#f00, 20%), 20%), 20%)` for example. How do you just get the hex value of the colour without compiling and finding it in the compiled CSS or web inspector? Opening a terminal window and typing `sass -i` or `compass interactive`. These two modes can work with Sass/Compass functions and give you their compiled output. Handy.

### Time saving mixins
Mixins can save a lot of time, how many times have you wrote something as simple as `width: 100px; height: 100px` and thought "I wish I could write that quicker". You can with Sass.

```scss
@mixin wh($width: false, $height: false) {
  $width: unquote($width);

  @if $height != none {
    $height: unquote($height); }

  @if $height != false {
    width: #{$width};
    height: #{$height}; }

  @else {
    width: #{$width};
    height: #{$width}; } }
```

If you find styles being repeated, why not make it a mixin?

```scss
@mixin button {
  border: 1px solid #000;
  background: #222;
  color: #fff;
  padding: 5px 15px;
  display: inline-block; }
```

Anything that you want to turn into a button use `@include button;` simple as that.

#### Other mixin benefits
Mixins allow you to not have to litter your code with classes. I think OOCSS is a great idea and I think mixins do help this and of course not forgetting `@extend`.

## Sass helps responsive web design
In the prerelease versions of Sass only (at the time of writing this post). You can use nested `@media` queries. This saves a lot of time and you can set up a mixin to make this even more efficient.

```scss
@mixin respond-to($media) {
  @if $media == iphone {
    @media only screen and (min-width: 480px) {
      @content; } }

  @else if $media == ipad {
    @media only screen and (min-width: 768px) {
      @content; } }

  @else if $media == desktop {
    @media only screen and (min-width: 960px) {
      @content; } } }
```

Now we can write things like:

```scss
.container {
  width: 95%;

  @include respond-to(iphone) {
    width: 90%; }

  @include respond-to(ipad) {
    width: 80%; }

  @include respond-to(desktop) {
    width: 70%; } }
```

This makes mobile first, in my opinion a lot easier. This article on The Sass Way, which is where I got the idea from.

## Notable extensions
Compass just goes hand in hand with Sass, I feel like you can't have one without the other, it saves time within saving time. Without Compass you'd have to write all the box-shadow, border-radius, gradient mixins yourself.

### Stitch
Stitch is a CSS pattern framework for Compass. It's got some nice features and ideas around it, particularly `prefix()`. I have found it can bloat your compiled CSS a little so be wary of what you're using and not using.

### Animate.sass
Animate.sass Based on Animate.css  this is a nice easy way to use the animations with limited hassle. For example `@include animation(fadeIn, .5s, ease, forwards)`. Take great care with this otherwise you could end up with 10000 lines of CSS bloat.

## Wrap up
So these are a few of the tips that save me a lot of time using Sass. I haven't really covered Compass in this post, it sort of goes without saying that Compass adds a lot of efficiency. I hope this post has been helpful. I shall be writing more about my uses of Sass soon.

> I've followed up this post with some more tips, which I recommend reading [the revisited version](http://iamsteve.me/blog/entry/sass-hints-tips-revisited)
