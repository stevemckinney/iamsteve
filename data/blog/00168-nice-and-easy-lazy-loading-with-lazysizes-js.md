---
title: "Nice and easy lazy loading with lazysizes.js"
date: "2018-02-11T19:58:00+00:00"
lastmod: "2019-10-04T07:21:26+00:00"
summary: "Lazy loading doesn’t have to be difficult, here’s how to add smooth loading images to your website."
metadesc: Use lazysizes.js to implement lazy loading. This post shows you how to add lazy loading with smooth loading effects that don’t make the page jump about."
theme: "#fff3f0"
tags: ["Design"]
categories: ["Design"]
images: ["/static/images/blog/lazyloading-featured-image.png"]
large: "/static/images/blog/lazyloading-featured-image.png"
medium: "/static/images/blog/lazyloading-featured-image-medium.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 168
slug: "nice-and-easy-lazy-loading-with-lazysizes-js"
---

Images play a large part in the reason why websites continue to grow in page size. While they don’t affect performance as much as JavaScript, they remain a burden on data and loading times. In this post I want to show you how to add lazy loading images as part of your workflow.

## What makes a good lazy loaded image?
Before I get into the how, I want to quickly list some things I believe makes good lazy loading.

- Has a fallback when JavaScript is disabled
- Will work with srcset, retina, etc.
- Doesn’t make the page ‘jump’ about as the images load
- Doesn’t force you to change your markup structure
- You can customise the loading
- Doesn’t depend on the likes of jQuery 

The fact images don’t affect performance like JavaScript, and aren’t always needed in the page, this means you can *lazy load all the things* and reduce page size and requests significantly.

### Example
Each of those things can be compared here, albeit you may need to view the Codepen on a slow connection!

