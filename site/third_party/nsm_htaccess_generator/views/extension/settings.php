<?php

/**
 * View for Control Panel Settings Form
 * This file is responsible for displaying the user-configurable settings for the NSM Multi Language extension in the ExpressionEngine control panel.
 *
 * @package			NsmHtaccessGenerator
 * @version			1.1.5
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2012 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-htaccess-generator
 * @see 			http://expressionengine.com/docs/development/extensions.html
 **/

$EE =& get_instance();

?>

<div class="mor">
	<?= form_open(
			'C=addons_extensions&M=extension_settings&file=' . $addon_id,
			array('id' => $addon_id . '_prefs'),
			array($input_prefix."[enabled]" => TRUE)
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
		<h2><?= lang('htaccess_path_title'); ?></h2>
		<div class="alert info"><?= lang("htaccess_path_info") ?></div>
		<table class="cloneable NSM_Stripeable" id="htaccess_paths">
			<tbody>
				<?php
					if(!empty($data['path'])) : 
						foreach($data['path'] as $count => $path ) : 
							$class = ($count%2) ? 'even' : 'odd';
				?>
					<?= $EE->load->view('extension/_path_row.php', 
										array(
											"path" => $path,
											"input_prefix" => $input_prefix,
											"count" => $count,
											"class" => $class
										)
									);
					?>
				<?php endforeach; endif; ?>
			</tbody>
		</table>
		<div class="actions">
			<span class="icon add">Add .htaccess path</span>
		</div>
	</div>

	<div class="tg">
		<h2><?= lang('htaccess_template_title'); ?></h2>
		<div class="alert info"><?= lang("htaccess_template_info") ?></div>
		<table>
			<tbody>
				<tr class="odd">
					<td>
						<textarea 
							style="height:470px" 
							name="<?= $input_prefix ?>[template]
						"><?= $data["template"] ?></textarea>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="actions">
		<input type="submit" class="submit" value="<?= lang('save_extension_settings') ?>" />
	</div>

	<?= form_close(); ?>
</div>