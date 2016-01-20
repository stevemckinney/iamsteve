<?php $this->EE =& get_instance() ?>

<table class="globalVariableTable" cellspacing="0" cellpadding="0">
	<thead>
		<tr>
			<th><?=$this->EE->lang->line('variable_syntax')?></th>
			<th><?=$this->EE->lang->line('edit')?></th>		
		</tr>
	</thead>
	<tbody>
	<?php 
		$i = 0; 
		foreach($global_variables as $result)
		{ 
			$i++;		
	?>
		<tr>
			<td>
				<a class="copy" id="s<?=$i?>" href="#"><span class="copyText">{<?=$result['variable_name']?>}</span><span class="clipTip"><span class="arrow"></span><span class="clipText"></span></span></a>
			</td>
			<td><a href="<?=$result['variable_link']?>"><?=$this->EE->lang->line('edit')?></a></td>
		</tr>
	<?php
		}	
	?>	
	</tbody>
	<tfoot>
		<tr>
			<td colspan="2"><a href="<?=BASE.AMP.'C=design'.AMP.'M=global_variables_create'?>"><?=$this->EE->lang->line('create_new_global_variable')?></a></td>
		</tr>
	</tfoot>
</table>