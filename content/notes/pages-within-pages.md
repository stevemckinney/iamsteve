---
title: Pages within pages
date: '2026-02-23T20:31:44.073Z'
status: published
summary:
---

A pattern I've noticed is what feels like pages within pages. These seemingly contain a large amount of information expanding upon a section within a page.

I first noticed it with Apple products. The example here builds upon the processor section in more detail.

<Figure imageShadow enlargeable src="/images/notes/pages-within-pages-apple.png" alt="Apple M5 processor section">
<Image src="/images/notes/pages-within-pages-apple.png" alt="Apple M5 processor section" width={3456} height={2068} />
<Figcaption>Apple M5 processor section</Figcaption>
</Figure>

My initial impressions is it's a bit of an app crossover to retain context within the initial page. You can browse a page, expand the detail, return back to where you were.

There's been two "high-profile" examples recently from Stripe and Linear which do similarly.

<div className="flex gap-4">
  <Figure imageShadow enlargeable src="/images/notes/pages-within-pages-linear.png" alt="Linear Intake page">
  <Image src="/images/notes/pages-within-pages-linear.png" alt="Linear Intake page" width={3456} height={2068} />
  <Figcaption>Linear Intake page</Figcaption>
  </Figure>

  <Figure imageShadow enlargeable src="/images/notes/pages-within-pages-stripe.png" alt="Stripe payments information">
  <Image src="/images/notes/pages-within-pages-stripe.png" alt="Stripe payments information" width={3456} height={2068} />
  <Figcaption>Stripe payments information</Figcaption>
  </Figure>
</div>

Pages are striving to be succinct as possible because of attention spans and reality. But there's always the nagging feeling of "I'm not representing this feature as to its full extent as it is". And using this design pattern to expand on things is how it comes to be. I know I've relied on this in more sales focused journeys not wanting to overwhelm the customers.

But this as a pattern feels like it's inspired by Notion and similar apps. You pop in and out of content rows, edit a bit, return to your database. Pages within pages in Notion feel a seamless pattern whether that is a popover or navigating through.

<Figure imageShadow enlargeable src="/images/notes/pages-within-pages-notion.png" alt="Notion's pages within pages — a database row expanding into a page">
<Image src="/images/notes/pages-within-pages-notion.png" alt="Notion's pages within pages — a database row expanding into a page" width={3456} height={2068} />
<Figcaption>Notion's pages within pages — a database row expanding into a page</Figcaption>
</Figure>

I do agree with the sentiment it probably should be a page. However, the behaviour on the web isn’t standardised and there is such an unpredictability in some interactions that it probably doesn’t matter? Who knows whether you’ll go to a new page, open a new window or open a modal. Not that I agree with that, but it’s the reality.

To add to this as well, we have good support for View Transitions and that is blurring the lines between what is and isn’t a page change.
