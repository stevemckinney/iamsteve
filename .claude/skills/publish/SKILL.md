---
name: publish
description: Publish a draft note or post on iamsteve.me. Takes the draft from the drafts branch (Steve’s ~/Sites/iamsteve-drafts folder), flips it live, puts it on main through a PR of its own for Vercel to deploy, then takes it off the drafts branch. Use when Steve says publish or asks to put a draft live.
argument-hint: '[title or slug]'
allowed-tools: Bash, Read, Write, Edit
---

# Publish a draft

Drafts live on the `drafts` branch, which holds nothing but drafts and never merges into `main`: `notes/<slug>.md`, or `posts/<NNNN>-<slug>.md` with images in `posts/images/`. On the Mac it’s checked out at `~/Sites/iamsteve-drafts`, where Steve writes in iA Writer and commits himself, as he does on his phone.

Publishing copies the draft into this checkout, flips it live, commits it on a branch of its own cut from `origin/main`, and squash-merges that branch’s PR. Vercel deploys main. Then the draft comes off the `drafts` branch.

Branches are built in temporary worktrees, so this checkout stays on its branch and anything uncommitted in it is left alone. Shell variables don’t carry between commands, so each block that uses a worktree starts by setting its path.

Below, `<draft>` is the draft’s path on the `drafts` branch, and `<file>` is where it goes on the site: `content/notes/<slug>.md` or `content/blog/<NNNN>-<slug>.md`.

## 1. Find the draft

Use the title or slug Steve gives. If he doesn’t give one, or it fits more than one draft, list them and ask which:

```bash
git fetch origin
git ls-tree -r --name-only origin/drafts -- notes posts | grep '\.md$'
git -C ~/Sites/iamsteve-drafts status --porcelain --untracked-files=all -- notes posts
```

The first lists the drafts on GitHub. The second lists drafts in the folder with changes Steve hasn’t committed, new ones included.

## 2. Make sure it’s the latest

Publish what’s on GitHub, so edits from Steve’s phone are in. First check the drafts folder hasn’t got edits that aren’t pushed. Each command prints only if it has:

```bash
git -C ~/Sites/iamsteve-drafts fetch -q origin
git -C ~/Sites/iamsteve-drafts status --porcelain --untracked-files=all -- <draft>
git -C ~/Sites/iamsteve-drafts log --oneline origin/drafts..HEAD -- <draft>
```

Do the same for a post’s images. If anything prints, show Steve what isn’t pushed (`git -C ~/Sites/iamsteve-drafts diff origin/drafts -- <draft>`, or say the draft is new) and offer to commit and push it for him: those files by name, as “Update draft: <title>”. If the push is refused, the branch has moved on since his last pull, so stop and tell him. Once it’s pushed, run `git fetch origin` here. If he’d rather not push, publish what’s on GitHub, or stop if the draft isn’t there yet.

If `~/Sites/iamsteve-drafts` isn’t there, skip this check.

## 3. Copy it here

Read the title from the draft. For a note, `<file>` follows it: work out the slug with the rule in `new-note`, since the filename is the URL and the title may have changed since the draft started. For a post, keep the draft’s filename; step 5 deals with a changed title.

Check nothing’s in the way. Each line prints only on a clash:

```bash
git cat-file -e "origin/main:content/notes/<slug>.md" 2>/dev/null && echo "A live note has this slug"
git ls-tree -r --name-only origin/main -- content/blog | grep -E "/[0-9]{4}-<slug>(\.md|/index\.md)$"
test -e <file> && echo "<file> is already in this checkout"
```

Run the first for a note and the second for a post, and stop and tell Steve if either prints. If the third does, it’s left over from before drafts had their own branch: show him how it differs from the draft and ask before replacing it. Then:

```bash
git show "origin/drafts:<draft>" > <file>
```

Copy a post’s images from `posts/images/` into `public/images/blog/` the same way.

## 4. Read it through

Read the whole file before changing anything. If something looks private, quote it to Steve and wait for his go-ahead: a home address, a phone number or email address, money or health details, or anything about a private person. Flag clear cases only.

## 5. Check it

For a note: the Process notes action strips the first line that starts with `# `, even inside a code block. Delete a leading `# Title` line, since the title lives in the frontmatter, and flag any other line that starts with `# `.

For a post:

- `summary` and `metadesc` both need filling in. If either is missing, write one from the post in Steve’s voice, show him, and wait for his OK.
- If the title has changed, ask whether the URL should follow it. If so, `mv` the file to the new slug and update `fileroot`.
- Work out the next free ID on main. If it isn’t this post’s `id`, another post went live first. Rename the file and its images to the new number, update `id` and the image paths, and tell Steve.

