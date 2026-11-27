---
name: new-post
description: Start a draft blog post for iamsteve.me. Writes posts/<NNNN>-<slug>.md with the next free post ID and its frontmatter in Steve’s drafts folder, ~/Sites/iamsteve-drafts (the drafts branch), where he writes it in iA Writer and commits it himself. Use when Steve wants to start a blog post rather than a note. To put a draft live, use the publish skill.
argument-hint: '[title]'
allowed-tools: Bash, Read, Write, Edit
---

# Start a post

Drafts live on the `drafts` branch of the site repo, which holds nothing but drafts and never merges into `main`. On the Mac it’s checked out at `~/Sites/iamsteve-drafts`, and Steve writes there in iA Writer on either device. A post draft is `posts/<NNNN>-<slug>.md`, with any images in `posts/images/`. It goes live when he says publish (the `publish` skill).

The repo is public, so a draft is public on GitHub once it’s pushed, though it isn’t on the site.

## 1. Get the details

Take the title from the skill’s arguments or Steve’s message. If there isn’t one, ask for it and stop. Use sentence case and curly quotes (’ “ ”) like the rest of the site, and otherwise keep his wording.

Pick a category from the `title` values in `content/categories.js`: the one he names, or the closest fit for the title. A summary, a metadesc and some rough lines for the body are optional for now; `publish` asks for the summary and metadesc.

## 2. Work out the slug and ID

```bash
git fetch origin
node -e 'console.log(process.argv[1].toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, ""))' '<title>'
node -e '
const sh = (cmd) => require("child_process").execSync(cmd).toString()
const files = sh("git ls-tree -r --name-only origin/main -- content/blog") + sh("git ls-tree -r --name-only origin/drafts -- posts") + sh("ls ~/Sites/iamsteve-drafts/posts 2>/dev/null || true")
const ids = files.split("\n").map((file) => parseInt((file.match(/(?:^|\/)(\d{4})-/) || [])[1]) || 0)
console.log(Math.max(parseInt(sh("git show origin/main:.current-post-id")) || 0, ...ids) + 1)'
```

The last command gives the ID: one past the highest on main and in the drafts, from `.current-post-id` and the filenames together, since the counter has fallen behind before. Pad it to four digits for the filename (`0178`). Another post can take the number while this one’s a draft, so `publish` checks it again.

Then check nothing has the slug already. Each line prints only on a clash; if any do, stop and tell Steve.

```bash
git ls-tree -r --name-only origin/main -- content/blog | grep -E "/[0-9]{4}-<slug>(\.md|/index\.md)$"
git ls-tree -r --name-only origin/drafts -- posts | grep -E "/[0-9]{4}-<slug>\.md$"
ls ~/Sites/iamsteve-drafts/posts 2>/dev/null | grep -E "^[0-9]{4}-<slug>\.md$"
```

If `~/Sites/iamsteve-drafts` isn’t there, stop and give Steve the set-up command from the README’s “Drafts” section.

## 3. Write the file

Get the date with `node -e 'console.log(new Date().toISOString())'`, then write `/Users/steve/Sites/iamsteve-drafts/posts/<NNNN>-<slug>.md` with the Write tool. Leave out `summary` and `metadesc` if there aren’t any yet, and leave the body empty if there are no rough lines. Single quotes match what Prettier writes; double any straight `'` inside a value (`''`).

```markdown
---
title: '<title>'
date: '<ISO date>'
lastmod: '<ISO date>'
summary: '<summary>'
metadesc: '<metadesc>'
theme: '#fcf9f8'
tags: []
categories: ['<category>']
status: draft
codepen: false
twitter: false
id: <id>
fileroot: <slug>
---

<rough lines>
```

Images go in `posts/images/`, named with the padded ID (eg: `0178-<name>-featured-image.svg`). Set `large`, `medium` and `ogImage` to where they’ll be on the site, `/images/blog/<file>`; `publish` moves them into `public/images/blog/`.

Leave git to Steve. He commits and pushes from GitHub Desktop or his phone, as with any edit, and that’s what puts the draft on his other device. If he asks you to push it, commit that one file by name:

```bash
git -C ~/Sites/iamsteve-drafts pull --ff-only
git -C ~/Sites/iamsteve-drafts add posts/<NNNN>-<slug>.md
git -C ~/Sites/iamsteve-drafts commit -m "Start post: <title>"
git -C ~/Sites/iamsteve-drafts push
```

## 4. Preview

Draft posts show at `/blog/drafts/<slug>` with `pnpm dev`, but only from this checkout. To preview one, copy it into `content/blog/` here, and its images into `public/images/blog/`. Delete the copies once Steve’s looked: nothing hides new files in `content/blog/`, so a copy left behind would turn up in his next commit from GitHub Desktop.

## 5. Report

Tell Steve:

- the file to write in, `~/Sites/iamsteve-drafts/posts/<NNNN>-<slug>.md`, and the category you picked, so he can change it
- that it’s only on this Mac until he commits and pushes it, and public on GitHub from then, though not on the site
- that you can preview it whenever he wants
