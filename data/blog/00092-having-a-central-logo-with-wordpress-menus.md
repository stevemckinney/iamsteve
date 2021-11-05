---
title: "Having a central logo with a Wordpress menu"
date: "2015-09-15T06:38:00+00:00"
lastmod: "2016-08-28T10:52:34+00:00"
summary: "If you’ve ever wanted to place your logo in the centre of your header, between your navigation items, at first it can appear tricky to achieve. You may have been used to an approach that involved setting up, two separate menus, within Wordpress. May you added a link to ‘home’ in between the items in a single menu. Or worse still you used JavaScript to change the position. Each of them have a less than ideal feeling to it. This is where flexbox can really help."
metadesc: "Ever struggled for a clean solution to make your logo central between your navigation items? Here's a solution."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 92
slug: "having-a-central-logo-with-wordpress-menus"
---

At first it can appear tricky to achieve. You may have been used to an approach that involved setting up, two separate menus, within Wordpress. May you added a link to ‘home’ in between the items in a single menu. Or worse still you used JavaScript to change the position. Each of them have a less than ideal feeling to it. This is where flexbox can really help.

## The problem
The problem with each of the methods I mention is they can break. 

### Two menu approach
Having two menus, requires a person to add items, between two menus. This requires you to switch between two menus in the Wordpress admin and add items. Which isn’t efficient. 

### Link to home
Having a link to home in the menu, means you have to find a way to uniquely identify it. This can be adding a class, to the item, in the admin, or another method. This adds uncertainty, as someone could change that class name accidentally. It also rules out using an image for your logo, this could be your preference.

### JavaScript
Finally, JavaScript, I don’t really need to go into this. It’s just not ideal for this situation.

## The solution
The basic idea behind this is using flexbox to change the order 
of our logo.

### Removing the parent elements from the menu
By default Wordpress uses an unordered list for `wp_nav_menu` and also contains that in a div. For the setup we require we need to remove both the `<div>` and `<ul>`. Then add the `<ul>` back ourselves.

```php
$args = array(
  ‘theme_location’  => ‘navigation’,
  ‘container’       => false,
  ‘items_wrap’      => ‘%3$s’,
);
      
echo ‘<ul class=“menu-items”>’;
echo ‘<li class=“menu-item menu-item-logo”><a href=“…” class=“logo”>iamsteve</a></li>’;
wp_nav_menu( $args );
echo ‘</ul>’;
```

The key parts of this are the `container` and `items_wrap` arguments. The `container` is false, so the additional `<div>` is removed. The `items_wrap` is modified to only include the items within the menu. This allows you to add the `<ul>` back yourself and add in your logo.

## Flexbox layout
This depends on how many items you have. Ideally you’ll have an even number of menu items, not including the logo. Then you need to adjust the order.

```css
.menu-items {
  display: flex; }

.menu-item-logo {
  order: 1; }

.menu-item:nth-last-of-type(1),
.menu-item:nth-last-of-type(2) {
  order: 2; }
```

The initial value for order is 0. So with that in mind, if we give the logo a value higher than that, this will move it to the end. Then we select the last items, I’m going off the basis of 5 items, including the logo. So that means 2 need to be selected.

It would require more CSS as a result to use `nth-of-type`, and you would have to select the 2nd and 3rd items as a result of how `nth-of-type` works. It allows for extra clarity when reading the code.

## Final code with prefixes
I purposely kept the code above brief, so it was easier to read. I’ve run the original code through [autoprefixer](https://autoprefixer.github.io/), to get more browser support easily.

```css
.menu-items {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; }

.menu-item-logo {
  -webkit-box-ordinal-group: 2;
  -webkit-order: 1;
  -ms-flex-order: 1;
  order: 1; }

.menu-item:nth-last-of-type(1),
.menu-item:nth-last-of-type(2) {
  -webkit-box-ordinal-group: 3;
  -webkit-order: 2;
  -ms-flex-order: 2;
  order: 2; }
```

## A simple use case for flexbox
This adds to the reasons why flexbox is great. I like this method of reordering, because in the source order, the logo is first. So if there was any reason the CSS didn’t load, the page hierarchy still makes sense. 