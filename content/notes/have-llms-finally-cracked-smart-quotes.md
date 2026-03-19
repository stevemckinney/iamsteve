---
title: Have LLM’s finally cracked smart quotes?
date: '2026-03-13T20:38:47.000Z'
status: published
summary: null
---

Spoiler: not in code contexts

When you write in your text editor or messaging app, it will likely change the quote to the correct one and do this for you across the OS. However with the advent of LLM assisted code, writing, etc. they have a habit in my experience of undoing them.

The reason this bugs me moreso than correctness is because smart/curly quotes are more stylised. It’s easy to spot in a design if you use them in larger headings as well as mixed in different blocks of content. If you have multiple people working on a project, some people typing in code, or directly into a CMS, some copy direct from the app, you’ll have a pretty inconsistent experience with quotes used.

You can be well intentioned and try to ensure you have the correct quote, but with LLM’s they work through the document and change them to dumb quotes.

I was writing this post with a different angle but I was using vscode the day before publishing and copilot tried to autocomplete some code I didn’t need and I noticed it had used the correct entity in the content it generated.

So this led me to think have LLM’s finally cracked it? This is by no means conclusive and the use cases are entirely different.

I asked Claude in a couple of situations.

```chat title="Claude app (Opus 4.6)"
R: Can you use ‘’ “” in a sentence
AI: Sure! Here’s a sentence using both single and double quotation marks:
AI: She said, “I think the word ‘serendipity’ is underused.”
AI: In British English, the convention is actually the reverse — single quotes for primary quotations, with double quotes nested inside:
AI: She said, ‘I think the word “serendipity” is underused.’
AI: Both systems work, but the single-outer/double-inner style is the standard British convention. Would you like to know more about when to use each?
```

Opus in app gets it, however, Claude Code and Raycast don’t. Their use cases are very different but considering code is a big way they interact with our code. I wish they treated them the same. Or maybe it’s how the app itself encodes the output or something beyond my comprehension?

```chat title="Claude Code (Opus 4.6)"
R: Can you use ‘’ “” in a sentence
AI: Sure — here's an example using all four curly quote characters:
AI: - Left single quote ( ' ): 'Hello
AI: - Right single quote ( ' ): Hello'
AI: - Left double quote ( " ): "Hello
AI: - Right double quote ( " ): Hello"
AI: In a sentence:
AI: "I've always thought 'curly quotes' look better," she said.
AI: - " opens the outer quote
AI: - I've uses ' (right single) as an apostrophe
AI: - 'curly quotes' uses ' and ' for inner single quotes
AI: - " closes the outer quote
```

## It doesn’t work with AGENTS.md or CLAUDE.md

You could add to either of these docs the guidance on how to use quotes, dashes, ellipsis—down to the specific HTML entities—and it will ignore them in my experience.

## Lint and GitHub action all the things

However, you still need a solution. Thankfully AI can solve its own problem by creating a script and or Github Action relevant to your codebase.
