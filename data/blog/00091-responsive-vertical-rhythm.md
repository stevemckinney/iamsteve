---
title: "Responsive vertical rhythm"
date: "2015-09-08T06:45:00+00:00"
lastmod: "2017-12-03T13:09:52+00:00"
summary: "I wrote a fairly lengthy post previously on vertical rhythm. I considered adding a section on how to adjust font sizes whilst maintaining vertical rhythm. However, with the experience of seeing how people struggle with the topic of vertical rhythm, it was best to keep it for a separate post.I will assume you do have a grasp of vertical rhythm, at this point, otherwise some parts may not make sense. In the examples I will be using em units, with Sass. So I assume you will have an understanding of how em units work. However, I will give you a brief overview."
metadesc: Using em's and changing the font size on the body we can do much of the work for a responsive vertical rhythm"
theme: "#f2f9f9"
tags: ["Design"]
categories: ["Design"]
images: ["/static/images/blog/responsive-vertical-rhythm-featured-image%402x.png"]
large: "/static/images/blog/responsive-vertical-rhythm-featured-image%402x.png"
medium: "/static/images/blog/responsive-vertical-rhythm-featured-image-medium%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 91
slug: "responsive-vertical-rhythm"
---

I wrote a fairly lengthy post previously on [vertical rhythm](/blog/a-guide-to-vertical-rhythm). I considered adding a section on how to adjust font sizes whilst maintaining vertical rhythm. However, with the experience of seeing how people struggle with the topic of vertical rhythm, it was best to keep it for a separate post.

I will assume **you do have a grasp** of vertical rhythm, at this point, otherwise some parts may not make sense. In the examples I will be using em units, with Sass. So I assume you will have an understanding of how em units work. However, I will give you a brief overview.

## Highlights & takeaways
- em’s follow the calculation of `target / context = result`
- for example `24 / 16 = 1.5`
- Using Sass we can write a function that makes this easier
- The function can also provide insight to the original calculation
- Because you use em’s for all font sizes, you can adjust it on the body and affect font sizes across the board
- This approach can do much of the heavy lifting for you and may be ideal for the majority of cases
- For specific cases where font sizes aren’t ideal you can write media queries to correct them
- Remember when you adjust your body font size, your context needs to reflect this
- I use rem or px units where I don’t want something to scale in size

### What we end up with
View the compiled CSS if you would like to see how the numbers work out.

<p data-height="368" data-theme-id="13022" data-slug-hash="zvYbgx" data-default-tab="result" data-user="stevemckinney" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/zvYbgx/">zvYbgx</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Briefly on em units
I use em’s for the majority of this process. You can do much of the heavy lifting by adjusting the font size **only** on the `body`. Once you get your head around em units they can be very useful.

```markup
target / context = result
```

When we say target, that’s the **pixel equivalent** we want to achieve. Context is what the font size is in pixels set on the **parent element**. 12px and 16px are what I will be using on the body. However if you have a heading that has a 24px font size, that would be your context.

```markup
24 / 16 = 1.5
```

> The easiest way, to keep control of your context, is to apply, font sizes on the element itself. You can apply it on containing/parent elements, but this could lead to some trickier calculations. 

### Using Sass to do this
This is possibly my most used function while writing Sass. I’ve covered briefly [the benefits of using Sass for em units](/blog/sass-hints-tips-revisited). It does a good amount of work for us. It calculates the em value and also gives insight to the original calculation.

I will follow through using this with any examples within the post.

```sass
@function em($target-px, $context: 12px) {
  @return ($target-px / $context) * 1em; }
```

## Setting vertical rhythm with background-image
Getting started, one way you can make this easier for yourself, is to set a vertical rhythm using a `linear-gradient`. The technique is quite simple, you have a gradient as a `background-image` and set the `background-size` to be that of your base font size.

You can change it to the em equivalent, if you decide to use a later technique.

