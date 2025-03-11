---
title: "How to use JSON-LD to replace Microdata with Wordpress"
date: "2016-03-01T07:30:00+00:00"
lastmod: "2017-04-10T11:45:12+00:00"
summary: "Part of the website world is making it more accessible to bots. Be it search, social or a service like Instapaper. The reason we do this is so our content looks more appealing and isn’t left up to them, to scrape text and images they think is best. I’ll be showing you how I have done it recently with JSON-LD."
metadesc: "How to use JSON-LD to add extra information to make your search results appear nicer and more informal."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 259
fileroot: "how-to-use-json-ld-to-replace-microdata-with-wordpress"
---

Part of the website world is making it more accessible to bots. Be it search, social or a service like Instapaper. The reason we do this is so our content looks more appealing and isn't left up to them, to scrape text and images they think is best. I'll be showing you how I have done it recently with JSON-LD.

## What it is
Microdata is the relatively commonplace now (at least in Wordpress themes). However, it requires everyone to be onboard. JSON-LD has benefits over Microdata that I find it easier to implement. It doesn't need class names that sometimes can be difficult to know where to apply or mistakenly remove. The benefit of JSON-LD is it allows you to keep it as a reference all in one place.

Google calls this structured data, helping make your content more machine readable. It allows you to add extra data that may not be directly relevant to the user. Presenting this information on your website itself would make it look rather messy and potentially confuse users.

JSON-LD itself is a relatively new method of adding this structured data. You have RDFA and Microdata that have existed for much longer, and therefore, are more popular. However, I'm confident the simpler approach JSON-LD offers it will gain popularity.

## How you implement it
JSON-LD is placed in your `<head>`, for each type of structured data you place it in a separate `<script>` tag. It's advisable to put them all in a separate function and use the `wp_head` hook to include them.

## What to implement?
It is up to you. There is a structure for almost everything. The ones I will cover will benefit the majority of websites.

- Blog article
- Company
- Website name
- Logo
- Social links
- Site links search box

