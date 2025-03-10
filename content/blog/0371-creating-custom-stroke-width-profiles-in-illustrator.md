---
title: "Creating custom stroke width profiles in Illustrator"
date: "2015-07-14T06:33:00+00:00"
lastmod: "2017-08-19T16:22:46+00:00"
summary: "Illustrator has a fair variety of default width profiles, however you may find yourself wanting to tweak them slightly. In my case I needed to tweak one, for creating some eyelashes. It’s not apparent how to do this. So it makes for a good post to explain for anyone having a similar problem."
metadesc: "How to make your own custom variable width profiles in Illustrator. Handy for adding a stroke to the inside or outside of an unclosed path or hair for brushes."
theme: "#fff5f3"
tags: ["Design"]
categories: ["Design"]
images: ["/images/blog/update-illustrator-stroke-width-featured-image@2x.png"]
large: "/images/blog/update-illustrator-stroke-width-featured-image@2x.png"
medium: "/images/blog/update-illustrator-stroke-width-featured-image-medium@2x.png"
ogImage: "/opengraph-image.png"
status: "open"
id: 371
fileroot: "creating-custom-stroke-width-profiles-in-illustrator"
---

Illustrator has a fair variety of default width profiles; however you may find yourself wanting to tweak them slightly. In my case, I needed to modify one for creating some eyelashes. It’s not apparent how to do this. So it makes for a good post to explain for anyone having a similar problem.

## Draw a line
Select the line tool or press <kbd>\\</kbd> and draw out a line of any width.

## Adjust the stroke width
<figure>
<Image src="/images/blog/illustrator-stroke-width-tool@2x1.png" width={640} height={420} />
<figcaption>
Press <kbd>shift</kbd> <kbd>w</kbd> or select the width tool.
</figcaption>
</figure>

With the width tool, there are a few ways, to interact with it, to adjust the width, of your line.

- Double clicking the path
- Click and drag on the path
- <kbd>alt</kbd> click and drag, to adjust one side of the path

<figure>
<Image src="/images/blog/illustrator-stroke-width-example@2x.png" width={640} height={420} />
<figcaption>
Your line should end up something like this.
</figcaption>
</figure>

## Smoothing the line
Sometimes you may want a smoother line than what the width tool offers from an adjustment. Smoothing can be done by clicking and dragging the original width point you put down.

<div className="article-image">
<Image src="/images/blog/width-smoothing.gif" unoptimized={true}  alt="Dragging the width point along to get a smoother line" width={640} height={420} />
</div>

## Adding it to your presets
<figure>
<Image src="/images/blog/width-adding-preset.gif" unoptimized={true} width={640} height={420} />
<figcaption>
Add the width profile to your presets for later reuse.
</figcaption>
</figure>

To add it to your presets, with your stroke selected. You should see the stroke width in the top control panel, along side that, is the variable width dropdown. Click that and the first of 3 buttons at the bottom, is the add to profiles.

## Flipping the variable width
You can draw a path and change the variable width, and it appears to go against the way you want it.

<figure>
<Image src="/images/blog/flipping.gif" unoptimized={true} width={640} height={420} />
<figcaption>
You can flip the variable width profile on either axis.
</figcaption>
</figure>

To flip the path, you can click stroke in the control panel. Where you are presented with all the stroke options. Towards the bottom, you’ll see profile and a button to the right of it. Click that to flip the path.

## Customising an existing width profile
Customising can be the tricky part, as the presets can be a little awkward to adjust. Some of them have larger amounts of width tool adjustments.

### Highlight the point
<figure>
<Image src="/images/blog/adjust-existing.gif" unoptimized={true} width={640} height={420} />
<figcaption>
Choose your existing width profile. Then highlight the points and you can adjust, remove or add more points as necessary.
</figcaption>
</figure>

### Save and use it
Follow the same process as earlier to save and then you’re able to use it for everything else.

## Stroke the inside or outside of unclosed paths
I feel like this should be easier, as it wasn’t immediately apparent to me. The ability to stroke the inside or outside of an unclosed path. The same techniques mentioned in this post is used, to achieve this.

<div className="article-image">
  <Image src="/images/blog/adjust-width-one-side.png" width={640} height={420} />
</div>

### Steps
- Select the width tool <kbd>shift</kbd> <kbd>w</kbd>
- Double click at one end of the path
- Choose one side and make it 0px
- Double click the other side now and make that 1px
- Save as a width profile
- Apply to your path
- Flip as needed

> There's many ways to manipulate paths with the width tool. Are there any I have missed? Let me know <a href="https://twitter.com/irsteve">@irsteve</a>.
