{embed="include/header" entry_title="{exp:channel:category_heading channel="blog"}{category_name}{/exp:channel:category_heading}" category_id="{category_id}"}
	
	{exp:channel:entries channel="blog" paginate="bottom" category="{embed:category_id}" dynamic="no" disable="member_data" orderby="entry_date" sort="desc" limit="8"}
    {if no_results}
      <p>No results</p>
    {/if}
    <article role="article">
		<h1><a href="{title_permalink='blog/entry'}" title="Read {title} in full.">{title}</a></h1>
		{excerpt}
		{blog_meta}
		</article>
		{pagination}
  {/exp:channel:entries}
	
{embed="include/footer"}