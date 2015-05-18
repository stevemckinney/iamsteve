<?php

/**
 * View for Control Panel custom field partial
 * A single meta group
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 **/

$EE =& get_instance();

?>
<div id="nsm_bm_<?= $count; ?>">

	<?= form_hidden("{$input_prefix}[{$count}][id]", $meta["id"]); ?>
	<?= form_hidden("{$input_prefix}[{$count}][entry_default]", $meta["entry_default"]); ?>
	<?= form_hidden("{$input_prefix}[{$count}][language_id]", $meta["language_id"]); ?>
	<?php $row_count = -1; ?>
	<table>
		<tbody>
			<?php if(in_array("title", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('title', "nsm_bm_{$count}_title") ?></th>
				<td colspan="2">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_title",
						"name" => "{$input_prefix}[{$count}][title]",
						"value" => $meta["title"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("description", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('description', "nsm_bm_{$count}_description") ?></th>
				<td colspan="2">
					<?= form_textarea(array(
						"id" => "nsm_bm_{$count}_description",
						"name" => "{$input_prefix}[{$count}][description]",
						"value" => $meta["description"],
						"cols" => FALSE,
						"rows" => FALSE,
						"recommended_length" => 150
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("keywords", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row" rowspan="2"><?= lang('keywords', "nsm_bm_{$count}_keywords") ?></th>
				<td colspan="2" class="append-keywords">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_keywords",
						"name" => "{$input_prefix}[{$count}][keywords]",
						"value" => $meta["keywords"],
						"recommended_length" => 100
					)); ?>
				</td>
			</tr>
			<tr class="<?= ($row_count % 2) ? "odd" : "even"; ?>">
				<td colspan="2">
					<?php
						echo $EE->nsm_better_meta_helper->checkbox(
							"{$input_prefix}[{$count}][keywords_append_default]",
							"y",
							$meta["keywords_append_default"],
							array(
								"label" => lang("append_default_keywords"),
								"generate_shadow" => TRUE,
								"shadow_value" => "n"
							)
						);
					?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("author", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('author', "nsm_bm_{$count}_author") ?></th>
				<td colspan="2">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_author",
						"name" => "{$input_prefix}[{$count}][author]",
						"value" => $meta["author"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("publisher", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('publisher', "nsm_bm_{$count}_publisher") ?></th>
				<td colspan="2">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_publisher",
						"name" => "{$input_prefix}[{$count}][publisher]",
						"value" => $meta["publisher"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("rights", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('rights', "nsm_bm_{$count}_rights") ?></th>
				<td colspan="2">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_rights",
						"name" => "{$input_prefix}[{$count}][rights]",
						"value" => $meta["rights"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("canonical_url", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row"><?= lang('canonical_url', "nsm_bm_{$count}_canonical_url") ?></th>
				<td colspan="2">
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_canonical_url",
						"name" => "{$input_prefix}[{$count}][canonical_url]",
						"value" => $meta["canonical_url"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("geo", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row" rowspan="4"><?= lang("geo_meta") ?></th>
				<th class="sub-heading"><?= lang('region', "nsm_bm_{$count}_region") ?></th>
				<td>
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_geo_region",
						"name" => "{$input_prefix}[{$count}][geo_region]",
						"value" => $meta["geo_region"]
					)); ?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('placename', "nsm_bm_{$count}_placename") ?></th>
				<td>
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_geo_placename",
						"name" => "{$input_prefix}[{$count}][geo_placename]",
						"value" => $meta["geo_placename"]
					)); ?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('lattitude', "nsm_bm_{$count}_lattitude") ?></th>
				<td>
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_geo_latitude",
						"name" => "{$input_prefix}[{$count}][geo_latitude]",
						"value" => $meta["geo_latitude"]
					)); ?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('longitude', "nsm_bm_{$count}_longitude") ?></th>
				<td>
					<?= form_input(array(
						"id" => "nsm_bm_{$count}_geo_longitude",
						"name" => "{$input_prefix}[{$count}][geo_longitude]",
						"value" => $meta["geo_longitude"]
					)); ?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("robots", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row" rowspan="3"><?= lang('robots_metadata') ?></th>
				<th class="sub-heading"><?= lang('index_entry', "nsm_bm_{$count}_robots_index") ?></th>
				<td>
					<?=
						$EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][robots_index]",
							array("-- Use channel defaults --" => "", "Yes" => "y", "No" => "n"),
							$meta["robots_index"]
						);
					?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('archive_entry', "nsm_bm_{$count}_robots_archive") ?></th>
				<td>
					<?=
						$EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][robots_archive]",
							array("-- Use channel defaults --" => "", "Yes" => "y", "No" => "n"),
							$meta["robots_archive"]
						);
					?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('follow_external_links', "nsm_bm_{$count}_robots_follow") ?></th>
				<td>
					<?=
						$EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][robots_follow]",
							array("-- Use channel defaults --" => "", "Yes" => "y", "No" => "n"),
							$meta["robots_follow"]
						);
					?>
				</td>
			</tr>
			<?php endif; ?>
			<?php if(in_array("sitemap", $channel_ext_settings["enabled_fields"])) : ?>
			<tr class="<?php $row_count++; print($row_count % 2) ? "odd" : "even"; ?>">
				<th scope="row" rowspan="3">Sitemaps</th>
				<th class="sub-heading"><?= lang('include_in_sitemap', "nsm_bm_{$count}_sitemap_include") ?></th>
				<td>
					<?=
						$EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][sitemap_include]",
							array("-- Use channel defaults --" => "", "Yes" => "y", "No" => "n"),
							$meta["sitemap_include"],
							array("input_id" => "nsm_bm_{$count}_sitemap_include")
						);
					?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('change_frequency', "nsm_bm_{$count}_sitemap_change_frequency") ?></th>
				<td>
					<?=
						 $EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][sitemap_change_frequency]",
							array("-- Use channel defaults --" => "", "Always","Hourly","Daily","Weekly","Monthly","Yearly","Never"),
							$meta["sitemap_change_frequency"],
							array(
								"value_is_label" => TRUE,
								"input_id" => "nsm_bm_{$count}_sitemap_change_frequency"
							)
						);
					?>
				</td>
			</tr>
			<tr class="<?php print($row_count % 2) ? "odd" : "even"; ?>">
				<th class="sub-heading"><?= lang('priority', "nsm_bm_{$count}_sitemap_priority") ?></th>
				<td>
					<?=
						 $EE->nsm_better_meta_helper->selectbox(
							$input_prefix."[".$count."][sitemap_priority]",
							array("-- Use channel defaults --" => "", "0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","1.0"),
							$meta["sitemap_priority"],
							array(
								"value_is_label" => TRUE,
								"input_id" => "nsm_bm_{$count}_sitemap_priority"
							)
						);
					?>
				</td>
			</tr>
			<?php endif; ?>
		</tbody>
	</table>
</div>
