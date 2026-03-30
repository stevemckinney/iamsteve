---
title: 'Spring cleaning'
date: '2026-03-29T12:00:00.000Z'
status: published
summary: "A roundup of under the hood improvements I've made to the site recently."
---

I’ve made a conscious effort since starting this notes section at the turn of the year to work on some design improvements.

There’s a lot of papercuts, general polish required and and endless list of things to make better as my opinions have evolved since this current design was released in early 2024 and a lot of stuff I just didn’t get to.

## Tailwind v4 and dark mode

At the start of the year I upgraded to v4 of tailwind and added dark mode. This was a bit of an effort over months prior. I’ve purposely kept it simple in regards to not having a theme toggle.

I decided this as I added dark mode to my portfolio with a toggle and it just felt like a faff. And I knew it would be more painful on this website.

So I opted for using `light-dark` and creating a bunch of tokens.

```css title="theme.css" showLineNumbers
--color-heading: light-dark(var(--color-fern-1100), var(--color-fern-0));
--color-body: light-dark(var(--color-fern-1100), var(--color-fern-200));
--color-body-80: light-dark(
  oklch(from var(--color-fern-1100) l c h / 0.8),
  oklch(from var(--color-fern-300) l c h / 0.8)
);
```

A few tokens really carried things quite far in regards to text. But the challenge lay with the ‘surfaces’, anything that had a background. I’ve experimented in the past with a layer kind of approach. I’m not sure I like it totally, but it’s ok for now.

```css title="theme.css" showLineNumbers
--color-canvas-light: var(--color-neutral-01-150);
--color-canvas-dark: var(--color-fern-1300);
--color-canvas: light-dark(var(--color-canvas-light), var(--color-canvas-dark));

--color-surface: light-dark(
  rgb(255 255 255),
  color-mix(in oklch, var(--color-fern-1100), transparent 70%)
);
--color-surface-02: light-dark(
  var(--color-neutral-01-50),
  color-mix(in oklch, var(--color-fern-900), transparent 60%)
);
--color-surface-03: light-dark(
  var(--color-neutral-01-50),
  color-mix(in oklch, var(--color-fern-900), transparent 50%)
);
--color-surface-04: light-dark(
  var(--color-neutral-01-50),
  color-mix(in oklch, var(--color-fern-900), transparent 10%)
);
```

It definitely needs refining further as I have noticed some contradictions, but things are ok.

## Moving to Content Collections

The most significant change was **migrating from Contentlayer to Content Collections**. Contentlayer hasn't been actively maintained for a long time and it’s one of those things in the back of your mind you know is going to break at some point.

I upgraded Next.js to 16.1 but that broke a lot of stuff. I reverted and left it. I’m not sure it was all [Contentlayer](https://github.com/contentlayerdev/contentlayer) but that spurred me to do so. Alongside that, I upgraded Next.js to 16.2 and there’s been no issues.

Previously, I tried to move to [Velite](https://github.com/zce/velite), but that didn’t work mostly due to the way post images are handled. So it’s nice [Content Collections](https://github.com/sdorra/content-collections) was a more like for like replacement.

## Post layout improvements

One of the things that bugged me for a good while was the post layout. I’ve changed things up slightly.

For larger screens you had the table of contents on the right, it’s now on the left. I also managed to get it to feel better when scrolling with scroll driven animations.

```css showLineNumbers
.toc * {
  animation: toc-blur-scroll linear both;
  animation-timeline: view();
}

@keyframes toc-blur-scroll {
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  10%,
  95% {
    filter: blur(0);
    opacity: 1;
  }
  100% {
    filter: blur(24px);
    opacity: 0;
  }
}
```

Scroll driven animations are a real nice addition—which allowed me to blur the contents on entrance and exit at different rates.

Whilst the code is simple, it’s a new concept to get my head around. By setting `animation-timeline` to `view()` it says you want the `@keyframes` to apply based on the visibility of the element whether it’s in `view()`. Essentially, between 10% and 95% of the viewport the element will not be blurred.

It’s cleaned up the code from having a janky masking implementation blurring the scroll bar to something with a more seamless feel.

## Syntax highlighting

I replaced Prism with [Shiki](https://shiki.style/) for syntax highlighting. Initially, I didn’t have the best impression of Shiki because I misunderstood the control you got and how theming worked.

With the help of Claude I was able to move to Shiki and update every code block and improve upon everything I was trying to achieve with Prism previously.

**What’s improved?**

1. Light and dark themes
2. Handling of line numbers with scrolling
3. General code block design (title, line highlighting, copy button, etc.)
4. Additional features like diffing, word highlighting, warnings, etc.
5. Fixed Tailwind's `@theme` directive highlighting

## Notes improvements

The notes section has an improved design. I’ll continue to iterate here but I’m happier with it. I’ve added a couple of unique things to notes like lightbox with zoom panning for touchscreens, a chat bubble component and probably some other stuff.

## Bug fixes

- Fixed mobile nav not closing on route change
- Fixed heading link icon alignment and scroll margin
- Preserved straight quotes in chat blocks by running smartypants before the chat remark plugin
- Quite a few things in regards to maintainability that I overlooked whilst adding a dark mode
