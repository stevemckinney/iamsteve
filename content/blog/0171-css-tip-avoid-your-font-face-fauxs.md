---
title: 'Avoid your font face fauxs'
date: '2024-02-19T08:11:37.767Z'
lastmod: '2019-12-18T07:57:57+00:00'
summary: 'A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity. It’s easy to end up with unsightly double italics or fuzzy bold weights.'
metadesc: 'A blog written by Steve McKinney, focused on designing with Illustrator and writing maintainable CSS.'
theme: '#fffbf2'
tags: ['Code', 'CSS']
categories: ['Code', 'CSS']
ogImage: '/assets/og/cover.jpg'
status: 'closed'
id: 171
fileroot: 'css-tip-avoid-your-font-face-fauxs'
---

A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity. It’s easy to end up with unsightly double italics or fuzzy bold weights.

As begin to use more and more variable fonts, this will become more of an occurrence as it’s just as easy to end up with the wrong weight.

## What is faux bold or italic?
Well, when you apply a bolder weight, italic style or generally any variation to any font that doesn’t have it available in the browser it will emulate it (in most cases).

I believe it to be most common when you use a font generator. Generators do this to improve compatibility with older browsers. The generator will separate out each weight and style into it’s own unique font. So you end up with `font-family` rules looking something like the following:

```css
h1 {
  font-family: “Font Name Bold”;
}

h2 {
  font-family: “Font Name Semibold”;
}

h3 {
  font-family: “Font Name Italic”;
}
```

This is where an accidental bold (or italic) can trip you up. You have to consider user agent styles and defaults throughout the project. If you don’t, then once `font-family: “Font Name Bold”` is applied, it becomes a bolder weight. Likewise, with italics, you can end up with a poor oblique or double italics.

On top of that, all of your `<i>`, `<em>`, `<b>`, and `<strong>` rules have to be updated, it’s an all round pain.

## What to look out for?

<figure>
<div className="sandbox">
  <div className="flex flex-col gap-4 p-[7.5vi]">
    <div className="text-left">
      <span className="font-extrabold font-variation-extrabold font-display text-7xl leading-7xl block">Roc Grotesk</span>
      <span className="font-ui text-ui-body block">Faux bold</span>
    </div>
    <div className="text-left">
      <span className="font-variation-extrabold font-display text-7xl leading-7xl block">Roc Grotesk</span>
      <span className="font-ui text-ui-body block">Regular bold</span>
    </div>
  </div>
</div>
<figcaption>A couple examples of faux weights & styles. It can be quite subtle, so tricky to notice depending on the browser you’re using.</figcaption>
</figure>

1. Lower pixel density displays text tends to look blurry
2. The weight doesn’t look as bold as you intended
3. Italics are over exaggerated or jagged
4. Spaces between letters and words seem larger
5. Chromium based browsers tend to ignore, whereas Safari and Firefox are more apparent

Something doesn’t look quite look right, is the general summary of these points. Give the codebase a check or look at the inspector to see how things are managed.

Some may argue this is a reasonable tradeoff, but the way that this is treated between browsers can make copy difficult to read. And depending on the typeface you’re using it can distort it moreso than the examples given.

## How to do it the right way™

If you’re self hosting, the right way to define your `@font-face` rules are by keeping the `font-family` name the same and defining the correct `font-weight` and `font-style`, like so:

```css:simple-font-face.css showLineNumbers
/* Normal */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2'), url(../path/to/font.woff)
      format('woff');
}

/* Italic */
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2'), url(../path/to/font.woff)
      format('woff');
}

/* Bold */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2'), url(../path/to/font.woff)
      format('woff');
}
```

Using the Inter as an example, there are 3 definitions two with font weights at 400, but where they differ are their `font-style` for italics. And a bold option.

In the `src` only woff and woff2 are used, [this covers a very broad range of browsers](https://caniuse.com/#search=woff). Arguably, you could drop the woff src, as this is necessary to support IE 9.

## What if I don’t self host and I’m seeing faux styles?

Third party hosting services should give you an option to change the way things are setup. This will come under a different name depending on the service.

Services like Typekit (Adobe Fonts) and cloud.Typography offer this, if you’re looking for the earlier mentioned browser support.

In both of these services it is turned off by default. So, if it does happen to be on you can disable it.

## font-synthesis to the rescue

If you have no choice but to work with font weights declared as new font families due to a legacy codebase or some other reason. Changing `font-synthesis` may be the ideal approach.

Your type may have to look like the following:

```css
/* Normal */
@font-face {
  font-family: 'Averta';
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/normal.woff2) format('woff2'), url(../path/to/normal.woff)
      format('woff');
}

/* Bold */
@font-face {
  font-family: 'Averta Bold';
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/medium.woff2) format('woff2'), url(../path/to/medium.woff)
      format('woff');
}
```

You could apply `font-synthesis`. Which tells the browser to not apply any synthesised styles by the browser.

```css
p {
  font-synthesis: none;
}
```

I had this article in my drafts for a long time and the only reason I could find to do this was supporting IE 8 and that means needing .eot. Which no one should have to do in 2024.

## Something to be aware of

I suspect some of the reasoning behind this is a lack of understanding around font face. I’ve noticed it on quite a lot of websites, hence the main reason for writing this article.

However, I’m sure the majority reason is to get a broad range of browser support. For this reason, I write to encourage you to not. Becuase you’re supporting one extra browser (IE 8) for that frustration, and also limitation in the amount of font weights/styles you can have.
