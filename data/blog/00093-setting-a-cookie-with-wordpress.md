---
title: "Setting a cookie with Wordpress"
date: "2015-09-22T06:40:00+00:00"
lastmod: "2016-08-28T10:51:30+00:00"
summary: "At one point, I was relying on JavaScript for setting the cookie for my critical path CSS. The issue with that is when JavaScript isn’t available the cookie will not be set. Not a huge deal as the website, would still function.When it comes to Wordpress, it’s not as straight forward as using setcookie in your header.php file or another less than ideal location. In this post I will show you how to set a cookie with Wordpress and use it in your code. The method is very similar to the JavaScript method, with a focus on PHP and Wordpress."
metadesc: How to set cookies the right way with Wordpress. I show you how to add the action and use it in your theme."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 93
slug: "setting-a-cookie-with-wordpress"
---

At one point, I was relying on [JavaScript for setting the cookie](http://iamsteve.me/blog/entry/using-cookies-to-serve-critical-css-for-first-time-visits) for my critical path CSS. The issue with that is when JavaScript isn't available the cookie will not be set. Not a huge deal as the website, would still function.

When it comes to Wordpress, it's not as straight forward as using `setcookie` in your header.php file or another less than ideal location. In this post I will show you how to set a cookie with Wordpress and use it in your code. The method is very similar to [the JavaScript method](http://iamsteve.me/blog/entry/using-cookies-to-serve-critical-css-for-first-time-visits), with a focus on PHP and Wordpress.

## Using setcookie() in PHP
`setcookie` takes up to seven parameters, although we will be using four. These are `name`, `value`, `expire` and `path`, in that order.

```php
setcookie('full-css', true, time() + (86400 * 28), '/');
```

### First parameter ‘full-css’
This is the name parameter, it can be anything. You’ll want it to be something memorable and descriptive though.

### Second parameter ‘true’
The value parameter, can be anything also. It’s not too important as we don’t rely on it in code anywhere. It’s just necessary to have a value.

### Third parameter ’time() + (86400 * 28)’
The expire parameter, can be any value in seconds. You should set it to be long enough. 28 days is the equivalent, it is currently.

### Fourth parameter ‘/‘
The [`setcookie`](http://php.net/manual/en/function.setcookie.php) documentation says the path parameter “If set to '/', the cookie will be available within the entire domain.” By default it’s empty, so we need to set it across the domain.
 
## Using the init hook in Wordpress
To set a cookie it's done by adding a call to the init hook. This allows the cookie to be set at the very earliest point.

```php
add_action( 'init', ‘full_css_cookie' );

function full_css_cookie()
{
  setcookie('full-css', true, time() + (86400 * 21), '/');
}
```

> In your functions.php, add these lines of code. 

## Checking the cookie exists
To check whether a cookie exists we must use `isset`. It checks if the cookie is set and isn’t null.

```php
<?php if ( isset($_COOKIE['full-css']) ) : ?>
  …
<?php else : ?>
  …
<?php endif; ?>
```

## Viewing your cookies
Finally, you should always test everything is working. The way that I check if a cookie is being set is by opening developer tools. It depends on what browser you use, but they all share many similarities. So it should be familiar if you're switching between browsers.

### Chrome & Safari
In Chrome and Safari you can find cookies under the ‘Resources’ tab.

<figure>
<Image src="/static/images/blog/safari-cookies.png" width={738} height={492} />
<figcaption>If you need to delete a cookie you can highlight it and press backspace.</figcaption>
</figure>

### In Firefox
In Firefox it’s a little trickier. You need to open developer tools, go into ‘Toolbox Options’ it’s the cog icon third from the right. Then under the heading ‘Default Firefox Developer Tools’ you will find a checkbox for storage. Enable that and the storage tab will be available.

<figure>
<Image src="/static/images/blog/firefox-dev-settings.png" width={738} height={492} />
<figcaption>Firefox developer tools settings</figcaption>
</figure>

<figure>
<Image src="/static/images/blog/firefox-cookies.png" width={738} height={492} />
<figcaption>Now the storage tab is available, it shares similarities of Safari and Chrome</figcaption>
</figure>