---
title: "Using Grunticon to inline SVG"
date: "2015-10-27T07:34:00+00:00"
lastmod: "2016-08-28T10:49:57+00:00"
summary: "Grunticon updated to V2 a while ago now and what came with it was the ability to insert inline SVG. This is great because it can generate the necessary fallbacks and not ruin layout in old browsers with the presence of an <svg> tag. The main benefit of having your SVG inline is it can be easily modified with CSS.All this is done by running a grunt task. However, if you’re not too familiar with using Grunt, or want to avoid build tools altogether, it’s not possible at this stage. I have wrote previously on an alternative approach, however it doesn’t have the inline SVG benefits."
metadesc: "Grunticon updated to V2 a while ago now and what came with it was the ability to insert inline SVG. This post covers how to use it effectively."
theme: "#e1f7ee"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 242
fileroot: "using-grunticon-to-inline-svg"
---

Grunticon updated to V2 a while ago now and what came with it was the ability to insert inline SVG. This is great because it can generate the necessary fallbacks and not ruin layout in old browsers with the presence of an `<svg>` tag. The added benefit of your SVG being inline is it can be styled simply with CSS.

All this is done by running a grunt task. However, if you're not too familiar with using [Grunt](http://gruntjs.com/), or want to avoid build tools altogether, it's not possible at this stage. I have wrote previously on an [alternative approach](http://iamsteve.me/blog/entry/my_svg_workflow_from_awkward_to_simple), however it doesn't have the inline SVG benefits.

## Install Grunticon
I’m making the assumption you have [Grunt](http://gruntjs.com/) installed and are familiar with installing node modules.

If you need help installing Grunt, it’s a difficult process to go through for the first time. Here is a list of guides to get you going. I may cover this myself in the future.

- [Install Node & NPM](http://blog.teamtreehouse.com/install-node-js-npm-mac)
- [Install Grunt](http://gruntjs.com/getting-started)

> If you need any help [@irsteve on twitter](https://twitter.com/irsteve) and I’ll do my best to help you.

## Setup the task
In the task, we set `cwd` and `src` for where to look for our SVGs, then we output that into a new folder with `dest`.

You may need to tweak these values to suit your needs. Make sure your `dest` is a new folder, as this will overwrite files in the folder each time. This allows you to separate your original files effectively.

Finally, you pass some options to enable `enhanceSVG`, `compressPNG` and a class prefix. These options make sure everything you need is output.

### Add to your Gruntfile in your initConfig()
```javascript
grunticon: {
  icons: {
    files: [{
      expand: true,
      cwd: 'assets/images',
      src : '*.svg',
      dest: 'dist/images'
    }],
    options: {
      enhanceSVG: true,
      compressPNG: true,
      cssprefix: '.icon--'
    }
  }
}
```

### Add to your default task
```javascript
grunt.registerTask('default', 'grunticon:icons');
```

### Load the grunticon task
```javascript
grunt.loadNpmTasks('grunt-grunticon');
```

> Detailed options can be found in the [Grunticon git repository](https://github.com/filamentgroup/grunticon)

## Preparing your SVG
At this stage I would recommend removing all fills on simpler SVGs. It adds a level of simplicity to managing colour through CSS. Instead of having to change it in the file and run Grunt.

### Add fill classes
I take the approach of applying a class to the `<g>` of paths that have the same fill. I name things very specifically, for example: `fill-currentcolor`. If there is a single path then you can apply it to that.

#### Example: basic SVG
```markup
<svg>
  <path class="fill-currentcolor" path="…"/>
</svg>
```

#### Example: CSS
```css
.fill-currentcolor {
  fill: currentcolor }
```

### Fill things with currentcolor
If you intend to use icons, that will always match the colour of the text next to them. I recommend adding a `currentcolor` fill.

```css
.text-with-icon {
  color: #c0ffee; }

.text-with-icon:hover,
.text-with-icon:focus {
  color: #bad455; } }

.fill-currentcolor {
  fill: currentcolor }
```

That way your icon colour changes without any extra work, based on the color you set on the parent element.

## Run the task
Before you can get on to the next steps, you need to have Grunticon generate everything.

```bash
grunt grunticon
```

## Inserting the Grunticon loader
As part of the Grunticon process it generates a loader script. My preference is to include this with PHP or an alternative method. The goal is to insert it inline, this saves us a request. Referring to the generated file, means that if any Grunticon files update, this script will update to the latest version too.

## Use your icons
Your icons are ready for use. Each icon can be used by applying a class name to an element. This is the name of the class name Grunticon generates for each SVG. You also need to add the data attribute `data-grunticon-embed`.

```markup
<a href="#" class="text-with-icon">
  Continue reading
  <span class="icon-arrow-right" data-grunticon-embed></span>
</a>
```

Now as you refresh your page it should load the SVG inline.

## Final comments
You will most likely need to apply some additional CSS for spacing and for fallbacks to work effectively. As browsers that don’t support SVG will have a PNG fallback.

There is lots Grunticon can improve and many options, but this is the basic setup to have a nice SVG workflow.
