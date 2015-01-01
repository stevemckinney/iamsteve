{embed="/include/header" entry_title="Downloads"}

{!-- <header>
<h1>Downloads</h1>
<h2>Free stuff all round.</h2>
</header> --}

<p>Downloads are not available currently.</p>

{!-- <p>The downloads in this section are created because I've felt like creating them. Instead of them sitting on my hard drive. I'm hoping putting them here they'll be used by someone. Whether you're just starting out and using them to learn, I hope you get good use. If you have any problems, please <a href="{site_url}/contact" title="Contact me if you have any problems">contact me</a>.</p>
{dl_categories}

{exp:channel:entries channel="downloads" limit="10"}
<section role="region" aria-labelledby="{title}">
	<h1 role="heading">{title}</h1>
	<p>{overview}</p>
	{exp:file:entries limit="1" channel="downloads"}
	<img src="{dl_image}" alt="Preview of {title}" />
	{exp:file:entries}
</section>
{/exp:channel:entries} --}

{embed="/include/footer"}