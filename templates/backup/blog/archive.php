{exp:channel:entries channel="blog" category="{embed:category_id}" dynamic="no"
      disable="member_data|pagination" orderby="entry_date" sort="desc"}
	<article role="article">
		<h1><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{title}</a></h1>
		{excerpt}
		{blog_meta}
	</article>
	{pagination}
{/exp:channel:entries}