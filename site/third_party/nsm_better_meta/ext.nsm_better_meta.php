<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * NSM Better Meta Extension
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see 			http://expressionengine.com/public_beta/docs/development/extensions.html
 */
class Nsm_better_meta_ext
{
	public $version			= '1.1.8';
	public $name			= 'NSM Better Meta';
	public $description		= 'Implements an interface to add meta data to ExpressionEngine channel entries';
	public $docs_url		= 'http://ee-garage.com/nsm-better-meta';
	public $settings_exist	= TRUE;
	public $settings		= array();
	

	// At least one hook is needed to install an extension
	// In some cases you may want settings but not actually use any hooks
	// In those cases we just use a dummy hook
	public $hooks = array('dummy_hook_function');

	public $default_site_settings = array(
		'enabled' => TRUE,
		'channels' => array(),
		'default_site_meta' => array(
			'site_title'		=> '',
			'description'		=> '',
			'keywords'			=> '',
			'publisher'			=> '',
			'rights'			=> '',
			'robots_archive'	=> 'y',
			'robots_follow'		=> 'y',
			'robots_index'		=> 'y',
			'geo_latitude'		=> '',
			'geo_longitude'		=> '',
			'geo_placename'		=> '',
			'geo_region'		=> ''
		),
		'meta_template' => '<title>{title}</title>
<meta name="description" content="{description}" />
<meta name="keywords" content="{keywords}" />
<meta name="robots" content="{robots}" />

<meta name="geo.position" content="{geo_latitude},{geo_longitude}" />
<meta name="geo.placename" content="{geo_placename}" />
<meta name="geo.region" content="{geo_region}" />

{if canonical_url} <link rel="canonical_url" href="{canonical_url}" /> {/if}',

		'divider' => 0
	);
	
	static public $default_entry_meta = array(
		'id'						=> "",
		'entry_id'					=> "",
		'site_id'					=> "",
		'channel_id'				=> "",
		'language_id'				=> "",
		'entry_default'			    => "",

		// default meta
		'title'				        => "",
		'description'				=> "",
		'keywords'					=> "",
		'keywords_append_default'	=> "y",
		'author'					=> "",
		'publisher'					=> "",
		'rights'					=> "",
		'canonical_url'				=> "",

		// robots meta
		'robots_index'					=> "",
		'robots_follow'					=> "",
		'robots_archive'				=> "",

		// sitemap meta
		'sitemap_change_frequency'		=> "",
		'sitemap_include'				=> "",
		'sitemap_priority'				=> "",

		// geo meta
		'geo_latitude'					=> "",
		'geo_longitude'					=> "",
		'geo_placename'					=> "",
		'geo_region'					=> ""

	);

	public $default_channel_settings = array(
		'enabled_fields' => array('title', 'description'),
		'sitemap_include' => "y",
		'sitemap_change_frequency' => 'Weekly',
		'sitemap_priority' => '0.5'
	);

	static $dividers = array('-', '|', '&raquo;', '.', '&rarr;');


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
		
		// Init the cache
		$this->_initCache();
		
