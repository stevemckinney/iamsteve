---
title: The many frames of product UI
date: '2026-04-25T13:00:00.000Z'
status: published
summary:
---

SaaS products largely look the same irrespective of functionality. They serve a functional purpose, so familiarity drives this. That’s not a dig&thinsp;—&thinsp;it’s just where I’m spending time design wise lately.

However, there are little moments outside of that where you can add your own choice of detail without degrading user experience.

## Sidebar with content variation

You’re likely to be familiar with the sidebar layout and a large content area. And depending on the challenges your product faces, be it multiple workspaces, projects, notifications or profiles it is the effective route.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-01.png" alt="">
<Image src="/images/notes/frames-of-product-ui-01.png" alt="" width={960} height={640} />
<Figcaption>Sidebar and content area divided by contrasting background colour</Figcaption>
</Figure>

This is the most common approach. It keeps things easy to manage from a code point of view as well.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-02.png" alt="">
<Image src="/images/notes/frames-of-product-ui-02.png" alt="" width={960} height={640} />
<Figcaption>Rounded content frame with padding to define the edge</Figcaption>
</Figure>

When I say from a code point of view, this is the variation that trips you up. You have to make the content area scroll, then think about where to undo that for smaller screens.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-03.png" alt="">
<Image src="/images/notes/frames-of-product-ui-03.png" alt="" width={960} height={640} />
<Figcaption>Less defined border with top padding and a rounded top left corner</Figcaption>
</Figure>

A halfway point. But do you keep the top-right corner in view, or let it scroll away?

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-05.png" alt="">
<Image src="/images/notes/frames-of-product-ui-05.png" alt="" width={960} height={640} />
<Figcaption>Relies on borders for hierarchy</Figcaption>
</Figure>

Visually, the variations split between drawing attention away from the sidebar and then adding a stylistic twist to the content. Each comes with their own benefits. And how you approach the scrolling could make it feel more like a ‘desktop app’.

### Multiple workspaces or accounts

Think Slack or Discord&thinsp;—&thinsp;lots of products have ways to manage multiple accounts and workspaces. It’s tricky because it muddies the mental model of managing an account.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-04.png" alt="">
<Image src="/images/notes/frames-of-product-ui-04.png" alt="" width={960} height={640} />
<Figcaption>Icon rail alongside the sidebar</Figcaption>
</Figure>

The icon rail is a solution you’ll be familiar with. It helps to create a clear distinction between different spaces.

## Header with primary navigation

This option isn’t seen too often. Vercel was one of the most prominent products using it until the recent redesign. Now only Laravel products come to my mind with this approach.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-06.png" alt="">
<Image src="/images/notes/frames-of-product-ui-06.png" alt="" width={960} height={640} />
<Figcaption>Header with primary navigation</Figcaption>
</Figure>

I like it in the sense that you don’t end up with nested sidebars when the feature necessitates it. However, this comes at the expense of the working area in the height of the viewport.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-07.png" alt="">
<Image src="/images/notes/frames-of-product-ui-07.png" alt="" width={960} height={640} />
<Figcaption>Settings mode with back button to “app”</Figcaption>
</Figure>

Which is probably why it’s a rarity&thinsp;—&thinsp;a lot of products seem to address the sidebar issue, where it regards “settings”, by entering a mode.

## Tables

Another side to this is how your product deals with tables. Do you go with a contrasting background, add a shadow, keep it flush or add padding? These are all decisions you’ll find yourself weighing up.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-table-01.png" alt="">
<Image src="/images/notes/frames-of-product-ui-table-01.png" alt="" width={960} height={640} />
<Figcaption>Table with a contrasting background</Figcaption>
</Figure>

Having a contrasting background is useful to differentiate the interactive areas. Equally this could be a shadow. I find this one allows you a bit more freedom to change row and header styling.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-table-03.png" alt="">
<Image src="/images/notes/frames-of-product-ui-table-03.png" alt="" width={960} height={640} />
<Figcaption>Flush with content container</Figcaption>
</Figure>

I like this approach as it feels like an app. The challenges come with colour choices, as it can unsettle the balance with your choice of sidebar colour. Technically this feels like a ‘layer’ above the sidebar so choosing a darker colour pushes that back down.

<Figure imageShadow enlargeable src="/images/notes/frames-of-product-ui-table-04.png" alt="">
<Image src="/images/notes/frames-of-product-ui-table-04.png" alt="" width={960} height={640} />
<Figcaption>Alternative contrasting background against header at the top</Figcaption>
</Figure>

Each choice here sets the tone throughout your product, so it’s worth thinking about what you’re committing to. This is by no means exhaustive, but it’s a detail I wanted to take a look at.
