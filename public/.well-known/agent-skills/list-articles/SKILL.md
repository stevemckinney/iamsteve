---
name: list-articles
description: List published iamsteve.me articles and notes for discovery.
version: 1.0.0
---

# List articles

Use this skill when you need to discover what articles and notes are
available on [iamsteve.me](https://iamsteve.me) before fetching any one of
them in full.

## When to use

- The user asks &ldquo;what has Steve written about X?&rdquo;
- You need a list of recent posts to recommend something to read.
- You want to find an article slug before calling
  [`get-article-as-markdown`](../get-article-as-markdown/SKILL.md).

## How it works

Two indexes are published:

- [`/llms.txt`](https://iamsteve.me/llms.txt) &mdash; a curated, LLM-friendly
  list of best and most recent articles, with category links. Plain text.
- [`/feed.xml`](https://iamsteve.me/feed.xml) &mdash; the full RSS feed
  containing the 60 most recent posts and notes with summaries and bodies.

```bash
curl https://iamsteve.me/llms.txt
curl https://iamsteve.me/feed.xml
```

## Notes

Each article slug returned by these indexes can be passed to the
`/api/content/{slug}` endpoint to retrieve the full markdown body.
