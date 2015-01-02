<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * NSM .htaccess Generator Extension
 *
 * @package			NsmHtaccessGenerator
 * @version			1.1.5
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2012 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-htaccess-generator
 * @see 			http://expressionengine.com/docs/development/extensions.html
 */

class Nsm_htaccess_generator_ext
{
	public $version			= '1.1.5';
	public $name			= 'NSM .htaccess Generator';
	public $description		= 'Generates .htaccess rules for include method';
	public $docs_url		= 'http://ee-garage.com/nsm-htaccess-generator';
	public $settings_exist	= TRUE;
	public $settings		= array();

	// At leaset one hook is needed to install an extension
	public $hooks = array('entry_submission_end', 'update_template_end');

	public $default_site_settings = array(
		'enabled' => TRUE,
		'path' => array(),
		'template' => '
# For more awesome .htaccess rules and optimisations
# checkout the HTML5 Boilerplate .htaccess files
# https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess

# Although highly unlikely, your host may have +FollowSymLinks enabled at the root level,
# yet disallow its addition in .htaccess; in which case, 
# adding +FollowSymLinks will break your setup (probably a 500 error), 
# so just remove it, and your rules should work fine.
Options +FollowSymlinks

# EE 404 page for missing pages
ErrorDocument 404 /index.php/{ee:404}

# Simple 404 for missing files
<FilesMatch "(\.jpe?g|gif|png|bmp|css|js|flv)$">
  ErrorDocument 404 "File Not Found"
</FilesMatch>

# Rewriting will likely already be on, uncomment if it isnt
# <IfModule mod_rewrite.c>
# RewriteEngine On
# RewriteBase /
# </IfModule>

# Block access to "hidden" directories whose names begin with a period. This
# includes directories used by version control systems such as Subversion or Git.
<IfModule mod_rewrite.c>
  RewriteRule "(^|/)\." - [F]
</IfModule>

# remove the www - Uncomment to activate
<IfModule mod_rewrite.c>
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
  RewriteRule ^(.*)$ http://%1/$1 [R=301,L]
</IfModule>

# Remove the trailing slash to paths without an extension
# Uncomment to activate
# <IfModule mod_rewrite.c>
#   RewriteRule ^(.*)/$ /$1 [R=301,L]
# </IfModule>

# Remove index.php
# Uses the "include method"
# http://expressionengine.com/wiki/Remove_index.php_From_URLs/#Include_List_Method
# <IfModule mod_rewrite.c>
RewriteCond %{QUERY_STRING} !^(ACT=.*)$ [NC]
RewriteCond %{REQUEST_URI} !(\.[a-zA-Z0-9]{1,5})$
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} ^/({ee:template_groups}{ee:pages}members|P[0-9]{2,8}) [NC]
RewriteRule (.*) /index.php/$1 [L]'

	);


	// ====================================
	// = Delegate & Constructor Functions =
	// ====================================

	/**
	 * PHP5 constructor function.
	 *
	 * @access public
	 * @return void
	 **/
	function __construct()
	{
		// set the addon id
		$this->addon_id = strtolower(substr(__CLASS__, 0, -4));
	
		// Create a singleton reference
		$EE =& get_instance();

		// define a constant for the current site_id rather than calling $PREFS->ini() all the time
		if (defined('SITE_ID') == FALSE) {
			define('SITE_ID', $EE->config->item('site_id'));
		}

		// Load the addons model and check if the the extension is installed
		// Get the settings if it's installed
		$EE->load->model('addons_model');
		if ($EE->addons_model->extension_installed($this->addon_id)) {
			$this->settings = $this->_getSettings();
		}

		// Init the cache
		$this->_initCache();
	}

	/**
	 * Initialises a cache for the addon
	 * 
	 * @access private
	 * @return void
	 */
	private function _initCache()
	{
		// Create a singleton reference
		$EE =& get_instance();

		// Sort out our cache
		// If the cache doesn't exist create it
		if (! isset($EE->session->cache[$this->addon_id])) {
			$EE->session->cache[$this->addon_id] = array();
		}

		// Assig the cache to a local class variable
		$this->cache =& $EE->session->cache[$this->addon_id];
	}






	// ===============================
	// = Hook Functions =
	// ===============================

	public function entry_submission_end($entry_id, $entry_meta, $data)
	{
		$EE =& get_instance();
		$response = $this->_generateHtaccess();
		$this->_processAlerts($response['alerts']);
	}

	public function update_template_end($template_id, $message)
	{
		$EE =& get_instance();
		if ($message != $EE->lang->line('template_updated')) {
			return;
		}
		$response = $this->_generateHtaccess();
		$this->_processAlerts($response['alerts']);
	}

	/**
	 * Generate the .htaccess file and save it
	 *
	 * @access	private
	 * @return array The response status and msg string
	 */
	private function _generateHtaccess()
	{
		$EE =& get_instance();
		$EE->load->helper('file');
		$EE->load->helper('security');
		$EE->lang->loadfile($this->addon_id);

		$new_htaccess = "";

		// Prepare the template groups
		$template_groups = array();
		$query = $EE->db->get_where('template_groups', array('site_id' => SITE_ID));

		if ($query->num_rows > 0) {
			foreach ($query->result() as $row) {
				$template_groups[] = $row->group_name;
			}
		}

		// Prepare pages
		$EE->load->model('addons_model');
        $EE->load->helper('string');
		$pages_string = false;

		if( $EE->addons_model->module_installed('pages')
			|| $EE->addons_model->module_installed('structure')
		) {
			$EE->db->select('site_pages');
			$EE->db->where('site_id', SITE_ID);
			$query = $EE->db->get('sites');
			$pages = unserialize(base64_decode($query->row('site_pages')));

			if (
				isset($pages[SITE_ID])
				&& !empty($pages[SITE_ID])
				&& isset($pages[SITE_ID]['uris'])
			) {
				$page_roots = array();
				foreach ($pages[SITE_ID]['uris'] as $page_id => $page_url) {
					$parts = explode("/", ltrim($page_url, "/"));
					if (!empty($parts[0])) {
						$page_roots[] = $parts[0];
					}
				}
				$pages_string = implode("|", array_unique($page_roots)) . "|";
			}
		}

		// Prepare HASH
		$hash = "*lg:" . do_hash(time()) . "*";

		foreach ($this->settings['path'] as $path) {
			// Check the old .htaccess file exists
			$old_htaccess = read_file(trim($path));
			if ($old_htaccess === FALSE ) {
				// Error
				$response['alerts']['error'][] = sprintf($EE->lang->line("alert.error.file_doesnt_exist"), $path);
				continue;
			}

			$tmpl = str_replace('$', $hash, $this->settings['template']);
			$new_htaccess = "# -- NSM .htaccess Generator Start --".
							"\n# .htaccess generated by NSM .htaccess Generator v{$this->version}".
							"\n# @see: {$this->docs_url}".
							"\n\n{$tmpl}".
							"\n\n# -- NSM .htaccess Generator End --";

			// replace template groups
			$new_htaccess = str_replace("{ee:template_groups}", implode("|", $template_groups) . "|", $new_htaccess);
			// Replace EE pages
			$new_htaccess = str_replace("{ee:pages}", $pages_string, $new_htaccess);
			// replace 404
			$new_htaccess = str_replace("{ee:404}", $EE->config->item("site_404"), $new_htaccess);
			// add / update the template
			$new_htaccess = (strpos($old_htaccess, "# -- NSM .htaccess Generator Start --") !== FALSE)
							? preg_replace("/# -- NSM \.htaccess Generator Start --.*?# -- NSM \.htaccess Generator End --/s", $new_htaccess, $old_htaccess)
							: $old_htaccess . "\n\n" . $new_htaccess;
			// replace the hash
			$new_htaccess = str_replace($hash, '$', $new_htaccess);

			if (! write_file(trim($path), $new_htaccess) ) {
				// Error
				$response['alerts']['error'][] = sprintf($EE->lang->line('alert.error.htaccess_not_generated'), $path);
			}

			// All good
			$response['alerts']['success'][] = sprintf($EE->lang->line('alert.success.htaccess_generated'), $path);
		}

		// Return the response array
		return $response;
	}

	/**
	 * Process alerts and add them to flashdata
	 *
	 * @access	private
	 */
	private function _processAlerts($alerts) {
		$EE =& get_instance();
		foreach ($alerts as $alert_type => $_alerts) {
			if ($alert_type == 'error') {
				$alert_type = 'failure';
			}
			$EE->session->set_flashdata("message_".$alert_type, implode($_alerts));
		}
	}

	
	/**
	 * Checks if NSM Morphine has been installed and activated
	 *
	 * @access	public
	 */
	public function checkNsmMorphineStatus()
	{
		// check database to ensure that NSM Morphine is activated
		$EE =& get_instance();
		$morphine_acc = $EE->db->select('accessory_version')
								->where('class', 'Nsm_morphine_theme_acc')
								->get('exp_accessories');
		if ($morphine_acc->num_rows() > 0 && file_exists(PATH_THIRD . 'nsm_morphine_theme/config.php')) {	
			return true;
		} else {
			return false;
		}
		
	}
	


	/**
	 * Checks the status of the htaccess file(s)
	 *
	 * @access	private
	 */
	public function checkHtaccessFiles()
	{
		$EE =& get_instance();
		$EE->lang->loadfile($this->addon_id);
		$status = array(
			'paths' => array(),
			'status' => true
		);
		if (count($this->settings['path']) == 0) {
			return $status;
		}
		foreach ($this->settings['path'] as $count => $path) {
			$path_exists = file_exists($path);
			$path_writable = is_writable($path);
			if ($path_exists && $path_writable) {
				// path is good, no need to log it
				/*$status['paths'][$count] = array(
					'status' => true,
					'message' => ''
				);*/
			} else {
				$status['status'] = false;
				if (!$path_exists) {
					// path does not exist
					$status['paths'][$count] = array(
						'status' => false,
						'message' => sprintf($EE->lang->line('nsm_htaccess_generator.alert.error.file_doesnt_exist'), $path)
					);
				} elseif (!$path_writable) {
					// could not write to file
					$status['paths'][$count] = array(
						'status' => false,
						'message' => sprintf($EE->lang->line('nsm_htaccess_generator.alert.error.file_no_write'), $path)
					);
				}
			}
		}
		return $status;
	}


	// ===============================
	// = Setting Functions =
	// ===============================

	/**
	 * Render the custom settings form and processes post vars
	 *
	 * @access public
	 * @return The settings form HTML
	 */
	public	function settings_form()
	{
		$EE =& get_instance();
		$EE->lang->loadfile($this->addon_id);
		$EE->load->library($this->addon_id."_helper");
		
		// check to see if NSM Morphine is properly installed
		if (!$this->checkNsmMorphineStatus()) {
			return $EE->lang->line('nsm_htaccess_generator.error.no_morphine');
		}
		
		// Create the variable array
		$vars = array(
			'addon_id' => $this->addon_id,
			'error' => FALSE,
			'input_prefix' => __CLASS__,
			'message' => FALSE,
		);
		
		// get a a status report on all htaccess paths
		$htaccess_report = $this->checkHtaccessFiles();
		if ($htaccess_report['status'] == false) {
			$htaccess_errors = $EE->lang->line('nsm_htaccess_generator.alert.error.file_status_false');
			$htaccess_errors .= "<ul>";
			foreach ($htaccess_report['paths'] as $path_count => $path_status) {
				$htaccess_errors .= "<li>".$path_status['message']."</li>";
			}
			$htaccess_errors .= "</ul>";
			$vars['error'] = $htaccess_errors;
		}
		
		// Are there settings posted from the form?
		if ($data = $EE->input->post(__CLASS__)) {
			if (!isset($data["enabled"])) {
				$data["enabled"] = TRUE;
			}
	
			// No errors ?
			if (! $vars['error'] = validation_errors()) {
				$this->settings = $this->_saveSettings($data);
				$response = $this->_generateHtaccess();
				$response['alerts']['success'][] = $EE->lang->line('alert.success.extension_settings_saved');
				$this->_processAlerts($response['alerts']);
				$EE->functions->redirect(BASE.AMP.'C=addons_extensions');
			}
		} else {
			// Sometimes we may need to parse the settings
			$data = $this->settings;
		}
	
		$vars["data"] = $data;

		$template = $EE->load->view('extension/_path_row', array(
			"path" => false,
			"input_prefix" => __CLASS__,
			"count" => false,
			"class" => false
		), TRUE);

		$template = $EE->javascript->generate_json($template);

		$js = <<<EOE
			NSM_htaccess = { template: $('.$template.') };
			$("#htaccess_paths")
				.NSM_Cloneable({
					addTrigger: function(){ return $(this).next().find(".add") },
					cloneTemplate: NSM_htaccess.template,
				});
EOE;

		$EE->nsm_htaccess_generator_helper->addJS($js, array('file' => FALSE));

		// Return the view.
		return $EE->load->view('/extension/settings', $vars, TRUE);
	}

	/**
	 * Builds default settings for the site
	 *
	 * @access private
	 * @param int $site_id The site id
	 * @param array The default site settings
	 */
	private function _buildDefaultSiteSettings($site_id = FALSE)
	{
		// return settings
		return $this->default_site_settings;
	}


	// ===============================
	// = Class and Private Functions =
	// ===============================

	/**
	 * Called by ExpressionEngine when the user activates the extension.
	 *
	 * @access		public
	 * @return		void
	 **/
	public function activate_extension()
	{
		$this->_createSettingsTable();
		$this->settings = $this->_getSettings();
		$this->_registerHooks();
	}

	/**
	 * Called by ExpressionEngine when the user disables the extension.
	 *
	 * @access		public
	 * @return		void
	 **/
	public function disable_extension()
	{
		$this->_unregisterHooks();
	}

	/**
	 * Called by ExpressionEngine updates the extension
	 *
	 * @access public
	 * @return void
	 **/
	public function update_extension($current=FALSE){

		$EE =& get_instance();

		$EE->load->library('javascript');
		if ( ! function_exists('json_decode')) {
			$EE->load->library('Services_json');
		}

		if ($current < "1.0.6") {
			// Get the extension settings
			$query = $EE->db->query("SELECT * FROM `exp_nsm_addon_settings` WHERE `addon_id` = '{$this->addon_id}'");

			// Convert the path to an array
			foreach ($query->result_array() as $site) {
				$site["settings"] = json_decode($site["settings"], true);
				$site['settings']['path'] = array($site['settings']['path']);
			}

			// generate the json
			$site["settings"] = $EE->javascript->generate_json($site["settings"], true);

			// update the DB
			$query = $EE->db->update(
						'exp_nsm_addon_settings',
						array('settings' => $site["settings"]),
						array(
							'addon_id' => $this->addon_id,
							'site_id' => $site['site_id']
						));
		}

		$EE->db
			->where('class', __CLASS__)
			->update('extensions', array('version' => $this->version));
	}





	// ======================
	// = Settings Functions =
	// ======================

	/**
	 * The settings table
	 *
	 * @access		private
	 **/
	private static $settings_table = 'nsm_addon_settings';

	/**
	 * The settings table fields
	 *
	 * @access		private
	 **/
	private static $settings_table_fields = array(
		'id'						=> array(	'type'			 => 'int',
												'constraint'	 => '10',
												'unsigned'		 => TRUE,
												'auto_increment' => TRUE,
												'null'			 => FALSE),
		'site_id'					=> array(	'type'			 => 'int',
												'constraint'	 => '5',
												'unsigned'		 => TRUE,
												'default'		 => '1',
												'null'			 => FALSE),
		'addon_id'					=> array(	'type'			 => 'varchar',
												'constraint'	 => '255',
												'null'			 => FALSE),
		'settings'					=> array(	'type'			 => 'mediumtext',
												'null'			 => FALSE)
	);
	
	/**
	 * Creates the settings table table if it doesn't already exist.
	 *
	 * @access		protected
	 * @return		void
	 **/
	protected function _createSettingsTable()
	{
		$EE =& get_instance();
		$EE->load->dbforge();
		$EE->dbforge->add_field(self::$settings_table_fields);
		$EE->dbforge->add_key('id', TRUE);

		if (!$EE->dbforge->create_table(self::$settings_table, TRUE)) {
			log_message('error', "Unable to create settings table for ".__CLASS__.": " . $EE->config->item('db_prefix') . self::$settings_table);
			show_error("Unable to create settings table for ".__CLASS__.": " . $EE->config->item('db_prefix') . self::$settings_table);
		}
	}

	/**
	 * Get the addon settings
	 *
	 * 1. Load settings from the session
	 * 2. Load settings from the DB
	 * 3. Create new settings and save them to the DB
	 * 
	 * @access private
	 * @param boolean $refresh Load the settings from the DB not the session
	 * @return mixed The addon settings 
	 */
	private function _getSettings($refresh = FALSE)
	{
		$EE =& get_instance();
		$settings = FALSE;

		if(
			// If the addon is installed
			! isset($EE->extensions->version_numbers[__CLASS__])
			// and we're not running the current version
			|| $EE->extensions->version_numbers[__CLASS__] != $this->version
		) {
			return $settings;
		}

		if (
			// if there are settings in the settings cache
			isset($this->cache[SITE_ID]['settings']) === TRUE 
			// and we are not forcing a refresh
			AND $refresh != TRUE
		) {
			// get the settings from the session cache
			$settings = $this->cache[SITE_ID]['settings'];
		} else {
			$settings_query = $EE->db->get_where(
									self::$settings_table,
									array(
										'addon_id' => $this->addon_id,
										'site_id' => SITE_ID
									)
								);
			// there are settings in the DB
			if ($settings_query->num_rows()) {
				if ( ! function_exists('json_decode'))
					$EE->load->library('Services_json');

				$settings = json_decode($settings_query->row()->settings, TRUE);
				$this->_saveSettingsToSession($settings);
			} else {
				// no settings for the site
				$settings = $this->_buildDefaultSiteSettings(SITE_ID);
				$this->_saveSettings($settings);
			}
		}

		// Merge config settings
		foreach ($settings as $key => $value) {
			if ($EE->config->item($this->addon_id . "_" . $key)) {
				$settings[$key] = $EE->config->item($this->addon_id . "_" . $key);
			}
		}
		
		// is the settings path defined? if not make it an array
		if (empty($settings['path'])) {
			$settings['path'] = array();
		}
		
		// Check to see if the path is an array.
		if (is_array($settings['path']) == false) {
			$EE->lang->loadfile($this->addon_id);
			$EE->output->show_user_error(
				'general',
				lang('settings_error'),
				'Settings error'
			);
		}

		return $settings;
	}

	/**
	 * Save settings to DB and to the session
	 *
	 * @access private
	 * @param array $settings
	 */
	private function _saveSettings($settings)
	{
		$this->_saveSettingsToDatabase($settings);
		$this->_saveSettingsToSession($settings);
		return $settings;
	}

	/**
	 * Save settings to DB
	 *
	 * @access private
	 * @param array $settings
	 * @return array The settings
	 */
	private function _saveSettingsToDatabase($settings)
	{
		$EE =& get_instance();
		$data = array(
			'settings'	=> $EE->javascript->generate_json($settings, true),
			'addon_id'	=> $this->addon_id,
			'site_id'	=> SITE_ID
		);
		$settings_query = $EE->db->get_where(
							'nsm_addon_settings',
							array(
								'addon_id' =>  $this->addon_id,
								'site_id' => SITE_ID
							), 1);

		if ($settings_query->num_rows() == 0) {
			$query = $EE->db->insert('exp_nsm_addon_settings', $data);
			log_message('info', __METHOD__ . ' Inserting settings: $query => ' . $query);
		} else {
			$query = $EE->db->update(
							'exp_nsm_addon_settings',
							$data,
							array(
								'addon_id' => $this->addon_id,
								'site_id' => SITE_ID
							));
			log_message('info', __METHOD__ . ' Updating settings: $query => ' . $query);
		}
		return $settings;
	}

	/**
	 * Save the settings to the session
	 *
	 * @access private
	 * @param array $settings The settings to push to the session
	 * @return array the settings unmodified
	 */
	private function _saveSettingsToSession($settings){
		$this->cache[SITE_ID]['settings'] = $settings;
		return $settings;
	}




	// ======================
	// = Hook Functions     =
	// ======================

	/**
	 * Sets up and subscribes to the hooks specified by the $hooks array.
	 *
	 * @access private
	 * @param array $hooks A flat array containing the names of any hooks that this extension subscribes to. By default, this parameter is set to FALSE.
	 * @return void
	 * @see http://expressionengine.com/docs/development/extension_hooks/index.html
	 **/
	private function _registerHooks($hooks = FALSE)
	{
		$EE =& get_instance();

		if ($hooks == FALSE && isset($this->hooks) == FALSE) {
			return;
		}

		if (!$hooks) {
			$hooks = $this->hooks;
		}

		$hook_template = array(
			'class'    => __CLASS__,
			'settings' => "a:0:{}",
			'version'  => $this->version,
		);

		foreach ($hooks as $key => $hook) {
			if (is_array($hook)) {
				$data['hook'] = $key;
				$data['method'] = (isset($hook['method']) === TRUE) ? $hook['method'] : $key;
				$data = array_merge($data, $hook);
			} else {
				$data['hook'] = $data['method'] = $hook;
			}

			$hook = array_merge($hook_template, $data);
			$EE->db->insert('exp_extensions', $hook);
		}
	}

	/**
	 * Removes all subscribed hooks for the current extension.
	 * 
	 * @access private
	 * @return void
	 * @see http://expressionengine.com/docs/development/extension_hooks/index.html
	 **/
	private function _unregisterHooks()
	{
		$EE =& get_instance();
		$EE->db->where('class', __CLASS__);
		$EE->db->delete('exp_extensions'); 
	}
}