> You can find all types and more information on [Google’s structured data documentation](https://developers.google.com/structured-data/)

> I would cover breadcrumbs, however, there are lots of cases to cover in Wordpress. If you’re using a different CMS too, the setup can look entirely different. For Wordpress, I would recommend using Yoast SEO for breadcrumbs.

## How to implement
I would recommend taking the snippets you want and modifying logo URLs and thumbnail sizes in particular, then placing them in your `functions.php`. Doing so will keep your `header.php` clean.

## Blog article
If you have a blog, this will be useful as you can provide a lot of data. There are some variables defined that will need your customisation. Paying attention to the action, we only want this on single pages, as some of the information won’t be accessible to other pages.

```php
// Initialise this action
add_action('wp_head', 'json_ld_article');

function json_ld_article()
{
  // Only on single pages
  if ( is_single() )
  {
    // We need access to the post
    global $post;
    setup_postdata($post);

    // Variables
    $logo = get_template_directory_uri() . '/assets/images/logo.png';
    $logo_width = 300;
    $logo_height = 60;
    $excerpt = get_the_excerpt();
    $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full');

    // Open script
    $html = '<script type="application/ld+json">';

      $html .= '{';
        $html .= '"@context": "http://schema.org",';
        $html .= '"@type": "NewsArticle",';

        $html .= '"mainEntityOfPage": {';
          $html .= '"@type":"WebPage",';
          $html .= '"@id": "' . get_the_permalink() . '"';
        $html .= '},';

        $html .= '"headline": "' . get_the_title() . '",';

        if ( $image )
        {
          $html .= '"image": {';
            $html .= '"@type": "ImageObject",';
            $html .= '"url": "' . $image[0] . '",';
            $html .= '"height": ' . $image[1] . ',';
            $html .= '"width": ' . $image[2];
          $html .= '},';
        }

        $html .= '"datePublished": "' . get_the_date('c') . '",';
        $html .= '"dateModified": "' . get_the_modified_date('c') . '",';

        $html .= '"author": {';
          $html .= '"@type": "Person",';
          $html .= '"name": "' . get_the_author() . '"';
        $html .= '},';

        $html .= '"publisher": {';
          $html .= '"@type": "Organization",';
          $html .= '"name": "' . get_bloginfo('name') . '",';
          $html .= '"logo": {';
            $html .= '"@type": "ImageObject",';
            $html .= '"url": "' . $logo . '",';
            $html .= '"width": ' . $logo_width . ',';
            $html .= '"height": ' . $logo_height;
          $html .= '}';
        $html .= '}';

        if ( $excerpt ) $html .= ', "description": "' . esc_attr($excerpt) . '"';
      $html .= '}';

    // Close script
    $html .= '</script>';

    echo $html;
  }
}
```

### Notes
- Images should be at least 696 pixels wide
- Images should be in .jpg, .png, or. gif format
- Everything is required except the description
- mainEntityOfPage is recommended
- dateModified is recommended

## Logo
The logo is simple, your site URL and logo. You could build upon this with making it user editable.

```php
add_action('wp_head', 'json_ld_logo');

function json_ld_logo()
{
  // Open script
  $html = '<script type="application/ld+json">';

    $html .= '{';
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "Person",';
      $html .= '"name": "John Doe",';
      $html .= '"logo": "' . get_template_directory_uri() . '/dist/images/logo.png"';
    $html .= '}';

  // Close script
  $html .= '</script>';

  echo $html;
}
```

## Site links search box
Allow people to search your website directly from Google. This relies on your search form sending it by GET rather than POST. This is a reason I don’t have it on this website, as search is done by POST.

```javascript
add_action('wp_head', 'json_ld_search');

function json_ld_search()
{
  // Open script
  $html = '<script type="application/ld+json">';

    $html .= '{';
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "WebSite",';
      $html .= '"url": "' . home_url() . '",';

      $html .= '"potentialAction": {';
        $html .= '"@type": "SearchAction",';
        $html .= '"target": "' . home_url() . '/?s={search_term_string}",';
        $html .= '"query-input": "required name=search_term_string"';
      $html .= '}';
    $html .= '}';

  // Close script
  $html .= '</script>';

  echo $html;
}
```

## Website name
The website name is particularly handy, as when Google chooses to you can have it shortened. Which is beneficial due to that space being quite limited. Having your company name with the correct capitalisation can make results appear more favourable.

```php
add_action('wp_head', 'json_ld_name');

function json_ld_name()
{
  // Open script
  $html = '<script type="application/ld+json">';

    $html .= '{';
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "WebSite",';
      $html .= '"name": "iamsteve",';
      $html .= '"alternateName": "iamsteve",';
      $html .= '"url": "' . home_url() . '"';
    $html .= '}';

  // Close script
  $html .= '</script>';

  echo $html;
}
```

## Social links
A source for finding all social profiles. `@type` can be Organisation or Person.

```php
add_action('wp_head', 'json_ld_social');

function json_ld_social()
{
  // Open script
  $html = '<script type="application/ld+json">';

    $html .= '{';
      $html .= '"@context" : "http://schema.org",';
      $html .= '"@type" : "Organization",';
      $html .= '"name" : "Your Organization Name",';
      $html .= '"url" : "' . home_url() . '",';
      $html .= '"sameAs" : [';
        $html .= '"https://www.facebook.com/stemckinney",';
        $html .= '"https://www.twitter.com/irsteve",';
        $html .= '"https://plus.google.com/u/0/114129050502065289651"';
        $html .= '"https://youtube.com/user/stvmcknny"';
        $html .= '"https://uk.linkedin.com/in/steve-mckinney-5b5836102"';
      $html .= ']';
    $html .= '}';

  // Close script
  $html .= '</script>';

  echo $html;
}
```

## That’s it
The only downside to this approach is the repetitive nature of them. If you’re going to add social links, then you should be able to combine the website and preferred names with it. As it’s all associated.

There is also many more to explore with this. The approach here I’ve covered those that will be relevant to the majority of people.
