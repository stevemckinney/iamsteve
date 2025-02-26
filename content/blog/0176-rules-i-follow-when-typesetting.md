---
title: Rules I follow when typesetting
date: "2025-02-18T08:37:00.168Z"
lastmod: "2025-02-18T08:37:00.168Z"
summary: I’ve developed some habits over the years when it comes to the display of text in a design with the aim of readability and aesthetic balance. And it feels like it could be useful to document this.
metadesc: I’ve developed some habits over the years when it comes to the display of text in a design with the aim of readability and aesthetic balance. And it feels like it could be useful to document this.
theme: "#f1e8e4"
tags: []
categories: ["Typography","Design"]
images: []
large: "" # /images/blog/rules-i-follow-when-typesetting.svg
medium: "" # /images/blog/rules-i-follow-when-typesetting.svg
ogImage: "/opengraph-image.png"
status: draft
codepen: false
twitter: false
id: 176
fileroot: rules-i-follow-when-typesetting
---

# Rules I follow when typesetting an article
# Rules I follow when typesetting for the web
# A quick guide to typesetting for the web
# Details to think about when typesetting
# Rules I follow when typesetting an article
# Rules for line height in UI and web

When writing or typesetting a design, I have things I follow in terms of creating a good flow to the article or balance within a page. However, I always believe in pragmatism with rules like this as there are things out of your control, like screen size, varying content, etc.

It’s important to aim for the ideal, but not to the detriment of creating something unmaintainable.

1. Line height is proportional to size
2. Letter spacing or tracking is proportional to size
3. Everything is sentence case
4. Everything is left aligned
5. Use the correct type of dash
6. Use the correct quotes
7. When emphasising, highlighting or linking text watch out for punctuation
8. Avoid sentences or punctuating titles where possible
9. Use paragraphs to create help rhythm
10. Avoid orphans and widows
11. Pragmatically hang lists and punctuation

## Line height is proportional
There’s a few things you can use to determine the line height for your type. It’s a balance between your text looking loose or readable.

- Font size
- Line length
- The proportions of the typeface (eg: baseline, cap height, x height)
- Where you’re using the type
- How often this needs to change
- What control over the change you have

For example, in a hero title you can afford to be precise with your line height but where components vary with the text within; you may find challenges.

Each of the items listed can impact your choice of line height.  For larger headings, a line height lower or closer to the font size can be ideal. Whereas paragraphs with a good measure can be around a more comfortable 1.5x the font size.

### Line length
It’s an important to use the length of your copy to determine your line height. The shorter the line length, the smaller the line height. The longer the line length, the larger the line height.

<figure>
<div className="sandbox">
  <div className="flex items-center justify-center group grid grid-cols-1 grid-rows-1">
    <Image src="/images/blog/0176-typesetting-line-height-02.svg" width={800} height={480} className="transition duration-200 ease col-start-1 row-span-1 col-span-1 row-start-1 z-10 relative" alt="" />
    <Image src="/images/blog/0176-typesetting-line-height-01.svg" width={800} height={480} className="transition duration-200 ease group-hover:opacity-0 col-start-1 row-span-1 col-span-1 row-start-1 z-20 relative" alt="" />
  </div>
</div>
<figcaption>Fig 1: </figcaption>
</figure>

This works for large and small type, as a readable measure still applies. It’s a fine balance because with shorter line lengths it can easily look like there’s too much space between each line and throw off your composition. But for longer line lengths if it’s too tight it will be difficult to read.

### Using baseline, cap height and x height
These are the important proportions of a typeface to create balance when creating your text composition. Spacing is applied using the ‘box’ of the type across web and some design tools by default—I’ll get into this and `text-box-trim` shortly.

<figure>
<Image src="/images/blog/0176-typesetting-line-height-03.svg" width={800} height={480} alt="" />
<figcaption>

</figcaption>
</figure>

But first, let’s look at how you apply spacing. Doing so evenly between items will result in an awkward feel to the space because of how this line height works.

Using a combination of baseline, cap-height and x-height to choose your spacing will help create a better balance.

### Understanding the ‘half leading’ of CSS
Half leading[^1] in the browser based world of design means that half of the line height is applied to the top and the bottom of your text box.

<figure>
<Image src="/images/blog/0176-typesetting-line-height-04.svg" width={800} height={480} alt="" />
<figcaption>
There are two examples of text here, a large heading and paragraph. Both have different a line height, which means the half leading is different between the two. The heading uses `0.9` and the paragraph uses `1.5`.
</figcaption>
</figure>

The heading’s box is more flush with the text, as there isn’t anything extra to be applied above and below. And this can change the way your spacing looks if not taken into account.

