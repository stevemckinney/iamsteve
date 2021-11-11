---
title: "Typography for beginners: type scale, line height & lengths"
date: "2015-03-30T08:00:00+00:00"
lastmod: "2016-08-28T11:01:24+00:00"
summary: "Good typography is playing a bigger role in the design of websites nowadays. However when starting out it’s something that is overlooked. Considering the web is all about content, it’s important that we give everyone a good reading experience.I’m starting with a few examples that can really help improve your reading experience. I want to help you understand why these things are important and provide guidance as to why it does work."
metadesc: "How to choose a harmonious type scale and set comfortable line lengths and line height, that scale well with responsive type sizes."
theme: "#fffbf2"
tags: ["Design"]
categories: ["Design"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 68
fileroot: "type-scale-line-height-lengths"
---

As a beginner, with designing websites, one of the things that can be overlooked is creating a great reading experience. All websites are about their content and being able to read that in a comfortable way will make your visitors happy.

In this post I will cover how to choose a harmonious type scale and set comfortable line lengths and line height, that scale well with responsive type sizes.

## Let’s start with content
To start we need some content that has variety of headings. Eventually we will build up to having images with captions, pull quotes and so on.

<p data-height="268" data-theme-id="13022" data-slug-hash="azMvbN" data-default-tab="result" data-user="stevemckinney" class='codepen'>See the Pen <a href='http://codepen.io/stevemckinney/pen/azMvbN/'>azMvbN</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Comfortable line lengths
We’ve contained our content in an `<article>`. We can style it with the class name `.content`, but first we need to understand what to constrain the line lengths to.

By default the browser’s font size is 16px, this is something we will continue to work with. Many sources state **45–75 characters[^1]** is an ideal line length, with 66 being optimal. It’s important to strike the balance between too short and too long line lengths.

If they’re too long your eyes have to work hard to retain the position in reading. The same applies for too short, your eyes have to work just as hard moving down the lines.

### Trial and error
It takes a little trial and error to find the balance, I’m setting the following CSS on our `.content`.

```css
.content {
  max-width: 27.5em; /* 440/16 */
  margin: auto; }
```

I’ve set the `max-width` to 27.5em. This is quite important as we can freely scale the `font-size` and retain our ideal line lengths for a screen that can accommodate that.

#### Summary
Make your line lengths between 45-75 characters.

## Suitable line height
It’s said that the shorter the line length the smaller the line height and the longer the line length the taller the line height.

Make it too small and you make it difficult to adjust to find the next line and the same can be said for it being too tall. It’s finding what’s comfortable for the eye. 

### Body text
I have found that setting the line height of body text to be 1.5 times that of the font size. So you would set `line-height: 1.5`. It’s dependent on the typeface; you may need more, or less. I find 1.5 is suitable in the majority of cases. 

A unit less value is the best to use for line-height. It’s always 1.5 times the value of any font size. This makes our code flexible for adjustments and setting this on `<body>`.

### Headings
Headings can be a little trickier. It shouldn’t be often that your headings go on to two lines. Their purpose isn’t to be long. Depending on the size, values 1.125 and 1.25 work well.

> It’s worth noting, line-height gets added above and below each line of text, equally.

#### Summary
A line height of 1.5 is fine in the majority of cases. For headings it should be less, it depends on the font size.

## Choosing a type scale
A type scale is the basis for the sizes of your headings and  paragraphs. The main purpose is to create a rhythm as the scale of the type changes proportionally. This leads in to vertical rhythm, which I will cover in another post.

A type scale helps define a clear hierarchy in your page aside from the rhythm. The websites [Modular Scale](http://modularscale.com) or [Type Scale](http://type-scale.com/) can help you to create a type scale that works. I personally prefer the major third.

I definitely recommend trialling out the different types and finding one which suits you.

## Putting it all together
If we take the principles mentioned throughout the post, we find, from the defaults provided, by the browser, we see a noticeable improvement.

<p data-height="540" data-theme-id="13022" data-slug-hash="NPooLL" data-default-tab="result" data-user="stevemckinney" class='codepen'>See the Pen <a href='http://codepen.io/stevemckinney/pen/NPooLL/'>NPooLL</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Finishing thoughts
As you can see we haven't focused on typeface choices. The improvements made, over the defaults, improve the readability. I want to note that while these guidelines are crucial to creating a good reading experience, it’s important to remember that you shouldn’t take them overboard in achieving perfection with them, across the array of screen sizes we have to deal with.

You will find that it’s far too hard to maintain and in the end will impact the experience negatively in some cases.

> If you have any feedback or any personal struggles with design related topics, [contact me](http://iamsteve.me/contact) or [send me a tweet](http://twitter.com/irsteve). I’d like to write posts based around those.

[^1]: [Web typography: choose a comfortable measure](http://webtypography.net/2.1.2)