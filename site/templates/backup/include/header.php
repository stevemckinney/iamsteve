<!DOCTYPE html>
<html lang="en" class="no-js{if embed:body_class}{embed:body_class}{if:elseif segment_1 == ''}{exp:channel:entries channel='blog' limit='1' status='open|latest' disable='member_data|trackbacks|pagination'} {url_title} home{/exp:channel:entries}{if:elseif segment_1 && segment_2 == ''} {segment_1}{if:elseif segment_2 == 'entry'} {segment_2} {url_title}{/if}">
<head>
	<!-- Meta -->
	<meta charset="utf-8">
	<!-- In loving memory of Albert Phillips -->
	<title>{if embed:entry_title}{embed:entry_title} | Portfolio of Steve McKinney{if:else}Portfolio of Steve McKinney Manchester web designer | {site_name}{/if}</title>
	<meta name="description" content="The portfolio of Steve McKinney (iamsteve), a Manchester based web designer/front end developer.">
	<meta name="keywords" content="Steve, McKinney, web, design, designer, html, css, manchester, portfolio, iamsteve, iamsteve.me, blog, freelance, design, i am steve">
	<meta name="author" content="Steve McKinney">
	<!-- CSS -->
	{exp:minimee:css}
	<link href="{site_url}/ee/assets/css/master.css?v=1" rel="stylesheet" media="screen">
	{/exp:minimee:css}
	<!-- Javascript -->
	<script>document.cookie="resolution=" + Math.max(screen.width,screen.height) + "; path=/";</script>
	{exp:minimee:js}
	<script src="{site_url}/ee/assets/js/modernizr.js"></script>
	{/exp:minimee:js}
	<script src="http://use.typekit.com/fbz2ewv.js"></script>	
	{exp:channel:entries channel="blog" limit="1" status="open|latest" disable="member_data|trackbacks|pagination"}
	{if extra_css}
		<link href="{site_url}/ee/assets/css/custom/{extra_css}.css?v=1" rel="stylesheet" media="screen">
	{/if}
	{if extra_js}
		<script src="http://use.typekit.com/{extra_js}.js"></script>
	{/if}
	{/exp:channel:entries}
	<script>try{Typekit.load();}catch(e){}</script>
	<!-- Mobile -->
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Verification -->
	<meta name="google-site-verification" content="kvxM4eH_QHyUGdJK0LEQj3aZi7Vew5AooNVxk79zruU">
	<meta name="y_key" content="e831cde43ec8e068">
	<!-- Other -->
	<link rel="alternate" type="application/rss+xml" title="Blog | Portfolio of Steve McKinney" href="http://iamsteve.me/blog/feed">
	<link rel="shortcut icon" href="http://iamsteve.me/favicon.png">
	<link rel="apple-touch-icon" href="http://iamsteve.me/apple-touch-icon.png">
	<!-- IE crap -->
	<meta http-equiv="cleartype" content="on">
	<!--[if lte IE 8]>
		<link rel="stylesheet" href="{site_url}/ee/assets/css/ie.css?v=1" media="screen">
		<script src="{site_url}/ee/assets/js/_ie/selectivizr.js"></script>
		<script src="{site_url}/ee/assets/js/_ie/nwmatcher.js"></script>
	<![endif]-->
</head>
<body>
	<div class="container">
		<header role="banner">
		<h1><a href="/" title="Back to the homepage">I am Steve</a></h1>
		<a href="#nav" title="To the navigation" class="mobile">Navigation</a>
		<nav role="navigation" aria-hidden="false">
			<ul id="nav">
				<li><a href="{site_url}" title="Back to the homepage"{if segment_1 == ""} class="active"{/if} data-icon="home">Home</a></li>
				<li><a href="{site_url}/blog" title="My blog about design/technology related things"{if segment_1 == "blog"} class="active"{/if} data-icon="compose">Blog</a></li>
				<li><a href="{site_url}/portfolio" title="View all my work"{if segment_1 == "portfolio"} class="active"{/if} data-icon="picture">Portfolio</a></li>
				<li><a href="{site_url}/about" title="Detailed information about myself"{if segment_1 == "about"} class="active"{/if} data-icon="user">About</a></li>
				<li><a href="{site_url}/contact" title="My contact details"{if segment_1 == "contact"} class="active"{/if} data-icon="envelope">Contact</a></li>
			</ul>
		</nav>
		</header>
		{if segment_1 == ""}
			{exp:channel:entries channel="blog" limit="1" status="open|latest" disable="member_data|trackbacks|pagination"}
				<h1 class="title"><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{title}</a></h1>
			{/exp:channel:entries}
		{if:elseif embed:entry_title}
			{exp:channel:entries channel="blog|portfolio|site|downloads" limit="1" status="open|latest" disable="member_data|trackbacks|pagination"}
				<h1 class="title"><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{embed:entry_title}</a></h1>
			{/exp:channel:entries}
		{if:else}
			<h1 class="title">{segment_1}</h1>
		{/if}
		
	</div>	
	<section role="main">