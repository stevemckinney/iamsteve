<?php $this->EE =& get_instance(); ?>

<table class="analytics-panel recent-stats" cellspacing="0">
	<tr>
		<th colspan="2" class="top-left top-right"><?=$this->EE->lang->line('analytics_today')?></th>
	</tr>
	<tr>
		<td class="analytics-stat-col visits"><span class="analytics-stat"><?=$visits?></span> <?=$this->EE->lang->line('analytics_visits')?></td>
		<td class="analytics-stat-col pageviews"><span class="analytics-stat"><?=$pageviews?></span> <?=$this->EE->lang->line('analytics_pageviews')?></td>
	</tr>
	<tr>
		<td class="analytics-stat-col pages-per-visit bottom-left"><span class="analytics-stat"><?=$pages_per_visit?></span> <?=$this->EE->lang->line('analytics_pages_per_visit')?></td>		
		<td class="analytics-stat-col avg-visit bottom-right"><span class="analytics-stat"><?=$avg_visit?></span> <?=$this->EE->lang->line('analytics_avg_visit')?></td>
	</tr>
</table>

<table class="analytics-panel recent-stats" cellspacing="0">
	<tr>
		<th colspan="2" class="top-left top-right"><?=$this->EE->lang->line('analytics_yesterday')?></th>
	</tr>
	<tr>
		<td class="analytics-stat-col visits"><span class="analytics-stat"><?=$yesterday['visits']?></span> <?=$this->EE->lang->line('analytics_visits')?></td>
		<td class="analytics-stat-col pageviews"><span class="analytics-stat"><?=$yesterday['pageviews']?></span> <?=$this->EE->lang->line('analytics_pageviews')?></td>
	</tr>
	<tr>
		<td class="analytics-stat-col pages-per-visit bottom-left"><span class="analytics-stat"><?=$yesterday['pages_per_visit']?></span> <?=$this->EE->lang->line('analytics_pages_per_visit')?></td>		
		<td class="analytics-stat-col avg-visit bottom-right"><span class="analytics-stat"><?=$yesterday['avg_visit']?></span> <?=$this->EE->lang->line('analytics_avg_visit')?></td>
	</tr>
</table>

<p><?=$this->EE->lang->line('analytics_viewing_profile')?> <a href="https://www.google.com/analytics/reporting/?id=<?=$profile['id']?>"><?=$profile['title']?></a></p>