<figure>
<Image src="/images/blog/0176-typesetting-line-height-05.svg" width={800} height={480} alt="" />
<figcaption>
<Fig>4</Fig> Markers comparing applied spacing values against their optical appearance
</figcaption>
</figure>

This used to be more of an issue in the days where you used Photoshop or Illustrator to design. But as Figma is the industry standard, expectations between designers and developers around spacing are more aligned.

### Removing the half leading
As of writing, the method to remove this through `text-box-trim` is gaining traction in browser support with Safari and Chrome—but it’s not ready.

It’s in Figma and Sketch albeit both have limited control compared to CSS.

This will be more of a thing of the past in the future, but I am curious to see how `text-box-trim` changes how you design.

## Letter spacing or tracking is proportional
Like line height, I don’t think you can apply a simple percentage rule to any typeface and call it a day for every design you do.

<div className="sandbox">
  <div className="flex items-center justify-center group grid grid-cols-1 grid-rows-1">
    <Image src="/images/blog/0176-typesetting-letter-spacing-02.svg" width={800} height={480} className="transition duration-200 ease col-start-1 row-span-1 col-span-1 row-start-1 z-10 relative" alt="" />
    <Image src="/images/blog/0176-typesetting-letter-spacing-01.svg" width={800} height={480} className="transition duration-200 ease group-hover:opacity-0 col-start-1 row-span-1 col-span-1 row-start-1 z-20 relative" alt="" />
  </div>
</div>

<Image src="/images/blog/0176-typesetting-letter-spacing-03.svg" width={800} height={480} alt="" />

It takes a little tweaking depending on the typeface you’re using. Think of a display typeface versus a text typeface. Using them at varying sizes will require different extremes of tracking.

## Everything is sentence case
Everything, whether that is a heading, button, navigation link or whatever else you can think of. It’s sentence case—no exceptions.

It should go without saying but the only exceptions are names or someting important like ’I’.

Sentence case is superior for readability and remembering the system. Is it the first letter or is it a name? Simple. The inconsistency at which people apply title case is enough to oppose it when setting a style guide.

## Everything is left aligned
This is something I feel I always contradict myself with. But like any guidance it doesn’t mean there aren’t exceptions—eg: a hero section.

[img]

Anyway, for the vast majority of your design it should be aligned to the left (or right if your language is right to left).

It means your right side of text has a ragged edge which makes it easy to scan. Especially for articles.

If your composition works better centrally, it must be a small amount of text. You don’t want to be reading large centralised paragraphs. A sentence at most.

## Use the correct type of dash
I’d recently heard a pointer for identifying AI copy was the use of the em dash (—). Which feels unfair, but I see it, AI does like to use them. I hope doesn’t lead to a lack of their use—as I like to use them.

[0176-typesetting-dash]

I do wonder if this comes from the assumption that the judge of the writing assumes the writer doesn’t know how to use them? Which is where I was going with that. And knowing where to use each dash ensures your writing is typographically correct.

### Hyphens (-)
Hyphens are used to join words to create meaning or indicate where a word breaks within a sentence to maintain grammatical correctness.

### En-dash (–)
The name comes from the letter ’n’ as the character tends to be the width of the letter ’n’. But its use is important to understand.

It’s used to indicate a range. It could be a range of numbers, dates or start and end of a destination eg: MAN–LON.

### Em-dash (—)
The name comes from the letter ‘m’ as the character tends to be the width of the letter ‘m’. And in terms of CSS this is where the `em` unit comes from too.

The easiest way I remember how to use an em-dash is as more of a substitute for a commas, parentheses or semicolons.

I see it as a way to break up a sentence. The statement you write in between the dashes should make sense on its own and the sentence should make sense on its own if the statement between the dashes is removed.

I could be wrong here, but that is my understanding.

### Composing sentences with em-dashes
My stylistic preference, when writing a sentence that contains an em-dash it shouldn’t have spaces before and after it. You can use a `&thinsp;` but otherwise no space is preferred.

For example
> Design is not just what it looks like and feels like — design is how it works

> Design is not just what it looks like and feels like—design is how it works

### Keyboard shortcuts
The em and en dash have keyboard shortcuts to access. Hyphen is obvious… but for en-dashes it is

<Shortcut>option -</Shortcut>
<Shortcut>option shift -</Shortcut>

<kbd><kbd>option</kbd><kbd>-</kbd></kbd> and for em-dashes <kbd><kbd>shift</kbd><kbd>option</kbd><kbd>-</kbd></kbd>.

## Use the correct quotes
I’ve put this before in a previous article, but let’s go over it again. There’s straight quotes and curly quotes. Curly quotes are more complementary with your typeface.

[0176-typesetting-quotes]

