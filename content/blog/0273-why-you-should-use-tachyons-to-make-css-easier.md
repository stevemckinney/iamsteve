---
title: "Why you should use tachyons to make CSS easier"
date: "2016-06-07T06:30:00+00:00"
lastmod: "2016-08-28T09:17:19+00:00"
summary: "As I’ve spent time understanding the approach, it really makes sense for most CSS. Particularly spacing and font sizes. In this post I’m going to explain; why you may want to use this approach, and how to adapt it to your style of writing CSS."
metadesc: "Find out how tachyons can help speed up building a website, but most of all keep things expected and consistent."
theme: "#e1f7ee"
tags: ["Code", "CSS"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 273
fileroot: "why-you-should-use-tachyons-to-make-css-easier"
---

I’ve been aware of [tachyons.io](http://tachyons.io) for a while, it was one of those things to get shared on twitter and such. I acknowledged it as an approach to CSS, but never looked into it in detail, until recently. As I’ve spent time understanding the approach, it really makes sense for most CSS. Particularly spacing and font sizes. In this post I’m going to explain; why you may want to use this approach, and how to adapt it to your style of writing CSS.

## Why the tachyons approach?
Websites are ever growing in size and complexity and tachyons aims to bring some control to that in a performant way. It gives you the power to make websites with as little CSS as possible.

Just think of the amount of times you define and tweak at different screen sizes font size, margin and padding. It’s probably a significant amount, and if you’re like me you’ll want to keep it consistent. However, this is very difficult to keep track of.

It’s a struggle to keep these particular properties consistent and maintain how your design looks. It’s frustrating to see something out of alignment, or a font size too large. To write the extra CSS to fix it feels annoying. This is what tachyons solves.

## Getting started
The approach is very easy to customise to your kind of setup. It’s applying the same rules across multiple breakpoints, which allows you to write your HTML towards that.

### You may have something that looks like
So traditionally you may apply some basic styling to your headings and paragraphs, then get more specific as and when.

```css
h1, h2, h3, h4, h5, h6 { … }
h1 { … }
h2 { … }
p { … }

.content-title { … }
.some-other-content-title { … }
.more-content-title { … }

@media (min-width: 800px) {
  .content-title { … }
  .some-other-content-title { … }
  .more-content-title { … } }
```

This is just a vague example. If you have separate margins and font sizes in all of those rules, that are very similar. The tachyons approach means you don’t redefine these styles over and over. Instead you apply the class in your HTML.

It takes the worry of CSS being off at a certain media query. It’s about having one area to rely upon, if a margin needs to be smaller at a breakpoint, add a class.

### Using font sizing as an example
So let’s get on to the replacement. Within your design you will have a set of font sizes, that follow a type scale or a pattern, gather all these up. Each property is defined in a class.

```css
.f1 { font-size: 30px; }
.f2 { font-size: 24px; }
.f3 { font-size: 21px; }
.f4 { font-size: 18px; }
.f5 { font-size: 16px; }
.f6 { font-size: 14px; }
```

You repeat this process in media queries, except apply a suffix to them. In this example I use `-b` and `-d`. I use these letters, because in Sass, I have variables assigned to each breakpoint, so I know what it’s tied to.

```css
@media (min-width: 600px) {
  .f1-b { font-size: 30px; }
  .f2-b { font-size: 24px; }
  .f3-b { font-size: 21px; }
  .f4-b { font-size: 18px; }
  .f5-b { font-size: 16px; }
  .f6-b { font-size: 14px; } }

@media (min-width: 800px) {
  .f1-d { font-size: 30px; }
  .f2-d { font-size: 24px; }
  .f3-d { font-size: 21px; }
  .f4-d { font-size: 18px; }
  .f5-d { font-size: 16px; }
  .f6-d { font-size: 14px; } }
```

Tachyons also has a slightly different breakpoint setup. It uses  ns (not small), m (medium) and l (large). It’s entirely up to you.

### Using the classes
Now you may wonder what’s the point in defining the same sizes with slightly varied naming, in different media queries. That’s the beauty of this, once you understand you have a lot of control over your design, very quickly.

```markup
<h1 class="f3 f2-b f1-d">My title</h1>
```

With the markup you go from font size 3 up to font size 1. This makes it quick to apply any font size in your type scale.

## Misunderstanding the approach
I did initially misunderstand the approach, I tied it too closely to specific situations.

```css
.f1 { font-size: 21px; }

@media (min-width: 600px) {
  .f1-b { font-size: 24px; } }
  
@media (min-width: 800px) {
  .f1-d { font-size: 30px; } }
```

The misunderstanding I had was having `.f1` be one size and each of the media query variants be different sizes too. I seen it as I wouldn’t ever use this font size at this screen width, so I’ll just resize it here.

That causes the same problems with consistency and maintenance. It’s important to know that each font size is the same just a different suffix. If you need another font size then create a new class set.

## Naming, yes it may be ugly
After all that, yes, it is considered an ugly approach. So is the repetitive nature of applying font sizes and spacing.

```markup
<h1 class="size-small size-medium-b size-large-d">My title</h1>
```

There is also nothing stopping you from using your own naming pattern. That’s up to you, this is a technique for applying CSS.

## Get comfortable with applying classes
You also have to be comfortable with what could be considered ‘classitis’, but it’s so simple to manage. One place to update, not multiple. No approach is perfect, but this certainly takes away the headaches.

There are so many techniques for writing CSS, they all have similar goals in mind. This isn’t how I’m approaching every bit of CSS I write, I’ve just taken the parts that cause me frustration regularly. Spacing and font sizes happen to be mine. 

## Other examples
This approach can be used for anything, if you explore the tachyons documentation it will become clear.

```css
.mb0 { margin-bottom: 0; } 
.mb1 { margin-bottom: 6px; }
.mb2 { margin-bottom: 12px; }
.mb3 { margin-bottom: 18px; }
.mb4 { margin-bottom: 24px; }

@include breakpoint(min-width: 600px) {
  .mb0-b { margin-bottom: 0; }
  .mb1-b { margin-bottom: 6px; }
  .mb2-b { margin-bottom: 12px; }
  .mb3-b { margin-bottom: 18px; }
  .mb4-b { margin-bottom: 24px; } }

@include breakpoint(min-width: 800px) {
  .mb0-d { margin-bottom: 0; }
  .mb1-d { margin-bottom: 6px; }
  .mb2-d { margin-bottom: 12px; }
  .mb3-d { margin-bottom: 18px; }
  .mb4-d { margin-bottom: 24px; } }
```

The naming behind this is the abbreviation of margin bottom. As mentioned earlier, it’s logically named. In designs your spacing should follow a pattern (like your type), so you should only need a set amount.

## What about areas I can’t control?
Typically anything that’s managed in a CMS you can’t apply classes to. It doesn’t mean defeat. You have to apply styles more specifically.

```css
.cms h1 { font-size: 21px; }

@media (min-width: 600px) { 
  .cms h1 { font-size: 24px; } }
    
@media (min-width: 800px) { 
  .cms h1 { font-size: 30px; } } 
```

This is fine, sure it kind of breaks the approach. It’s only one additional area, that you’ll be very aware of. You have had to make the decision to go specific, instead of being specific all the time.

The best thing I have learnt about CSS, is not to be dogmatic about it. Take bits of each approach and make it work for you.

## Tachyons makes sense
I encourage you to look at [tachyons.io](http://tachyons.io) for more information. Have a think about the most repetitive parts of writing CSS and use this approach. It’s made managing CSS much easier, and allows me to focus on what I enjoy most; designing.