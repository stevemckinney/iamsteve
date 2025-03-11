---
title: "Using srcset with the_post_thumbnail() in Wordpress"
date: "2015-05-26T07:02:00+00:00"
lastmod: "2016-08-28T10:59:45+00:00"
summary: "If you use Wordpress, it’s likely you’ll be familiar with the_post_thumbnail() or one of its variants. In this post I want to provide a way of using srcset with your post thumbnails today. The aim will be to create a similar function, that takes the same parameters and except the output will contain the srcset attribute."
metadesc: "How you can repurpose the_post_thumbnail() to use srcset today in Wordpress. "
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 76
fileroot: "using-srcset-with-the-post-thumbnail-in-wordpress"
---

> If you're looking for an automated way to add srcset to images [Wordpress 4.4](https://codex.wordpress.org/Version_4.4) now supports srcset on generated images.

If you use Wordpress, it’s likely you'll be familiar with `the_post_thumbnail()` or one of its variants. In this post I want to provide a way of using srcset with your post thumbnails today. The aim will be to create a similar function, that takes the same parameters and except the output will contain the srcset attribute.

## Add some image sizes
This step is for reference as to how I have set my image sizes. Also, if you don’t have any set up already, copy and tweak the ones below, as necessary.

```php
add_action( 'after_setup_theme', 'setup_thumbnails' );
function setup_thumbnails() {
  add_image_size( 'image', 240, 240 );
  add_image_size( 'image-2x', 480, 480 );
  add_image_size( 'image-3x', 620, 620 );
}
```

With the code you’re adding an [action](https://codex.wordpress.org/Plugin_API/Action_Reference) to `after_theme_setup` which will make sure the thumbnail sizes in the function below it are correctly applied to each image.

## Setting up the function
After referring to `the_post_thumbnail()` you can create a similar setup in terms of parameters.

```php
function iamsteve_post_thumbnail( $post_id, $size = 'image', $class = '' )
{
  $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), $size )[0];
  $thumbnail_2x = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), $size . '-2x' )[0];
  $thumbnail_3x = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), $size . '-3x' )[0];

  $image  = '<img src="' . $thumbnail . '"';
  $image .= ( $thumbnail_2x && $thumbnail_3x ?  ' srcset="' : '' ); // open srcset
  $image .= ( $thumbnail_2x ? $thumbnail_2x . ' 2x' : '' );
  $image .= ( $thumbnail_2x && $thumbnail_3x ? ', ' : '' );
  $image .= ( $thumbnail_3x ? $thumbnail_3x . ' 3x' : '' );
  $image .= ( $thumbnail_2x && $thumbnail_3x ?  '"' : '' ); // close srcset
  $image .= ( $class ? ' class="' . esc_attr($class) . '"' : '' );
  $image .= ' sizes="auto">';

  return $image;
}
```

The 3 variables you have set up are assigning all of the thumbnails with a suffix of '-2x' or '-3x'.

After that, you create the image and check that you have each of the thumbnails. Then return the necessary markup.

```php
echo iamsteve_post_thumbnail($post->ID, 'image', 'class-name');
```

The usage is similar to other Wordpress functions. The good thing about setting up the variables inside the function, is you can make safe assumptions. As you have set up larger resolution versions in your image sizes. So you only have to pass one image name.

## Using the `w` descriptor
It may be more of a suitable solution for you to use the `w` descriptor. You could change `2x` to `480w` and `3x`  to `620w`.

## Hopefully core accounts for `srcset` soon
I know it's going to be part of Wordpress at some point. As we need solutions now, I have found this to be quite reasonable.

> What are your solutions for solving responsive image problems in Wordpress? It would be great to hear [@irsteve on twitter](https://twitter.com/irsteve)
