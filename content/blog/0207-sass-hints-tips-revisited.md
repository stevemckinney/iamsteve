---
title: "Sass hints & tips revisited"
date: "2015-02-24T08:00:00+00:00"
lastmod: "2021-06-11T07:10:15+00:00"
summary: "One of my most popular posts Sass hints & tips is a little dated. I was considering just editing the post, but there is still some value in that post. Instead I decided to revisit it through a new post. I will cover a couple of newer additions to Sass that I use and using extensions like Breakpoint for managing media queries in an effective way."
metadesc: "A bunch of Sass hints & tips. How to use maps, @each, uses for &, @extend and media queries."
theme: "#ffede5"
tags: ["Code"]
categories: ["Code", "CSS"]
ogImage: "/opengraph-image.png"
status: "open"
id: 207
fileroot: "sass-hints-tips-revisited"
---

One of my most popular posts [Sass hints & tips](http://iamsteve.me/blog/entry/sass_hints_tips) is a little dated. I was considering just editing it, but there is still some value in that post. Instead I decided to revisit it through a new post.

## Em’s
One of the most commonly used functions that I use within Sass is one to calculate the em output. The good thing about this function is you don't need to provide a comment of the calculation you were carrying out. As it's all there for you.

```scss
@function em($target-px, $context: 16px) {
  @return ($target-px / $context) * 1em; }
```

## Maps
Maps are useful for creating an key and value pairs. They aren’t immediately clear how you would use them in terms of CSS. They have value for people who extend Sass, but every day use is a little unclear. A couple of use cases I have found that work well are buttons and text colours.

### Creating a map
Maps must always be surrounded by parentheses and be comma separated.

```scss
$buttons: (
  primary: $primary,
  secondary: $secondary,
  tertiary: $tertiary
);
```

### Looping through with `@each`
‘primary’ is the key, ‘$primary’ is the value. Using this we can use this to loop through our keys and values with `@each`. I’ve named them something I can immediately know what type of content they will output.

```scss
@each $button, $color in $buttons {
  .button-#{$button} {
    background: $color; } }
```

## Using & to group selectors
This functionality can help make your CSS more modular and easier to understand what’s related in a block of code. If you’re a user of microformats this is particularly handy for hentry, or if you use BEM.

```scss
.entry {
  &-title { … }
  &-content { … }
  &-summary { … } }
```

## Using @extend wisely
I’m guilty of this, but it’s always worthwhile to have the output of your CSS in mind, particularly with `@extend`. It can lead to crazy selectors which should probably be contained by a class name. I recommend reading [when to use @extend; when to use a mixin](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/).

## Responsive
Since using Sass regularly, I came across limitations of the mixins I made in the past—so I took the time to use [breakpoint](http://breakpoint-sass.com). It’s easy to use and a necessary addition to any project.

One of the nicer features of breakpoint is its ability to convert all media queries to be em based, should you enable it. This is set through a variable.

```scss
$breakpoint-to-ems: true;
```

### Assigning your media queries to variables
The most maintainable way for me I have found is to create assign a set of values to variables and then another set with the suffix ‘max’. This way I always know I have min/max width variables. By default breakpoint has min-width enabled.

```scss
$breakpoint-subtract: 1px;

$a: 400px;
$b: 600px;
$c: 800px;
$a-max:	max-width $a - $breakpoint-subtract;
$b-max: max-width $b - $breakpoint-subtract;
$c-max: max-width $c - $breakpoint-subtract;
```

This approach has worked very well for me, aside from the naming convention. The principle is max-width breakpoints should always be 1px less than the matching min-width breakpoint. The usage from here is quite simple and easy to remember once you’re familiar with the naming convention.

```scss
.element {
  @include breakpoint($a) {
    … }
  @include breakpoint($a-max) {
    … } }
```

## Debugging
If you’re like me you’ll have a terminal window open compiling your Sass. Occasionally you’ll forget the value of a variable or want to know the output of something.

This is where `@debug` comes in for a way to find out the output of your variables. You can use it anywhere in your files to find out the value.

#### Input
```scss
@debug $a-max;
```
#### Output
```bash
/Users/Steve/Dropbox/Sites/site-name/wp-content/themes/theme-name/assets/sass/objects/_media.scss:47 DEBUG: max-width 439px
```

## Extensions
I don’t find myself too reliant on extensions to my Sass projects, but following the previous post I ended it with extensions. These won’t be surprising but serve as a reference.

### [Compass](http://compass-style.org)
You can’t mention Sass without Compass, I definitely use it less for the prefixing mixins I use autoprefixer now. It still provides so much utility with image and colour functions.

### [Breakpoint](http://breakpoint-sass.com)
Mentioned earlier in the post, this is by far and away the best way to manage your media queries in Sass.

> How do you manage things like breakpoints and reusable code? I'd like to hear [@irsteve on twitter](http://twitter.com/irsteve)
