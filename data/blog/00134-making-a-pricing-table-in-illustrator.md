---
title: "Designing a pricing table in Illustrator"
date: "2016-07-12T06:37:00+00:00"
lastmod: "2016-08-28T09:16:47+00:00"
summary: "Pricing tables are reasonably common for various types of services, they serve as a way to give the user an anchor. Generally meaning that you’ll be able to direct the customer into the package the company really wants to sell most of. While this post won’t cover the psychological side of that, it will focus on clarity and visual style. It’s an interesting website element to take a look at, so let’s start."
metadesc: "A tutorial on making a stylish pricing table for your product. You'll choose colour, typefaces and design using many of Illustrator's features."
theme: "#ffede5"
tags: ["Design"]
categories: ["Design"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 134
fileroot: "making-a-pricing-table-in-illustrator"
---

Pricing tables are reasonably common for various types of services, they serve as a way to give the user an anchor. Generally meaning that you’ll be able to direct the customer into the package the company really wants to sell most of. While this post won’t cover the psychological side of that, it will focus on clarity and visual style. It’s an interesting website element to take a look at, so let’s start.

## What you’re making and download
<figure><Image src="/static/images/blog/pricing-table_progress-6.png" className="wide-image" width={1024} height={768} /><figcaption><a href="https://www.dropbox.com/s/a2ukapy2ra9ql84/illustrator-pricing-table-download.ai?dl=0" style={{textDecoration: 'underline' }}>Feel free to download the finished files</a>.</figcaption></figure>

## Choose your content
You may have a real world use, which I would suggest using, but I’m going to use a fictional web hosting service as an example, with developers/designers with the ability to host side projects on different domains.

| Starter | Developer | Business |
|:-|:-:|-:|
| £9/mo | £18/mo | £36/mo |
| Shared | VPS | Dedicated |
| 512mb ram | 4gb ram | 12gb ram |
| 20gb HDD | 40gb SSD | 128gb SSD |
| 200gb bandwidth | 1tb bandwidth | 10tb bandwidth |
| <s>Choice of OS</s> | Choice of OS | Choice of OS |
| <s>Host multiple sites</s> | Host multiple sites | Host multiple sites |
| Order starter | Order developer | Order business |

I’ve added a line through parts of the service that are not available in others. This will be important for clarity later.

## Design decisions
A 3 column layout is a must, so that offers an immediate constraint. The decisions to be made are round highlighting the most important features. All the information is important in the table but the deciding factors would likely be based around price and what type of server.

<Image src="/static/images/blog/pricing-table_sketches.jpg" width={738} height={492} />

Initially I tried a couple of smaller sketches, and decided the name being larger is the best route. This is a common practice simply because price is always a hurdle, an important part, but you don’t want to emphasise it too much. The developer plan will have attention drawn to it through a slightly different size. The reason for this is the intention for it to be the most popular package.

## Choose a typeface
To get into more design choices, through the typeface, I’m going to use Work Sans. It offers good legibility and has a good options at the bolder and lighter ends of the scale.

<figure><Image src="/static/images/blog/pricing-table_example.png" width={738} height={492} /><figcaption>Here’s a quick usage example.</figcaption></figure>

[You can find it on Google Fonts](https://www.google.com/fonts/specimen/Work+Sans), however, [you may like to make your own choice](/blog/how-to-choose-a-typeface-for-paragraphs).

## Choose a colour palette
If you want to [choose your own palette](/blog/colour-series-picking-your-palette), I encourage you to, however this is the one I will be using.

<Image src="/static/images/blog/pricing-table_colour-palette.png" width={738} height={492} />

| Colour | Hex |
|:-|:-|
| Red | #eb6e5e |
| Light yellow | #fff6e5 |
| Dark blue | #1a626e |
| Green | #4db898 |
| Light green | #e1f7ee |

## Position the content
For this particular element it makes sense to get the rough layout defined by type only. This will allow for the sizes of each of the containing rectangles to be determined easily and changed less.

<Image src="/static/images/blog/pricing-table_progress-1.png" className="wide-image" width={1024} height={768} />

Start by typing out in separate type layers, spacing the items and groups, in the following order:

- Title
- Price
- Features
- Button text

## Content styles
The majority of the styles applied will be through using the character panel. This may be open by default, but if not go to `Window > Type > Character` or press <kbd>cmd</kbd> + <kbd>t</kbd>

### Title
For the title of each I have chosen to make them red, as they will be quite relatable for the user and size them appropriately.

### Price
The price doesn’t need to be too emphasised, but it allows you the opportunity to provide some good visual separation, between the title and details.

<Image src="/static/images/blog/pricing-table_small-caps.png" width={738} height={492} />

For now make the value semibold and increase the size to 24px. Next change the ‘/mo’ to small caps keeping that at a regular weight and increasing the font size to 18px.

The small caps in comparison to numbers aren’t very small, hence the choice to decrease the size.

Finally make change the colour to `#4db898`.

### Features
For the features, the server type is the most important factor. With a little knowledge you can immediately work out the quality you’ll get. So to add emphasis here is ideal, increase the weight to semibold.

<Image src="/static/images/blog/pricing-table_leading.png" width={738} height={492} />

Change the colour to `#1a626e` and increase the leading to 32px. This will give sufficient space between each item.

#### Reducing emphasis on features not included
The final step for the features is to have a way to show that they’re not included. For this select in starter the ‘choice of OS’ and ‘Host multiple sites’ and change the colour to `#bed8d8`.

### Button
The button text should be semibold and have a red background. Add a rounded rectangle, select it by finding the rectangle in the toolbar. Click and hold to reveal the extra items.

<Image src="/static/images/blog/pricing-table_button-dimensions.png" width={738} height={492} />

For the ‘Order starter’ dimensions will be 132 width by 42 height. The corner radius will be 4px. Repeat this process for the other buttons, keeping the same height.

#### Button text colour
Finally, as the text colour won’t be very readable on this background colour change it to #fff3f0. It’s not quite white, but a very light shade, this creates a nicer contrast.

## Check in
Now that you’ve applied all the text styles, and a background for the buttons you’re not far from complete.

<Image src="/static/images/blog/pricing-table_progress-2.png" className="wide-image" width={1024} height={768} />

## Making each section clear
In these next steps you’ll make each section clearer. Firstly, select everything and press <kbd>cmd</kbd> + <kbd>g</kbd> and then open the align panel from Window > Align. Next change ‘Align to:’ to Align to Artboard.

<Image src="/static/images/blog/pricing-table_align-window.png" width={738} height={492} />

Align everything to the vertical centre, this sets everything up nicely for later alignment.

### Background
Press <kbd>m</kbd> to select the rectangle tool, click the artboard and draw a rectangle the size of the artboard. Following that cut it <kbd>cmd</kbd> + <kbd>x</kbd>, and paste it in the background <kbd>cmd</kbd> + <kbd>b</kbd>.

Now change the background to `#e1f7ee`. With the layer still selected press <kbd>cmd</kbd> + <kbd>2</kbd>, this should lock the layer. This will ensure you don’t select it later as there is no further changes needed.

### Sectioning
Find the rounded rectangle tool, then click the artboard and add dimensions 266px width by 516px height with a 4px radius.

<Image src="/static/images/blog/pricing-table_progress-3.png" className="wide-image" width={1024} height={768} />

Once in place, press <kbd>cmd</kbd> + <kbd>[</kbd> until it has gone to the back of the text.

#### Alignment
With the shape still selected using the align window from earlier, align it both horizontally and vertically on the artboard.

Things will be a little out of place with the central column, select everything in the central column, and align to the horizontal centre.

#### Add a shadow
<Image src="/static/images/blog/pricing-table_dropshadow-menu.png" width={738} height={492} />

Next with the shape still selected, in the menu go to Effect > Stylize > Drop Shadow.

<Image src="/static/images/blog/pricing-table_dropshadow-settings.png" width={738} height={492} />

With the drop shadow window open, add the following settings:

| Setting | Value |
|:-|:-|
| Mode | Normal |
| Opacity | 40% |
| X Offset | 0 |
| Y Offset | 2px |
| Blur | 12px |
| Color | #4db898 |

#### The shadow colour
When choosing a shadow colour it should take on some of the colour around it. Hence why the shadow is a darker green, if you were to use black, it's less true to how shadows behave. Ideally it would be different colours for the central column, this is something that is for a post of it's own as it's difficult to achieve without multiple layers.

#### Add a different shadow
Copy your original shadow layer, paste it in place with <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd>.

In the appearance panel, which can be found under Window > Appearance, click the drop shadow to modify it. Change the shadow blur to 2px, and move it behind the text layers with <kbd>cmd</kbd> + <kbd>[</kbd>.

#### Group and duplicate the shadows
Select both of the shadow layers and group them with <kbd>cmd</kbd> + <kbd>g</kbd>.

#### Duplicate
<Image src="/static/images/blog/pricing-table_progress-5.png" className="wide-image" width={1024} height={768} />

With the group still selected, paste in place <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd>. Then nudge across until it lines up nicely at the side. Repeat this process again.

#### Resize
Now you should have two rectangles at either side. Select both of them and subtract 24px from their height.

<Image src="/static/images/blog/pricing-table_transform-reference.png" width={738} height={492} />

Making sure your reference point is in the centre, and constrain width and height proportions is off.

#### Send to back and more alignment
Using <kbd>cmd</kbd> + <kbd>[</kbd>, send the two resized rectangles to the back. Now at this stage some alignment may be off, select each column and click the rectangle layer. The line should become bolder, now in the align panel use ‘Horizontal Align Center’.

This is [aligning to a key object]({site_url}/blog/entry/illustrator-quick-tip-align-to-key-object), repeat the process for the other side. Then take each side individually and nudge it in 12px.

## Adding visual separation to the price
<Image src="/static/images/blog/pricing-table_progress-6.png" className="wide-image" width={1024} height={768} />

After getting this far, there is only improving the visual separation of the price. Add a rectangle that is 266px width by 54px height, with the fill colour `#fff6e5`. Place it roughly behind the price, then using the align to key object technique

### Duplicate and align in each section
Copy, paste in place and then position it with the other price. Repeat this process for the third column and you're done.

## Final thoughts
There are ways to build upon this add further dimension to buttons and such things. To keep the tutorial shorter I opted against this.

[Feel free to download the finished files](https://www.dropbox.com/s/a2ukapy2ra9ql84/illustrator-pricing-table-download.ai?dl=0).
