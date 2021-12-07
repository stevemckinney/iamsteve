---
title: "Using Wordpress customiser to create editable regions"
date: "2015-06-30T06:40:00+00:00"
lastmod: "2016-08-28T10:58:06+00:00"
summary: "The great thing about the Wordpress customiser, is it allows you to make editable regions throughout your website. Without giving you too much control, but allowing that, real time, visual focus.You could have much of the functionality, I will show, within the admin panel. However, being able to make the edits in real time, makes decision making, easier. Particularly, with how your text or images display."
metadesc: "How to use the Wordpress customiser panel. In this post I will show you how to live edit your text and images with jQuery in Wordpress."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 81
fileroot: "using-wordpress-customiser-to-create-editable-regions"
---

The great thing about the Wordprtess customiser, is it allows you to make editable regions throughout your website. Without giving you too much control, but allowing that, real time, visual focus.

You could have much of the functionality, I will show, within the admin panel. However, being able to make the edits in real time, makes decision making, easier. Particularly, with how your text or images display.

## Customising text and image regions
In this post I'm going to cover text and image customisations. These will be the most common things you will customise. There are others, that’s for another post.

> All code can be dropped into functions.php or a separate file and included in functions.php

## Adding the editable fields
For the majority of your customiser fields, you will need to add three sets of code. Customiser setup code, for storing the values in the database and adding the fields to the customiser panel. JavaScript, which is used to make the live editing happen. Template code, this makes sure the values you update are shown.

### Customiser introduction & setup
Each customiser field, can require use of 3 methods. Two being required, the other for more organisational purposes. Using the example of an about section, you can allow a title, body text and image to be edited.

To begin to start customising, you need to gain access to the `$wp_customize` object. By creating a function, that is then passed to `customize_register` hook.

```php
function iamsteve_customizer( $wp_customize )
{
  // The rest of your code here
}
add_action( 'customize_register', 'iamsteve_customizer' );
```

Then to use each of the customiser methods you must pass them to the `$wp_customize` object.

> All code hereon can be placed within this function.

### Section `$wp_customize->add_section( $id, $args )`
Sections are optional, although recommended, because it will allow you to organise the customiser panel better.

```php
$wp_customize->add_section( 'about', array(
  'title' => __('About', 'iamsteve'),
  'priority' => 1,
  'description' => __('A brief description about myself.') // optional
));
```

The array of arguments you can set a title, priority and optional description. Priority is helpful for setting it to the flow of the page. The lowest number will always appear highest up in the customiser panel.

