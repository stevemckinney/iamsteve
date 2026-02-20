---
title: Anything to avoid a CMS
date: '2026-02-20T19:44:59.776Z'
status: published
---

# Anything to avoid a CMS

I’ve had this website quite a while in a flat file system now. But there’s always a bit of friction when publishing something. As you have to write in a file, commit and push.

It’s not big a deal, but depending on your setup you may have different quantities of frontmatter to contend with.

However, a CMS isn’t all that better. You still have much of the faff, but it looks a bit different. And with a CMS I’ve not seen one replicate the niceties of writing in iA Writer. Be it on a computer or phone.

In effect not much changes. Some of the tedious publishing workflow remains with file based but with better version control.

However, one thing I’ve discovered with Claude Code is automating that process with GitHub Actions.

It’s not particularly easy when some things for your website are bespoke. But chucking AI at it makes it easy.

With my publishing workflow I’ve managed to be able to create an action. I create a new note in the correct folder in my repo I can push this up to GitHub the action will run. Add necessary frontmatter, slugify the file name if needs be and publish for me.

In theory this is the least friction to writing I’ve found. The remaining tedium is committing it to git, making sure I’m on a branch then opening a pull request.

It should make publishing from my phone easier. This note is an attempt to test this.
