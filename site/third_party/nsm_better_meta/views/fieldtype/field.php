<?php

/**
 * View for Control Panel custom field
 * Loads each meta group for the entry
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 **/

?>
<div class="mor cf <?= ( ! $show_nsm_better_meta ? 'nsm_inactive_tab' : '' ) ?>" data-addonid="nsm_better_meta">

<?php if( ! $show_nsm_better_meta ) : ?>

<div class="alert info"><?= lang('alert.no_better_meta_set')?></div>

<?php else : ?>

	<div class="tg">
		<?php /* if($this->addons_model->extension_installed('lg_multi_language')) : ?>
			<ul class="menu tabs">
				<?php foreach ($entry_meta as $meta) : ?>
					<li><a href="#lg_bm_<?= $meta["language_id"]?>"><?= $meta["language_id"]; ?></a></li>
				<?php endforeach; ?>
				<li><a href="#lg_bm_show_all">Show all</a></li>
			</ul>
		<?php endif; */ ?>
		<div class="alert info"><?= lang('alert.info.leave_blank_to_inherit')?></div>
		<?php
			$count = 0; 
			if(isset($ext_settings["channels"][$channel_id]))
			{
				foreach ($entry_meta as $meta){
					print $this->load->view('fieldtype/_meta',
						array(
							"input_prefix" => $input_prefix,
							"meta" => $meta,
							"count" => $count,
							"ext_settings" => $ext_settings,
							"channel_ext_settings" => $ext_settings["channels"][$channel_id],
							"channel_id" => $channel_id
						), TRUE);
					$count++;
				}
			}
		?>
	</div>

<?php endif; ?>
	
</div>
