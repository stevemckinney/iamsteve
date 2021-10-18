---
title: "Add critical CSS with wp_enqueue_scripts"
date: "2015-09-29T06:40:00+00:00"
lastmod: "2016-12-02T12:04:11+00:00"
summary: "Following on nicely from the previous post. One of the things with critical path CSS, is you can’t use wp_enqueue_style. It’s not a huge deal, as the easiest way to get around it is by putting it in your <head> the regular way. Though when you combine that with cookies and <noscript> tags, it can make for quite a messy <head>. Particularly for a Wordpress template, as I have found in the past..In this post I will show you how to avoid this. It’s similar to the way Wordpress recommends you queue your scripts and styles."
metadesc: With wp_enqueue_scripts we're able to add inline CSS instead of including a file, this means we can add our critical CSS through functions.php."
theme: "#e1f7ee"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 94
slug: "add-critical-css-with-wp-enqueue-scripts"
---

Following on [nicely from the previous post]({site_url}blog/entry/setting-a-cookie-with-wordpress). One of the things with critical path CSS, is you can't use `wp_enqueue_style`. It's not a huge deal, as the easiest way to get around it is by putting it in your `<head>` the regular way. Though when you combine that with cookies and `<noscript>` tags, it can make for quite a messy `<head>`. Particularly for a Wordpress template, [as I have found in the past.]({site_url}blog/entry/using-cookies-to-serve-critical-css-for-first-time-visits).

In this post I will show you how to avoid this. It’s similar to the way Wordpress recommends you queue your scripts and styles.

## Set up your cookie
The first thing we need is to make sure our cookie is setup. I’m assuming here you know how to do this, if not I have wrote about [setting up cookies for Wordpress]({site_url}blog/entry/setting-a-cookie-with-wordpress) in detail.

```.language-php
add_action( 'init', 'full_css' );

function full_css()
{
  setcookie('full-css', true, time() + (86400 * 21), '/');
}
```

## Modifying the enqueue setup
It’s possible you’ve already got critical and asynchronous CSS setup, or you’re trying this approach for the first time. What we’re aiming for is all of our CSS and JavaScript to be added to the `wp_enqueue_scripts` hook.

### Enqueuing styles
This function will contain our CSS (and JavaScript, albeit I won’t be discussing it), which are added on the `wp_enqueue_style` hook. **This should be your starting point**. 

```.language-php
function iamsteve_scripts()
{
  wp_enqueue_style(
    'full',
    get_template_directory_uri() . ‘/dist/css/master.css’,
    array(),
    '1.0.0'
  );
}
add_action( 'wp_enqueue_scripts', 'iamsteve_scripts' );
```

> You can find documentation [on the Wordpress Codex](https://codex.wordpress.org/Function_Reference/wp_enqueue_style).

## Setting the cookie and adding our critical CSS
Now you have the basis for your styles and scripts. It’s on to the next step of setting up your cookie, critical CSS, and make sure other CSS is loaded asynchronously.

### Basic setup
Here is your basic setup for checking if the cookie exists.

```.language-php
function iamsteve_scripts()
{
  if ( isset($_COOKIE['full-css']) ) :
    // Enqueue CSS regularly
    wp_enqueue_style(
      'full',
      get_template_directory_uri() . ‘/dist/css/master.css’,
      array(),
      '1.0.0'
    );
  else :
    // Include critical and asynchronous CSS
  endif;
}
add_action( 'wp_enqueue_scripts', 'iamsteve_scripts' );
```

### Include critical CSS and load everything else asynchronously
Here’s where it gets a little messy, but the benefit is this is no longer in your template code.

```{.language-php .code-tall}
function iamsteve_scripts()
{

  $fonts = 'url/of/fonts.css';
  $master = get_template_directory_uri() . '/dist/css/master.css';

  if ( isset($_COOKIE['full-css']) ) :
    wp_enqueue_style(
      'fonts',
      $fonts,
      array(),
      '1.0.0'
    );
    wp_enqueue_style(
      'full',
      $master,
      array(),
      '1.0.0'
    );
  else :
    echo '<style>';
    include get_template_directory() . '/dist/css/critical.css';
    echo '</style>';

    echo '<script>';
    echo 'function loadCSS(a,b,c){ … }';
    echo 'loadCSS("' . $fonts . '");';
    echo 'loadCSS("' . $master . '");';
    echo '</script>';

    echo '<noscript>';
    echo '<link href="' . $fonts . '" rel="stylesheet">';
    echo '<link href="' . $master . '" rel="stylesheet">';
    echo '</noscript>';
  endif;

}
add_action( 'wp_enqueue_scripts', 'iamsteve_scripts' );
```

#### Minor additions
There are a few changes I’ve made. Now we’re in PHP we can add our fonts and CSS to variables, for use in areas it’s repeated.

> You may or may not be able to include your fonts this way. If you’re using typekit I would recommend their ‘advanced’ script.

#### Including critical.css
In the `else` statement you include your critical CSS, using `get_template_directory` instead of `get_template_directory_uri`. This is important as it uses the path, instead of a URL, which can produce errors. This is included between some style tags.

#### Add loadCSS or alternative asynchronous CSS script
Then we echo our asynchronous CSS. I’m using [loadCSS by Filament Group](https://github.com/filamentgroup/loadCSS). I’ve excluded the script for readability here, but you can put it in place of the empty function that’s there already.

#### For when there isn’t JavaScript
Finally our `<noscript>` fallbacks. You can’t be sure if JavaScript will always be available.

## That’s it
This is the most effective way of managing your critical CSS setup for Wordpress, that I have found. It keeps it all together, using the correct Wordpress functions.

However I would like to see a way of inlining CSS in Wordpress. There is `wp_add_inline_style`, but it doesn’t work as intended.