```bash
node -e '
const sh = (cmd) => require("child_process").execSync(cmd).toString()
const ids = sh("git ls-tree -r --name-only origin/main -- content/blog").split("\n").map((file) => parseInt((file.match(/^content\/blog\/(\d{4})-/) || [])[1]) || 0)
console.log(Math.max(parseInt(sh("git show origin/main:.current-post-id")) || 0, ...ids) + 1)'
```

## 6. Flip it

Get the time with `node -e 'console.log(new Date().toISOString())'`.

- Note: set `status: published` and `date` to now.
- Post: set `status: open`, and `date` and `lastmod` to now.

The worktree has no `node_modules`, so the pre-commit hook can’t run there. Run its checks on the file here instead:

```bash
pnpm exec prettier --write <file>
node scripts/validate-content.mjs <file>
```

## 7. Commit it on its own branch

The branch is `note/<slug>` or `post/<slug>`. Check the name is free. Each line prints only on a clash; if either does, stop and tell Steve.

```bash
git show-ref --verify --quiet "refs/heads/<branch>" && echo "Branch <branch> exists locally"
git ls-remote --exit-code --heads origin "<branch>" >/dev/null && echo "Branch <branch> exists on GitHub"
```

Then build it:

```bash
wt="${TMPDIR:-/tmp}/iamsteve-publish-<slug>"
git worktree add --no-track -b "<branch>" "$wt" origin/main
cp <file> "$wt/<file>"
git -C "$wt" add -f <file>
git -C "$wt" commit --no-verify -m "Add note: <title>"
```

For a post, also copy its images from `public/images/blog/` across and stage them, write the ID to `"$wt/.current-post-id"` and stage that, and use “Add post: <title>”.

If anything stops you before the merge, clear up with `git worktree remove --force "$wt"` and `git branch -D "<branch>"`, so the next try starts clean.

## 8. Check what the branch holds

```bash
wt="${TMPDIR:-/tmp}/iamsteve-publish-<slug>"
git -C "$wt" diff --name-status origin/main...HEAD
```

A note’s branch should add its one file. A post’s should add its file and any images, and change `.current-post-id`. If anything else is there, stop and show Steve. A stray file in a bulk commit is how private writing got published before.

## 9. Merge

```bash
wt="${TMPDIR:-/tmp}/iamsteve-publish-<slug>"
git -C "$wt" push -u origin "<branch>"
gh pr create --base main --head "<branch>" --title "Add note: <title>" --body "Publishes <live URL>."
gh pr merge <number> --squash
```

Use “Add post: <title>” for a post. Once `gh pr view <number> --json state` says `MERGED`, tidy up:

```bash
wt="${TMPDIR:-/tmp}/iamsteve-publish-<slug>"
git push origin --delete "<branch>"
git worktree remove "$wt"
git branch -D "<branch>"
git fetch origin
```

The file is on main now, so remove the copy here if it matches, and do the same for each of a post’s images:

```bash
cmp -s <file> <(git show origin/main:<file>) && rm <file>
```

An untracked copy of a post would stop the checkout updating to main. A note’s copy would take edits that never reach the site, and git overwrites it without asking once main comes in. If a copy doesn’t match, leave it and tell Steve.

## 10. Take it off the drafts branch

```bash
wd="${TMPDIR:-/tmp}/iamsteve-drafts-<slug>"
git fetch origin
git worktree add --detach "$wd" origin/drafts
git -C "$wd" rm -q <draft>
git -C "$wd" commit --no-verify -m "Remove published note: <title>"
git -C "$wd" push origin HEAD:drafts
git worktree remove "$wd"
```

For a post, `git rm` its images in `posts/images/` as well, and use “Remove published post: <title>”. If the push is refused, Steve pushed in the meantime: remove the worktree and run this step again.

Then bring the drafts folder up to date, so the draft leaves iA Writer on the Mac:

```bash
git -C ~/Sites/iamsteve-drafts pull --ff-only
```

If that fails, the folder has edits that aren’t pushed. Leave it and tell Steve.

## 11. Report

Give Steve the PR link and the live URL, which works once Vercel’s production deploy finishes:

- Note: `https://iamsteve.me/notes/<slug>`
- Post: `https://iamsteve.me/blog/<slug>`, without the `NNNN-` prefix

Tell him the draft is off the drafts branch, and his phone drops it when it next pulls. Edits from now on go in the site repo, in `<file>`.
