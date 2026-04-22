---
name: get-article-as-markdown
description: Fetch an iamsteve.me blog article or note as plain markdown.
version: 1.0.0
---

# Get article as markdown

Use this skill when you want the source markdown for an article on
[iamsteve.me](https://iamsteve.me) instead of the rendered HTML page.

## When to use

- The user asks you to summarise, quote, or analyse a post.
- You need the article body without site chrome, navigation, or markup.
- You are building a citation, excerpt, or training-style example.

## How it works

The site advertises markdown variants of HTML pages two ways:

1. **Direct API** &mdash; request the markdown route directly.
   - Blog posts: `GET https://iamsteve.me/api/content/{slug}`
   - Notes: `GET https://iamsteve.me/api/content/notes/{slug}`
2. **Content negotiation** &mdash; request the HTML URL with
   `Accept: text/markdown` and the site responds with the markdown variant.

The response uses `Content-Type: text/markdown; charset=utf-8` and includes
YAML frontmatter with title, author, date, description, categories, and the
canonical URL.

## Examples

```bash
# Direct API
curl https://iamsteve.me/api/content/horizontal-scrolling-responsive-menu

# Content negotiation
curl -H "Accept: text/markdown" \
  https://iamsteve.me/blog/horizontal-scrolling-responsive-menu
```

## Discovery

A complete index of available articles is available at
[/llms.txt](https://iamsteve.me/llms.txt) and
[/feed.xml](https://iamsteve.me/feed.xml).