<p data-height="468" data-theme-id="31700" data-slug-hash="b513dec968b7749537ccbb8fd951532d" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" data-editable="true" data-pen-title="lazy loading images" class="codepen">See the Pen <a href="https://codepen.io/stevemckinney/pen/b513dec968b7749537ccbb8fd951532d/">lazy loading images</a> by Steve (<a href="https://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Lazy loading with lazysizes.js
Now to get into how to achieve lazy loading, using lazysizes.js. You’re reasonably spoilt for choice and have a fair amount of libraries to choose from. I chose lazysizes.js for it’s vanilla JavaScript, simplicity, and plugins for extra functionality—like lazy loaded background images. It also has a bunch of events which you will utilise [later in this post](#using-events-in-javascript-to-clean-up-loading).

### Setup
To begin using lazysizes, [download and include lazysizes.min.js](https://github.com/aFarkas/lazysizes/blob/gh-pages/lazysizes.min.js) or [a method that suits your project best](https://github.com/aFarkas/lazysizes).

```markup
...everything else

<script src="path/to/lazysizes.js"></script>
</body>
</html>
```

### Basic markup required for lazyloading images
At it’s most basic there is no additional JavaScript setup required. It’s mostly done through HTML and CSS.

```markup
<img data-src="image.jpg" data-srcset="image.jpg 1x, image@2x.jpg 2x" class="lazyload">
```

The main differences here are relatively small, the `src` and `srcset` attributes become `data-src` and `data-srcset`. The `class` is a *requirement* too—many times I have forgot to add it. 

*That’s all you need to make your images lazy load*. However, left like this there will be no indication the image is loading and page load itself will feel janky.

## Making the load smoother
To take away the page jank as images load, you need to use the [intrinsic ratio technique](https://alistapart.com/article/creating-intrinsic-ratios-for-video) for sizing the images. 

As the images don’t exist on page load, there is no way for the browser to know the dimensions. The browser can’t predict the space required, so once they load the page can feel jumpy. The way this is solved is by creating a ‘placeholder’ and positioning the image over that.

### Adjust the markup
The first step to do this, is to adjust our current markup. The only change is to add a `div` round the image. This is so the image inside has a reference, to be placed and sized correctly. 

```markup
<div class="image loading">
  <img data-src="image.jpg" data-srcset="image.jpg 1x, image@2x.jpg" class="lazyload">
</div>
<noscript>
  <img src="image.jpg" srcset="image.jpg 1x, image@2x.jpg" class="image-fallback">
</noscript>
```

The `image` class name will be used to apply the image sizing and placement with an intrinsic ratio. This `div` can also be used to indicate something is happening. So additionally a `loading` class name has been added. 

#### The fallback
You’ll notice the `<noscript>` tag in there too. This is treated as a regular image, no data attributes. As when JavaScript is disabled this will show instead.

### The placeholder padding calculation
Just before getting into the CSS, you need to understand how to calculate sizing the images. The size is applied with a percentage padding. 

```css
( height / width ) * 100
```

This calculation is based upon the aspect ratio of the image. To calculate this you divide the height by the width and multiply by 100.

### CSS for image sizing
This is called [the intrinsic ratio method](https://alistapart.com/d/creating-intrinsic-ratios-for-video/example2.html), with a few additional lines of CSS, this sizes your image appropriately. A background gradient has been added to show something will be there.

```css
.image {
  position: relative;
  padding-bottom: 66.5492958%;
    
  // Tweak as needed
  background: linear-gradient(rgb(242, 242, 242) 66%, rgba(242, 242, 242, 0)); }

.image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; }
```

Another benefit of lazy loading images is if the visitor doesn’t reach that image within the page it’s not something they have to download. For those with smaller data plans, it’s a good thing. 

### CSS for loading indicator
The `loading` class will apply the loading indicator and also be used in JavaScript later.

```css
@keyframes scaleout {
  0% {
    transform: scale(0); }

  100% {
    transform: scale(1);
    opacity: 0; } }
    
.loading:before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  margin-top: -16px;
  margin-left: -16px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  animation: scaleout 1.2s infinite ease-in-out;

  // Tweak as needed
  mix-blend-mode: soft-light;
  background-color: rgba(0, 0, 0, .9); }
```

Essentially this is a kind of pulsing indicator using a pseudo element.

You’ll also notice `mix-blend-mode`, this will mean that the loading indicator looks ideal over any background. There are other ways to indicate loading, a more [skeleton style](https://codepen.io/viktorstrate/pen/yoBRLy) or using [other indicators](http://tobiasahlin.com/spinkit/).

### CSS to fade the image in
The final step to make it all seamless is to utilise the `lazyload` class. This was added to the `img` tag earlier and gets transformed into `lazyloaded`. You can use this to transition the opacity, or whatever you see fit. 

```css
.lazyload,
.lazyloading {
  opacity: 0; }

.loading,
.lazyload,
.lazyloaded,
.image {
  opacity: 1;
  transition: 2s cubic-bezier(0.215, 0.61, 0.355, 1); }
```

This bit of code appears a little messy, but each class is used at a different stage. So you need to ensure each of them has the appropriate transition and opacity.

## Using events in JavaScript to clean up loading
lazysizes.js has a few events you can utilise to make changes. One of the things you can do is listen for the `lazyloaded` event and remove the `loading` class. 

This can be used to stop the loading indicator running in the background. Which I can’t say for certain, but I’m sure it’ll help page performance slightly.

```javascript
var lazy = function lazy() {
  document.addEventListener('lazyloaded', function (e)  {
    e.target.parentNode.classList.add('image-loaded');
    e.target.parentNode.classList.remove('loading');
  });
}

lazy();
```

The code is calling a function called `lazy`. Inside this function there is an event listener waiting for the `lazyloaded` event to happen. This happens individually for each image as and when they have loaded. 

`addEventListener` allows you to pass a function as the second argument, which in this example using `e` will allow you to modify the image. In your anonymous function, to remove the `loading` class you need to look at the current element `e.target` and find its parent `parentNode`. 

All combined that means `e.target.parentNode` will return the image. The `parentNode` in this instance is the `<div>` around the image and the class will be removed.

## What to do when JavaScript is disabled
As mentioned earlier the need for the image to show when JavaScript is disabled. When JavaScript is disabled you will still have the leftovers from the image which will be lazy loaded.

In your `<head>` you can add some CSS to hide this. It’s the most reliable way to do so.

```markup
<noscript>
  <style>
    .image.loading { display: none; }
  </style>
</noscript>
```

With the code in place your design shouldn’t look out of place, for the times when JavaScript can fail and when it’s disabled.

## Flicker of a border around the image
Occasionally you may see a default browser border, this is because there is no `src` defined in our example.

```markup
<img 
  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  data-src="path/to/image.png"
  data-srcset="path/to/image.png 1x, path/to/image@2x.png 2x"
>
```

However, as recommended as part of the lazysizes.js documentation you can add a transparent pixel as the `src`. This  overcomes that problem. In general use I rarely see it, so I haven’t included it as part of the examples. It can make your HTML look pretty messy too!

## Other effects
Here are some other ways of transitioning in the image. Have a look at the code, the CSS used is towards the top. 

<p data-height="468" data-theme-id="31700" data-slug-hash="f774865f5cccdd31e4edae1ae74bc40a" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" data-editable="true" data-pen-title="lazy loading images-02" class="codepen">See the Pen <a href="https://codepen.io/stevemckinney/pen/f774865f5cccdd31e4edae1ae74bc40a/">lazy loading images-02</a> by Steve (<a href="https://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="https://codepen.io">CodePen</a>.</p>

<p data-height="468" data-theme-id="31700" data-slug-hash="KQaEEO" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" data-pen-title="lazy loading images effects" class="codepen">See the Pen <a href="https://codepen.io/stevemckinney/pen/KQaEEO/">lazy loading images effects</a> by Steve (<a href="https://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="https://codepen.io">CodePen</a>.</p>

You may also want to apply the whole effect to the container, so the text transitions in too. The JavaScript would need some slight modifications, but it can somewhat double up as a scroll effects library.

## Summary
When I first set out with lazy loading images, I thought it would be a real pain. It isn’t without extra work, but it isn’t a huge hassle unless it’s with background images.

With most use cases you will be using the `<img>` tag, with changes in the attribute names.

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>