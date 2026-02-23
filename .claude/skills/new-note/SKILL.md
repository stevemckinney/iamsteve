---
name: new-note
description: Create a new note with a dated git branch for the iamsteve blog
allowed-tools: Bash
---

Create a new note for the blog by doing the following in order:

1. Run `git checkout -b note-$(date +%Y-%m-%d)` to create and switch to a new branch
2. Run `node scripts/compose-note.js` to scaffold the note file via the interactive prompt

Once done, confirm the branch name that was created.
