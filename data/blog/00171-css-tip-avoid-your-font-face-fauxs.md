---
title: "CSS tip: avoid your font face fauxs"
date: "2018-10-15T10:28:00+00:00"
lastmod: "2019-12-18T07:57:57+00:00"
summary: "A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity. It’s easy to end up with unsightly double italics or fuzzy bold weights."
metadesc: A blog written by Steve McKinney, focused on designing with Illustrator and writing maintainable CSS."
theme: "#fffbf2"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "draft"
id: 171
slug: "css-tip-avoid-your-font-face-fauxs"
---

A practice to improve web font compatibility in the past was to define your font weights and styles as a new font each time. However, it’s for little gain and increases complexity. It’s easy to end up with unsightly double italics or fuzzy bold weights.

## What is faux bold or italic?
Well, when you apply a bold weight or italic style to any font that doesn’t have it available in the browser it will emulate it (in most cases).

I believe it to be most common when you use a font generator. Generators do this to improve compatibility with older browsers. The generator will separate out each weight and style into it’s own unique font. So you end up with `font-family` rules looking something like the following:

```.language-css
h1 { font-family: “Font Name Bold”; }
h2 { font-family: “Font Name Semibold”; }
h3 { font-family: “Font Name Italic”; }
```

This is where an accidental bold (or italic) can trip you up. You have to consider user agent styles and defaults throughout the project. If you don’t, then once `font-family: “Font Name Bold”` is applied, it becomes a bolder weight. Likewise, with italics, you can end up with a poor oblique or double italics.

On top of that, all of your `<i>`, `<em>`, `<b>`, and `<strong>` rules have to be updated, it’s an all round pain.

## What to look out for?
<figure>
[img real-vs-faux.png]
<figcaption>A couple examples of faux weights & styles. It can be quite subtle, so tricky to notice.</figcaption>
</figure>

1. Lower pixel density displays text tends to look blurry
2. The weight doesn’t look as bold as you intended 
3. Italics are over exaggerated or jagged

Something doesn’t quite look right, is the general summary of these points. Give the codebase a check or look at the inspector to see how things are managed.

## How to do it the right way™
If you’re self hosting, the right way to define your `@font-face` rules are by keeping the `font-family` name the same and defining the correct `font-weight` and `font-style`, like so:

```.language-css
/* Normal */
@font-face {
  font-family: "Averta";
  font-style: normal;
  font-weight: 400;
  src: 
    url(../path/to/font.woff2) format("woff2"),
    url(../path/to/font.woff) format("woff");
}

/* Italic */
@font-face {
  font-family: "Averta";
  font-style: italic;
  font-weight: 400;
  src: 
    url(../path/to/font.woff2) format("woff2"),
    url(../path/to/font.woff) format("woff");
}
```

Using the typeface of this website as an example, both font weights are normal (400), but where they differ are their `font-style`. 

In the `src` only woff and woff2 are used, [this covers a very broad range of browsers](https://caniuse.com/#search=woff). Arguably, you could drop the woff src, as this is necessary to support IE 9.

## What if I don’t self host and I’m seeing faux styles?
Third party hosting services should give you an option to change the way things are setup. This will come under a different name depending on the service. 

Services like Typekit (Adobe Fonts) and cloud.Typography offer this, if you’re looking for the earlier mentioned browser support. 

In both of these services it is turned off by default. So, if it does happen to be on you can disable it.

## What if I have to separate the fonts out
If you have no choice but to have the fonts separated for browser support and you need to ensure it doesn’t happen, the way you can prevent it isn’t too tricky. It requires `!important` that way it’s difficult to ever override.

```.language-css
/* Normal */
@font-face {
  font-family: "Averta";
  font-style: normal;
  font-weight: 400;
  src: /* all sources */;
}

/* Italic */
@font-face {
  font-family: "Averta Italic";
  font-style: italic;
  font-weight: 400;
  src: /* all sources */;
}
```

Sources excluded, as for the only reason you’d want to do this approach is to support IE 8 and that means needing .eot.

## Something to be aware of 
I suspect some of the reasoning behind this is a lack of understanding around font face. I’ve noticed it on quite a lot of websites, hence the main reason for writing this article.

However, I’m sure the majority reason is to get a broad range of browser support. For this reason, I write to encourage you to not. Becuase you’re supporting one extra browser (IE 8) for that frustration, and also limitation in the amount of font weights/styles you can have.

