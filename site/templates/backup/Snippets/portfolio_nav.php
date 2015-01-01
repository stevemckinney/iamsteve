<aside role="complementary" id="pnav">
	<h2>Items</h2>
	<ul>
	{exp:channel:entries channel="portfolio" limit="10" related_categories_mode="yes"}
	<li><a href="{title_permalink='portfolio/view'}">{title}</a></li>
	{/exp:channel:entries}
	</ul>
</aside>