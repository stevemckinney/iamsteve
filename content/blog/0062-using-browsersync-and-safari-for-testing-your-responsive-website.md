---
title: "Using BrowserSync and Safari for testing your responsive website"
date: "2015-02-17T08:00:00+00:00"
lastmod: "2021-06-11T07:03:35+00:00"
summary: "Testing a responsive design on an actual device can be quite annoying when you’re down to the point of refining the design and making it more appropriate to such a small screen. As it’s usually testing and refining the best you can locally, then checking on the device through whatever means you usually do it."
metadesc: "How to use BrowserSync to make testing on devices easy. I cover how to use it with iOS devices, Xcode and Safari."
theme: "#e1f7ee"
tags: ["Code"]
categories: ["Code"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 62
fileroot: "using-browsersync-and-safari-for-testing-your-responsive-website"
---

Testing a responsive design on an actual device can be quite annoying when you’re down to the point of refining the design and making it more appropriate to such a small screen. As it’s usually testing and refining the best you can locally, then checking on the device through whatever means you usually do it.

I want to show you a way to do that without the inconvenience of having to get it onto the device. It’s not perfect but it really helps speed up the process, which is what matters here.

> **Unfortunately this approach is Mac only.** As we will be using Safari and Xcode.

## BrowserSync
While this isn’t a completely necessary step to this process, it’s a valuable tool due to the asset updating without reloading it offers. I’m assuming you have installed something by NPM before and are comfortable with terminal. However if you haven’t the [BrowserSync website](http://browsersync.io) has a guide.

### Go to your site files
Firstly open terminal and navigate to your folder which your websites files are contained in. For example

```bash
cd ~/Sites/my-website-folder
```

However an easy way to do this is if you’re less comfortable with terminal is by typing `cd ` and dragging the folder to the window and it will place the path for you.

### Get BrowserSync running
Depending on your setup, you can run the following in terminal.

```bash
browser-sync start --proxy "mysite.dev" --files "css/*.css"
```

Replace mysite.dev with whatever your site is, it could be localhost, there are [further instructions on the website](http://browsersync.io/).

<figure markdown="1">
<Image src="/images/blog/Screenshot_2015-02-02_08.21.21.png" width={570} height={278} />
<figcaption>After running it you’ll be presented with this, then a browser tab should open immediately. That’s great, now to get it onto your iOS device, you will want to enter the external URL into Safari.</figcaption>
</figure>

#### You can use Grunt or Gulp too
If you decide to run it through [Grunt](http://www.browsersync.io/docs/grunt/) or [Gulp](http://www.browsersync.io/docs/gulp/).

## Safari
It’s the only way I’m aware of (that’s free) that you can connect to your iOS device. You’ll need to do the following:

- Plug in the USB cable to your Mac
- Go to the external BrowserSync URL (eg: http://192.168.1.7:3000) on your iOS device
- Open Safari on your Mac
- Go into Develop in the menu bar (you may need to enable this in Safari preferences under advanced)

Once you reach this point you should see your device listed under the develop menu.

<figure markdown="1">
<Image src="/images/blog/Screenshot_2015-02-02_10.00.47.png" width={842} height={174} />
<figcaption>Choose your device and you should get an inspector window.</figcaption>
</figure>

## Device
On the device as you navigate through elements in the inspector you should see it highlight on your device. You can modify styles as you would on your browser normally. Update something in your CSS file in your editor and save, you should see it refresh the styles everywhere.

## Simulator
If you have Xcode installed on your computer you can use the iOS simulator within that to test in the same way (it’s free on the [Mac App Store](https://itunes.apple.com/gb/app/xcode/id497799835?mt=12)). However you don’t need the external address for this you can use the local URL.

Following the same method as earlier, you can see the iOS Simulator under the develop menu.

## Device vs Simulator
If you don’t have an iPhone or iPad the simulator is a great way to test and also adds more convenience to testing and fixing quickly. The only difference is it doesn’t replace using the device itself because of the way that we use devices over clicking with a fine pointer like a mouse.
