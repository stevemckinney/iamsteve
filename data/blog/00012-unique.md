---
title: "Using jQuery to add unique body ID"
date: "2010-09-24T13:35:00+00:00"
lastmod: "2021-06-02T06:30:16+00:00"
summary: "I’m quite a beginner with jQuery, but recently I made a basic free template on my downloads page, and I wanted to actually try put some of my knowledge to use for once. So I made this little jQuery snippet. Say you want to style a page of your website a little differently to the rest of the other pages, be it you want all the h1 headings on the home page to be green and on your about page blue. With these few lines of code you can have an ID added to the body based on the URL’s ending/page name."
metadesc: "A simple technique for using jQuery to add an ID to the body tag based on the page"
theme: "#e1f7ee"
tags: ["Code", "jQuery"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "closed"
id: 12
fileroot: "unique"
---

I'm quite a beginner with jQuery, but recently I made a basic free template on my downloads page, and I wanted to actually try put some of my knowledge to use for once. So I made this little jQuery snippet. Say you want to style a page of your website a little differently to the rest of the other pages, be it you want all the `h1` headings on the home page to be green and on your about page blue. With these few lines of code you can have a class (with modification) or ID added to the body based on the URL's ending/page name.

> Note: this doesn't work too well with "beautified" Wordpress URL's. I've had a try which it will be provided at the end, though I couldn't figure out how to always get the last part of the URL.

## Step one: get jQuery
If you haven't put jQuery on your page, you'll need to. I recommend using [the Google hosted one](https://developers.google.com/speed/libraries/devguide#jquery "Google's CDN hosted libraries").

## The code
Here's the full code if you don't want to read an explanation, that's below.

```javascript
$(function() {
  var pathname = window.location.pathname;
  var getLast = pathname.match(/.*\/(.*)$/)[1];
  var truePath = getLast.replace(".php","");

  if(truePath === '') {
    $('body').attr('id', 'index');
  }
  else {
    $('body').attr('id', truePath);
  }
});
```
## The explanation
For those wondering why and how what line does what I'll try my best to explain.

`var pathname = window.location.pathname;`
This is a variable called 'pathname' which gets the URL's path name so for example: **http://iamsteve.me/something/somethingelse/hello** would lead to **/something/somethingelse/hello**

`var getLast = pathname.match(/.*\/(.*)$/)[1];`
This is a new variable called 'getLast' which gets the 'pathname' variable and uses a regular expression (regex) to find all slashes. The [1] is an array that looks for the first position.

`var truePath = getLast.replace('.php','');`
This is a further new variable called 'truePath' which gets the variable 'getLast' and uses `replace()` to look within the 'getLast' variable and seeing if it contains any **.php** and replace it with nothing which is what **''** is for. You can also look for whatever you like, it doesn't need to be a file extension at all.

```javascript
  if(truePath === '') {
    $('body').attr('id', 'index');
  }
```

This part of the if statement checks the 'truePath' variable to see if it's *exactly* equal to nothing. This is just incase you type in say a url http://site.com. Because `window.location.pathname` will return nothing. So we need a backup for that.

```javascript
else {
  $('body').attr('id', truePath);
}
```

This assigns to the body whatever the variable 'truePath' contains if the if statement before it doesn't return true.

### For Wordpress and stuff alike
This isn’t the most ideal approach for Wordpress, as you really don’t need to use JavaScript here, instead you should look at using the `body_class()` function. It applies a variety of classes, one which is unique to the page itself.

I hope you've enjoyed this explanation. Practice makes perfect.