---
title: 'Avoid your font face fauxs'
date: ‘2026-03-29T12:00:00.000Z’
lastmod: ‘2026-03-29T12:00:00.000Z’
summary: ‘A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity. It’s easy to end up with unsightly double italics or fuzzy bold weights.’
metadesc: ‘How to avoid faux bold and italic on the web. The right way to declare @font-face rules for static and variable fonts, plus font-synthesis as a fallback for legacy codebases.’
theme: '#fffbf2'
tags: ['Code', 'CSS']
categories: ['Code', 'CSS']
ogImage: '/assets/og/cover.jpg'
status: 'closed'
id: 171
fileroot: 'css-tip-avoid-your-font-face-fauxs'
---

A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity nowadays. It’s easy to end up with unsightly double italics or fuzzy bold weights.

As we begin to use more and more variable fonts, this will become more of an occurrence as it can be easy to end up with the wrong weight applied.

## What is faux bold or italic?

Well, when you apply a bolder weight, italic style or generally any variation to any font that doesn’t have it available in the browser it will emulate it (in most cases).

I believe it to be most common when you use a font generator. Generators do this to improve compatibility with older browsers. The generator will separate out each weight and style into its own unique font. So you end up with `font-family` rules looking something like the following:

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

1. Lower pixel density displays text tends to look blurry
2. The weight doesn’t look as bold as you intended
3. Italics are over exaggerated or jagged
4. Spaces between letters and words seem larger
5. Chromium based browsers tend to ignore, whereas Safari and Firefox are more apparent

Something doesn’t look quite right, is the general summary of these points. If your instinct says the type looks off, it probably is. It’s worth popping open DevTools and checking if the rendered `font-weight` or `font-style` doesn’t match what fonts are being loaded.

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

Using Inter as an example, there are 3 definitions two with font weights at 400, but where they differ are their `font-style` for italics. And a bold option.

woff2 has [universal browser support](https://caniuse.com/?search=woff2)—there’s no need to include woff unless you’re targeting very old browsers.

<Blockquote style="afterthought">If you’re wondering why a codebase does it the other way—the separated font family approach was a workaround for IE 8 and earlier, which needed .eot files. Conversion tools like Font Squirrel would split each weight into its own family to improve compatibility. That reasoning hasn’t applied for a long time, but the pattern persists. I’ve noticed it on a lot of websites, which is the main reason for writing this.</Blockquote>

## Variable fonts

With a variable font you define a weight range rather than a single value. This means one `@font-face` rule covers all weights. If the italic is a separate file (as it is with Inter), you need a second rule with `font-style: italic`.

```css title="variable-font-face.css" showLineNumbers
/* Variable font */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(../path/to/inter-variable.woff2) format('woff2');
}

/* Variable font italic (if separate file) */
@font-face {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url(../path/to/inter-variable-italic.woff2) format('woff2');
}
```

## What if I don’t self host?

Most font hosting services have an option to control how weights and styles are delivered. Some will separate each weight into its own font family by default for compatibility reasons. If you’re seeing faux styles and you’re using a hosted service, look for a setting related to how the font family is structured or delivered.

Disabling this will give you the same font-family name across all weights and styles, which is what you want.

## font-synthesis to the rescue

If you have no choice but to work with font weights declared as new font families due to a legacy codebase or some other reason. Changing `font-synthesis` may be the ideal approach.

Your type may have to look like the following:

```css
/* Normal */
@font-face {
  font-family: 'Averta';
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/normal.woff2) format('woff2');
}

/* Bold */
@font-face {
  font-family: 'Averta Bold';
  font-style: normal;
  font-weight: 400;
  src: url(../path/to/medium.woff2) format('woff2');
}
```

You could apply `font-synthesis`. Which tells the browser to not apply any synthesised styles.

```css
p {
  font-synthesis: none;
}
```

This could be heavy-handed as it will remove all synthesised styles including small caps. You can be more specific with the longhand properties:

```css
/* Prevent only faux bold */
p {
  font-synthesis-weight: none;
}

/* Prevent only faux italic */
p {
  font-synthesis-style: none;
}
```

You can also use the shorthand, but the syntax is counterintuitive. The keyword values **enable** synthesis for that axis—they don’t disable it. So `font-synthesis: style` means “allow the browser to synthesise italic, but nothing else.” To prevent only faux bold while allowing faux italic:

```css
p {
  font-synthesis: style;
}
```

The longhand properties are clearer to read and I’d recommend those over the shorthand for this reason.
