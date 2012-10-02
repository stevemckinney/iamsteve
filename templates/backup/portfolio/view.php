{embed="include/header" entry_title="{exp:channel:entries channel="portfolio" status="Latest|open|draft"}{title}{/exp:channel:entries}"}

	{exp:channel:entries channel="portfolio" require_entry="yes" status="Open" disable="categories|member_data|pagination|trackbacks"}
	{if no_results} {redirect="portfolio"} {/if}		
		<section role="region" id="entry">
			<img src="{full_image}" alt="A large view of {title}">
			<p>{item_description}{if live_url}<a href="{live_url}" title="View the live version of {title}">Live version</a>{/if}</p>
		</section>
	{/exp:channel:entries}
	{portfolio_nav}

{embed="include/footer"}