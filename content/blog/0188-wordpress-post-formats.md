---
title: "Wordpress post formats"
date: "2011-12-12T19:53:00+00:00"
lastmod: "2021-06-03T14:47:26+00:00"
summary: "A handy feature allowing you to differentiate different post types from others without needing a post type."
metadesc: "How you can use Wordpress post formats to make a tumblr style blog and a plugin to enhance the Wordpress interface for them."
theme: "#fffbf2"
tags: ["Code", "Wordpress"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 188
fileroot: "wordpress_post_formats"
---

I haven't done much Wordpress development as of late, so I was a bit rusty, last time I used it properly was around the release of 3.0. I decided to try out Wordpress again. I discovered post formats, looked into them, found they were like what Tumblr offers. Though I'd got that wrong they have some constraints, so for the time I've been figuring them out and consider this to be one of the best ways to use them.

## Set it up
We need to make sure they're set up, you can include as few or as many as you want, I've included all that Wordpress supports:

```php
add_theme_support('post-formats', array('aside', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video', 'audio'));
```

Place this code in your `functions.php` file. More information about the types can be found in the [codex](http://codex.wordpress.org/Post_Formats "Wordpress codex information on post formats").

## Using the post formats
Detecting a post format is simple, we use `has_post_format('the format')` to give what I ended up with this simplified loop:

```php
<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post();
    if (has_post_format('aside')) {
      get_template_part('loop', 'aside');
    }
    else if(has_post_format('gallery')) {
      get_template_part('loop', 'gallery');
    }
    else if(has_post_format('audio')) {
      get_template_part('loop', 'audio');
    }
    else if(has_post_format('video')) {
      get_template_part('loop', 'video');
    }
    else if(has_post_format('quote')) {
      get_template_part('loop', 'quote');
    }
    else if(has_post_format('status')) {
      get_template_part('loop', 'status');
    }
    else if(has_post_format('chat')) {
      get_template_part('loop', 'chat');
    }
    else if(has_post_format('image')) {
      get_template_part('loop', 'image');
    }
    else if(has_post_format('link')) {
      get_template_part('loop', 'link');
    }
    else if(has_post_format('gallery')) {
      get_template_part('loop', 'gallery');
    }
    else {
      get_template_part('loop', 'standard');
    }
  ?>
<?php endwhile; ?>
```

What I'm doing here is using `get_template_part()` to get my custom layout for each post. It looks for each file named loop-format and includes it. I'm sure there should be a simple way than all those `else if` blocks, but I haven't come across it yet, or a method that works at least.

## After you've set up the loop
I recommend you get the [post formats plugin](https://github.com/crowdfavorite/wp-post-formats "Visit the github page to download it"). It adds a nice UI to make it a little more tumblr like. I also recommend that if you change theme and it doesn't support the plugin you install [post formats fallback plugin](https://github.com/crowdfavorite/wp-post-formats-fallback) this will put all the content into the right field.

<figure>
  <Image src="/images/blog/post_formats_plugin.png" width={703} height={100} />
  <figcaption>The UI added with the plugin</figcaption>
</figure>

## Using the fields from the plugin
The plugin adds several fields throughout to each format on adding a post. This is where you will need to make your custom loops, it's not entirely obvious to begin with how to use the fields, take a look through each of the <a href="https://github.com/crowdfavorite/wp-post-formats/tree/develop/views" title="Code required for each post format">files</a> in the plugin views folder. If you include the piece of code that looks like `<?php echo esc_attr(get_post_meta($post->ID, '_format_link_url', true)); ?>` from each one into your own files. This will output the content for you. Here is an example of one of mine for a link post:

```markup
<article role="article" class="link">
  <?php include('post_header.php'); ?>
    <div class="entry">
      <a href="<?php echo esc_attr(get_post_meta($post->ID, '_format_link_url', true)); ?>"><?php echo esc_attr(get_post_meta($post->ID, '_format_link_url', true)); ?></a>
    </div>
  <?php include('meta.php'); ?>
</article>
```

Obviously you may want some content to follow that and it won't be included just make sure you include your `the_content()` above or below it.

## That's it
I hope this helps, I felt like sharing as these are some of the stumbling blocks I came across with the post formats. I will edit this post as I learn more of utilising them better.
