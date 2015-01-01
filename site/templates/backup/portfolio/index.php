{embed="/include/header" entry_title="Portfolio"}

<div class="carousel" data-transition="fade">
	{exp:channel:entries channel="portfolio" require_entry=“yes" status="Open" disable="categories|member_data|pagination|trackbacks" sort="asc"}
	{if no_results}{redirect="portfolio"}{/if}
	<a href="{title_permalink='portfolio/view'}" title="View {title} in full." class="item">
		<figure>
			<img src="{preview_image}" alt="Preview of {title}">
			<figcaption>
				<h2>{title}</h2>
				<p>{brief_summary}</p>
			</figcaption>
		</figure>
	</a>
	{/exp:channel:entries}
</div>

<p><a href="/contact" class="ns notice" title="Let's work together! Click for methods of contacting me"><em>Let's work together?</em>Contact me</a></p>

{embed="/include/footer"}