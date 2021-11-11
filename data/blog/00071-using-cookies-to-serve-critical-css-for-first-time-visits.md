---
title: "Using cookies to serve critical CSS for first time visits"
date: "2015-04-21T06:45:00+00:00"
lastmod: "2016-08-28T11:00:46+00:00"
summary: "I wrote about critical path CSS earlier in the year, but didn’t cover using cookies to cover the caching part. So, this post will assume that you’ve previously set up your CSS in a similar manner. If not, I advise you read my post about it.After this post, you’ll be able to setup a cookie, to check if a visitor has the CSS cached and no longer requires the critical path CSS."
metadesc: "How to use cookies to cache your critical CSS. A simple approach involving making your CSS asynchronous, applying a cookie and checking for it."
theme: "#ffede5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 71
fileroot: "using-cookies-to-serve-critical-css-for-first-time-visits"
---

I wrote about [critical path CSS](http://iamsteve.me/blog/entry/critical-asynchronous-css) earlier in the year, but didn’t cover using cookies to cover the caching part. So, this post will assume that you’ve previously set up your CSS in a similar manner. If not, I advise you [read my post about it](http://iamsteve.me/blog/entry/critical-asynchronous-css).

After this post, you’ll be able to setup a cookie, to check if a visitor has the CSS cached and no longer requires the critical path CSS.

## Why it’s necessary
Critical path CSS is important for the first page load. There on it’s not really necessary as everything should be cached. It also removes any doubts for the flash of unstyled content.

## Our current setup probably looks like
I’ve excluded much of the code for brevity. Just highlighting the `<style>`, `<script>` and `<noscript>` tags used.

```{.language-markup .language-javascript}
<head>
  <style>
    /* Critical CSS */
  </style>
  <script>
    function loadCSS(a, b, c)  { … }
    loadCSS('fonts.css')
    loadCSS('full.css')
  </script>
  <noscript>
    …
  </noscript>
</head>
```

## Setting up the cookies
The easiest approach to setting up your cookies is to use the [Filament Group cookie utility](https://github.com/filamentgroup/cookie). It’s a tiny script you can include in your `<head>` with your [loadCSS](https://github.com/filamentgroup/loadCSS) script.

### Setting a cookie
Setting a cookie using the utility takes 3 parameters. First the name, a string value, and the amount of days until the cookie expires.

```javascript
cookie('full-css', true, 7);
```

#### The first parameter ‘full-css’
This can be anything. I’d advise something memorable, if you want to delete a specific cookie later on. 

#### The second parameter ‘true’
An optional string, can really be anything too. We don’t need to do anything with this, so I have set it to `true`.

#### The third parameter ‘7’
Number of days. Again, this can be anything you like as long as it’s a number of days. 

## Using the cookie to control our code
We’ve walked through how to set a cookie. Now, we need to check if the ‘full-css’ cookie exists. If it doesn’t, we load inline, our critical path CSS and full CSS in asynchronously. **Not forgetting the `<noscript>` fallback**.  We will break this code down now to fully understand it.

### Check if the cookie exists

```{.language-php .language-markup}
<?php if ( isset($_COOKIE['full-css']) ) : ?>
  <link href="fonts.css" rel="stylesheet">
  <link href="full.css" rel="stylesheet">
<?php else : ?>
<?php endif; ?>
```

This part checks if the cookie is set. If we don’t check it’s set we could cause some errors.

### Otherwise include critical & full CSS
```{.language-php .language-markup}
<?php else : ?>
  <style><?php include 'critical.css'; ?></style>
  <script>
    function cookie(e, i, o) { … }
    function loadCSS(a, b, c) { … }

    if( ! cookie( 'full-css' ) )  {
      loadCSS( 'fonts.css' );
      loadCSS( 'full.css' );
      cookie( 'full-css', true, 7 );
    }
  </script>
  <noscript>
    <link href="fonts.css" rel="stylesheet">
    <link href="full.css" rel="stylesheet">
  </noscript>
<?php endif; ?>
```

The chunkier part of the code, we’re making sure we include the critical path CSS and then load the rest asynchronously. A `<noscript>` fallback is necessary, should any problems occur where Javascript isn’t available.

> If you use Typekit, you will have to use their ‘advanced’ script instead.

## The final code
```{.language-markup .language-php .language-javascript}
<?php if ( isset($_COOKIE['full-css']) ) : ?>
  <link href="fonts.css" rel="stylesheet">
  <link href="full.css" rel="stylesheet">
<?php else : ?>
  <style><?php include 'critical.css'; ?></style>
  <script>
    function cookie(e, i, o) { … }
    function loadCSS(a, b, c) { … }

    if( ! cookie( 'full-css' ) ) {
      loadCSS( 'fonts.css' );
      loadCSS( 'full.css' );
      cookie( 'full-css', true, 7 );
    }
  </script>
  <noscript>
    <link href="fonts.css" rel="stylesheet">
    <link href="full.css" rel="stylesheet">
  </noscript>
<?php endif; ?>
```
