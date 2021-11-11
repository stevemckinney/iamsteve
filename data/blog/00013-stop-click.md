---
title: "Stop a click based on the page"
date: "2010-10-03T00:45:00+00:00"
lastmod: "2021-06-02T06:30:57+00:00"
summary: "I was set a task in University to make a website in short. Part of the requirement was to make each page link, if you are on that page not be clickable. There are a good few advantages to this, mainly, it being required in this case for usability. This can be done with CSS too, but the browser support is limited, as far as I know to Safari, Chrome and Firefox. I could ignore browser support, but this is kind of a key point also within the course that we must accommodate to older browsers."
metadesc: "How to stop clicks on a page navigation link based on the page you're on using jQuery. It's possible to in CSS, this is an alternative approach."
theme: "#ffede5"
tags: ["Code", "jQuery"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 13
fileroot: "stop_click"
---

I was set a task in University to make a website in short. Part of the requirement was to make each page link, if you are on that page not be clickable. There are a good few advantages to this, mainly, it being required in this case for usability. This can be done with CSS too, but the browser support is limited, as far as I know to Safari, Chrome and Firefox. I could ignore browser support, but this is kind of a key point also within the course that we must accommodate to older browsers.

## jQuery
As always make sure you have jQuery in your code by using [Google's hosted version](//developers.google.com/speed/libraries/devguide#jquery "Get jQuery from here").

## The code
```javascript
$(document).ready(function(){
  var page = window.location.href;
  var name = page.replace(/.+[\/]([^\/]+)$/,'$1');
      
  if ((name === "index.php") || (name == "sitename.com"))  {
    $("#nav .home").addClass("current");
    $("#nav .home").click(function(){return false;});
  }
  else if (name === "portfolio.php") {						
    $("#nav .portfolio").addClass("current");
    $("#nav .portfolio").click(function(){return false;});
  }
  else if (name === "blog.php") {						
    $("#nav .blog").addClass("current");
    $("#nav .blog").click(function(){return false;});
  }
  else {					
    $("#contact .contact").addClass("current");
    $("#contact .contact").click(function(){return false;});
  }
});
```

## Break down
I'm relatively certain this could be done in fewer lines, but as I'm no jQuery expert, I wasn't able to achieve it in fewer lines. Though this fits my needs perfectly.

### The variables
```javascript
var page = window.location.href;
```

This first variable is simple assign the URL of the current page to 'page'

```javascript
var name = page.replace(/.+[\/]([^\/]+)$/,'$1');
```

This is a little trickier to understand, it is a regular expression. In short it replaces the whole of the URL with just the end part, so if we had _http://site.com/path/to/file.php_, we would just have file.php. The longer explanation being; this part of the regular expression `/.+[\/]([^\/]+)$/`. `.+` is looking to match one or more of any characters that match except a newline. `[\/]` matches any instances of \\ or /. `([^\/]+)` is matching any grouped sequences and instances of \\ or / at the beginning of the line and if there are any more preceding the match, match them too. The `$` is to match the end of the line. Finally the `$1` matches the first submatch, basically the end of it eg: "index.php".

### The if statement
```javascript
if ((name === "index.php") || (name == "sitename.com"))  {
  $("#nav .home").addClass("current");
  $("#nav .home").click(function(){return false;});
}
else if (name === "portfolio.php") {						
  $("#nav .portfolio").addClass("current");
  $("#nav .portfolio").click(function(){return false;});
}
else if (name === "blog.php") {						
  $("#nav .blog").addClass("current");
  $("#nav .blog").click(function(){return false;});
}
else {					
  $("#contact .contact").addClass("current");
  $("#contact .contact").click(function(){return false;});
}
```

This is an `if` statement which compares the value of `name` to every possible page you give it. Which obviously if it finds a match to then add a `class` of 'current' to the link of the page. `$("#nav .home").click(function(){return false;});` simply if the link is clicked then nothing will happen. For the final else I found this a little difficult to match the final page it just doesn't happen with out a comparison that you get with an else if. That's where my knowledge falters. I'm sure it can be done some way but I'm relying on a unique body ID to select the final page.

## Finishing points

I hope this is of some use to you. It's an easily adjustable code just add as many extra else if's before the else and change them as needed and it should do the trick. It's definitely one for smaller websites of course, where as my University one is only four pages.