<?php $this->EE =& get_instance(); ?>

<table class="analytics-panel last-month" cellspacing="0">
	<tr>
		<th colspan="3" class="top-left top-right"><?=$this->EE->lang->line('analytics_overview')?></th>
	</tr>
	<tr>
		<td class="analytics-stat-row"><span class="analytics-stat"><?=$lastmonth['visits']?></span> <?=$this->EE->lang->line('analytics_visits')?></td>
		<td class="analytics-sparkline"><?=$lastmonth['visits_sparkline']?></td>
	</tr>
	<tr>
		<td class="analytics-stat-row"><span class="analytics-stat"><?=$lastmonth['pageviews']?></span> <?=$this->EE->lang->line('analytics_pageviews')?></td>
		<td class="analytics-sparkline"><?=$lastmonth['pageviews_sparkline']?></td>
	</tr>
	<tr>
		<td class="analytics-stat-row"><span class="analytics-stat"><?=$lastmonth['pages_per_visit']?></span> <?=$this->EE->lang->line('analytics_pages_per_visit')?></td>
		<td class="analytics-sparkline"><?=$lastmonth['pages_per_visit_sparkline']?></td>
	</tr>
	<tr>
		<td class="analytics-stat-row"><span class="analytics-stat"><?=$lastmonth['bounce_rate']?></span> <?=$this->EE->lang->line('analytics_bounce_rate')?></td>
		<td class="analytics-sparkline"><?=$lastmonth['bounce_rate_sparkline']?></td>
	</tr>
	<tr>
		<td class="analytics-stat-row"><span class="analytics-stat"><?=$lastmonth['avg_visit']?></span> <?=$this->EE->lang->line('analytics_avg_visit')?></td>
		<td class="analytics-sparkline"><?=$lastmonth['avg_visit_sparkline']?></td>	
	</tr>
	<tr>
		<td class="analytics-stat-row bottom-left cap"><span class="analytics-stat"><?=$lastmonth['new_visits']?></span> <?=$this->EE->lang->line('analytics_new_visits')?></td>
		<td class="analytics-sparkline bottom-right cap"><?=$lastmonth['new_visits_sparkline']?></td>	
	</tr>
</table>

<p><?=$lastmonth['date_span']?></p>