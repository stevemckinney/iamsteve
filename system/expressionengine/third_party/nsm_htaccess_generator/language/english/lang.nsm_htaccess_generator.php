<?php

/**
 * NSM .htaccess Generator Language File
 *
 * @package			NsmHtaccessGenerator
 * @version			1.1.5
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2012 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-htaccess-generator
 * @see				http://expressionengine.com/docs/development/modules.html#lang_file
 */
$lang = array(

	/* Module */
	'nsm_htaccess_generator' => 'NSM .htaccess Generator',
	'nsm_htaccess_generator_module_name' => 'NSM .htaccess Generator: Module name',
	'nsm_htaccess_generator_module_description' => 'NSM .htaccess Generator: Module description',

	/* Extension */
	'save_extension_settings' => 'Save extension settings',

	'htaccess_path_title' => '.htaccess paths',
	'htaccess_path_info' => '<p>NSM .htaccess Generator requires that an existing .htaccess file exists and is writable. Non NSM .htaccess rules these will not be modified by this extension. Enter the full server path including .htaccess or .httpconf (IIS).',
	'htaccess_template_title' => '.htaccess template',
	'htaccess_template_info' => '
										<p>The tags below will be replaced with their associated values in the .htaccess template:</p>
										<p>
											<strong><code>{ee:template_groups}</code></strong> will be replaced with a pipe delimited list of this sites template groups with an additional pipe "|" appended. <br />
											<strong><code>{ee:pages}</code></strong> will be replaced with a pipe delimited list of this sites page urls with an additional pipe "|" appended. <br />
											<strong><code>{ee:404}</code></strong> will be replaced with the sites 404 path ie: site/404.
										</p>
										<p>Read more about the "include method" of removing your sites index.php on the <a rel="external" target="_blank" href="http://expressionengine.com/index.php?affiliate=ee-garage&amp;page=/wiki/Remove_index.php_From_URLs/#Include_List_Method">ExpressionEngine Wiki</a>.</p>',

	/* Messages / Alerts */
	'nsm_htaccess_generator.alert.error.file_status_false' => "<p><strong>There was a problem with one or more .htaccess paths defined in the extension settings.</strong></p>",
	'nsm_htaccess_generator.alert.error.file_doesnt_exist' => "File couldn't be found at <code>%s</code>, check that the file exists or that the path is correct.",
	'nsm_htaccess_generator.alert.error.file_no_write' => "File can't be written to at <code>%s</code>, check the files permissions.",
	'alert.error.file_doesnt_exist' => "<p>File couldn't be found at <code>%s</code></p>",
	'alert.error.file_no_write' => "<p>File can't be written to at <code>%s</code>, check the files permissions</p>",
	'alert.error.htaccess_not_generated' => '<p>File was not generated at <code>%s</code>, check the files permissions</p>',
	'alert.success.htaccess_generated' => '<p>File generated successfully at <code>%s</code></p>',

	'alert.success.extension_settings_saved' 	=> '<p>Extension settings have been saved.</p>',
	
	'settings_error' => '<p>The .htaccess path setting is a string. It should be an array. If the setting has been manually set in the config.php (or config_bootstrap.php) update the value.</p>
						<p>&rarr; <a href="http://ee-garage.com/nsm-htaccess-generator/support">More information about this issue.</a></p>',
	
	'nsm_htaccess_generator.error.no_morphine' => '<p class="alert error"><strong>NSM Morphine Theme could not be found</strong>. Please ensure that you have downloaded the <a href="http://ee-garage.com/nsm-morphine#download">latest version</a> and have <a href="http://ee-garage.com/nsm-morphine/user-guide#toc-installation_activation">activated the accessory</a>.</p>'
);