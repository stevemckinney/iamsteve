---
title: "Maintenance week #2"
date: "2016-01-26T07:19:00+00:00"
lastmod: "2017-02-09T07:33:02+00:00"
summary: "This week is another maintenance week. The last one I looked at updating some posts. This week has been based around website maintenance. It’s been over the course of more than a week, as there was a lot to do. The interesting things I’ve added are SSL, updated the CMS and tidied up my server."
metadesc: "This week is another maintenance week. The last one I looked at updating some posts. This week has been based around website maintenance."
theme: "#f7f2f5"
tags: ["Website"]
categories: ["Website"]
images: ["/images/blog/maintenance-week-featured-image@2x.png"]
large: "/images/blog/maintenance-week-featured-image@2x.png"
medium: "/images/blog/maintenance-week-featured-image-medium@2x.png"
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 111
fileroot: "maintenance-week-2"
---

This week is another maintenance week. The last one I looked at updating some posts. This week has been based around website maintenance. It's been over the course of more than a week, as there was a lot to do. The interesting things I've added are SSL, updated the CMS and tidied up my server.

## Adding SSL
Adding SSL has been on my website todo list for a long time. It's where the web is going, as HTTP/2 gains more traction. HTTPS will eventually be the default.

### Security shouldn’t come at a cost
One of the reasons I put off SSL was I didn't want to have another payment due every year for purchasing an SSL certificate. **The security of people's data and the web shouldn't come at a cost**. That's where Lets Encrypt comes in; it's a wonderful idea.

### I’ve never implemented SSL before!
I was hesitant with Let's Encrypt being in public beta. I took a gamble on implementing it, and it's worked out well. Bar a couple of things that I'm sure will be resolved when it's no longer in beta. I'm pleased nothing went wrong.

Overall having SSL sets a good foundation for the future of this website and very soon I'll be looking to enable HTTP/2.

**SSL from what I have seen isn't as accessible as it could be to the average user**. [Amazon appear to be working on it](https://aws.amazon.com/certificate-manager/), but there's plenty to be done with improving the process, as it's not just installing a certificate.

## ExpressionEngine 3
I use ExpressionEngine as the CMS for this website. From the perspective of building a website, it's nice. It's always been quite niche and has become more niche over the years. I got the upgrade in late November and realised that the lack of plugin updates was surprising.

I'm somewhat used to Wordpress regarding updates, but this was one with lots of breaking changes. From what I found the majority of developers couldn't afford plugin rewrites. I can sympathise with that.

I put it off but kept an eye on what I was dependent on to see if it was updated. However, one plugin wasn't going to be updated. NSM Better Meta, I contacted the developers, and they didn't have any plans to update it. This meant I needed to find a solution, but there wasn’t one, up until EE 3.1 was released. EE 3.1 brought plugin updates with it, which allowed me to update.

### SEO lite
With that came my NSM Better Meta replacement. I went through and updated all the meta descriptions for pages and posts. Adding them was a fairly tedious process, but I was happy that I had a replacement. I reentered around 80 meta descriptions and rewrote some.

## Server/git repository cleanup
I moved to Digital Ocean around a year ago now, and I transitioned everything, with a little clean up. This time, the aim was to do it properly. I wanted to reduce the number of nested folders within the server and throughout the CMS.

### Simplify the folder structure
In the past, I naively kept all my post uploads, and any files related in the same folder. Having images in a git repository isn't a good practice. Over time **I’ve begun to dislike the need for putting everything in folders**, nesting them and so on. **Having a flatter folder structure makes things easier to find**, at least, that’s the case for me.

My uploads folder path is much simpler and if I move server, it’s much easier. Some of the server changes had a knock on effect, I needed to update some older posts and CodePen demos.

It’s not too surprising how much of a knock on effect it had. I’m glad I’ve done it though, the future management should be much nicer.

## Finally post cleanup
Some posts saw the need for cleanup, as the process broke them. Some had random divs which broke the layout, what was I doing in the past? There was a lot of necessary cleanup after around four years of build up. It will mean I don’t have to do it when coding the redesign.

## Plans for the next maintenance week
That’s everything, time to plan for the next. I have a list of things outstanding that may come as part of maintenance weeks.

- Republish some older posts with better information
- HTTP/2
- PHP 7
- Start the newsletter
