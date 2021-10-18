---
title: "Shop filter series: sketching & starting wireframes"
date: "2016-09-13T06:24:00+00:00"
lastmod: "2020-05-12T16:05:41+00:00"
summary: "Filtering is a huge part of online shops, it’s an effective form of navigation. In most cases it’s an area which is overlooked on small screens. I have seen some good implementations and many lack the ease of a larger screen. In this post I want to explore the idea of it being a tab bar, starting with sketching & wireframes."
metadesc: A post that explores the idea of a tab/bottom bar navigation to filter products in a shop and shows you how to design it"
theme: "#fff6e5"
tags: ["Design"]
categories: ["Design"]
images: ["https://iamsteve.me/uploads/blog/shop-tabbar-featured-image.png"]
large: "https://iamsteve.me/uploads/blog/shop-tabbar-featured-image.png"
medium: "https://iamsteve.me/uploads/blog/shop-tabbar-featured-image-medium.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 143
slug: "shop-filter-series-sketching-starting-wireframes"
---

Filtering is a huge part of online shops, it’s an effective form of navigation. In most cases it’s an area which is overlooked on small screens. I have seen some good implementations and many lack the ease of a larger screen. In this post series I want to explore the idea of it being a tab bar, starting with sketching & wireframes.

## Introduction
This post will be using Adobe Illustrator, but it could equally be done in others. You need to consider the most common options a user will need to filter by, but importantly the options to filter within them and presenting them.

This is the first part of this post, you’ll follow the design process, from sketch to wireframe, then onto visual design.

