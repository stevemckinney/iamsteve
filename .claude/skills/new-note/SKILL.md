---
name: new-note
description: Create a new note with a dated git branch for the iamsteve blog
allowed-tools: Bash
---

Create a new note for the blog by doing the following in order:

1. Check the current branch name with `git branch --show-current`
   - If the branch starts with `claude/` (cloud session), skip branch creation and stay on the current branch
   - Otherwise, run `git checkout -b note-$(date +%Y-%m-%d)` to create and switch to a new branch
2. Run `node scripts/compose-note.js` to scaffold the note file via the interactive prompt

Once done, confirm the branch name and whether a new branch was created or an existing one was used.
