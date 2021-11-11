---
title: "Redirecting an old domain to a new domain with nginx"
date: "2015-08-04T06:25:00+00:00"
lastmod: "2016-08-28T10:55:13+00:00"
summary: "Servers isn’t a topic I thought I would write about, however I had to do something for the first time on nginx. There is plenty of information out there on this topic. As someone who was new to redirecting old and new domains on nginx particularly, the information is making a few assumptions. For me, it wasted much of the time, it took me to do this. As I was second guessing what would happen.In this post I want to reassure you and guide you through the process. Answering the questions, that you may have, for what appears to be a simple looking task."
metadesc: "A reassuring process for how to redirect an old domain to a new domain with nginx. "
theme: "#e1f7ee"
tags: ["Terminal"]
categories: ["Terminal"]
ogImage: "/assets/og/cover.jpg"
status: "open"
id: 86
fileroot: "redirecting-an-old-domain-to-a-new-domain-with-nginx"
---

Server management isn’t a topic I thought I would write about, however I had to do something for the first time on nginx. There is plenty of information out there on this topic. As someone who was new to redirecting old and new domains on nginx particularly, the information is making a few assumptions. For me, it wasted much of the time, it took me to do this. As I was second guessing what would happen.

In this post I want to reassure you and guide you through the process. Answering the questions, that you may have, for what appears to be a simple looking task.

## Open your current config
Navigate to your current website config file. I do this through ssh, it should be be pretty much identical to this for you. You can also do it through FTP.

### Navigate to your sites-available folder
```bash
cd /etc/nginx/sites-available
```

### Make a backup
It’s important to make a backup of your current config should something go wrong. You can either copy the contents and paste it into another file on your computer or use the `cp` command on your server.

```bash
cp mysite.com mysite-backup.com
```

> This could be named ‘default’ it depends on how you setup your server originally.

### Edit your site config file
```bash
sudo nano mysite.com
```

## Find the server block containing your domain
Your current setup should look similar to the following.

```bash
server {
  # don’t forget to tell on which port this server listens
  listen [::]:80;
  listen 80;

  # listen on the www host for all domains
  server_name www.currentdomain.com;

  # and redirect to the non-www host (declared below)
  return 301 $scheme://currentdomain.com$request_uri;
}
```

### Now to update it
Your current `server_name` may be listening for only one domain, the www version. Which is then redirected to the non-www version. To get this to redirect to your new domain, you need to add your old domain, both www, and non-www, to the server name. As well as the www version of your new domain.

```bash
server {
  # don’t forget to tell on which port this server listens
  listen [::]:80;
  listen 80;

  # listen on the www host for all domains
  server_name www.olddomain.com olddomain.com www.newdomain.com;

  # and redirect to the non-www host (declared below)
  return 301 $scheme://newdomain.com$request_uri;
}
```

> It’s important to note that `$request_uri` will listen for and redirect to anything after the domain. So you can be assured everyone will be redirected to the correct place.

Update any other instances of `server_name` throughout your config file that you may have.

## Reload nginx
Finally you need to [reload](http://askubuntu.com/questions/105200/what-is-the-difference-between-service-restart-and-service-reload) nginx.

```bash
sudo service nginx reload
```
## Test
Test a few URL’s to make sure everything works nicely, it will, but it’s always important to test.

> If you have any questions ask away on [twitter](http://twitter.com/irsteve)
