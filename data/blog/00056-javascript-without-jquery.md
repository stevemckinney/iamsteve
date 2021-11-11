---
title: "Javascript without jQuery"
date: "2015-01-13T08:00:00+00:00"
lastmod: "2021-06-10T06:20:47+00:00"
summary: "This post covers how I used the opportunity to not use jQuery to further my Javascript knowledge, as well as the performance benefits gained from this. I found alternatives to what jQuery offers and it wasn’t completely simple, but hopefully I can show beginners alike how to overcome some of the problems."
metadesc: "Some techniques for getting round the conveniences of jQuery and showing that how easy it is to use vanilla javascript."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 56
fileroot: "javascript-without-jquery"
---

If you haven’t read the previous post, I have spent the best part of my free time building a portfolio, where I focused on performance. The previous post covered [asynchronous and critical path CSS](http://iamsteve.me/blog/entry/critical-asynchronous-css), this post will focus on Javascript. 

This post won’t cover the finer gains of optimising your Javascript, I’m not the best person for that. Rather that you can get by without a library—which has performance benefits of its own and perceived performance tips.

## This isn’t a rant against frameworks
jQuery offers value to any project and for all it offers I won’t be excluding it from work in my day job. However, knowing I wouldn’t be using all of the library, I wanted to see if I could use a smaller part of jQuery. As I would intend to reduce some repetition through functions. This didn’t quite make the significant change to file size as I had hoped.

I went ahead and coded all my Javascript without it. I’m happy I did, I understand Javascript better and didn’t really struggle too much to work around the conveniences of jQuery.

### Documentation and support
Living in a jQuery world you don’t tend to worry about browser support, it’s just expected. I used documentation on [MDN](https://developer.mozilla.org/en-US/) and [Can I Use](http://caniuse.com/) to understand the browser inconsistencies and support levels.

## Adding, removing, toggling and checking for classes
Javascript has had for a little while had its own way of doing class manipulation, through [classList](http://caniuse.com/#search=classList).

```javascript
element.classList.add('class-name');
element.classList.remove('class-name');
element.classList.toggle('class-name');
element.classList.contains('class-name');
```

However on seeking some backwards compatibility I discovered [apollo](https://github.com/toddmotto/apollo). This covered everything I needed so I decided not to reinvent the wheel.

## Events
Events are simple too. The most common use, for me, is toggling navigation. I tend to check for whether it’s a touch enabled device and use a different event listener based on that. The perceived speed improvements through that little change are great.

```javascript
var icon = document.querySelector('.nav-icon');
if ( icon.addEventListener ) {
  // Using Modernizr to check for 'touchstart' allows the navigation to open quicker on touch enabled devices
  if ( Modernizr.touch ) {
    icon.addEventListener('touchstart', toggle_nav_function);
  }
  else {
    icon.addEventListener('click', toggle_nav_function);
  }
}
```

> Should you require IE8 support you can use `attachEvent` and create a condition based on that. In this case as the icon is only displayed on smaller screen sizes. A simple check for addEventListener covers us from errors.

### Using pointer-events for 60fps scrolling
I had seen a tweet about applying `pointer-events: none` to `<body>` on scroll to stop unnecessary paints. This can be quite an expensive operation and affect the way a page behaves when scrolling. Considering the complexity of the SVG on the homepage I felt it necessary to implement. [The CSS Ninja does a great job of explaining this and provides the code neccessary](http://www.thecssninja.com/javascript/follow-up-60fps-scroll).

## Using inline validation to enhance a form
The most difficult part was inline validation on forms, I admit I was looking for a library here as I doubted whether I could do it. A pure Javascript alternative wasn’t to be found, so I went ahead and done it myself.

### Where jQuery shines
Occasionally you need the source order with Javascript or insert an element. This is where `insertBefore` comes in. [MDN explains this best](https://developer.mozilla.org/en-US/docs/Web/API/Node.insertBefore).

One thing to be aware of is, if the element isn’t always on the page you need to check it exists otherwise you will find errors in your console.

```javascript
var element = document.getElementById('move');
var child = document.getElementById('child');
var parent = child.parentNode;

if ( child ) parent.insertBefore(element, child);
```

A few times, I found myself needing `insertAfter`. It’s not currently part of Javascript, though quite easy to overcome.

```javascript
if ( child ) parent.insertBefore(element, child.nextSibling);
```

### A roundabout way to check an element exists
The hardest part for me was checking for the existence of an element inserted with Javascript. Generally Google wasn’t much help here as everything came up jQuery.

```javascript
 // The element that has had something inserted near it
var element = document.querySelector('.element');

// You have to find the parent to be able to check for inserted children
var parent = element.parentNode;
var children = parent.childNodes;

// Loop through all children and do something
for (var ii = children.length; ii--;) {
  children[ii].parentNode.removeChild(children[ii]);
}
```

> Do you know of a better way to approach this? I’d like to hear [@irsteve on twitter](http://twitter.com/irsteve).

## That’s it
Those are some of the issues I came across when trying to write Javascript. It was a great learning experience and I know some people will disagree with not using jQuery and that’s fine. I’m not doing this to convince you otherwise.

> I found so much help through [Todd Motto’s blog](http://toddmotto.com). His posts go into great detail about Javascript and I would recommend reading his posts, should you want to learn more.