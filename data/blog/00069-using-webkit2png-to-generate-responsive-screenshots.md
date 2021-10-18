---
title: "Using webkit2png to generate responsive screenshots"
date: "2015-04-07T07:00:00+00:00"
lastmod: "2016-08-28T11:01:16+00:00"
summary: "If you ever have to create screenshots for a website, it can be quite a tedious process. In this post I will show you a way to do it easily with webkit2png. We’ll set up an array, which will generate a full sized screenshot with a unique name from your specified website."
metadesc: Use webkit2png to generate screenshots, for multiple screen widths. This method makes it much easier and less time consuming, for your responsive website."
theme: "#e9f5f5"
tags: ["Terminal"]
categories: ["Terminal"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 69
slug: "using-webkit2png-to-generate-responsive-screenshots"
---

If you ever have to create screenshots for a website, it can be quite a tedious process. In this post I will show you a way to do it easily with [webkit2png](http://www.paulhammond.org/webkit2png/). We’ll set up an array, which will generate a full sized screenshot with a unique name from your specified website.

> Unfortunately webkit2png is only supported on Mac OS X, as far as I’m aware.

## Installing webkit2png
This could be a daunting process and hopefully I can guide you through it. Command line tools are great, but usually come with a little installation overhead.

### Install Homebrew
[Homebrew](http://brew.sh/) is a package manager for OS X. If you’d like more information [I recommend visiting the website](http://brew.sh). It makes it easier to install things like webkit2png from one place.

1. Open up terminal
2. Paste the following line into terminal and press enter

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install webkit2png
It should only require you to enter the following into a new terminal window:

```bash
brew install webkit2png
```

## Generating screenshots
To generate the screenshots we need to use the following code.

```bash
array=( 1600 768 320 )

for i in "${array[@]}" do
  webkit2png -Fs 1 -W $i --filename='screenshot-'$(date +%Y%m%d-%H%M%S) --delay=4 "http://iamsteve.me"
done
```

### Command walkthrough
If you find it difficult to understand the command, I’ll explain what each line does.

```bash
array=( 1600 768 320 )
```
Each value within this array contains the width of the screenshot.

```bash
for i in "${array[@]}" do
```
Start the loop using our array.

```bash
webkit2png -Fs 1 -W $i --filename='screenshot-'$(date +%Y%m%d-%H%M%S) --delay=4 "http://iamsteve.me"
```
-Fs 1 means that we want only a full size screenshot, with a scale of 1. This is important webkit2png will generate 3 types of screenshot by default. Without the scale 1 it can lead to screenshots not being generated at the correct width.

```bash
--filename
```
Generating the screenshots with a name with the date added to it. So it will be unique

```bash
--delay=4
```
Will delay it for 4 seconds, I found on occasion it didn’t load fonts for some websites. It could be a little excessive, so tweak as you need.

## Hopefully you have found this helpful
It’s something we have to do on occasion and it makes it really easy to do screenshots. It’s quite flexible in the options too. If you enter `webkit2png --help` into terminal you’ll be returned all of the options.

If you have [alfred](http://alfredapp.com), [there is a workflow](http://www.alfredforum.com/topic/2062-scrennshot-of-web-pages/) that can do it for single screenshots.
