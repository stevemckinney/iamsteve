{embed="/include/header" entry_title="Blog"}

{exp:channel:entries channel="blog" paginate="bottom" limit="8" status="open|latest" disable="member_data|trackbacks"}
	<article role="article">
		<h1><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{title}</a></h1>
		{excerpt}
		{blog_meta}
	</article>
	{pagination}
{/exp:channel:entries}

{embed="/include/footer"}