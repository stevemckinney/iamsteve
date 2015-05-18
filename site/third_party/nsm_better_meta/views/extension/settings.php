<?php

/**
 * View for Control Panel ext_settings Form
 * This file is responsible for displaying the user-configurable ext_settings for the NSM Multi Language extension in the ExpressionEngine control panel.
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

<div class="mor">
	<?= form_open(
			'C=addons_extensions&M=extension_settings&file=' . $addon_id,
			array('id' => $addon_id . '_prefs'),
			array($input_prefix . "[enabled]" => TRUE)
		)
	?>

	<!-- 
	===============================
	Alert Messages
	===============================
	-->

	<?php if($error) : ?>
		<div class="alert error"><?php print($error); ?></div>
	<?php endif; ?>

	<?php if($message) : ?>
		<div class="alert success"><?php print($message); ?></div>
	<?php endif; ?>
	
	<div class="tg">
		<h2><?= lang("Channel preferences"); ?></h2>
		<div class="alert info"><?= lang("publish_tab_customisation_info") ?></div>

		<?php if (empty($channels)) : ?>

			<div class="alert error"><?= lang("alert.error.no_channels_exist") ?></div>

		<?php else : ?>

			<ul class="menu tabs">
				<?php foreach ($channels as $count => $channel) : ?>
					<li><a href="#channel_prefs-<?= $channel->channel_name ?>"><?=  $channel->channel_title ?></a></li>
				<?php endforeach; ?>
				<li><a href="#channel_prefs-show_all"><?= lang("Show all"); ?></a></li>
			</ul>

			<?php $fields = array('title', 'description', 'keywords', 'author', 'publisher', 'rights', 'canonical_url', 'robots', 'sitemap', 'geo'); ?>
			<?php foreach($channels as $count => $channel) : $channel_settings = $data['channels'][$channel->channel_id]; ?>
				<div id="channel_prefs-<?= $channel->channel_name ?>">
					<h3><?=  $channel->channel_title ?></h3>
					<table>
						<tbody>
							<tr class="even">
								<th scope="row"><?= lang("Which meta fields will be displayed in the publish tab?"); ?></th>
								<td>
									<?php
										foreach($fields as $field_count => $field)
										{
											echo $EE->nsm_better_meta_helper->checkbox(
												$input_prefix.'[channels]['.$channel->channel_id.'][enabled_fields][]',
												$field,
												in_array($field, $channel_settings['enabled_fields']),
												array(
													"input_id" => $input_prefix.'_channels_'.$channel->channel_id.'_enabled_fields_'.$field,
													"label" => $field
												)
											);
										}
									?>
								</td>
							</tr>
							<tr class="odd">
								<th scope="row"><?= lang("Include entries in sitemap?"); ?></th>
								<td>
									<?php
										echo $EE->nsm_better_meta_helper->yesNoRadioGroup(
											$input_prefix."[channels][" . $channel->channel_id . "][sitemap_include]",
											$channel_settings['sitemap_include'],
											array('flags' => array("y","n"))
										);
									?>
								</td>
							</tr>
							<tr class="even">
								<th scope="row"><?= lang("change_frequency"); ?></th>
								<td>
									<?php
										echo $EE->nsm_better_meta_helper->selectbox(
											$input_prefix."[channels][" . $channel->channel_id . "][sitemap_change_frequency]",
											array("Always","Hourly","Daily","Weekly","Monthly","Yearly","Never"),
											$channel_settings['sitemap_change_frequency'],
											array("value_is_label" => TRUE)
										);
									?>
								</td>
							</tr>
							<tr class="odd">
								<th scope="row"><?= lang("priority"); ?></th>
								<td><?php 
										echo $EE->nsm_better_meta_helper->selectbox(
											$input_prefix."[channels][" . $channel->channel_id . "][sitemap_priority]",
											array("0.1","0.2","0.3","0.4","0.5","0.6","0.7","0.8","0.9","1.0"),
											$channel_settings['sitemap_priority'],
											array("value_is_label" => TRUE)
										);
									?>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
	
	<div class="tg">
		<h2><?= lang('Default site meta') ?></h2>
		<div class="alert info"><?= lang("default_site_meta_values_info") ?></div>
		<ul class="menu tabs">
			<li><a href="#default_site_meta-standard">Standard</a></li>
			<li><a href="#default_site_meta-geo">GEO</a></li>
			<li><a href="#default_site_meta-robots">Robots</a></li>
			<li><a href="#default_site_meta-show_all">Show all</a></li>
		</ul>

		<div id="default_site_meta-standard">
			<h3><?= lang('Standard attributes') ?></h3>
			<table>
				<tbody>
					<tr class="even">
						<th scope="row">
							<?= lang("site_title") ?>
							<span class='note'><?= lang("site_title_info") ?></span>
						</th>
						<td>
							<input
								type="text"
								length="66"
								id="nsm_better_meta_ext_site_title"
								value="<?= form_prep($data['default_site_meta']['site_title']) ?>"
								name="<?=$input_prefix?>[default_site_meta][site_title]"
							/>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row">
							<?= lang("entry_title_divider") ?>
							<span class="note"><?= lang('entry_title_divider_info'); ?></span>
						</th>
						<td>
							<?= $EE->nsm_better_meta_helper->selectbox(
									$input_prefix."[divider]",
									array_flip(Nsm_better_meta_ext::$dividers),
									(int)$data['divider']
								);
							?>
						</td>
					</tr>
					<tr class="even">
						<th scope="row">
							<?= lang("description") ?>
						</th>
						<td>
							<textarea
								recommended_length="150"
								id='nsm_better_meta_ext_description'
								name="<?= $input_prefix ?>[default_site_meta][description]"
								rows="5"
							><?= form_prep($data['default_site_meta']['description']) ?></textarea>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row">
							<?= lang("keywords") ?>
						</th>
						<td>
							<input
								type="text"
								recommended_length="100"
								id='nsm_better_meta_ext_keywords'
								value="<?= form_prep($data['default_site_meta']['keywords']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][keywords]"
							/>
						</td>
					</tr>
					<tr class="even">
						<th scope="row"><?= lang("author") ?></th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['author']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][author]"
							/>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row"><?= lang("publisher") ?></th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['publisher']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][publisher]"
							/>
						</td>
					</tr>
					<tr class="even">
						<th scope="row"><?= lang("rights") ?></th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['rights']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][rights]"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id="default_site_meta-geo">
			<h3><?= lang("geo_meta") ?></h3>
			<div class="alert">
				<?= lang("geo_meta_info") ?>
				<?= lang("geo_meta_default_info"); ?>
			</div>
			<table>
				<tbody>
					<tr class="even">
						<th scope="row">
							<?= lang("region") ?>
							<span class='note'><?= lang('region_info') ?></span>
						</th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['geo_region']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][geo_region]"
								id="nsm_better_meta_ext_region"
							/>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row">
							<?= lang("placename") ?>
							<span class='note'><?= lang('placename_info') ?></span>
						</th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['geo_placename']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][geo_placename]"
								id="nsm_better_meta_ext_placename"
							/>
						</td>
					</tr>
					<tr class="even">
						<th scope="row"><?= lang("latitude") ?></th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['geo_latitude']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][geo_latitude]"
								id="nsm_better_meta_ext_latitude"
							/>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row"><?= lang("longitude") ?></th>
						<td>
							<input
								type="text"
								value="<?= form_prep($data['default_site_meta']['geo_longitude']) ?>"
								name="<?= $input_prefix ?>[default_site_meta][geo_longitude]"
								id="nsm_better_meta_ext_longitude"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id="default_site_meta-robots">
			<h3><?= lang("robots_meta") ?></h3>
			<div class="alert"><?= lang("robots_meta_info") ?></div>
			<table>
				<tbody>
					<tr class="even">
						<th scope="row">Index entry?</th>
						<td>
							<?= $EE->nsm_better_meta_helper->yesNoRadioGroup(
									$input_prefix."[default_site_meta][robots_index]",
									$data['default_site_meta']["robots_index"],
									array('flags' => array("y","n"))
								);
							?>
						</td>
					</tr>
					<tr class="odd">
						<th scope="row">Archive entries</th>
						<td>

							<?= $EE->nsm_better_meta_helper->yesNoRadioGroup(
									$input_prefix."[default_site_meta][robots_archive]",
									$data['default_site_meta']["robots_archive"],
									array('flags' => array("y","n"))
								);
							?>
						</td>
					</tr>
					<tr class="even">
						<th scope="row">Follow external links?</th>
						<td>
							<?= $EE->nsm_better_meta_helper->yesNoRadioGroup(
									$input_prefix."[default_site_meta][robots_follow]",
									$data['default_site_meta']["robots_follow"],
									array('flags' => array("y","n"))
								);
							?>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>


	<div class="tg">
		<h2><?= lang("meta_template_title") ?></h2>
		<div class="alert info"><?= lang("meta_template_info") ?></div>
		<table>
			<tbody>
				<tr class="even">
					<th scope="row"><?= lang("meta_template_label") ?></th>
					<td>
						<?php $default_site_meta_template = isset($data['meta_template']) ? $data['meta_template'] : ''; ?>
						<textarea style="height:300px" name="<?= $input_prefix ?>[meta_template]"><?= form_prep($default_site_meta_template) ?></textarea>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- 
	===============================
	Submit Button
	===============================
	-->

	<div class="actions">
		<input type="submit" class="submit" value="<?php print lang('save_extension_settings') ?>" />
	</div>

	<?= form_close(); ?>
</div>
