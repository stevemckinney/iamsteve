---
title: 'Simple horizontal scrolling menu with CSS'
date: '2015-04-28T07:00:00+00:00'
lastmod: '2021-08-04T10:48:18+00:00'
summary: 'If you’re looking for an alternative approach to responsive navigation, which doesn’t involve the ‘hamburger’ this may be for you.'
metadesc: 'How to code your own inherently responsive horizontal scrolling navigation (using only CSS), which responds perfectly to the browser and seamlessly integrates into your design.'
theme: '#edf5f6'
tags: ['Code']
categories: ['Code', 'CSS', 'Patterns']
images:
  ['/images/blog/horizontal-scrolling-responsive-featured-image-v2@2x.png']
large: '/images/blog/horizontal-scrolling-responsive-featured-image-v2@2x.png'
medium: '/images/blog/horizontal-scrolling-featured-image-medium@2x.png'
ogImage: '/assets/og/cover.jpg'
status: 'open'
codepen: true
id: 72
fileroot: 'horizontal-scrolling-responsive-menu'
---

I’ve been wondering for a while now about an alternative approach to responsive navigation. Something which doesn’t involve the ‘hamburger’ toggle icon. It’s tricky, because we aren’t afforded the same space native apps get.

Although I’m certainly not the first to use this idea, it has been used in early versions of the Facebook app and it’s being used on some pages on the Apple website. It’s a pattern that could be an ideal replacement for the ‘hamburger’ menu. So in this post the aim is to use only CSS for a horizontal scrolling navigation.

## What we want to avoid when creating this menu

What made the ‘hamburger’ menu so successful was how discrete and easy it was just to shove away all those items. Which in turn is why it’s was deemed unsuccessful, in terms of engagement. Visibility being the core reason to explore different options, there are other things that would be ideal to avoid.

### Generally fixed elements because they require two taps

The way that Mobile Safari on iOS works is terrible for anything fixed towards the bottom of the viewport. Centralising it in the viewport to the left or right can obscure content, which in turn will be equally as annoying. It then comes down to which is more inconvenient for the user; as there are some [good examples for using bottom navigation on a website](/blog/websites-using-alternatives-to-the-hamburger).

### Anything list like

A list like menu can get in the way of the page itself. Although it’s highly accessible from the off, however, I think you can push the more valuable content, you would want the visitor to see initially. Especially on a site where you want the content to be consumed, it could become tedious to scroll past navigation every single you tap a link.

### Tap/click to bring you down to a menu

Simply, it is no better than the ‘hamburger’. You’ve still got the same issues, and it doesn’t tend to be too apparent you’ve jumped down the page. It can be a little inconvenient if you don’t find what you wanted as part of the navigation.

## So why would a horizontal navigation be any better?

On touch screen devices swiping horizontally is much more natural and fluid (especially on iOS), than horizontal scrolling on a computer—for the most part at least. You see this pattern used throughout apps and galleries. So why not navigation? The navigation is always visible, although some of the items may not, this is an advantage over hiding the navigation completely.

## The implementation

The implementation is flexible to work with your layout. Whether you have it positioned by your logo, it will work. Just apply the styles, to whichever element you prefer.

### CSS

The two properties that do the work here are `white-space: nowrap` and `overflow-x: auto`. You need to make sure items don't wrap otherwise, it will behave normally and allowing scrolling using `auto` means scrolling will be available when necessary. This small amount of CSS will make any area have horizontal scrolling.

```css
/*
[1]: All items a forced onto a single line, causing the overflow when necessary.
[2]: Automatic overflow means a scroll bar won’t be present if it isn’t needed
[3]: Make it smooth scrolling on iOS devices before
[4]: Hide the ugly scrollbars in Edge until the scrollable area is hovered
[5]: Hide the scroll bar in WebKit browsers
*/
.scroll {
  white-space: nowrap; /* [1] */
  overflow-x: auto; /* [2] */
  -webkit-overflow-scrolling: touch; /* [3] */
  -ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */
}

/* [5] */
.scroll::-webkit-scrollbar {
  display: none;
}
```