The best reference for the usage of quotes smartquotesforsmartpeople.com. The shortcuts are fairly simple, but it’s better if you have something to do it automatically for you as it can be easily missed.

**Opening double quote**
<Shortcut>shift option [</Shortcut>

**Closing double quote**
<Shortcut>shift option ]</Shortcut>

**Opening single quote**
<Shortcut>option [</Shortcut>

**Closing single quote**
<Shortcut>option ]</Shortcut>

When dealing with automatic transformation into them. Many apps do this by default. For code, you’ll need to use a library like smartypants.

## When emphasising, highlighting or linking text watch out for punctuation
This is a small detail, but the vast majority of the time and more so with linking you shouldn’t include the full stop.

## Avoid sentences or punctuating titles where possible
I will try to avoid punctuation in a title because it looks messy. I find it’s difficult to apply with consistency. If one title is punctuated it will stand out more when another isn’t.

### Watch out for full stops in centralised titles
It’s something that can optically throw off the balance of your heading. It stands out more on mobile due to the narrower width. *Well I am kind of reaching, but it does stand out optically*.

As a separate line it’s similar to the punctuation, but where you have a central title with a full stop at the end the final line will feel off optically.

## Use paragraphs to create help rhythm
When some things like headings, lists, buttons follow a heading; it can create a sense of awkwardness in an article or design.

Why? For me it’s down to the presence of the thing following the heading. A heading following a heading may not feel right. A button following a heading will likely feel out of place, etc.

[img demo-different-situations]

The spacing flows much better when there is a paragraph to break it up. Your rhythm suffers when there isn’t.

Sometimes you can’t avoid it and it shouldn’t be at the expense of unnatural writing or forcing it but it’s a conscious effort I make.

## Avoid widows
Widows can create some awkwardness in your design. A widow is a single word or short line of text. So where you have greater control over the flow of text in a component you can try to ensure it doesn’t happen.

### CSS text-wrap can handle it
Before text-wrap it would be generally pointless to try cover every possible case of a widow in your design. But now with CSS you have two options to control text wrapping.

```.css
text-wrap: balance
```

`balance` does exactly that it aims to achieve the most balanced layout. Which is ideal for your headings and this works well the majority of the time.

```.css
text-wrap: pretty
```

`pretty` is a bit of a arbitrary word to infer what happens, but it ensures that there isn’t one word left on it’s own. It’s for the use cases where `balance` would be excessive—like lengthier paragraphs.

There is also a performance aspect to it. If you think the browser has to calculate and reflow the text to balance it correctly.

Before `text-wrap` this is something that would have been not so practical to chase in a lot of situations and you’d have had to approach it manually, which is still valuable to know.

### Manual balancing without `<br/>`
Methods for manually balancing titles or keeping word groups together is worth knowing. Sometimes you might find `text-wrap` doesn’t *quite* balance the title the way you want or you need to break a long word.

Don’t reach for `<br/>`. Use `<wbr/>` or `&nbsp;`.

```.html
<h1>Fundamentals of visual&nbsp;design</h1>
<p>Underlying principles and elements<wbr/>that guide effective and visually appealing design.</p>
```

## Hanging lists and punctuation
The aim with hanging punctuation is keeping a clear key line. Overall, it keeps a design neat and the rhythm for the eye easy to follow.

0176-typesetting-hanging-01@2x.png

Depending on your design tool of choice, likely Figma, this is possible.

0176-typesetting-hanging-02@2x.png

### With CSS use hanging-punctuation
To achieve it for all the cases you may require it was a challenge, until `hanging-punctuation` came about.

<figure>
```.css
p {
  hanging-punctuation: none;
  hanging-punctuation: first;
  hanging-punctuation: last;
  hanging-punctuation: allow-end;
}
```
<figcaption>
It’s a [flexible property](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation), you can combine all three values or have one or two.
</figcaption>
</figure>

The browser support is poor as of writing[^3]—but it presents a future with greater control.

Although, I like hanging punctuation for the alignment reason, it can be challenging to always achieve it on smaller screens.

## Ending thoughts
Taking these rules into account, a balanced approach to typesetting improves both readability and visual appeal.  Paying attention to factors like line height, letter spacing, and alignment makes things more intentional and works within the limitations of the typeface.

Keeping in mind the practicality of doing these things ensures your design is maintainable and not introducing more work. However, I have written similarly before with [visual design tips](/blog/visual-design-tips-you-can-apply-immediately) and these posts seem to go down well.

[^1]: [The Thing With Leading in CSS](https://matthiasott.com/notes/the-thing-with-leading-in-css)
[^2]: [CSS text-box-trim](https://developer.chrome.com/blog/css-text-box-trim)
[^3]: [Can I Use hanging-punctuation](https://caniuse.com/?search=hanging)