```css
body {
  background-image: linear-gradient(bottom, #eee 5%, rgba(255, 255, 255, 0) 5%);
  background-size: 100% 12px; }
```

> You could also use [basehold.it](http://basehold.it/).

## Using the body to adjust size based on breakpoint
The first step is to get our base font sizes setup. This is a convenient way of making font size scalable, on a global level. A font size must be set on the body. You can use percentages, pixels or em’s. It doesn’t tend to be too fussy at this point.

```css
body {
  font-size: 12px;
  line-height: 1.5;
  
  @media (min-width: 520px) {
    font-size: 16px; } }
```

I’m starting from the smallest screen and working my way up. Beginning with a base font size of 12px and adjusting that to 16px later on. This means everything is going to be a third larger.

I have also set my line height to be 1.5. I know this is going to be good for most cases. 

> The reason for doing this is the ability to change the font-size in only one place and affect anything that uses an em unit.

## Choosing font sizes & aligning
This can be based on a [type scale](/blog/type-scale-line-height-lengths), your own preferences or to align closely with the baseline. For me it’s down to what’s most comfortable for the screen size.

```{.language-scss .code-tall}
/* Aligns to 60px */
h1 {
  font-size: em(30px);
  line-height: 1.2;
  margin-bottom: em(24px, 30px); }

/* Aligns to 48px */
h2 {
  font-size: em(24px);
  line-height: 1.25;
  padding-top: em(6px, 24px);
  margin-bottom: em(12px, 24px); }

/* Aligns to 48px */
h3 {
  font-size: em(21px);
  line-height: 1.238095238;
  padding-top: em(16px, 21px);
  margin-bottom: em(6px, 21px); }

/* Aligns to 48px */
h4 {
  font-size: em(18px);
  line-height: 1.222222222;
  padding-top: em(18px, 18px);
  margin-bottom: em(8px, 18px); }

/* Aligns to 48px */
h5 {
  font-size: em(16px);
  line-height: 1.5;
  padding-top: em(16px, 16px);
  margin-bottom: em(8px, 16px); }

/* Aligns to 36px */
h6 {
  font-size: em(14px);
  line-height: 1.5;
  padding-top: em(9px, 14px);
  margin-bottom: em(6px, 14px); }

p {
  margin: 0 0 em(12px) }
```

## Adjusting our measurements for breakpoints
If you’re adjusting font size only on the body, you don’t really need to worry, about it throwing off your baseline. The baseline will, scale proportionally. This is the great thing about that, it’s the smallest amount of code. However you sacrifice a little control over the sizing and preciseness.

If you do want to retain your original baseline and font sizes, you will need, to adjust all of the properties, that rely on it.   

```sass
h1 {
  font-size: em(30px);
  line-height: 1.2;
  margin-bottom: em(24px, 30px);
  
  @media (min-width: 520px) {
    font-size: em(36px, 16px);
    line-height: 1.16666666666;
    margin-bottom: em(30px, 36px); } }
```

As a note when adjusting at the breakpoint your font size changes on the body, **you need to be using that as your context**.

## Why I don't use rem units
I've been put off in the past with rem units because of the fallback necessary. However that's less of an issue these days.

I avoid rem units because they're fixed to the root element. That takes away, being able to proportionally scale them down, on the body, or on an element basis.

That's not to say it isn't logical to use rem units. There are specific cases, where they are useful. You may want to retain a font size, border radius, or other property. In those cases it’s valuable.

## Finishing thoughts
Like I mentioned in the [vertical rhythm](/blog/a-guide-to-vertical-rhythm) post, it’s a tricky goal to achieve on a perfect basis, where images are concerned. I think taking this approach can really improve your reading experience.

It depends how far you want to go. I have found a combination of using the body adjustments and modifying specific font sizes where they are a little too large, for the screen size, works well. In the future, I imagine, this will become easier, with real variables in CSS.

> If there was anything you feel was missing from this post, let me know [@irsteve on twitter](https://twitter.com/irsteve). I’d really appreciate the feedback.