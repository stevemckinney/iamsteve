<?php $this->EE =& get_instance() ?>

<div id="tabs">
	<ul>
<?php 
$i = 0;
foreach($field_groups as $field_group)
{ 
	if(isset($field_group['custom_fields']))
	{
		$i++;
		echo '<li><a href="#tabs-'.$i.'">'.$field_groups[$i-1]['group_name'].'</a></li>';
	} 
}
?>
	</ul>
<?php 
$i = 0;
$x = 0;
foreach($field_groups as $field_group)
{
	if(isset($field_group['custom_fields'])) 
	{ 
		$x++;
?>
	<div id="tabs-<?=$x?>">
		<h3 class="section-heading"><?=$this->EE->lang->line('field_group_name')?>: <span><?=$field_groups[$x-1]['group_name']?></span></h3>
		<table class="customFieldTable" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th><?=$this->EE->lang->line('field_label')?></th>
					<th><?=$this->EE->lang->line('field_order')?></th>
					<th><?=$this->EE->lang->line('field_name_syntax')?></th>
					<th class="no-sort"><?=$this->EE->lang->line('field_type')?></th>
					<th class="no-sort"><?=$this->EE->lang->line('edit')?></th>
				</tr>
			</thead>			
			<tbody>
			<?php 
				foreach($field_group['custom_fields'] as $custom_field)
				{
					$i++;
			?>
				<tr>
					<td class="fieldLabel"><?=$custom_field['field_label']?></td>
					<td class="fieldOrder"><?=$custom_field['field_order']?></td>
					<td class="fieldName">
						<a class="copy" id="cf<?=$i?>" href="#"><span class="copyText">{<?=$custom_field['field_name']?>}</span><span class="clipTip"><span class="arrow"></span><span class="clipText"></span></span></a>
					</td>
					<td class="fieldType"><?=$custom_field['field_type']?></td>
					<td><a href="<?=$custom_field['field_link']?>"><?=$this->EE->lang->line('edit')?></a></td>
				</tr>
			<?php 
				} 
			?>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="5"><a href="<?=$field_group['new_custom_field_link']?>"><?=$this->EE->lang->line('create_new_custom_field')?></a></td>
				</tr>
			</tfoot>			
		</table>
	</div>
<?php 
	}
}
?>
</div>