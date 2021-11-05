---
title: "My SVG workflow, from awkward to simple"
date: "2013-09-04T18:44:00+00:00"
lastmod: "2016-08-28T12:58:22+00:00"
summary: "Initially I thought it would be quite frustrating to get going with SVG, but after jumping in and seeing where I got it’s quite simple. Much better than exporting 1x and 2x images by far."
metadesc: "The method I use for getting my final SVG's from any situation. I provide a method on how to bring your paths into Illustrator from Photoshop and then export."
theme: "#ffede5"
tags: ["Design", "Code", "CSS", "Sass"]
categories: ["Design"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 54
slug: "my_svg_workflow_from_awkward_to_simple"
---

Initially I thought it would be quite frustrating to get going with SVG, but after jumping in and seeing where I got it's quite simple. Much better than exporting 1x and 2x images by far.

## How to get started
You're probably at one of these stages:

- I have an SVG how do I use it?
- I have my paths in illustrator what next?
- I have my paths in photoshop how do I make them into an SVG?

## Photoshop paths - the awkward
The most difficult stage to be at is the paths are created in photoshop. It's fine but if you have any layer styles related to those paths, it's probably not going to be easy to make them into an SVG and you'll have to redo them in Illustrator.

It's not too much trouble though thankfully if you have a solid shape you have made, that would be difficult to recreate in CSS.

### Steps
1. Select your path in photoshop
2. Go to file > export > paths to illustrator…
3. You should see your shape name in the paths dropdown

![Exporting paths in photoshop to illustrator](/static/images/blog/export_paths.png)

4. Click ok and save
5. Open your path with illustrator
6. Find it and fill it with your colour of choice

## Paths in illustrator
Alright, so you have your paths in illustrator, either from following the above steps, or you were in illustrator from the start. Here's what's next:

### Steps
1. Click the artboard tool or press `shift + o`
2. Hover over your shape and click the path and it should end up like this

![The artboard is round the icon](/static/images/blog/svg_artboard.png)

3. Go to file and save, name your file, choose svg as the format and check 'Use Artboards' like this

![Saving an SVG, format SVG, artboards checked](/static/images/blog/svg_save.png)

4. Save, generally the options are ok from here, but if you wish to change anything be careful.


## I have my SVG how do I use it
The final step to getting your SVG on the web. What you need to do is go to [grumpicon](http://grumpicon.com). Drop your SVG in your browser window. It will generate you a bunch of nice files and you're ready to use it on the web.

It's entirely up to you what you do from here. I favour using the data images and using modernizr as a fallback. In the pen below is how I would set it up with Sass. I add a couple of variables and a placeholder selector and we're good to go.

### Replacing the colour for an actual variable
For easy changing look for a part like `path%20fill%3D%22%23`. You should have a 6 character hex code without the # following that. Replace that with your variable wrapped in `#{}`. Now you can change your icon to suit any site 0 hassle!

## Try it out here
<p data-height="268" data-theme-id="0" data-slug-hash="golui" data-user="stevemckinney" data-default-tab="result" class="codepen">See the Pen <a href="http://codepen.io/stevemckinney/pen/golui">Using svg for icons</a> by Steve (<a href="http://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="http://codepen.io">CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

## Finishing
If you skip out the photoshop the rest is quite simple. The best part is that icon will be easy to reuse with a simple Sass variable change. Unfortunately the png data image would have to be regenerated each time, this depends how crucial this is to your design for browsers that don't support SVG as you may feel it's fine as the initial colour.