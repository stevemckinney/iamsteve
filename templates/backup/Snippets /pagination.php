{paginate}{if {total_pages} > 1}
<aside role="complementary">
{pagination_links}
	<ul class="pagination">
		{previous_page}<li class="prev"><a href="{pagination_url}" data-icon="previous">Prev</a></li>{/previous_page}
		{page}<li {if current_page}class="active"{/if}><a href="{pagination_url}">{pagination_page_number}</a></li>{/page}
		{next_page}<li class="next"><a href="{pagination_url}" data-icon-after="next">Next</a></li>{/next_page}
	</ul>
{/pagination_links}
</aside>
{/if}{/paginate}