{embed="include/header"}

{exp:channel:entries channel="blog" paginate="bottom" limit="1" status="open|latest" disable="member_data|trackbacks"}
	<article role="article">
		{exp:trunchtml chars="720" inline="&hellip;"}
			{blog_article}
		{/exp:trunchtml}
		{blog_meta}
	</article>
	{pagination}
{/exp:channel:entries}

{embed="include/footer"}