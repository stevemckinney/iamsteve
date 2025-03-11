---
title: "Maintainable critical and asynchronous CSS"
date: "2015-01-06T08:00:00+00:00"
lastmod: "2021-06-10T06:13:28+00:00"
summary: "A look at a website I made. Starting with how I setup critical and asynchronous CSS to be a maintainable part of my workflow."
metadesc: "The method I use for keeping my critical path CSS maintainable and how to load your CSS asynchronously for fast websites."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 55
fileroot: "critical-asynchronous-css"
---

I’ve spent the best part of my free time for the most recent months, working on a website which I recently completed. This will be a series of posts detailing some of the problems I encountered over the course of making the website. Starting with how I setup critical and asynchronous CSS to be a maintainable part of my workflow.

## Thinking about performance
There are many techniques for increasing performance on a website and this was something I really wanted to understand further than compress images, gzip and minifying. I set out to do the following:

- Inline critical path CSS
- Asynchronously load CSS
- Don’t use jQuery **#hotdrama**
- Use picture/srcset where it makes sense
- Use SVG in a reusable way

## Asynchronous loading of CSS
This is one of the things I looked into first. I had heard about the [loadCSS](https://github.com/filamentgroup/loadCSS) script and the implementation is easy following the documentation.

Looking at how this affected the load time was quite big. I found it could reduce the load time by ~500ms. Once you have done this is done you see the flash of unstyled content. Which leads on to solving that with inlining critical CSS.

### Things to be aware of
- It isn’t possible to do this using `wp_enqueue_style()` so I just placed it in the `<head>` as you normally would.
- Don’t forget your `<noscript>` fallback!

## Inline critical path CSS
This is something I thought would be trickier than it was. At first I tried to find a grunt/command line task that would work. 

I tried [grunt-criticalcss](https://github.com/filamentgroup/grunt-criticalCSS), it worked well but it seemed to only bring in Webkit prefixed code. So I skipped using that and went on to a [critical path CSS generator](https://jonassebastianohlsson.com/criticalpathcssgenerator/). This got the CSS as it was.

### It’s important to keep it maintainable
After that I realised that this wasn’t very maintainable to just leave it, as I’m using Sass. I then went through the following process:

- Search for each selector
- Import the file containing those selectors
- Leave a comment noting it was critical
- Rearrange CSS that made sense to be excluded but was contained in those files
- Import all dependencies
- Import normalize.css and remove from the main CSS
- Try to avoid any duplication of code and excess code in the critical file
- Use a PHP include to include that CSS in a style tag
- Test

It was a fairly tedious process, but it pays off to get everything in a maintainable state. I’ve made updates to the website since doing the critical CSS and to me it’s more you do it once and check occasionally.

A nice side benefit of doing all this was being forced to move some of the CSS around. It helped keep it more organised.

#### What was learnt
On reflection using the grunt plugin probably would have led to the same results. As I would have found it to be unmaintainable anyway and wanted to make it all Sass.

### The first 14kb
> In order to aim for the fastest page loading time, we want to try to fit the code required for rendering the top portion of a given page in the first response from the server, which happens to carry around 14kb of compressed code (it’s often less, but 14’s a solid goal to shoot for). 
[Source: Filament Group](http://www.filamentgroup.com/lab/performance-rwd.html)

I was worried it looked like a lot of CSS in the head initially. It was around 18kb, about 40% of the website. Without gzip being enabled this would have been a problem.

If you want to reassure yourself, you can use an [online compressor](http://refresh-sf.com/yui/) to export as gzip or if you’re handy with a unix terminal you can `cd to/your/css_folder` and run `gzip critical.css` and this will compress your CSS. My 18kb was reduced to 4kb, which is great.

### Testing
When testing it’s best to check in a variety of environments eg: different devices and different connections. My aim was to get the website usable within 3-5 seconds on an edge connection and I used [filament group](http://filamentgroup.com) as a benchmark, their website is speedy. 

I’m not sure if I achieved that, as I didn’t time it. The load time felt much quicker than websites I compared it to and felt comparable to filament group. Though their website has different goals to this portfolio it’s good to have the best to benchmark against.

### Flash of unstyled content/text
The content not being styled for a brief amount of time is easy to overcome with inlining your critical CSS. 

I’m still trying to figure out the best way to handle this with fonts, [loadCSS offers a way](https://github.com/filamentgroup/loadCSS#usage-example-with-content-fonts) it’s easier to implement with self hosted fonts. As I’m using a 3rd party it’s trickier, I attempted it but didn’t feel confident it would work.

If you can’t do this for your fonts you have to weigh up whether the flash is really all that bad. For me it was something I could live with for the performance gains I had found whilst testing.

#### Cookies
Once we've had our first page load, the CSS loaded with loadCSS is cached and the critical path CSS is no longer necessary. [I've followed up this post with a method for doing this](http://iamsteve.me/blog/entry/using-cookies-to-serve-critical-css-for-first-time-visits). This solves the problem.

## It’s a valuable thing to try out
After having time to try this out I feel much more confident implementing it on other websites. I may look to exclude webfonts on smaller screens in future to get further speed improvements (until we can access connection information). It’s one of those things that once you’ve done it you gain so much insight and it’s much easier to do next time.

> Is there anything you feel I missed? Let me know [@irsteve on twitter](http://twitter.com/irsteve).