		// Load the addons model and check if the the extension is installed
		// Get the settings if it's installed
		$EE->load->model('addons_model');
		if ($EE->addons_model->extension_installed($this->addon_id)) {
			$this->settings = $this->_getSettings();
		}
		
	}

	/**
	 * Initialises a cache for the addon
	 * 
	 * @access private
	 * @return void
	 */
	private function _initCache() {
		// Create a singleton reference
		$EE =& get_instance();

		// Sort out our cache
		// If the cache doesn't exist create it
		if (empty($EE->session->cache[$this->addon_id][SITE_ID])) {
			$EE->session->cache[$this->addon_id][SITE_ID] = array();
		}

		// Assign the cache to a local class variable
		$this->cache =& $EE->session->cache[$this->addon_id][SITE_ID];
	}






	// ===============================
	// = Hook Functions =
	// ===============================

	public function dummy_hook_function(){}






	// ===============================
	// = Create Meta =
	// ===============================

	/**
	 * The entry meta table fields
	 * We also use these as default meta values
	 * @var array
	 */
	static $meta_table_fields = array(
		'id'						=> array( 'type' => 'int', 'constraint' => '10', 'unsigned' => TRUE, 'auto_increment' => TRUE, 'null' => FALSE ),
		'entry_id'					=> array( 'type' => 'int', 'constraint' => '10', 'unsigned' => TRUE ),
		'site_id'					=> array( 'type' => 'int', 'constraint' => '5', 'unsigned' => TRUE, 'default' => '1', 'null' => FALSE ),
		'channel_id'				=> array( 'type' => 'int', 'constraint' => '6', 'unsigned' => TRUE ),
		'language_id'				=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'entry_default'	    		=> array( 'type' => 'varchar', 'constraint' => '1', 'default' => 'n' ),
		// standard meta
		'title'						=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'keywords'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'keywords_append_default'	=> array( 'type' => 'varchar', 'constraint' => '1'),
		'description'				=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'publisher'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'rights'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'author'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'canonical_url'				=> array( 'type' => 'varchar', 'constraint' => '255' ),
		// robots meta
		'robots_index'					=> array( 'type' => 'varchar', 'constraint' => '1'),
		'robots_follow'					=> array( 'type' => 'varchar', 'constraint' => '1'),
		'robots_archive'				=> array( 'type' => 'varchar', 'constraint' => '1'),
		// sitemap meta
		'sitemap_priority'				=> array( 'type' => 'double', 'constraint' => '2,1', 'default' => '0.5' ),
		'sitemap_change_frequency'		=> array( 'type' => 'varchar', 'constraint' => '20'),
		'sitemap_include'				=> array( 'type' => 'varchar', 'constraint' => '1'),
		// geo meta
		'geo_region'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'geo_placename'					=> array( 'type' => 'varchar', 'constraint' => '255' ),
		'geo_latitude'					=> array( 'type' => 'double', 'constraint' => '8,5' ),
		'geo_longitude'					=> array( 'type' => 'double', 'constraint' => '8,5' )
	);

	/**
	 * Creates the entry metadata table ('exp_nsm_better_meta') table if it doesn't already exist.
	 * @version			   2.0.0
	 * @since			   Version 2.0.0
	 * @access			   protected
	 * @return			   void
	 **/
	protected function _createEntryMetadataTable()
	{
		$EE =& get_instance();
		$EE->load->dbforge();
		$EE->dbforge->add_field(self::$meta_table_fields);
		$EE->dbforge->add_key('id', TRUE);

		if (!$EE->dbforge->create_table('nsm_better_meta', TRUE))
		{
			show_error("Unable to create settings table for {$addon_name}: exp_nsm_better_meta");
			log_message('error', "Unable to create settings table for {$addon_name}: exp_nsm_better_meta");
		}
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
		$EE->nsm_better_meta_helper->addJS('extension_settings.js');

        // load the channel model in as it is not included by default as of EE 2.6.0
        $EE->load->model('channel_model');

		// Create the variable array
		$vars = array(
			'addon_id' => $this->addon_id,
			'channels' => $EE->channel_model->get_channels()->result(),
			'error' => false,
			'input_prefix' => __CLASS__,
			'message' => false,
			'self' => $this
		);

		// Are there settings posted from the form?
		if($data = $EE->input->post(__CLASS__)) {
			if(!isset($data["enabled"])) {
				$data["enabled"] = true;
			}
			
			if(!empty($data["channels"])) {
				foreach ($data["channels"] as &$channel) {
					if(empty($channel["enabled_fields"])) {
						$channel["enabled_fields"] = array();
					}
				}
			}
			

			// No errors ?
			if(! $vars['error'] = validation_errors()) {
				$this->settings = $this->_saveSettings($data);
				$EE->session->set_flashdata('message_success', $this->name . ": ". $EE->lang->line('alert.success.extension_settings_saved'));
				$EE->functions->redirect(BASE.AMP.'C=addons_extensions');
			}
		} else {
			// Sometimes we may need to parse the settings
			$data = $this->settings;
		}

		foreach ($vars["channels"] as $channel) {
			$data["channels"][$channel->channel_id] = $this->getChannelSettings($channel->channel_id);
		}

		$vars["data"] = $data;

		// Return the view.
		return $EE->load->view('extension/settings', $vars, TRUE);
	}

	public function getChannelSettings($channel_id)
	{
		return (isset($this->settings['channels'][$channel_id]))
					? $this->settings['channels'][$channel_id]
					: $this->_buildChannelSettings($channel_id);
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
		$EE =& get_instance();
		$default_settings = $this->default_site_settings;

		// No site id, use the current one.
		if(!$site_id)
			$site_id = SITE_ID;

		$default_settings['default_site_meta']['author'] = $EE->config->item('webmaster_name');
		$default_settings['default_site_meta']['site_title'] = $EE->config->item('site_name');

        // load the channel model in as it is not included by default as of EE 2.6.0
        $EE->load->model('channel_model');

		// Channel preferences (if required)
		if(isset($default_settings["channels"]))
		{
			$channels = $EE->channel_model->get_channels($site_id);
			if ($channels->num_rows() > 0)
			{
				foreach($channels->result() as $channel)
				{
					$default_settings['channels'][$channel->channel_id] = $this->_buildChannelSettings($channel->channel_id);
				}
			}
		}

		// return settings
		return $default_settings;
	}

	/**
	 * Build the default channel settings
	 *
	 * @access private
	 * @param array $channel_id The target channel
	 * @return array The new channel settings
	 */
	private function _buildChannelSettings($channel_id)
	{
		return $this->default_channel_settings;
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
		$this->_createEntryMetadataTable();
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
	public function update_extension($current=FALSE)
	{
		if($current == $this->version) return false;

		$EE =& get_instance();

		require_once(PATH_THIRD."{$this->addon_id}/upd.{$this->addon_id}.php");
		$version = $EE->db->get_where('modules', array('module_name' => ucfirst($this->addon_id)))->row('module_version');
		$class = ucfirst($this->addon_id) . "_upd";
		$updater = new $class();
		$updater->update($version);

		// Update the extension
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

		if (!$EE->dbforge->create_table(self::$settings_table, TRUE))
		{
			show_error("Unable to create settings table for ".__CLASS__.": " . $EE->config->item('db_prefix') . self::$settings_table);
			log_message('error', "Unable to create settings table for ".__CLASS__.": " . $EE->config->item('db_prefix') . self::$settings_table);
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
			// and we're running the current version
			|| $EE->extensions->version_numbers[__CLASS__] != $this->version
		) {
			return $settings;
		}
		if (
			// if there are settings in the settings cache
			! empty($this->cache['settings'])
			// and we are not forcing a refresh
			AND $refresh != TRUE
		) {
			// get the settings from the session cache
			$settings = $this->cache['settings'];
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
				if ( ! function_exists('json_decode')) {
					$EE->load->library('Services_json');
				}
				
				$settings = json_decode($settings_query->row()->settings, TRUE);
				$this->_saveSettingsToSession($settings);
				log_message('info', __CLASS__ . " : " . __METHOD__ . ' getting settings from session');
			} else {
				// no settings for the site load the defaults
				$settings = $this->_buildDefaultSiteSettings(SITE_ID);
				$this->_saveSettings($settings);
				log_message('info', __CLASS__ . " : " . __METHOD__ . ' creating new site settings');
			}	
		}
		
		// Merge config settings
		foreach ($settings as $key => $value) {
			if ($EE->config->item($this->addon_id . "_" . $key)) {
				$settings[$key] = $EE->config->item($this->addon_id . "_" . $key);
			}
		}
		
		return $settings;
	}

	/**
	 * Get the channel settings if the exist or load defaults
	 *
	 * @access public
	 * @param int $channel_id The channel id
	 * @return array the channel settings
	 */
	public function channelSettings($channel_id){
		return (isset($this->settings["channels"][$channel_id]))
					? $this->settings["channels"][$channel_id]
					: $this->_buildChannelSettings($channel_id);
	}

	/**
	 * Get the member group settings if the exist or load defaults
	 *
	 * @access public
	 * @param int $group_id The member group id
	 * @return array the member group settings
	 */
	public function memberGroupSettings($group_id){
		return (isset($this->settings["member_groups"][$group_id]))
					? $this->settings["member_groups"][$group_id]
					: $this->_buildMemberGroupSettings($group_id);
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
			'settings'	=> json_encode($settings),
			'addon_id'	=> $this->addon_id,
			'site_id'	=> SITE_ID
		);
		$settings_query = $EE->db->get_where(
							'nsm_addon_settings',
							array(
								'addon_id' =>  $this->addon_id,
								'site_id' => SITE_ID
							), 1);

		if ($settings_query->num_rows() == 0)
		{
			$query = $EE->db->insert('exp_nsm_addon_settings', $data);
			log_message('info', __METHOD__ . ' Inserting settings: $query => ' . $query);
		}
		else
		{
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
		$EE =& get_instance();
		$EE->session->cache[$this->addon_id][SITE_ID]['settings'] = $settings;
		$this->cache['settings'] = $settings;
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
	 * @see http://expressionengine.com/public_beta/docs/development/extension_hooks/index.html
	 **/
	private function _registerHooks($hooks = FALSE)
	{
		$EE =& get_instance();

		if($hooks == FALSE && isset($this->hooks) == FALSE)
			return;

		if (!$hooks)
			$hooks = $this->hooks;

		$hook_template = array(
			'class'    => __CLASS__,
			'settings' => "a:0:{}",
			'version'  => $this->version,
		);

		foreach ($hooks as $key => $hook)
		{
			if (is_array($hook))
			{
				$data['hook'] = $key;
				$data['method'] = (isset($hook['method']) === TRUE) ? $hook['method'] : $key;
				$data = array_merge($data, $hook);
			}
			else
			{
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
	 * @see http://expressionengine.com/public_beta/docs/development/extension_hooks/index.html
	 **/
	private function _unregisterHooks()
	{
		$EE =& get_instance();
		$EE->db->where('class', __CLASS__);
		$EE->db->delete('exp_extensions'); 
	}
}
