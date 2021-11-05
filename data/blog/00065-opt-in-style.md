---
title: "Opt in style"
date: "2015-03-10T08:00:00+00:00"
lastmod: "2016-08-28T12:52:19+00:00"
summary: "This isn’t a new idea, but it’s something I have been thinking about more. The idea is that you don’t add a base level of styles, eg: all headings will have a margin of x amount. This of course doesn’t rule out things like using normalize.css.I mention margin, because, when building a website, it becomes inconsistent in many areas. It happens, we get used to the way the website looks, and notice inconsistencies less.I intend to overcome this by having a set of reusable classes and targeting trickier areas. Nothing groundbreaking, it just helps you to think more about adding styles."
metadesc: "Why not to add a base level of styles that are defaults for the majority of elements."
theme: "#e9f5f5"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 65
slug: "opt-in-style"
---

This isn’t a new idea, but it’s something I have been thinking about more. The idea is that you don’t add a base level of styles, eg: all headings will have a margin of x amount. This of course *doesn’t rule out* things like using normalize.css.

I mention margin, because, when building a website, it becomes inconsistent in many areas. It happens, we get used to the way the website looks, and notice inconsistencies less.

I intend to overcome this by having a set of reusable classes and targeting trickier areas. Nothing groundbreaking, it just helps you to think more about adding styles.

## Continuing with margins
When opting in to margins, any element that we build into a website should have no margin applied to it. We will add a class as necessary or target the specific area, for CMS content.

### Using headings as an example
We can reset any styles, that won’t be used for the majority of cases.

```css
h1, h2, h3, h4, h5, h6 {
  margin-top: 0; }
```

Then set up some margin classes for reuse later, naming is your choice.

```css
.margin-bottom { 
  margin-bottom: 12px; }
    
.margin-bottom-large {
  margin-bottom: 24px; }
```

I don’t find myself adding more than a few of types of margin bottom. You shouldn’t need too many, as you could be adding to the inconsistency.

### Target specific areas
Headings within articles can have different spacing to other elements on a website. A valid reason to do so for best readability. Applying those across the board, to only undo them in other areas, could mean you change them often.

Confining your styles can be a good way to keep predictability. Especially with areas you can’t go in and add classes.

```css
.entry-content h1,
.entry-content h2 {
  margin-bottom: 24px; }

.entry-content h3 {
  margin-bottom: 12px; }
```

## Using font size as an example
With `<section>` and `<article>` in particular you’re allowed to use many `<h1>` on the page. This is great for creating the correct document outline. You may want some of these to have a different style. If you have added a base set of styling you will have to undo this. For me at least it’s an annoyance.

### Create styles for your headings

```css
.h1 { … }
.h2 { … }
.h3 { … }
.h4 { … }
.h5 { … }
.h6 { … }
```

### Getting specific
Again the issue of CMS content, this would be a good use for Sass `@extend`.

```sass
.entry-content h1 {
  @extend .h1; }
```

Otherwise you could just add the selector to the rule.

```sass
.h1,
.entry-content h1 {
  … }
```
## Finishing thoughts
I was against this idea, as I thought more, it made sense. Both of these examples are common occurrences throughout development. More often than not it’s much simpler to just go in and add a class, than write a new set of rules to undo previous styles. 

### Mixins
Mixins are another thing I'm considering for this approach, this could potentially be the best solution. Though as a standard CSS approach applying a class stops the need for writing additional CSS. A combination of both may work.

### Positives & negatives
Like everything there are positives and negatives. This is more effort, but that’s what I’m aiming for. If there is more effort to apply the spacing, you will think about it more and in turn keep the consistency.

### Forgetting
One issue you’ll have to begin with is remembering. So is it worth it? My response to that is, what if you forget to do the styling? You have a similar problem. The basic style could equally out of place. It's a mindset change initially and if you feel a set of rules repeat for certain elements, combine them and reuse them.