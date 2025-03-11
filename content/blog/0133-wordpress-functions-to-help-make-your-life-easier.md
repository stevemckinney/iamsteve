---
title: "Wordpress functions to help make your life easier"
date: "2016-07-05T06:30:00+00:00"
lastmod: "2021-10-17T06:52:39+00:00"
summary: "As part of using Wordpress, and any other part of making a website, for that matter, you acquire reusable parts. As well as discover functions that aren’t shouted about. In this post I’ve shared a few with usage."
metadesc: "A helpful post with useful functions provided by Wordpress for truncation, URL's, how to add excerpts to pages and more."
theme: "#e1f7ee"
tags: ["Code", "Wordpress"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 133
fileroot: "wordpress-functions-to-help-make-your-life-easier"
---

As part of using Wordpress, and any other part of making a website, for that matter, you acquire reusable parts. As well as discover functions that aren’t shouted about. In this post I’ve shared a few with usage.

## Wordpress: wp_trim_words()
I’m fairly certain that one of the most Google’d terms for Wordpress, would be around the truncation of excerpts. I know I have done it multiple times, but Wordpress has it’s own function.

```php
wp_trim_words( $text, $num_words = 55, $more = null ); 
```

It takes three parameters, the text, number of words and what to append to the text should it be trimmed.

```php
$content = wp_trim_words( get_the_content(), 40, '…' ); 
echo $content;
```

## Wordpress: get_template_directory_uri()
Being new or experienced to Wordpress can leave you wondering what’s the best way to get the URL to something? There are a few different ways but the way that never fails, is `get_template_directory_uri()`. Remember that and you’ll be ok.

```php
<img src="<?php echo get_template_directory_uri() ?>/images/logo.svg">
```

## Wordpress: home_url()
Equally if you have a particular URL in mind, but just want to ensure the correct domain is used transitioning between local and live, the `home_url()` function is what you need.

It takes two parameters, the URL and the scheme. Building on the `get_template_directory_uri()` example from before.

```php
<a href="<?php echo home_url(); ?>">
  <img src="<?php echo get_template_directory_uri() ?>/images/logo.svg">
</a>
```

Alternatively, if you wanted to link to a particular page using https.

```php
<a href="<?php echo home_url( 'blog', 'https' ); ?>">Blog</a>
```

Or output the relative URL eg: ‘/blog’.

```php
<a href="<?php echo home_url( 'blog', 'relative' ); ?>">Blog</a>
```

## Wordpress: wpautop()
This is a particularly smart function built into Wordpress, it will add paragraphs round the content passed to it. If the content does contain paragraphs, it won’t. It’s quite handy for excerpts, if they are to span multiple paragraphs or to save you from having to do it manually.

```php
echo wpautop(get_the_excerpt());
```

## Custom: link_to()
This isn’t a Wordpress function by default, but if you’ve ever just wanted to get the page by it’s title (alternatively name). It involves a couple of steps, and this can get quite repetitive and difficult to remember.

```php
function link_to( $title )
{
  return get_page_link( get_page_by_title( $title )->ID );
}
```

It was somewhat inspired by Rails, hence the naming `link_to`. Although it isn’t quite as powerful as the Rails version, it’s still a valuable addition to your Wordpress setup, for when you need to speedily get a link to a page.

```php
echo link_to( 'Contact' );
```

## Custom: add excerpts to pages
Sometimes you’ll want to add an introduction to a page, or have some descriptive text separate from `the_content()`. You can do this for posts with ease, but for pages it’s trickier. You shouldn’t have to set up a custom field of sorts, it should be simpler, which adding excerpts to pages is. **Add both of these functions to functions.php**.

```php
function iamsteve_page_excerpt()
{
    add_post_type_support( 'page', 'excerpt' );
}
add_action( 'init', 'iamsteve_page_excerpt' );
```

After adding support for excerpts, you want to build a function to use it. As mentioned earlier, this is a handy place to use `wpautop()`, for automatic paragraphs.

```php
function get_page_excerpt()
{
  global $post;
  $page_excerpt = get_page( $post->ID )->post_excerpt;

  if ( $page_excerpt )
  {
    return wpautop( $page_excerpt, false );
  }
}
```

The function then uses the global `$post` variable to gain access to the excerpt. This ensures that it will be accessible without needing a loop. Check if it exists, pass that through `wpautop()`, the second parameter can defaults to true to preserve line breaks `<br>`. You may or may not want this.

## That’s it
These are the instances I have found myself Googling a lot for and to know that some of the functionality already exists within Wordpress is helpful. Is there anything you’d add to this list?