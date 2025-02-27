---
title: Using analytics again with simple analytics
date: "2025-02-24T18:43:42.460Z"
lastmod: "2025-02-24T18:43:42.460Z"
summary: I was seeing an increase in my ‘serverless’ usage and it didn’t make sense. So I decided to add Simple Analytics and wanted to share a review of this privacy focused service.
metadesc: My review of Simple Analytics
theme: "#f1e8e4"
tags: []
categories: ["Website"]
images: []
large: "" # /images/blog/using-analytics-again-with-simple-analytics.svg
medium: "" # /images/blog/using-analytics-again-with-simple-analytics-medium.svg
ogImage: "/opengraph-image.png"
status: draft
codepen: false
twitter: false
id: 177
fileroot: using-analytics-again-with-simple-analytics
---

I want to write about my experience adding an analytics script back to this website with Simple Analytics.

## TLDR
**I needed to figure out why my usage was going up dramatically on Netlify**. I didn’t want a complex solution, I wanted to get a sense of the number of visits and where if any additional traffic was coming from with a privacy focus. I didn’t want to pay. All which Simple Analytics meets.

## What prompted the need for analytics
With the move to Next.js and “serverless” hosting services, there’s always the potential for an increase in your bill.

And at the time my Netlify function invocations suddenly started creeping up and eventually going over the plan limit.  On contacting support I found out that there were changes to the way was now calculating function invocations.

I did believe a view counter on posts was enough of an indicator for. I have had this in place for the majority of the lifetime of this website. I use it to sort popular posts on the homepage. And there was nothing out of the ordinary.

But to rule out anything irregular, I figured adding analytics would be useful to see if I was getting traffic from somewhere unexpected.

## Searching for a simple privacy based solution
Over the years I’ve used different analytics solutions on this website in aim of avoiding Google Analytics—from Gauges to GoSquared. Eventually, I gave up around the time GDPR stuff set in place.

But to be able to go forward with this it needed to be privacy focused.

## Simple Analytics respects the user whilst giving me a good idea of the data
The feature set is simple in comparison to Google Analytics, but this is true of privacy focused services in this space. I didn’t have many requirements other than getting an idea of page views and referrers. This allows me to see how articles are picking up and understanding the source of traffic.

**The features which are important to me**
- No need for a cookie banner
- Respects user preferences like do not track
- Visitors and page views
- Referring traffic
- Session length
- Bots excluded by default

**Free features that are nice**
- Manage multiple sites (up to 5)
- Visibility of your dashboard
- Email reports
- Alert when the script is missing
- Dark and light mode
- Data import for Google Analyticd

### Free tier
It has to be mentioned it’s free with a month of history, which is great. I would be happy to know the amount of visitors—everything else is a bonus.

### It’s simple to get started
With simple analytics it’s like other services you drop in a script, get confirmation and you’re good to go.

### It’s simple to get updates
I want to view my dashboard and not have to dig and click to get an idea what’s happening. As soon as I go into Simple Analytics I can get an overview of how my site is doing.

<Image
  src="/images/blog/0177-simple-analytics-01.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

### Managing multiple sites is easy
Again, in addition to getting updates I was working on a website for one of my clients and there was no idea of the traffic levels.

And I went to my dashboard and had a site setup within minutes. It’s an unfair comparison but doing this with Google would take longer to setup.

> You can add up to 5 websites as part of the free plan.

### Data accuracy appears to be good
By default bots and things are excluded, it mentions that 95% of bots should be blocked. You can also enable advanced robot blocking as a paid user and I would assume that would get closer to the 100%.

<Image
  src="/images/blog/0177-simple-analytics-02.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

My previous experiences here with Google Analytics you have to configure yourself which is a pain. So it’s nice that the majority is covered.

I have trialled Netlify’s analytics as a free trial—which was $9 a month at the time—I wasn’t a fan of it as there was no control over the bots and being able to get any real insight.

You can’t expect total accuracy and no one should with the use of ad blockers.

### Email reports
These reports depend on whether you choose between weekly and monthly. These give a quick overview which is easy to understand.

<Image
  src="/images/blog/0177-simple-analytics-03.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

I can see this weeks traffic versus last weeks and whether there are any new referrers or not.

## Respect for users privacy
The core selling point of Simple Analytics is the privacy element. To understand what this is as there is a level of configuration, depending on what you value.

- Respecting adblockers and the ‘do not track’ directive
- No need for cookies and IP addresses aren’t collected
- Ability to set your dashboard to public additional transparency
- Missing script notification

## Everything else
- In paid plans there is detailed event tracking, I may update this post when I have a paid plan
- UTM is tracked
- API access, could be interesting to create a popular posts, view counters and things but this allows you to use the iOS app

## What’s kind of missing
It’s difficult to critique a free independent service, as it doesn’t have to be free. But there’s a few additions I’d like to see, or maybe I’m missing them.

<Image
  src="/images/blog/0177-simple-analytics-04.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

### Full referrer
With referrers it doesn’t really cover the location it comes from exactly. You can see the website, but not the referring page. I imagine this may be a privacy restriction, but I am not sure.

<Image
  src="/images/blog/0177-simple-analytics-05.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

### Browser version
As creators of websites the browser split and versions are quite handy to understand your audience and level of browser support you offer. Whilst this isn’t as big of an issue as it was, I think it would be nice to see browser versions.

<Image
  src="/images/blog/0177-simple-analytics-06.png"
  width={800}
  height={480}
  alt="Text with default leading"
/>

### A few more metrics
It may be missing some of what I would consider simpler metrics, such as exit and bounce.

### Goals
Goals feels like there has been a little bit more attention paid in terms of getting people started with a goal.

On entering the page you have some suggestions based on your audience.
