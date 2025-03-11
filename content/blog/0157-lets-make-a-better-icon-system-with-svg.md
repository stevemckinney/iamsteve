---
title: "Let’s make a better icon system with SVG"
date: "2016-12-20T07:23:00+00:00"
lastmod: "2020-05-13T09:46:00+00:00"
summary: "Icon fonts are used for their convenience, which generally can’t be matched by SVG. However, this post aims to guide you through the setup and get to a similar level of convenience."
metadesc: "Make a better icon system with SVG. A guide right through exporting to using the icons and building a system."
theme: "#fff5f3"
tags: ["Code"]
categories: ["Code", "Patterns"]
images: ["/images/blog/svg-icon-system-featured-image@2x.png"]
large: "/images/blog/svg-icon-system-featured-image@2x.png"
medium: "/images/blog/svg-icon-system-featured-image-medium@2x.png"
ogImage: "/opengraph-image.png"
status: "open"
id: 157
fileroot: "lets-make-a-better-icon-system-with-svg"
---

Icon fonts are used for their convenience, which generally can’t be matched by SVG. However, they come with a huge performance downside, which SVG doesn’t have. I want to use this post as an opportunity for you to drop icon fonts and start using SVG. This post aims to guide you through the setup and get to a similar level of convenience.

## Icon fonts are just too convenient
I saw a tweet recently from Brad Frost asking for posts that sold the use of SVG for icons. From my perspective, SVG is part of my workflow. When designing being wary of each asset that needs exporting is part of the job.

However, there exists the use of dropping in FontAwesome, relevant CSS and off you go. I’ve never really used FontAwesome, but I have used icon fonts and understand the speed and convenience they offer.

## SVG is more performant
Like everything there are pros and cons. **Icon fonts are at the mercy of page rendering significantly more so than SVG**. You need to download the font, then the browser needs render it. **In a ~3s on 3G world the icon font has to go**.

## What SVG is up against
Firstly, what are the benefits of an icon font? Listing them will provide the competition for the SVG icon system.

- Icon fonts can be recoloured easily
- Hover/active states and change colour without a new image
- Can have a simple markup and class based structure
- Infinitely scaleable

### A simple markup and class based structure is key
This is the most important part. Those who write the code just want to be able to change a class name, get an icon and keep code readable.

```markup
<button type="button" class="btn btn-default btn-lg">
  <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star
</button>
```

This is the approach Bootstrap uses, so this is the benchmark to achieve. Icons should be able to be applied by changing class names eg: `.glyphicon-star` and size adjust with the sizing of an element eg: `.btn-lg`.

## Start with exporting
So let’s say you want to use a different set of icons and start using SVG. Setup is the most significant step and is the primary reason you will be put off this approach. **I’ll be using Illustrator for the next steps**.

### Choose an icon set
I’m going to use SS Standard, which was my go to icon font. **The next steps are tedious, but they only have to be done once**. This set has 172 icons, so not a small amount.

### Output all the icons
Type out each icon, this depends on your icon font or set of icons. Either way, you need to fill a document with each icon.

<div className="article-image">
  <Image src="/images/blog/svg-vs-icon-fonts-typed-out-icons@2x.png" width={738} height={492} />
</div>

**Change the colour to something that isn’t black**. This ensures on export everything will have a fill applied, for finding and replacing later. Black is the default colour so no fills will be applied.

### Expand them
Select the icons in your type layer and expand them by going to Object > Expand. This stops them from being a type layer (if they are).

### Add each icon to the Asset Export panel and name it
By far the most tedious part, but a necessary step.

<div className="article-image">
  <Image src="/images/blog/svg-vs-icon-fonts-asset-export@2x.png" width={738} height={576} />
</div>

### Exporting the icons
Go to File > Export for Screens.

<div className="article-image">
  <Image src="/images/blog/svg-vs-icon-fonts-export-for-screens@2x.png" width={738} height={576} />
</div>

Click the little cog icon, next to ‘Android’.

<div className="article-image">
  <Image src="/images/blog/svg-vs-icon-fonts-inline-style@2x.png" width={738} height={492} />
</div>

