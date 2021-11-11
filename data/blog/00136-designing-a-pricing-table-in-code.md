---
title: "Designing a pricing table in code"
date: "2016-07-26T06:37:00+00:00"
lastmod: "2016-08-28T09:14:08+00:00"
summary: "Following up from the design in Illustrator post, it’s time to code the design. Using flexbox to do the heavy lifting for the layout, the focus can be on matching the design and improving on it through being able to show the button state."
metadesc: "Using flexbox to do the heavy lifting for the layout, the focus can be on matching the design and improving on it through being able to show the button state."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 136
fileroot: "designing-a-pricing-table-in-code"
---

Following up from [the design in Illustrator post](/blog/making-a-pricing-table-in-illustrator), it’s time to code the design. Using flexbox to do the heavy lifting for the layout, the focus can be on matching the design and improving on it through being able to show the button state.

## Preview
It may be better to view a larger version on CodePen.

<p data-height="420" data-theme-id="23161" data-slug-hash="rLJNYV" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/rLJNYV/">Pricing table</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Add the font
Work Sans is available for free on [Google Fonts](https://fonts.google.com/specimen/Work+Sans?query=work&selection.family=Work+Sans:300,400,600). There are 3 weights being used, light, normal and semi bold.

Here is the standard way of including the fonts, you may want to use an alternative.

```css
<link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,600" rel="stylesheet">
```

## Defining markup
All items need a containing element `.boxes`, so that you can apply styles to restrict the width of the element.

Following that ‘package’ should be in it’s own `<div>` with a class `box` and a positional one `box-start`, `box-center`, `box-end`. As each will have a slightly different offset. 

```markup
<div class="container">
  <div class="boxes">
    <div class="box box-start">
      <h2 class="title">Starter</h2>
      <div class="price">
        <span class="price-value">£9</span><span class="price-billed">/mo</span>
      </div>
      <ul class="features">
        <li>Shared</li>
        <li>512mb ram</li>
        <li>20gb HDD</li>
        <li>200gb bandwidth</li>
        <li>
          <s>Choice of OS</s>
        </li>
        <li>
          <s>Host multiple sites</s>
        </li>
      </ul>
      <a href="#" class="button">Order starter</a>
    </div>
    <div class="box box-center">
      <h2 class="title">Developer</h2>
      <div class="price">
        <span class="price-value">£18</span><span class="price-billed">/mo</span>
      </div>
      <ul class="features">
        <li>VPS</li>
        <li>4gb ram</li>
        <li>40gb SSD</li>
        <li>1tb bandwidth</li>
        <li>Choice of OS</li>
        <li>Host multiple sites</li>
      </ul>
      <a href="#" class="button">Order developer</a>
    </div>
    <div class="box box-end">
      <h2 class="title">Business</h2>
      <div class="price">
        <span class="price-value">£36</span><span class="price-billed">/mo</span>
      </div>
      <ul class="features">
        <li>Dedicated</li>
        <li>12gb ram</li>
        <li>120gb SSD</li>
        <li>1tb bandwidth</li>
        <li>Choice of OS</li>
        <li>Host multiple sites</li>
      </ul>
      <a href="#" class="button">Order business</a>
    </div>
  </div>
</div>
```

Exploring the markup further, the name of each package is using a `<h2>` they  the price is broken up into two parts to apply the styling necessary. A unordered list is used for the features.

## Colours being used
For reference here are all the colours used.

| Colour | Hex |
|:-|:-|
| Red | #eb6e5e |
| Light yellow | #fff6e5 |
| Dark blue | #1a626e |
| Green | #4db898 |
| Light green | #e1f7ee |
| Green (transparent) | rgba(77, 184, 152, 0.4) |

## Starting CSS
A quick note on the CSS hereon, all examples exclude prefixes for brevity. The codepen example has all necessary prefixes through the use of autoprefixer. It’s debatable whether they are necessary, so that’s up to you.

### The container
The container mostly exists so the background fills the width of the screen.

```css
.container {
  padding: 10% 0;
  background-color: #e1f7ee; }
```

```css
.boxes {
  display: flex;
  align-items: center;
  max-width: 798px;
  margin: auto; }
```

### Initial box styling
The styling required for each box. Here you can define common things early, that can be inherited through to the other elements, like text alignment and the font.

```css
.box {
  position: relative;
  flex: 1;
  font-family: Work Sans, sans-serif;
  border-radius: 4px;
  background-color: #fff;
  color: #1a626e;
  text-align: center;
  box-shadow:
    0 2px 2px rgba(77, 184, 152, .4),
    0 2px 12px rgba(77, 184, 152, .4); }
```

The most important values aside from the more visual styles is the `flex` value, as this will ensure everything occupies an equal amount of space.

The visual styling reflects that in the design, particularly the `box-shadow` it closely mimics that of the Illustrator drop shadow.

### Specific box styling
Each box is somewhat unique, as reflected in our HTML with the outer and inner class names.

```css
.box-outer {
  padding: 60px 0; }
```

The start and end boxes, require the same padding, where the centre box requires more padding to create the size difference.

```css
.box-inner {
  padding: 72px 0;
  margin: 0 -12px;
  z-index: 1; }
```

This is where the strength of flexbox as a layout tool helps. The `align-content` set earlier, means it all aligns nicely.

Finally, the negative margin ensures the overlap is as intended and the `z-index` means it will be above the other boxes.

### Title
Now that the general layout is done, you can move onto the content styles, starting with the title.

```css
.title {
  color: #eb6e5e;
  font-size: 36px;
  font-weight: 300;
  letter-spacing: -.05em;
  margin: 0 0 18px; }
```

The font weight is light, which is 300 for this particular typeface.

### Price
The price is broken up into three parts. The background, price value and the billing period.

```css
.price {
  padding: 12px;
  background-color: #fff6e5;
  color: #4db898;
  font-weight: 600;
  font-size: 18px; }
```

Here you define the style of this area, and then move onto the specific differences for the value and billing period.

```css
.price-value {
  font-size: 24px; }

.price-billed {
  font-variant: small-caps; }
```

Individually the value is larger than ‘/mo’, which is also small caps.

### Features
The features is broken up into a few areas. The `<ul>`, which some browser defaults need to be undone. The padding adds a good space round the title and button area. 

```css
.features {
  margin: 0;
  padding: 24px; }
  
.features s {
  color: #bed8d8; }
  
.features li {
  line-height: 2;
  list-style: none; }
  
.features li:first-child {
  font-weight: 600; }
```

Moving on to more of the content, the `s` of `.features s` could be easily considered a mistake, but it’s not we’re making the strikethrough a lighter blue to deemphasise it. 

Then each item is spaced using `line-height`, you don’t want anything to break onto a new line so `line-height` is an easy way to get consistent spacing. Finally, the first item is made bold.

### Button
When styling unless you want them to fill the width of the container, they are best being `inline-block`. 

```css
.button {
  display: inline-block;
  background-color: #eb6e5e;
  color: #fff3f0;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: .3s; }
```

The `transition` is important for the hover state. The `text-decoration`, makes sure the browser default is removed.

```css
.button:hover, .button:focus {
  color: #e1f7ee;
  box-shadow: inset 0 -44px #4db898; }
```

The transition set earlier means that the shadow appears from the bottom, without that it would look like the background colour changes. It’s important to note the y value of the shadow needs to be the button height.

```css  
.button:active {
  transform: scale(.95455); }
```

The active state makes the button smaller, though the scale value may seem a little strange. The scale down needs to be subtle, so knowing the button height is 44px, scaling down to 42px is ideal. `42 ÷ 44` gives you `.95455`.

## All CSS
That’s everything to be covered in terms of CSS, here is the full combined CSS, so it’s easier to copy.

```css
/* Container */
.container {
  padding: 10% 0;
  background-color: #e1f7ee; }

.boxes {
  display: flex;
  align-items: center;
  max-width: 798px;
  margin: auto; }

/* Box */
.box {
  position: relative;
  flex: 1;
  font-family: Work Sans, sans-serif;
  border-radius: 4px;
  background-color: #fff;
  color: #1a626e;
  text-align: center;
  box-shadow:
    0 2px 2px rgba(77, 184, 152, .4),
    0 2px 12px rgba(77, 184, 152, .4); }

.box-outer {
  padding: 60px 0; }
  
.box-inner {
  padding: 72px 0;
  margin: 0 -12px;
  z-index: 1; }

/* Title */
.title {
  color: #eb6e5e;
  font-size: 36px;
  font-weight: 300;
  letter-spacing: -.05em;
  margin: 0 0 18px; }

/* Price */
.price {
  padding: 12px;
  background-color: #fff6e5;
  color: #4db898;
  font-weight: 600;
  font-size: 18px; }
  
.price-value {
  font-size: 24px; }

.price-billed {
  font-variant: small-caps; }

/* Features */
.features {
  margin: 0;
  padding: 24px; }
  
.features s {
  color: #bed8d8; }
  
.features li {
  line-height: 2;
  list-style: none; }
  
.features li:first-child {
  font-weight: 600; }

/* Button */
.button {
  display: inline-block;
  background-color: #eb6e5e;
  color: #fff3f0;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: .3s; }

.button:hover, .button:focus {
  color: #e1f7ee;
  box-shadow: inset 0 -44px #4db898; }

.button:active {
  transform: scale(.95455); }
```

## Codepen preview

<p data-height="420" data-theme-id="23161" data-slug-hash="rLJNYV" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/rLJNYV/">Pricing table</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>