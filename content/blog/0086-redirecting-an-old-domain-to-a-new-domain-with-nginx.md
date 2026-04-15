---
title: 'Redirecting an old domain to a new domain with nginx'
date: '2015-08-04T06:25:00+00:00'
lastmod: '2026-04-01T12:00:00+00:00'
summary: 'A guide to redirecting an old domain to a new one with nginx. Covering the server block setup, HTTPS, and preserving your URL paths.'
metadesc: 'How to redirect an old domain to a new domain with nginx. A step by step guide covering server blocks, HTTPS and preserving URL paths.'
theme: '#e1f7ee'
tags: ['Terminal']
categories: ['Terminal']
ogImage: '/opengraph-image.png'
status: 'open'
id: 86
fileroot: 'redirecting-an-old-domain-to-a-new-domain-with-nginx'
---

Server management isn't a topic I thought I would write about, however I had to do something for the first time on nginx. There is plenty of information out there on this topic. As someone who was new to redirecting old and new domains on nginx particularly, the information is making a few assumptions. For me, it wasted much of the time it took me to do this, as I was second guessing what would happen.

In this post I want to reassure you and guide you through the process. Answering the questions you may have, for what appears to be a simple looking task.

## Open your current config

Navigate to your current website config file. I do this through SSH, it should be pretty much identical to this for you.

### Navigate to your sites-available folder

```bash
cd /etc/nginx/sites-available
```

### Make a backup

It's important to make a backup of your current config should something go wrong. You can either copy the contents and paste it into another file on your computer or use the `cp` command on your server.

```bash
cp mysite.com mysite-backup.com
```

> This could be named 'default' it depends on how you set up your server originally.

### Edit your site config file

```bash
sudo nano mysite.com
```

## Find the server block containing your domain

Your current setup should look similar to the following.

```nginx
server {
  listen 80;
  listen [::]:80;
  listen 443 ssl;
  listen [::]:443 ssl;

  server_name www.currentdomain.com;

  # redirect to the non-www host
  return 301 https://currentdomain.com$request_uri;
}
```

<Blockquote style="afterthought">If your server is behind a reverse proxy or load balancer that handles SSL termination (common with services like Cloudflare), you may only need to listen on port 80. The proxy handles the HTTPS connection with the visitor and forwards HTTP to your nginx.</Blockquote>

### Now to update it

Your current `server_name` may be listening for only one domain, the www version. Which is then redirected to the non-www version. To get this to redirect to your new domain, you need to add your old domain, both www and non-www, to the server name. As well as the www version of your new domain.

```nginx
server {
  listen 80;
  listen [::]:80;
  listen 443 ssl;
  listen [::]:443 ssl;

  server_name www.olddomain.com olddomain.com www.newdomain.com;

  # redirect everything to the new non-www domain over HTTPS
  return 301 https://newdomain.com$request_uri;
}
```

The important things to note here: we're hardcoding `https://` rather than using `$scheme` so the redirect always lands on HTTPS regardless of how the request came in. And `$request_uri` preserves anything after the domain, so `/blog/some-post` on the old domain redirects to `/blog/some-post` on the new one. Your visitors and any existing links will end up in the right place.

Update any other instances of `server_name` throughout your config file that you may have.

### Test the config before reloading

It's worth checking your config is valid before applying it.

```bash
sudo nginx -t
```

If you see `syntax is ok` and `test is successful` you're good to go.

## Reload nginx

Finally, reload nginx to apply the changes. This is a graceful reload—it picks up the new config without dropping existing connections.

```bash
sudo systemctl reload nginx
```

## Test

Test a few URLs to make sure everything works nicely, it will, but it's always important to test. Try the old domain with and without www, and check that paths are preserved.
