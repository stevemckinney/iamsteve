---
title: "Compass mixins you should know about"
date: "2013-01-03T09:13:00+00:00"
lastmod: "2016-08-28T12:59:01+00:00"
summary: "I’m going to run through a few of my favourite mixins that I have come to rely on."
theme: "#ffede5"
tags: ["Code", "Sass"]
categories: ["Code", "CSS"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 50
fileroot: "compass_mixins_you_should_know_about"
---

Compass is a brilliant extension to Sass as we all know. We know the time saving CSS3 related mixins it offers, maybe you don't know some of the lesser praised mixins/functions that offer a similar convenience. I'm going to run through a few of my favourites that I have come to rely on.

## pie-clearfix
The simplest way to clearfix any element that needs it.

### Usage
`@include pie-clearfix;`

### Output
```scss
&:after {
  content: "";
  display: table;
  clear: both; }
    *zoom: 1;
```

## hide-text
The simplest way to hide text for text replacement. Also has a direction parameter.

### Usage
```scss
@include hide-text(left);
```
### Output
```css
text-indent: -119988px;
overflow: hidden;
text-align: left;
```

## image-width & image-height
Get the width/height of any image passed to it. This is really helpful when you need an element to match the dimensions of the image. It also allows you to freely change the image dimensions, with only needing to recompile.

### Usage
```scss
width: image-width("path/to/image");
```

### Output
```css
width: 500px;
```

Another excellent usage for these two functions is with a 2x image mixin which was [posted on the 37signals blog](http://37signals.com/svn/posts/3271-easy-retina-ready-images-using-scss "Easy retina images using SCSS")
```scss
@mixin image-2x($image) {
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
    background-image: url($image);
    background-size: image-width($image)/2 image-height($image)/2; } }
```
This mixin makes an already easy way to do retina/2x images easier, with taking the need to add image dimensions.

## replace-text-with-dimensions
The previous mixin and function are a pretty much a combination of the two in this mixin. Pass an image, and it'll replace it with that including the width and height. No thought whatsoever!

Note: if you don't have the correct `images_dir`, and `relative_assets = true` in your config.rb file, you'll probably run into problems.

### Usage
```scss
@include replace-text-with-dimensions("image.png");`
```

### Output
```css
text-indent: -119988px;
overflow: hidden;
text-align: left;
background-image: url('../images/image.png?1356101732');
background-repeat: no-repeat;
background-position: 50% 50%;
width: 300px;
height: 400px;
```

## headings
I usually have a few consistent styles I want across all headings, h1-h6. A convenient way to have `h1, h2, h3, h4, h5, h6` is using `headings()`.

### Usage
```scss
#{headings()} {
  font-weight: 700; }
```
### Output
```css
h1, h2, h3, h5, h6 {
  font-weight: 700; }
```

## scale-lightness and scale-saturation
[My last blog post](/blog/using_scale_color_in_sass "Using scale colour in Sass") was about using `scale-color` over `darken` and `lighten` shortly after that I found that Compass offers a simpler usage of the main things I use `scale-color` for.
### Usage
```scss
color: scale-lightness(#f00, 20%);
```

### Output
```css
color: #ff3333
```

## Finishing
These are some of the best functions/mixins within Compass that once you get them into habit really can save you time. Enjoy.
