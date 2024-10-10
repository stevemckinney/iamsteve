---
title: "Wordpress custom fields"
date: "2015-06-09T06:41:00+00:00"
lastmod: "2016-08-28T10:59:28+00:00"
summary: "I have only recently looked into using the custom meta boxes that come with Wordpress. I’ve been a fan of Advanced Custom Fields for a long time, so it’s something I’ve never had a great urge to use.I’m going share with you over the course of this post how to get them set up. You’ll learn to add them efficiently, how to add custom CSS, change placement to under the title and finally how to use them in your theme."
metadesc: "Learn to add Wordpress Custom Fields efficiently, how to add custom CSS, change placement to under the title and how to use them in your theme."
theme: "#e1f7ee"
tags: ["Code", "Wordpress"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
id: 78
fileroot: "wordpress-custom-fields"
---

I have only recently looked into using the custom meta boxes that come with Wordpress. I've been a fan of [Advanced Custom Fields](http://advancedcustomfields.com) for a long time, so it's something I've never had a great urge to use.

I’m going share with you over the course of this post how to get them set up. You’ll learn to add them efficiently, how to add custom CSS, change placement to under the title and finally how to use them in your theme.

## Introducing the code we’ll be using
All meta boxes are built with `add_meta_box`, which takes 6 parameters. The approach we will be using will build upon this to add them in a more efficient and customisable manner.

```php
add_meta_box( $id, $title, $callback, $screen, $context, $priority, $callback_args );
```

I have used much of the code, what’s set by the references of the [Wordpress Theme Boilerplate](https://github.com/fixate/wordpress-theme-boilerplate/blob/master/inc/wp-admin/metaboxes.php) and [Wordpress Codex](https://codex.wordpress.org/Function_Reference/add_meta_box).

### The code
> Find and replace ‘iamsteve’ with your own prefix.

```php
// Start with an underscore to hide fields from custom fields list
$prefix = '_iamsteve_meta_';

$meta_boxes = array(
  array(
    'id' => 'meta-testimonial',
    'title' => 'Role',
    'pages' => array('jetpack-testimonial'), // multiple post types
    'context' => 'advanced', // 'normal', 'advanced', or 'side'
    'priority' => 'high', // 'high', 'core', 'default' or 'low'
    'fields' => array(
      array(
        'name' => 'Role',
        'desc' => 'This can be a company name or role they fulfilled.',
        'id' => $prefix . 'role',
        'type' => 'text',
        'std' => '',
        'placeholder' => 'Photographer'
    ))
  )
);

foreach ($meta_boxes as $meta_box)
{
  $box = new Iamsteve_Meta_Box($meta_box);
}

class Iamsteve_Meta_Box
{
  protected $_meta_box;

  // Create meta box based on given data
  function __construct( $meta_box ) {
    $this->_meta_box = $meta_box;
    add_action( 'admin_menu', array(&$this, 'add') );
    add_action( 'save_post', array(&$this, 'save') );

    // Add our styles to the places they’re required
    add_action( 'admin_print_styles-post-new.php', array(&$this, 'style'), 11 );
    add_action( 'admin_print_styles-post.php', array(&$this, 'style'), 11 );
  }

  function style()
  {
    wp_enqueue_style('iamsteve-meta-box-style', get_template_directory_uri() . 'css/meta-box.css');
  }

  /// Add meta box for multiple post types
  function add()
  {
    foreach ( $this->_meta_box['pages'] as $page )
    {
      add_meta_box($this->_meta_box['id'], $this->_meta_box['title'], array(&$this, 'show'), $page, $this->_meta_box['context'], $this->_meta_box['priority']);
    }
  }

  // Callback function to show fields in meta box
  function show()
  {
    global $post;

    // Use nonce for verification
    echo '<input type="hidden" name="iamsteve_meta_box_nonce" value="', wp_create_nonce(basename(__FILE__)), '">';

    // Wordpress uses a table based setup for form fields, so following that pattern we will stick to it
    echo '<table class="form-table">';

    foreach ($this->_meta_box['fields'] as $field) {
      // Get current post meta data
      $meta = get_post_meta($post->ID, $field['id'], true);
      echo '<tr>';
      echo '<th class="screen-reader-text"><label for="' . $field['id'] . '">' . $field['name'] . '</label></th>';

      echo '<td>';
        switch ($field['type'])
        {
          case 'text' :
            echo '<input type="text" name="' . $field['id'] . '" id="' . $field['id'] . '" value="' . ( $meta ? $meta : $field['std'] ) . '" size="30">';
            echo '<p><small>' . $field['desc'] . '</small></p>';
            break;

          case 'textarea':
            echo '<textarea name="' . $field['id'] . '" id="' . $field['id'] . '">' . ( $meta ? $meta : $field['std'] ) . '</textarea>';
            echo '<p class="meta-box-description"><small>' . $field['desc'] . '</small></p>';

            break;

          case 'select':
            echo '<select name="' . $field['id'] . '" id="' . $field['id'] . '">';
            foreach ($field['options'] as $option)
            {
              echo '<option value="' . $option['value'] . '"' . ( $meta == $option['value'] ? ' selected="selected"' : '' ) . '>' . $option['name'] . '</option>';
            }
            echo '</select>';
            break;

          case 'radio':
            foreach ($field['options'] as $option)
            {
              echo '<input type="radio" name="' . $field['id'] . '" value="' . $option['value'] . '"' . ( $meta == $option['value'] ? ' checked="checked"' : '' ) . '>' . $option['name'];
            }
            break;

          case 'checkbox':
            echo '<input type="checkbox" name="' . $field['id'] . '" id="' . $field['id'] . '"' . ( $meta ? ' checked="checked"' : '' ) . '>';
            break;
        }
      echo '<td>';

      echo '</tr>';
    }
    echo '</table>';
  }

  // Save data from meta box
  function save($post_id)
  {
    // Verify nonce
    if ( !isset($_POST['iamsteve_meta_box_nonce']) || !wp_verify_nonce($_POST['iamsteve_meta_box_nonce'], basename(__FILE__)) )
    {
      return $post_id;
    }

    // Check autosave
    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE )
    {
      return $post_id;
    }

    // Check permissions
    if ( 'page' == $_POST['post_type'] )
    {
      if ( !current_user_can('edit_page', $post_id) )
      {
        return $post_id;
      }
    }
    else if ( !current_user_can('edit_post', $post_id) )
    {
      return $post_id;
    }

    foreach ( $this->_meta_box['fields'] as $field )
    {
      $old = get_post_meta($post_id, $field['id'], true);
      $new = $_POST[$field['id']];

      if ( $new && $new != $old )
      {
        update_post_meta($post_id, $field['id'], $new);
      }
      elseif ( '' == $new && $old )
      {
        delete_post_meta($post_id, $field['id'], $old);
      }
    }
  }
}
```

### Explanation
Here is an overview of what all the code is doing. Generally if you find yourself getting stuck with the code this should help you.

#### $prefix = '_iamsteve_'
You use a prefix with an underscore at the start as this ensures our fields can’t be used anywhere or conflict potentially. You may have seen this in some themes, where you can select custom fields. It can be really confusing for a user if there is no output from it.

#### $meta_boxes array
The array has a nested array for each meta box you create, which contains the parameters which match up with [`add_meta_box()`](https://codex.wordpress.org/Function_Reference/add_meta_box#Usage).

The important part is the ‘fields’ array. Which relies on the function within the `class` called `show`. This has a `case` statement which checks for which field type is passed. You can adjust this here should you need more field types.

#### The class
Inside the construct you have the code to make sure the fields are setup properly.

Part of the setup uses `admin_menu` hook, to make sure our fields are added through the `add` function. This function does the bulk of the work for displaying the fields. Calling the `show` function,  based on the field we defined in our `$meta_boxes` array.

Another part uses the `save_post` action, which calls save function. This checks for correct [nonce](https://codex.wordpress.org/WordPress_Nonces), permissions and whether it’s a new field or we’re updating an existing field.

The final hooks add your custom CSS, found inside the ‘style’ function. You can replace `wp_enqueue_style` and `echo` some CSS between `<style>` tags, if you only require minimal CSS.

## Moving the meta box under the title
Utilising the ‘advanced’ context, the following code will place them the title. I think this is a good way to utilise the advanced context. You can add this with the rest of your meta box code.

```php
add_action('edit_form_after_title', 'advanced_meta_boxes_under_title');

function advanced_meta_boxes_under_title()
{
  global $post, $wp_meta_boxes;
  do_meta_boxes(get_current_screen(), 'advanced', $post);

  unset($wp_meta_boxes[get_post_type($post)]['advanced']);
}
```
Credit: [Andrew, Wordpress Stack Exchange](http://wordpress.stackexchange.com/questions/36600/how-can-i-put-a-custom-meta-box-above-the-editor-but-below-the-title-section-on)

## Using the fields in your theme
To use the custom fields within your theme, you use the `get_post_meta` function, within your loop.

### get_post_meta takes 3 parameters
- The post ID, inside the loop this is easy to get with `get_the_ID()`
- The field key, in our case this would be the field ID in the array `_iamsteve_meta_role`
- The single parameter, which if set to true will return a single result. Otherwise it will return an array.

```php
$role = get_post_meta( get_the_ID(), '_iamsteve_meta_role', true );

if (have_posts()) :
  while (have_posts()) : the_post();
    if ( ! empty($role) ) echo $role;
  endwhile;
endif;
```

## That’s custom fields
That’s it, there is quite a bit to custom fields. I would like to explore in future posts more detailed uses of setting up the boxes with more complex fields.
