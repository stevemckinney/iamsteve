---
title: "Sass map use patterns"
date: "2015-05-19T06:39:00+00:00"
lastmod: "2016-08-28T10:59:58+00:00"
summary: "Sass maps can provide some powerful functionality to make life easier and less repetitive. I’ll cover briefly how to use them and then detail some of the cases that I use them, as I don’t think the benefits are immediate."
metadesc: "Sass maps can provide some powerful functionality to make life easier and less repetitive. I show how to use examples for making helper classes, looping through maps and getting values."
theme: "#ffede5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 75
slug: "sass-map-use-patterns"
---

Sass maps can provide some powerful functionality to make life easier and less repetitive. I’ll cover briefly how to use them and then detail some of the cases that I use them, as I don’t think the benefits are immediate.

## An introduction to maps
They work in a variety of ways and can be nested. The simplest way to create a map is:

```sass
$map: ( key: value, another-key: another-value )
```

They can be quoted or unquoted. It depends on your preferences, however depending on the name they will need quotes. You can get warnings, where it would clash, with a CSS colour name eg: red, white, blue, etc. Maps can be nested, so you can create any kind of structure you like.

## A simple example, with helpers
Everyone has a set of helper class names. Some of them follow similar patterns but can added to over time as needed. The use case I’m thinking of is changing the colour of text.

```sass
$colors: (
  primary: #444,
  secondary: #b4da55
  tertiary: #eee
);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color; } }
```

In this we define a `$colors` map and loop through each of the colours to get a set of classes. I find this handy as each time I need a new colour, I can just add it to the map. It’s a compact way of displaying a group of closely related CSS.

Maps also make a great way for managing your website colour palette. It works in a similar way to variables, though at first it requires a more effort. Which leads us on to how to use the map functions.

## Map functions
The common  ones I use are `map-get` and `map-has-key`, [the Sass documentation](http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions) details all the available functions.

<div class="p-flex p-flex-gutter">
<div class="p-one-half" markdown="1">
### map-get() input
```sass
.key {
  content: map-get($map, 'key'); }

.another-key {
  content: map-get($map, 'another-key'); }
```
</div>
<div class="p-one-half" markdown="1">
### map-get() output
```css
.key {
  content: 'value'; }

.another-key {
  content: 'another-value'; }
```
</div>
</div>

### map-has-key()
It will return true or false, based on the input.

```sass
// Using the ternary syntax
.key {
  content: if(map-has-key($map, 'key'), 'true', 'false'); }

// Standard @if statement
@if map-has-key($map, 'key') {
  .key {
    content: map-get($map, 'key'); } }
```

## Creating your own function to simplify getting map values
Another use for maps is with font weights. It’s possible you don’t remember which weight name equates to in the 100–900 range. Due to them being different between some fonts. Using a map makes sense, we can also build upon this with a helper function which can return the correct weight.

### Map
```sass
$font-weights: (
  hairline: 100,
  extra-light: 200,
  light: 300,
  regular: 400,
  book: 500,
  medium: 600,
  bold: 700,
  black: 800,
  heavy: 900 );
```
### Function
```sass
@function font-weight($weight: $default-map-font-weight) {
  @if map-has-key($font-weight, $weight) != true {
    @warn "#{weight} not found"; }
  @return map-get($font-weight, $weight); }
```

### Usage
```sass
h1 {
  font-weight: font-weight(medium); }
```

It’s more verbose than before but, it allows us to define the weights that are available in the font we have. With web fonts we only include what versions we’re going to use. So having a condition in the function, to check, whether the weight is contained in the map is helpful. This prevents any unwanted faux bold.