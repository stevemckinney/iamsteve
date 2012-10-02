{embed="include/header" entry_title="{exp:channel:category_heading channel="blog"}{category_name}{/exp:channel:category_heading}"}

{exp:channel:category_heading channel="downloads" disable="draft"}
<header>
<h1>{category}</h1>
<h2>{category_description}</h2>
</header>
{/exp:channel:category_heading}

{exp:channel:entries channel="downloads" limit="10"}
<section role="region">
	<h1>{title}</h1>
	<p>{overview}</p>
	{exp:file:entries limit="1" channel="downloads"}
	<img src="{dl_image}" alt="Preview of {title}" />
	{exp:file:entries}
</section>

{pagination}
{/exp:channel:entries}

{embed="include/footer"}