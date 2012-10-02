{embed="/include/header" entry_title="{exp:search:total_results}{total}{/exp:search:total_results} results were found for {exp:search:keywords}."}

{exp:search:search_results channel="blog" paginate="bottom" limit="8" status="open|latest" disable="member_data|trackbacks"}
	<article role="article">
		<h1><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{title}</a></h1>
		<p>{excerpt}</p>
		{blog_meta}
	</article>
	{pagination}
{/exp:search:search_results}

{embed="/include/footer"}