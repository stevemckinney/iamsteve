---
title: "Stop headroom.js hiding when your navigation is open"
date: "2016-08-02T06:23:00+00:00"
lastmod: "2020-03-23T17:07:45+00:00"
summary: "Headroom.js is a popular plugin for providing additional functionality in having a fixed header. It has a lot of additional callbacks and options, to make sure you can cover a variety of situations. One of those things is stopping it from hiding when your navigation is open."
metadesc: "Headroom.js has many options and class names applied based on state, but if you've got a navigation that is opened by a hamburger icon and you scroll it hides."
theme: "#fff5f3"
tags: ["Code"]
categories: ["Code"]
images: ["/static/images/blog/update-headroomjs-featured-image%402x.png"]
large: "/static/images/blog/update-headroomjs-featured-image%402x.png"
medium: "/static/images/blog/headroomjs-featured-image-medium%402x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 137
fileroot: "stop-headroom.js-hiding-when-your-navigation-is-open"
---

Headroom.js is a popular plugin for providing additional functionality in having a fixed header. It has a lot of additional callbacks and options, to make sure you can cover a variety of situations. One of those things is stopping it from hiding when your navigation is open. Which is what this post will cover, as this is something I had to do recently.

## The problem detailed
You’ve got your header setup and working with headroom.js. Your navigation is revealed by tapping or clicking an icon (be that a hamburger or whatnot). When you scroll the header still hides despite the navigation being visible. 

You may even have the navigation cover the whole viewport, but you can still trigger scroll events.

Using CSS only could probably solve this, but that isn’t ideal. As it can quickly become difficult to maintain, if you’re adding an additional state to the navigation.

## The solution
To solve this you need to stop the navigation hiding, when it’s ‘open’ or ‘visible’.

### You may have this currently
You will have initialised headroom, it may look similar, or you may have passed some options.

```javascript
var header = document.getElementById('header');
var headroom = new Headroom(header);
headroom.init(); 
```

### Checking the state
Firstly, it’s helpful to write a small function to check whether the nav is visible. This will make code more readable amongst the options.

```javascript
function isNavVisible(nav) {
  return ( nav.classList.contains('visible') ? true : false );
}
```

So this function has a single argument, which when you come to use this function, will look something like `document.querySelector('.nav')`. It then returns a value of `true` or `false` whether the navigation contains the class `visible`.

You can change this visible class to be more in line with your naming convention.

### Using the onUnpin callback to disable hiding
If you have your options set up already, then it will be a matter of taking the `onUnpin` callback and adding it to your existing options.

```javascript
var header = document.getElementById('header');
var nav = document.getElementById('nav');

var options = {
  onUnpin: function() {
    if ( isNavVisible(nav) ) {
      this.elem.classList.remove(this.classes.unpinned);
      this.elem.classList.add(this.classes.pinned);
    }
    else {
      this.elem.classList.add(this.classes.unpinned);
      this.elem.classList.remove(this.classes.pinned);
    }
  }
};

var headroom = new Headroom(header, options);
headroom.init(); 
```

If you don’t have options, this essentially passes an extra parameter to the `headroom` variable. Inside the options object, the `onUnpin` callback uses the function from earlier to remove or add a class name using the `classes` object built into headroom.

### How the classes are chosen
Using `this` gives you access to all the options. Specifically you need to access `elem` and `classes`.

```javascript
this.elem.classList.remove(this.classes.unpinned);
```

`this.elem` refers to the element you pass to headroom, in this case it’s the `header` variable. You can use this to look at the class list and use that to remove or add a class.

To remove the class that applies the unpinned state, you use `this.classes.unpinned`.

### You’re free to update class names
This is useful because you may have an override in place for your own class names. You can also update them without the need to change this code later on.

#### Toggling your navigation
For the sake of completeness and clarity, I’ve included a basic navigation toggle.

```javascript
var nav = document.querySelector('.nav');
var navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', function() {
  nav.classlist.toggle('visible');
}, false);
```

This will listen for clicks on `.nav-toggle` and toggle a class on `.nav`.

## Final code
To recap you've got a function to detect visibility of your nav element. That function is used as part of the onunpin callback, where you add and remove class names based upon the state. The class names are found in the classes object. 

```javascript
function isNavVisible(nav) {
  return ( nav.classList.contains('visible') ? true : false );
}

var header = document.getElementById('header');
var nav = document.getElementById('nav');

var options = {
  onUnpin: function() {
    if ( isNavVisible(nav) ) {
      this.elem.classList.remove(this.classes.unpinned);
      this.elem.classList.add(this.classes.pinned);
    }
    else {
      this.elem.classList.add(this.classes.unpinned);
      this.elem.classList.remove(this.classes.pinned);
    }
  }
};

var headroom = new Headroom(header, options);
headroom.init(); 
```