---
title: "Flexbox quick wins"
date: "2015-05-05T06:00:00+00:00"
lastmod: "2016-08-28T11:00:20+00:00"
summary: "Flexbox is still one of those properties that isn’t quite ready for prime time use. Due to the necessary support of IE 8 and 10. There are some uses of flexbox we can use for ‘free’ without worry of any knock on effects. These are especially handy if we don’t have the time to invest into heavily flexbox based layouts."
metadesc: "Flexbox isn‘t quite ready to have layouts built dedicated with it. There are some uses with flexbox we can apply without worry of what will impact other browsers."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 217
fileroot: "flexbox-quick-wins"
---

Flexbox is still one of those properties that isn’t quite ready for prime time use. Due to the necessary support of [IE 8 and 10](http://caniuse.com/#search=flexbox). There are some uses of flexbox we can use for ‘free’ without worry of any knock on effects. These are especially handy if we don’t have the time to invest into heavily flexbox based layouts. 

## Equal height columns
Setting `display: flex` on the container of elements that you would like to have an equal height is the simplest way of using flexbox without issue.

### HTML
```markup
<div class="flex">
  <div class="regular-layout-style">
    <p>…</p>
  </div>
  <div class="regular-layout-style">
    <p>…</p>
  </div>
</div>
```

### CSS
```css
.flex {
  display: flex; }
```

The defaults for flexbox, mean that with only one line of code, we can do this.

## Changing source order for small screens
Changing the source order for small screens is handy because you could have elements that are a higher priority when there is less screen space. 

Flexbox can help with this, the reason I mention smaller screens is, it’s much safer to use due to the minor shift going on. You’ll most likely have a single column layout, multiple columns increases the complexity.

### HTML
```markup
<div class="flex">
  <img src="http://placehold.it/420x280">
  <h2 class="first">Product title</h2>
  <p>A fantastic product.</p>
</div>
```

### CSS
```css
.flex {
  display: flex;
  flex-flow: column wrap; }

.first {
  order: -1; }
```

## Form layouts
Forms can benefit from flexbox, due to the simplicity of creating fluid layouts. Here’s a few examples where you can easily enhance your form layouts.

### Newsletter/search box
The problem with doing this through another method, something usually is less than ideal. This could be a button width, leading to padding looking uneven at certain points. The flexbox method allows us not to worry about the button.

#### HTML
```markup
<form class="flex">
  <label>Email</label>
  <input type="email" class="email">
  <input type="submit" value="Subscribe">
</form>
```

#### CSS
```css
.flex {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between; }
  
.email {
  flex: 1; }

label {
  flex-basis: 100%; }
```

### Columns
A column based form layout can tend to be tricky, depending on the system you’re dealing with. Fields you would group together by making their width narrower you need space between the fields. Of course this is depending on your overall style.

#### HTML
```markup
<form class="flex">
  <div class="field-whole">
    <label>Name</label>
    <input type="text">
  </div>
  <div class="field-half">
    <label>City</label>
    <input type="text">
  </div>
  <div class="field-half">
    <label>Postcode</label>
    <input type="text">
  </div>
</form>
```

> If you’re using `<fieldset>` to group elements, there is a bug. Using `display: flex` won’t work in the majority of browsers.

#### CSS
```css
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; }

.field-whole {
  flex-basis: 100%; }

.field-half {
  flex-basis: 48.75%; }
```

> All examples exclude prefixes, though you only need the `-webkit-` prefix.

## Finishing thoughts
What makes these examples great there is no worry about collapsing white space if you use `display: inline-block`, clearing floats or the inflexibility of `display: table`. With each example we have built upon what's already there, this is what makes each of these quick wins.