### Control `$wp_customize->add_control( $id, $args )`
Controls are what get added to the customiser panel to interact with. Here you make the decision, as to what the control will be, eg: text, image, etc. As this post is sticking to text and image, refer to [WP_Customize_Control documentation](https://codex.wordpress.org/Class_Reference/WP_Customize_Control) for more types.

#### Text control
```php
$wp_customize->add_control( 'about_title', array(
  'label'    => __( 'Title', 'iamsteve' ),
  'section'  => 'about',
  'settings' => 'about_title',
  'type'     => 'text'
) );
```

#### Image control
```php
$wp_customize->add_control(
  new WP_Customize_Image_Control(
    $wp_customize,
    'about_image',
    array(
      'label' => __( 'Image', 'iamsteve' ),
      'section' => 'about',
      'settings' => 'about_image'
    )
) );
```

You pass `add_control()` a required ID and array of arguments. By default Wordpress will check if it’s an object. If not it will assume you’re using a standard `WP_Customize_Control`. Hence why in the text control example we don’t have to use `new WP_Customize_Control(…)` within `add_control()`.

In the case of an image you will need to use `WP_Customize_Image_Control` class. This requires you to pass the `$wp_customize` object. Along with the ID and array of arguments like text inputs.

### Setting `$wp_customize->add_setting( $id, $args )`
Settings are what save the data in the database. Each setting needs an ID which matches up to the control. In the case of your `about_title` it would need to match this. Settings also allow you to decide how the setting will behave when edited in the customiser panel, with the `transport` argument.

```php
$wp_customize->add_setting( 'about_title', array(
  'default' => __('About', 'iamsteve'),
  'transport' => 'postMessage'
));
```

While there are [other parameters](https://codex.wordpress.org/Class_Reference/WP_Customize_Manager/add_setting). You know how the default is used, we covered this earlier, I’m going to focus on transport. Transport has two values ‘postMessage’ and ‘refresh’. postMessage should be used if you’re going to use Javascript to update the values live, otherwise use refresh. I’ll cover how to write the Javascript later on in this post.

#### Sanitising data
Really the only field type we need to sanitise in our setup is the textarea. It’s something to be aware of, that you may need to do this. Using the textarea, for our description, the code would be:

```php
$wp_customize->add_setting( 'about_title', array(
  'default' => __('About', 'iamsteve'),
  'transport' => 'postMessage',
  'sanitize_callback' => ’customizer_textarea_sanitizer’
));
```

```php
function customizer_textarea_sanitizer( $text )
{
  return esc_textarea( $text );
}
```

> If you would like to understand data sanitisation better, [the Wordpress codex has details](https://codex.wordpress.org/Validating_Sanitizing_and_Escaping_User_Data).

### Customiser Javascript
The part that makes the customiser really shine, we get to see the values update live and it makes for a really seamless experience in editing your content. The actual amount of Javascript required is quite a small amount for what you’re doing. Wordpress really makes this as simple as it can.

#### Create your Javascript file and enqueue
You may be familiar with how to enqueue Javascript files within Wordpress and this is very similar. Just it uses a different hook. So make a `customizer.js` file and enqueue it with the following code.

```php
function customize_preview_js()
{
  wp_enqueue_script( 'iamsteve_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '1.0', true );
}
add_action( 'customize_preview_init', 'customize_preview_js' );
```

#### Update text
There is a good consistency between the Javascript and PHP sides. You pass the ID and a callback function to the wp.customize function. Inside the function we use jQuery to replace the text.

```javascript
wp.customize( 'about_title', function( value ) {
  value.bind( function( to ) {
    $( '.about-title' ).text( to );
  } );
} );
```

#### Update image
Updating an image is fairly similar. First you need to check if the image no longer exists. Which covers when you first remove it, to add a new one. Then you show it and update the `src`.

```javascript
wp.customize( 'about_image', function( value ) {
  value.bind( function( to ) {
    if( to == '' )
    {
      $('.about img').hide();
    }
    else
    {
      $('.about img').show();
      $('.about img').attr( 'src', to );
    }
  } );
});
```

## Adding the template code
Adding the code to your template is a matter of using `get_theme_mod()`. Which takes two parameters, name and default. Defaults are handy, although if you set a default in your `add_settings()` arguments, this isn’t necessary.

```php
echo get_theme_mod('about_title');
```

### Full usage for our about section
Each type of customiser field, doesn’t require much else outside of using `get_theme_mod()`. Aside from our description, we can use `wpautop()` to add paragraphs.

```php
<h1 class=“about-title”><?php echo get_theme_mod( 'about_title' ); ?></h1>
<img src=“<?php echo get_theme_mod( 'about_image' ); ?>”>
<div class=“about-description”>
  <?php echo wpautop(get_theme_mod( 'about_description' ); ?>
</div>
```

## Putting it all together
From here below I’ve put all the code we will need for completing the your customiser about section.

### PHP (customizer.php)
```php
function customizer_textarea_sanitizer( $text )
{
  return esc_textarea( $text );
}
```

```php
function iamsteve_customizer( $wp_customize )
{
  // Section
  $wp_customize->add_section( 'about', array(
    'title'      => __('About', 'iamsteve'),
    'priority'   => 1
  ) );

  // Setting
  $wp_customize->add_setting( 'about_title', array(
    'default' => __('About', 'iamsteve'),
    'transport' => 'postMessage'
  ) );

  $wp_customize->add_setting( 'about_image', array(
    'default' => get_template_directory_uri() . '/images/me.jpg',
    'transport' => 'postMessage'
  ) );

  $wp_customize->add_setting( 'about_description', array(
    'default' => __('I'm a web designer based in Manchester. I specialise in designing and coding websites.’, 'iamsteve'),
    'sanitize_callback' => 'sanitize_textarea'
  ) );

  // Control
  $wp_customize->add_control( 'about_title', array(
    'label'    => __( 'Title', 'iamsteve' ),
    'section'  => 'about',
    'settings' => 'about_title',
    'type'     => 'text'
  ) );

  $wp_customize->add_control(
    new WP_Customize_Image_Control(
      $wp_customize,
      'about_image',
      array(
        'label'      => __( 'Image', 'iamsteve' ),
        'section'    => 'about',
        'settings'   => 'about_image',
        'context'    => 'about-image'
      )
  ) );

  $wp_customize->add_control( 'about_description', array(
    'label'    => __( 'Description', 'iamsteve' ),
    'section'  => 'about',
    'settings' => 'about_description',
    'type'     => 'textarea'
  ) );
}

add_action( 'customize_register', 'iamsteve_customizer' );
```

### Javascript (customizer.js)
```javascript
( function( $ ) {
  wp.customize( 'about_title', function( value ) {
    value.bind( function( to ) {
      $( '.about h1' ).text( to );
    } );
  } );
  wp.customize( 'about_image', function( value ) {
    value.bind( function( to ) {
      if( to == '' )
      {
        $('.about img').hide();
      }
      else
      {
        $('.about img').show();
        $('.about img').attr( 'src', to );
      }
    } );
  });
  wp.customize( 'about_description', function( value ) {
    value.bind( function( to ) {
      $( '.about .details-content p' ).text( to );
    } );
  } );
} )( jQuery );
```

### Template code
```php
echo '<h1>' . get_theme_mod( 'about_title' ) . '</h1>';
echo '<img src=" . get_theme_mod('about_image') . '">';
echo '<div class="styling-hook">';
  echo wpautop(get_theme_mod( 'about_description' ));
echo '</div>';
```
