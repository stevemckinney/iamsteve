<?php $this->EE =& get_instance()?>

<table class="analytics-panel analytics-reports" cellspacing="0">
	<tr>
		<th class="top-left">URL</th>
		<th class="top-right"><?=$this->EE->lang->line('analytics_views')?></th>
	</tr>
	<?php foreach($lastmonth['content'] as $result): ?>
	<tr>
		<td class="analytics-top-content-row"><?=$result['title']?></td>
		<td class="analytics-count"><?=number_format($result['count'])?></td>
	</tr>
	<?php endforeach?>
	<tr>
		<td class="analytics-report-link bottom-left bottom-right cap" colspan="2"><a href="https://www.google.com/analytics/reporting/content?id=<?=$profile['id']?>" target="_blank"><?=$this->EE->lang->line('analytics_more')?></a></td>
	</tr>
</table>
