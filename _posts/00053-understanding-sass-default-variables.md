---
title: "Understanding Sass default variables"
date: "2013-05-19T10:01:00+00:00"
lastmod: "2016-09-18T18:40:47+00:00"
summary: "Sass has a handy feature to create default variables using !default in the same way you would use !important. Why is this handy? Well you can use them to manipulate the default values of a mixin, remove or add certain bits of code based on levels of legacy or experimental support for certain bits of CSS, to name a few."
metadesc: "Sass has a handy feature to create default variables using `!default` in the same way you would use `!important`. It can allow you to override defaults set in Sass extensions or frameworks."
theme: "#e1f7ee"
tags: ["Code", "CSS", "Sass"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 53
fileroot: "understanding-sass-default-variables"
---

Sass has a handy feature to create default variables using `!default` in the same way you would use `!important`. Why is this handy? Well you can use them to manipulate the default values of a mixin, remove or add certain bits of code based on levels of legacy or experimental support for certain bits of CSS, to name a few.

## The example
Take the example of using the Compass box-shadow mixin, and use it without any defined parameters `@include box-shadow;` and the output is:

```css
-webkit-box-shadow: 0px 0px 5px #333333;
-moz-box-shadow: 0px 0px 5px #333333;
box-shadow: 0px 0px 5px #333333;
```

That's somewhat expected but what if you wanted to change the default shadow to something you use more frequently?

Here's how:

```sass
// The default color for box shadows
$default-box-shadow-color: #333333 !default;

// The default horizontal offset. Positive is to the right.
$default-box-shadow-h-offset: 0px !default;
```

> Note: this is taken directly from [compass on github](https://github.com/chriseppstein/compass/blob/stable/frameworks/compass/stylesheets/compass/css3/_box-shadow.scss)

To change the default value you would take this variable and remove `!default` like so: `$default-box-shadow-color: #c0ffee;`.

A key use I have for them is disabling various legacy browser code, it's really useful if you need it, but if you don't it's a good way to clean up your output.

To remove support for legacy IE: `$legacy-support-for-ie: false;` To get specific eg: ie7 then you will want `$legacy-support-for-ie7: false;`. You can find all browser support variables [on github](https://github.com/chriseppstein/compass/blob/stable/frameworks/compass/stylesheets/compass/_support.scss).

## Other use cases
I'm sure many of you will have your own mixins you have created and there will come times on various projects where you will need to modify minor values that speed up your process.

Let's take a typical function the em conversion function:

```css
@function em($target-px, $context) {
  @return ($target-px / $context) * 1em; }
```

It has 2 parameters the target pixel value and the context. You could immediately make this more efficient by adding a value to the context you use most often. So you define that as `$context: 16px`.

Great, on a new project you need to make this 14px though. Instead of having to modify the core function why not have a default variable and value and override this default value in our variables file. This is what your setup would look like now:
    
```css
// em function and default value
$default-context: 16px !default;
@function em($target-px, $context: $default-context) {
  @return ($target-px / $context) * 1em; }

// in our variables file
$default-context: 14px;
```

## Final thoughts
It's worth a look through some of your favourite mixins and seeing if you can change their default values to more favourable ones, and save yourself a little time and effort. Also adding default variables to your own mixins to add quick, but not forceful changes later on, is very handy.