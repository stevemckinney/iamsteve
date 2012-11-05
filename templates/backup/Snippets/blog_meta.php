<aside class="meta">
<ul>
	<li data-icon="calendar"><time datetime="{entry_date format="%Y-%m-%d"}" pubdate>{entry_date format="%d/%m/%Y"}</time></li>
	<li data-icon="tag">{categories channel="blog" style="linear" parent_only="yes" limit="1"}<a href="{path='blog/show'}" title="This post is under category:{category_name}.">{category_name}</a>{/categories}</li>
	{if segment_2 != "entry"}<li data-icon="link"><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">Continue reading</a></li>{/if}
	{edit}
</ul>
</aside>
{!-- <a href="{path='blog/show'}" title="This post is under category:{category_name}."> --}