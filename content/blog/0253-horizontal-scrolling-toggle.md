---
title: "Browse content efficiently with toggling horizontal scrolling"
date: "2016-01-12T07:30:00+00:00"
lastmod: "2021-06-17T06:24:00+00:00"
summary: "I was looking through photos in Finder, and I was finding it frustrating to scan many photos quickly. The problem was down to the horizontal scrolling sections; it is quite quick to flick through but it became tedious. I wanted to see more pictures at once, here’s a solution inspired by Finder."
metadesc: "Allow for the best of both worlds with horizontal scrolling and toggle to vertical layout. Using flexbox this makes layouts easy to adjust."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/opengraph-image.png"
status: "open"
codepen: true
id: 253
fileroot: "horizontal-scrolling-toggle"
---

I was looking through photos in finder, and I was finding it frustrating to scan many photos quickly. The problem was down to the horizontal scrolling sections; it is quite quick to flick through but it became tedious. I wanted to see more pictures at once.

I’ve never really paid attention to the 'show all' button on the top right. In this case, I clicked it, and it gave me the expected view. I figured this would be a good pattern to replicate.

## The result
The technique here uses flexbox for adjustments; it allows us very easily to shift layouts. Equally, it could be done with wider support, but would require more code. I have written about [a technique aimed around navigation using `inline-block` before](/blog/horizontal-scrolling-responsive-menu).

<p data-height="480" data-theme-id="13022" data-slug-hash="qbOaxp" data-default-tab="result" data-user="stevemckinney" className="codepen">See the Pen <a href='http://codepen.io/stevemckinney/pen/qbOaxp/'>Scrolling carousel toggle</a> by Steve (<a href='http://codepen.io/stevemckinney'>@stevemckinney</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Markup
The markup requires the elements you want to scroll to have a containing element. Separate from those elements is our title and a `<span>` element purely for toggling. Inside that is an empty span, which we will use JavaScript to calculate and update.

```markup
<div class="header">
  <h1>Latest posts</h1>
  <span class="show-all" id="show-all">
    Show all
    <span class="show-all-count" id="show-all-count"></span>
  </span>
</div>
<div class="items" id="items">
  <div class="item">
    <img class="item-image" src="http://iamsteve.me/assets/placeholder/1.jpg">
    <h2 class="item-title">Lorem ipsum dolor sit</h2>
    <p class="item-description">Lorem ipsum dolor sit amet. Elit consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
  …
</div>
```
## CSS: Container
This adds flexbox to our container, and the main work here is done with `flex-flow`. Our items mustn’t wrap, then we allow for the element to be scrolled with the additional CSS. The last two lines of CSS are styling preferences you may want to apply too.

```css
.items {
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  /* Styling preference */
  justify-content: space-between;
  padding: 24px; }
```

## CSS: Items
Aside from your visual styling the layout you need is relatively simple. We want our items when horizontal not to adjust in width so that we get the necessary overflow. This is why `flex-grow` and `flex-shrink` are 0, and `flex-basis` is a pixel width. Additionally, the margin is for spacing. I would have liked to have left this up to space-between, but it wasn't possible. Tweak the width and margin as you see necessary.

```css
.item {
  flex: 0 0 280px;
  margin-right: 24px; }
```

## CSS: Items columns
Once we apply the toggled state with JavaScript, we need to adjust the column layout. Changing the `flex-flow` of the container and the necessary `flex` values we can do this. Additionally, for spacing, you may need margin to the bottom of each item, and on the container remove the `padding-right`, so everything lines up accordingly.

```css
.items-columns {
  flex-flow: row wrap;
  padding-right: 0; }

.items-columns .item {
  flex: 1 1 20%;
  margin-bottom: 24px; }
```

## JavaScript
The JavaScript is in two parts. Setting the item count (this is optional) and toggling the scrolling.

To add the item total, you need to select the item container and count the children. Assigning these elements to variables for readability and easy reference. To find the total items, you find the amount of children within the parent. Then add that value and some formatting with `innerText`.

To toggle the layout, you need to listen for clicks on the button and apply a class to the items container. To do this, we assign the button to a variable, then add an event listener. In your function, you toggle class names on both the button and items container.

```javascript
// Select all items
var items = document.getElementById('items');

// Count the children
var count = items.children.length;
var counter = document.getElementById('show-all-count');
// Add the value to the empty span
counter.innerText = ' (' + count + ')';

// Select the show all button
var all = document.getElementById('show-all');

// Add an event listener for clicks on the button
all.addEventListener('click', function() {
  // Toggle an active class for styling
  this.classList.toggle('active');

  // Toggle a class for changing the layout
  items.classList.toggle('items-columns');
});
```

## Use cases
Two use cases that primarily come to mind. Content carousels and navigation.

### Content carousels
Think Netflix, they have a huge library of content across many categories. To display all that vertically make discoverability tough. Being able to scroll down and see category titles quickly and have the ability to view all that content quickly too makes Netflix a good way to browse content.

If the content weren't browsable on both axes, for me to get from ‘Top Picks for Steve’ to ‘Bollywood Films’ would take a very long time. Once I’ve decided a category I want to watch something from; it gets fairly tedious to click through the carousel. **A way of toggling this on a category basis would mean I could see more content in my viewport**.

### Navigation
Horizontal scrolling navigation tends to fall when you need a dropdown menu, or if there are a larger amount of items. It could be used here to allow to show the items vertically or in a different layout that may accommodate submenus better.