Click SVG and change the ‘Styling’ option to ‘Inline Style’. This will make it easier to find and replace shortly. Finally, make sure responsive is unchecked, as when the icons are generated the fallback png will be larger.

## Find and replace the inline style
Using the export method earlier to apply a fill to each icon, it makes it easier to find and replace. Your style attribute should look similar to `style="fill: #1a626e"` in each icon file.

Find each inline style

```markup
style="fill: #1a626e"
```

Replace with (or a naming convention you feel appropriate)

```markup
class="fill-currentcolor"
```

Depending on which text editor you use this should be possible to do quickly.

Following the find and replace, you will need to add to your CSS:

```css
.fill-currentcolor {
  fill: currentcolor; }
```

## Method one: Use Grumpicon.com (no build tool)
So now you have all your SVG files prepared, head over to [Grumpicon](http://www.grumpicon.com/).

### Upload the SVG and download the files
<div className="article-image">
  <Image src="/images/blog/svg-vs-icon-fonts-grumpicon@2x.png" width={738} height={492} />
</div>

After allowing Grumpicon to generate the necessary files, download them and it’s almost ready to go.

### Grab the script with the enhanceSVG addition
Grumpicon hasn’t been updated to include the enhanceSVG option. So the loader script bundled with the download isn’t as useful. The enhanceSVG option is a crucial step in building this icon system. **The script below includes enhanceSVG**.

```javascript
/*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */
    (function(e){function n(n,t,o,a){"use strict";var i=e.document.createElement("link"),r=t||e.document.getElementsByTagName("script")[0],d=e.document.styleSheets;return i.rel="stylesheet",i.href=n,i.media="only x",a&&(i.onload=a),r.parentNode.insertBefore(i,r),i.onloadcssdefined=function(e){for(var t,o=0;d.length>o;o++)d[o].href&&d[o].href.indexOf(n)>-1&&(t=!0);t?e():setTimeout(function(){i.onloadcssdefined(e)})},i.onloadcssdefined(function(){i.media=o||"all"}),i}function t(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}var o=function(a,i){"use strict";if(a&&3===a.length){var r=e.Image,d=!(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||e.opera&&-1===navigator.userAgent.indexOf("Chrome")||-1!==navigator.userAgent.indexOf("Series40")),c=new r;c.onerror=function(){o.method="png",o.href=a[2],n(a[2])},c.onload=function(){var e=1===c.width&&1===c.height,r=a[e&&d?0:e?1:2];o.method=e&&d?"svg":e?"datapng":"png",o.href=r,t(n(r),i)},c.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",document.documentElement.className+=" grunticon"}};o.loadCSS=n,o.onloadCSS=t,e.grunticon=o})(this);(function(e,n){"use strict";var t=n.document,o="grunticon:",r=function(e){if(t.attachEvent?"complete"===t.readyState:"loading"!==t.readyState)e();else{var n=!1;t.addEventListener("readystatechange",function(){n||(n=!0,e())},!1)}},a=function(e){return n.document.querySelector('link[href$="'+e+'"]')},i=function(e){var n,t,r,a,i,c,d={};if(n=e.sheet,!n)return d;t=n.cssRules?n.cssRules:n.rules;for(var s=0;t.length>s;s++)r=t[s].cssText,a=o+t[s].selectorText,i=r.split(");")[0].match(/US\-ASCII\,([^"']+)/),i&&i[1]&&(c=decodeURIComponent(i[1]),d[a]=c);return d},c=function(e){var n,r,a;r="data-grunticon-embed";for(var i in e){a=i.slice(o.length);try{n=t.querySelectorAll(a+"["+r+"]")}catch(c){continue}if(n.length)for(var d=0;n.length>d;d++)n[d].innerHTML=e[i],n[d].style.backgroundImage="none",n[d].removeAttribute(r)}return n},d=function(n){"svg"===e.method&&r(function(){c(i(a(e.href))),"function"==typeof n&&n()})};e.embedIcons=c,e.getCSS=a,e.getIcons=i,e.ready=r,e.svgLoadedCallback=d,e.embedSVG=d})(grunticon,this);
```

To keep this option build tool free is the reason I’ve added the script here. Ideally, I would link you to the source on Github, but it’s slightly different and doesn’t embed the SVG inline.

### Add the script and initialise grunticon
Add the script to your website and additionally the initialisation of grunticon.

```markup
<script src="grunticon.loader.js"></script>
<script>
  grunticon([
    'path/to/icons.data.svg.css',
    'path/to/icons.data.png.css',
    'path/to/icons.fallback.css'
  ], grunticon.svgLoadedCallback );
</script>
```

**You will need to update each URL to match where your grumpicon generated files are located**. Once you add an icon to your document in the next step this will ensure everything works as expected.

> You can add the `grunticon(…)` script to the `grunticon.loader.js` file and load it async for better performance.

## Method two: with Gulp using Gulpicon
Using a build tool will make this task easier in the long run. Assuming you’re already familiar with Gulp, I’ll get into the setup.

### Install Gulpicon and glob
Navigate to where your gulpfile is stored in terminal and install gulpicon.

```bash
cd ~/path/to/the/folder/gulpfile/is
```

These are the relevant npm scripts to get Gulpicon working.

```bash
npm install -s gulpicon
npm install -s glob
```

### Setup the task in your gulpfile.js
Adding the following to your gulpfile will make an `icons` task. In the `files` variable you may need to update this for where your SVG files are located.

```javascript
var gulp = require('gulp');
var glob = require('glob');
var gulpicon = require('gulpicon/tasks/gulpicon');

// Use glob to get file paths
var files = glob.sync('./svg/*.svg');

// Set up the config object
config = {};

// Change the location
config.dest = 'images';

// Enable inlining of SVG
config.enhanceSVG = true;

// Setup the 'icons' task
gulp.task('icons', gulpicon(files, config));
```

There are many other options you can customise, [which can be found on Github](https://github.com/filamentgroup/gulpicon/blob/master/example/config.js).

## Run the icons task
With your gulpicon settings all done, all that’s left is to run the task.

## Using the icons
To add an icon you add the relevant class, which can be found in the generated CSS file, eg: `icons.data.svg.css`. Adding the attribute `data-grunticon-embed` will allow the SVG to be inserted inline.

```markup
<span class="icon-check" data-grunticon-embed></span>
```

This is all you need to add to get an icon to show.

## Make it reusable and flexible with colour and sizes
To make your icon set more effective and more ‘bootstrap’ like you need colours and additional size classes. This is up to your preferences and website colour scheme.

```css
.color-red { color: red; }
.color-blue { color: blue; }
.color-green { color: blue; }
```

Colours don’t need to rely on using `fill`. Due to the class  `fill-currentcolor` applied earlier, they will use the parent colour.

```css
.icon {
  display: inline-block; }

.icon-small,
.icon-small svg {
  width: 16px;
  height: 16px; }

.icon-medium,
.icon-medium svg {
  width: 32px;
  height: 32px; }

.icon-large,
.icon-large svg {
  width: 48px;
  height: 48px; }
```

As mentioned earlier, the width and height dimensions were kept on the SVG. So the parent element of the SVG and the SVG itself both need dimensions adding.

For a nicer page load the parent element needs dimensions. Until the SVG is inserted, it doesn’t know the width or height.

## Usage now looks like this
Add the relevant class names you desire and you’re good to go.

```markup
<span class="icon icon-check icon-small color-red" data-grunticon-embed></span>
```

## Multicolour icons
With SVG you can have multicoloured icons. Depending on your icon all you need to do is add additional class names to the individual paths. *This is a benefit icon fonts don’t have, you have direct control of the parts of an icon*.

It is possible to have multicolour icon fonts, in a roundabout way. This is far simpler.

## Reviewing against the check list
To recap what was set out to be achieved:

- Icon fonts can be recoloured easily
- Hover/active states and change colour without a new image
- Can have a simple markup and class based structure
- Infinitely scaleable

Every point in the checklist has been met. Easy recolouring and states, as well as a simple one element markup structure and of course being SVG they are infinitely scaleable.

I hope this is a good enough argument for you to use SVG. A chunk of work is necessary, but, similar levels of work has gone into FontAwesome and Bootstrap to make your life easier. If you want to change icon set and have some uniqueness in your design,  it’s a necessary step.
