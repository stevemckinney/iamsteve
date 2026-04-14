---
title: 'Avoid your font face fauxs'
date: '2026-04-14T09:00:00.000Z'
lastmod: '2026-04-14T09:00:00.000Z'
summary: Defining font weights as separate @font-face declarations is outdated and causes faux bold and italic issues. Here’s how to avoid it and do it correctly.
metadesc: "Defining font weights as separate @font-face declarations causes faux bold and italic. Here's how to avoid it with correct font-family grouping, variable fonts, and font-synthesis."
theme: '#fffbf2'
tags: ['Code', 'CSS']
categories: ['Code', 'CSS']
ogImage: '/assets/og/cover.jpg'
status: 'unlisted'
id: 171
fileroot: 'css-tip-avoid-your-font-face-fauxs'
---

A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity nowadays. It’s easy to end up with unsightly double italics or fuzzy bold weights.

As variable fonts become the majority usecase for web type, I predict this will become more of an occurrence as it can be easy to end up with the wrong weight applied.

## What is faux bold or italic?

Well, when you apply a bolder weight, italic style or generally any variation to any font that doesn’t have it available in the browser it will emulate it (in most cases).

I believe it to be most common when you use a font generator and don't correct or change the output. The generator will separate out each weight and style into its own unique font. So you end up with `font-family` rules looking something like the following:

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

This is where an accidental bold (or italic) can trip you up. You have to consider whether user agent styles and defaults throughout the project will have an affect. If you don’t, then once `font-family: “Font Name Bold”` is applied, it becomes a bolder weight. Likewise, with italics, you can end up with a poor oblique or double italics.

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

1. On lower pixel density displays text tends to look blurry
2. The weight doesn’t look as bold as you intended
3. Italics are over exaggerated or jagged
4. Spaces between letters and words seem larger
5. Chromium based browsers tend to ignore, whereas Safari and Firefox are more apparent

Something doesn’t look quite right, is the general summary of these points. Give the codebase a check or look at the inspector to see how things are managed.

Some may argue this is a reasonable tradeoff, but the way that this is treated between browsers can make copy difficult to read. And depending on the typeface you’re using it can distort it moreso than the examples given.

## How to do it the right way™

If you’re self hosting, the right way to define your `@font-face` rules are by keeping the `font-family` name the same and defining the correct `font-weight` and `font-style`, like so:

```css title="simple-font-face.css" showLineNumbers
/* Normal */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2');
}

/* Italic */
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2');
}

/* Bold */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(../path/to/font.woff2) format('woff2');
}
```

Using Inter as an example, there are 3 definitions: two with font weights at 400, but where they differ is their `font-style` for italics. And a bold option.

In the `src` only woff2 is needed&thinsp;&mdash;&thinsp;[browser support is excellent](https://caniuse.com/?search=woff2).

### Variable fonts

If you're using a variable font, a single `@font-face` rule covers the full weight range:

```css title="variable-font-face.css" showLineNumbers
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(../path/to/inter-variable.woff2) format('woff2');
}
```

The `font-weight: 100 900` range tells the browser every weight from thin to black is available in this single file, so there's no reason to synthesise any of them.

## What if I don’t self host and I’m seeing faux styles?

Third party hosting services should give you an option to change the way the font family is structured or delivered. Look for a setting related to how the font family is grouped&thinsp;&mdash;&thinsp;it may be called something different depending on the service, but the goal is the same: each weight and style should share one `font-family` name.

## font-synthesis to the rescue

If you have no choice but to work with font weights declared as new font families due to a legacy codebase or some other reason. Changing `font-synthesis` may be the ideal approach.

Your type may have to look like the following:

```css
/* Normal */
@font-face {
  font-family: ‘Averta’;
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/normal.woff2) format(‘woff2’);
}

/* Bold */
@font-face {
  font-family: ‘Averta Bold’;
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/medium.woff2) format(‘woff2’);
}
```

You could apply `font-synthesis`, which tells the browser not to apply any synthesised styles.

```css
p {
  font-synthesis: none;
}
```

If you need more control, the shorthand accepts individual values. The catch is that the keywords *enable* synthesis for that axis rather than blocking it&thinsp;&mdash;&thinsp;which is counterintuitive. So to allow only style synthesis (blocking weight), you’d write:

```css
p {
  font-synthesis: style;
}
```

And to allow only weight synthesis (blocking style):

```css
p {
  font-synthesis: weight;
}
```