## Skip ahead
Feel free to skip this entirely, if you would like to [download the files and take a look](https://www.dropbox.com/s/2jphcoulgviqtox/shop-filter-01.ai?dl=0).

## Download icons to follow along
I’ve made a set of icons for this post. If you’d like to follow along [you can download the icons](https://www.dropbox.com/s/21r4djfbak0mj27/shop-filter-icons.ai?dl=0). If you’d like to make your own I cover sketching them briefly within the post.

### Designing for a clothing company
You're designing a website for a clothing company and at the stage of designing the small screen version of the shop page. The page where all products are listed, you have a few options to filter down the products. 

**Type, size, brand, price and colour are filters which will allow you to refine your results best**. A convenient way to clear filters needs to be considered also.

## Sketching
With those types in mind and it being a ‘tab bar’ you’ll need to sketch several screens. Icons will be needed to provide a representation of what the filter is, you’ll pair this with text underneath the icon for clarity. 

<img src="/static/images/blog/shop-tabbar-sketch-overview.jpg" srcset="/static/images/blog/shop-tabbar-sketch-overview.jpg 1.5x">

### Sketching icons
The idea with sketching icons is to think of the best representation for that word, which is also the most simplest. Sketch as many ideas as you need to, get all the poor ideas out and see what happens.

<img src="/static/images/blog/shop-tabbar-sketch-focus-icons.jpg" srcset="/static/images/blog/shop-tabbar-sketch-focus-icons.jpg 1.5x">

Each icon is based upon a 24x24px square. As their creation is somewhat out of the scope of this post, [you can download ones I’ve made](https://www.dropbox.com/s/21r4djfbak0mj27/shop-filter-icons.ai?dl=0).

### Sketching layouts
A basic layout to get an idea of what you’re working with. Then going on to sketching each of the potential layouts for the filters and the icons they will need. Some will be trickier than others, such as size, as it’s different for different types of clothing.

For each filter I have selected a layout which occupies space well. Price and colour require different considerations to make them most effective. While size, type and brand will generally retain more list like appearance.

## Wireframing
You’re going to start the process by wireframing everything. This will allow you to focus better on layout, then build up the visual style later.

## Start a new document
First you need to get the basics in place. You need a document with 5 artboards sized 320x568, based upon the smaller iPhone.

<img src="/static/images/blog/shop-tabbar-new-document.png" srcset="/static/images/blog/shop-tabbar-new-document.png 2x">

### Add a background layer
Add a new rectangle by pressing <kbd>m</kbd>. Click the artboard and add the dimensions 320x568, so it fills the artboard and add  the fill colour `#f2f2f0`.

### Make a small grid
Add a new layer in the layers panel and name it ‘grid’. Copy the background layer, and click the grid layer, so it’s selected. Then press <kbd><kbd>cmd</kbd> + <kbd>f</kbd></kbd>, this will paste it in place.

### Reduce the size
With the layer still selected, open the transform panel, which can be found in the menu Window > Transform. 

<img src="/static/images/blog/shop-tabbar-grid-transform.png" srcset="/static/images/blog/shop-tabbar-grid-transform.png 2x">

With a central reference point and constrain proportions unchecked, subtract 48px from the width. The layer should remain selected and be central

### Grid settings
With the layer still selected, in the menu bar go to Object > Path > Split into Grid.
  
<figure>
<img src="/static/images/blog/shop-tabbar-grid-settings.png" srcset="/static/images/blog/shop-tabbar-grid-settings.png 2x">
<figcaption>Add two columns with a 12px gutter.</figcaption>
</figure>

Once you have added those settings, click ok. **Copy those layers, then click the artboard next to it and paste in place** <kbd><kbd>cmd</kbd> + <kbd>f</kbd></kbd>. 

<img src="/static/images/blog/shop-tabbar-paste-in-artboards.gif">

Repeat this process for the other artboards. **Then select all the  grid columns in each artboard and press** <kbd><kbd>cmd</kbd> + <kbd>5</kbd></kbd>.

### Add rectangles for header and filters
Add another two rectangles with the dimensions 320x44, fill them white. Align one to the top and one to bottom of the artboard.

<img src="/static/images/blog/shop-tabbar-progress-1.png" srcset="/static/images/blog/shop-tabbar-progress-1.png 2x">

## Header
The wireframe is now coming together. Using the [icons mentioned earlier](https://www.dropbox.com/s/21r4djfbak0mj27/shop-filter-icons.ai?dl=0), copy the search and menu icons and paste them into the main document.

### Add icons
Select the search icon and drag it to the left side of your guides, and repeat this for the menu icon, except to the right.

### Add a logo
Next add a logo, which needs to be aligned to the horizontal centre of the header.

### Align the icons and logo

<img src="/static/images/blog/shop-tabbar-align-panel.png" srcset="/static/images/blog/shop-tabbar-align-panel.png 2x">

Select the header background, the icons and the logo. Then click the header background again, to [align to a key object](). Next, go to Window > Align to open the align panel. 

<figure><img src="/static/images/blog/shop-tabbar-progress-2.png" srcset="/static/images/blog/shop-tabbar-progress-2.png 2x"><figcaption>You should have something which looks similar to this.</figcaption></figure>

## Add content
Towards the top, make two text layers. One with ‘Shop’ and the other ‘Browsing 84 styles’. With this the filter has an additional indication to show the page has updated.

I have made the title have an 18px font size. The styles counter is has a font size of 12px.  

### Add products
Now to add content in the way of products. Using a rectangle as a placeholder image, adding a title and price to make up a product.

<img src="/static/images/blog/shop-tabbar-progress-3.png" srcset="/static/images/blog/shop-tabbar-progress-3.png 2x">

Adding a 130x160 rectangle <kbd>m</kbd> and below a product title and price. Both the title and price have a 12px font size, with the title being bold.

Select those 3 items and group them together with <kbd><kbd>cmd</kbd> + <kbd>g</kbd></kbd>. Then copy, paste and align an additional three. Taking care to align them within the grid columns and have a consistent space above and below them.

### Making a symbol
At this stage you’ve made the bulk of the reusable layout. Making it into a symbol is a good way to go. Open the symbols panel by going to Window > Symbols.

Then you need to select all the elements except the bottom rectangle for filters. In the Symbols panel you should see the ‘New Symbol’ icon become active.

<img src="/static/images/blog/shop-tabbar-symbol-content.png" srcset="/static/images/blog/shop-tabbar-symbol-content.png 2x">

Click the ‘New Symbol’ icon and enter a name. No other options here are really important.

After clicking ok, this will move everything to the top, move it to the back with <kbd><kbd>cmd</kbd> + <kbd>[</kbd></kbd>.

## Tab bar
Now that the content is completed you can move on to the navigation. 

### Split the rectangle into 5
Select the bottom rectangle, then in the menu go to Object > Path > Split into Grid.

<figure>
<img src="/static/images/blog/shop-tabbar-split-navigation.png" srcset="/static/images/blog/shop-tabbar-split-navigation.png 2x">
<figcaption>Split the rectangle into 5 columns, this now gives a good basis for aligning text and icons.</figcaption>
</figure>

### Icons
As mentioned earlier in the post I’ve made a set of icons for you to download. Or of course you can use your own. 

Place the first 5 icons (including text) into the document nearby the rectangle. It’s not too important where, the alignment process doesn't depend on it. 

### Aligning icons
Making sure each icon and the text are grouped together <kbd><kbd>cmd</kbd> + <kbd>g</kbd></kbd>. 

Select one rectangle and the grouped text and icon. Then click the rectangle again so that the border is thicker, [aligning to the rectangle as the key object]().

<img src="/static/images/blog/shop-tabbar-align-panel.png" srcset="/static/images/blog/shop-tabbar-align-panel.png 2x">

From earlier you should have the align panel open, if not go to Window > Align. Now vertically and horizontally align the icons.

Then taking care to make sure all the text aligns evenly.

### Make it into a symbol
The final step for this part of the tutorial is to make it into a symbol. Making sure it’s dynamic, this will be particularly useful in the next post.

## A good point to leave it
<img src="/static/images/blog/shop-tabbar-progress-4.png" srcset="/static/images/blog/shop-tabbar-progress-4.png 2x">

This is a good point to leave the post, the layout is essentially complete in terms of positioning. In the next post the individual filters will be made.