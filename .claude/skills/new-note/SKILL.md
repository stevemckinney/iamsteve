---
name: new-note
description: Start a draft note for iamsteve.me. Writes notes/<slug>.md with its frontmatter in Steve’s drafts folder, ~/Sites/iamsteve-drafts (the drafts branch), where he writes it in iA Writer and commits it himself. Use when Steve wants to start, write or jot down a note. To put a draft live, use the publish skill.
argument-hint: '[title]'
allowed-tools: Bash, Read, Write, Edit
---

# Start a note

Drafts live on the `drafts` branch of the site repo, which holds nothing but drafts and never merges into `main`. On the Mac it’s checked out at `~/Sites/iamsteve-drafts`, and Steve writes there in iA Writer on either device. A note draft is one file, `notes/<slug>.md`. It goes live when he says publish (the `publish` skill).

The repo is public, so a draft is public on GitHub once it’s pushed, though it isn’t on the site.

## 1. Get the details

Take the title from the skill’s arguments or Steve’s message. If there isn’t one, ask for it and stop. Use sentence case and curly quotes (’ “ ”) like the rest of the site, and otherwise keep his wording.

A summary and some rough lines for the body are optional. Use them only if he gives them.

## 2. Work out the slug

This is the rule `scripts/process-notes.js` uses. The Process notes action renames any note whose filename doesn’t match its title, so the two have to agree.

```bash
node -e 'console.log(process.argv[1].toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, ""))' '<title>'
```

Then check nothing has the slug already. Each line prints only on a clash; if any do, stop and tell Steve.

```bash
git fetch origin
git cat-file -e "origin/main:content/notes/<slug>.md" 2>/dev/null && echo "A note with this slug is live"
git cat-file -e "origin/drafts:notes/<slug>.md" 2>/dev/null && echo "A draft with this slug is on the drafts branch"
test -e ~/Sites/iamsteve-drafts/notes/<slug>.md && echo "A draft with this slug is in the drafts folder"
```

If `~/Sites/iamsteve-drafts` isn’t there, stop and give Steve the set-up command from the README’s “Drafts” section.

## 3. Write the file

Get the date with `node -e 'console.log(new Date().toISOString())'`, then write `/Users/steve/Sites/iamsteve-drafts/notes/<slug>.md` with the Write tool. Leave out `summary` if there isn’t one, and leave the body empty if there are no rough lines. Single quotes match what Prettier writes; double any straight `'` inside a value (`''`).

```markdown
---
title: '<title>'
date: '<ISO date>'
status: draft
summary: '<summary>'
---

<rough lines>
```

Leave git to Steve. He commits and pushes from GitHub Desktop or his phone, as with any edit, and that’s what puts the draft on his other device. If he asks you to push it, commit that one file by name:

```bash
git -C ~/Sites/iamsteve-drafts pull --ff-only
git -C ~/Sites/iamsteve-drafts add notes/<slug>.md
git -C ~/Sites/iamsteve-drafts commit -m "Start note: <title>"
git -C ~/Sites/iamsteve-drafts push
```

## 4. Report

Tell Steve:

- the file to write in, `~/Sites/iamsteve-drafts/notes/<slug>.md`
- that it’s only on this Mac until he commits and pushes it, and public on GitHub from then, though not on the site

Draft notes don’t show anywhere on the site, local dev included, so there’s no preview.
