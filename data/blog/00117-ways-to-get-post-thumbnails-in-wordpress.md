---
title: "Ways to get post thumbnails in Wordpress"
date: "2016-03-15T07:30:00+00:00"
lastmod: "2016-08-28T10:00:53+00:00"
summary: "With Wordpress there are a lot of ways to the same thing, for good reason, sometimes you can’t do it one way or the other. This can make it tricky to remember how to do it for each instance. At least this is the case for me. I want to use this post to serve as a guide for each method of doing so. I won’t be covering their parameters, just the necessary steps to retrieve an image."
metadesc: "All the ways to output Wordpress post thumbnails. There are many alternating ways from inside a page, to a custom post type and regular post, find how to get the post thumbnail."
theme: "#e1f7ee"
tags: ["Code", "Wordpress"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 117
fileroot: "ways-to-get-post-thumbnails-in-wordpress"
---

With Wordpress there are a lot of ways to the same thing, for good reason, sometimes you can’t do it one way or the other. This can make it tricky to remember how to do it for each instance. At least this is the case for me. I want to use this post to serve as a guide for each method of doing so. I won’t be covering their parameters, just the necessary steps to retrieve an image.

## Getting the thumbnail
These functions are commonly used during the loop, because with `the_post()` it gives us access. Though they can be used anywhere, in custom loops or custom post types, with a minor change. 

> Everywhere `the_post_thumbnail()` is mentioned it can equally be replaced with `echo get_the_post_thumbnail()`. It depends on your preferences.

### Inside the loop
```php
while ( have_posts() ) : the_post();

  the_post_thumbnail();

endwhile;
```

### Inside a custom post type
Inside a custom post type is very much like the loop, however, we have to call `the_post()` on the `WP_Query` object.

```php
$custom_post_type = new WP_Query( array(
  'post_type'      => 'portfolio',
  'post_status'    => 'publish',
  'posts_per_page' => -1,
) );

while ( $custom_post_type->have_posts() ) : $custom_post_type->the_post();

  the_post_thumbnail();
  
endwhile;
```

## Getting the thumbnail URL
Sometimes you may want to get the image src to use it for an inline style. You have access to an array which will return the URL, width, and height.

> Everywhere `the_post_thumbnail()` is mentioned it can equally be replaced with `echo get_the_post_thumbnail()`. It depends on your preferences.

### Inside the loop
```php
while ( have_posts() ) : the_post();

  the_post_thumbnail_url();

endwhile;
```

### Inside custom post type
Very similar, again, we need to make sure we set up the template tags.

```php
$custom_post_type = new WP_Query( array(
  'post_type'      => 'portfolio',
  'post_status'    => 'publish',
  'posts_per_page' => -1,
) );

while ( $custom_post_type->have_posts() ) : $custom_post_type->the_post();
  
  the_post_thumbnail_url();
  
endwhile;
```

## Without using helper functions
Setting up the post template tags is much more convenient, however, for completeness you can do it without those. However, it does give you access to a few more attributes this way.

### The loop
```php
while ( have_posts() ) : the_post();

  $image = wp_get_attachment_image_src($post_id);
  $image_url = $image[0];
  $image_width = $image[1];
  $image_height = $image[2];
  
endwhile;
```

### Custom post type
```php
$custom_post_type = new WP_Query( array(
  'post_type'      => 'portfolio',
  'post_status'    => 'publish',
  'posts_per_page' => -1,
) );

while ( $custom_post_type->have_posts() ) : $custom_post_type->the_post();

  $image = wp_get_attachment_image_src($custom_post_type->ID);
  $image_url = $image[0];
  $image_width = $image[1];
  $image_height = $image[2];
  
endwhile;
```

## Inside functions.php or outside of a loop
Outside of a loop we don’t have access to `the_post()`. So using `setup_postdata()` is a close equivalent of doing that. Which gives us access to the template tag functions. You won’t need to do this frequently, but it is handy for certain situations.

### Custom function for use in single posts
```php
function custom_post_thumbnail()
{
  global $post;
  setup_postdata($post);

  the_post_thumbnail();
}
```

### Usage
It can then be used like any other function in your template, in or out of the loop.

```php
custom_post_thumbnail();
```

You could also add an action to your template.

#### In single.php or another template
```php
do_action('before_single_post_loop');

while ( have_posts() ) : the_post();

  // Post content

endwhile;
```

#### Addition to custom function
```php
function custom_post_thumbnail()
{
  global $post;
  setup_postdata($post);

  the_post_thumbnail();
}

add_action('before_single_post_loop', 'custom_post_thumbnail');
```

## That's it
These are all the ways that I've come across to add a post thumbnail. Are there any I have forgot? [Let me know on twitter](https://twitter.com/irsteve).