It's important to use the `-webkit-overflow-scrolling` as this adds momentum and ease of use to scrolling areas. However, as of [Safari 13 this is the default behaviour](https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes). Android devices by default are easier to scroll on, so you don’t need to worry here. `-ms-overflow-style: -ms-autohiding-scrollbar` allows users of IE 10, 11 and Edge have a scrollbar to use on hover.

Next, you may want to hide the scrollbar completely. You can do this by targeting the `::-webkit-scrollbar` pseudo element and improve the appearance further for Windows Chrome users. However, from some brief testing on Windows, it can make it trickier to scroll. I believe this can depend on your mouse though.

Finally, you may be wondering about Firefox, it seems there isn’t a way at the time of writing.

### HTML

```markup
<header class="scroll">
  <a href="http://iamsteve.me">Logo</a>
  <nav>
    <a href="http://iamsteve.me/blog">Blog</a>
    <a href="http://iamsteve.me/portfolio">Portfolio</a>
    <a href="http://iamsteve.me/downloads">Downloads</a>
    <a href="http://iamsteve.me/about">About</a>
    <a href="http://iamsteve.me/contact">Contact</a>
  </nav>
</header>
```

> Depending on which area you want to scroll, you can apply the styles to the header or navigation.

### Use cases

<div className="codepen-wide">
  <p data-height="456" data-theme-id="31700" data-slug-hash="yNBNKa" data-default-tab="result" data-user="stevemckinney" data-embed-version="2" data-pen-title="Horizontal scroll navigation" className="codepen">See the Pen <a href="https://codepen.io/stevemckinney/pen/yNBNKa/">Horizontal scroll navigation</a> by Steve (<a href="https://codepen.io/stevemckinney">@stevemckinney</a>) on <a href="https://codepen.io">CodePen</a>.</p>
</div>

## Make sure you don’t have a width set on the items

An area that may catch you out with this approach is applying a percentage `width` to the items. If you need to make sure something always has a percentage `width`, try using `min-width` instead. Using a percentage `width` always will be a percentage of the visible area rather than what overflows.

## The downsides

It’s quite a simple solution in reality, although with every solution there are downsides, I’ve listed the ones I can think of below. I’ve not seen any sources testing a navigation like this, which is why I’m listing areas for concern.

### Needs affordance

The affordance isn't a massive problem. As many things require affordances. I always aim to have an item in the navigation cut off partially. Other alternatives include adding a shadow or fading the items out.

### Not quite ideal if a user browses with a narrow window on Windows

Horizontal scrolling isn’t the greatest on a desktop computer (unless you have a Magic Mouse). If you’re on Windows it’s really a no go without dragging a scrollbar. The only sane method for hiding scrollbars exists for IE11 and Edge, if you want to have it behave similarly to OS X. If this is a problem for you, there is a solution.

#### Flickity

Something I want to look at will be implementing this with [Flickity](http://flickity.metafizzy.co/). I like Flickity due to the vanilla Javascript implementation. Using this method would mean that scrollbars are hidden. Usability will be increased across all kinds of devices, due to the various ways you can interact with it.

Once Flickity is implemented, you can retain the `.scroll` CSS and add to that the following:

```css
.scroll::-webkit-scrollbar {
  display: none;
}
```

As I mentioned earlier, I said to use this cautiously. However, in combination with Flickity you can hide the scrollbar without worry.

> Edit: I have since written a post about [enhancing horizontal scrolling with flickity](/blog/enhancing-horizontal-scrolling-with-flickity-js).

### Using flexbox

You may also be interested in an [alternative approach with flexbox](/blog/using-flexbox-for-horizontal-scrolling-navigation). The main differences between using an `inline-block` approach versus a `flex` approach is the code tends to be a little tidier.

## What do you think?

This is a reasonable way of displaying navigation on the basis of what you have to compete with across devices. Have you used anything like this in recent projects? I'd like to hear on [twitter](http://twitter.com/irsteve).
