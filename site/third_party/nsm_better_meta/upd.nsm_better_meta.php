<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Install / Uninstall and updates the modules
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license			Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see				http://expressionengine.com/public_beta/docs/development/modules.html#update_file
 */
class Nsm_better_meta_upd
{
	public $version = '1.1.8';
	private $has_cp_backend = FALSE;
	private $has_publish_fields = TRUE;
	private $has_tabs = TRUE;

	public function __construct()
	{
		$this->EE =& get_instance();
		$this->addon_id = strtolower(substr(__CLASS__, 0, -4));
	}

	private function tabs()
	{
		$tab_key = strtolower(substr(__CLASS__, 0, -4));
		return array(
			$this->addon_id => array(
				"meta" => array(
					'visible'		=> 'true',
					'collapse'		=> 'false',
					'htmlbuttons'	=> 'false',
					'width'			=> '100%'
				)
			)
		);

	}

	/**
	 * Installs the module
	 *
	 * Installs the module, adding a record to the exp_modules table, creates and populates and necessary database tables, adds any necessary records to the exp_actions table, and if custom tabs are to be used, adds those fields to any saved publish layouts
	 *
	 * @return boolean
	 * @author Leevi Graham
	 **/
	public function install()
	{
		$data = array(
			'module_name' => substr(__CLASS__, 0, -4),
			'module_version' => $this->version,
			'has_cp_backend' => ($this->has_cp_backend) ? "y" : "n",
			'has_publish_fields' => ($this->has_publish_fields) ? "y" : "n"
		);
		$this->EE->db->insert('modules', $data);

		if (isset($this->actions) && is_array($this->actions)) {
			foreach ($this->actions as $action) {
				$parts = explode("::", $action);
				$this->EE->db->insert('actions', array(
					"class" => $parts[0],
					"method" => $parts[1]
				));
			}
		}

		if (isset($this->has_publish_fields) &&	$this->has_publish_fields) {
			$this->EE->load->library('layout');
			$this->EE->layout->add_layout_tabs($this->tabs(), strtolower($data['module_name']));
		}

		return TRUE;
	}

	/**
	 * Updates the module
	 *
	 * This function is checked on any visit to the module's control panel, and compares the current version number in the file to the recorded version in the database. This allows you to easily make database or other changes as new versions of the module come out.
	 *
	 * @access public
	 * @author Leevi Graham
	 * @return Boolean FALSE if no update is necessary, TRUE if it is.
	 **/
	public function update($current = FALSE)
	{
		$EE =& get_instance();

		if ($current < "1.0.2") {
			foreach ($query = $EE->db->get('layout_publish')->result_array() as $layout) {
				$field_layout = unserialize($layout['field_layout']);
				foreach ($field_layout as $tab => $value) {
					if($tab == "Better Meta" || strtolower($tab) == "nsm better meta" || strtolower($tab) == "nsm_better_meta" )
						unset($field_layout[$tab]);
				}
				$data = array('field_layout' => serialize($field_layout));
				$EE->db->where('layout_id', $layout['layout_id']);
				$EE->db->update('layout_publish', $data);
			}
			if ($this->has_publish_fields) {
				$EE->load->library('layout');
				$EE->layout->add_layout_tabs($this->tabs(), $this->addon_id);
			}
		}

		if ($current < "1.0.4") {
			if ( ! function_exists('json_decode')) {
				$EE->load->library('Services_json');
			}

			$query = $EE->db->query("SELECT * FROM `exp_nsm_addon_settings` WHERE `addon_id` = '{$this->addon_id}'");
			foreach ($query->result_array() as $site) {
				// decode the settings
				$site["settings"] = json_decode($site["settings"], true);

				// Update sitemap include to use y/n
				foreach ($site["settings"]["channels"] as &$channel) {
					$channel["sitemap_include"] = ($channel["sitemap_include"]) ? "y" : "n";
				}

				// Update the robots settings to y/n
				$site["settings"]["default_site_meta"]["robots_index"] = ($site["settings"]["default_site_meta"]["robots_index"]) ? "y" : "n";
				$site["settings"]["default_site_meta"]["robots_follow"] = ($site["settings"]["default_site_meta"]["robots_follow"]) ? "y" : "n";
				$site["settings"]["default_site_meta"]["robots_archive"] = ($site["settings"]["default_site_meta"]["robots_archive"]) ? "y" : "n";

				// encode the json and save back to DB
				$site["settings"] = json_encode($site["settings"]);

				$query = $EE->db->update(
							'exp_nsm_addon_settings',
							array('settings' => $site["settings"]),
							array(
								'addon_id' => $this->addon_id,
								'site_id' => $site['site_id']
							));
			}

			// Alter table cols
			$EE->db->query("ALTER TABLE `exp_nsm_better_meta` CHANGE `default` `entry_default` varchar(1) NULL");
			$EE->db->query("ALTER TABLE `exp_nsm_better_meta` CHANGE `robots_index` `robots_index` varchar(1) NULL");
			$EE->db->query("ALTER TABLE `exp_nsm_better_meta` CHANGE `robots_archive` `robots_archive` varchar(1) NULL");
			$EE->db->query("ALTER TABLE `exp_nsm_better_meta` CHANGE `robots_follow` `robots_follow` varchar(1) NULL");
			$EE->db->query("ALTER TABLE `exp_nsm_better_meta` CHANGE `keywords_append_default` `keywords_append_default` varchar(1) NULL");

			// Update existing meta data
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `entry_default` = 'y' WHERE entry_default = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `entry_default` = 'n' WHERE entry_default = '0'");

			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `keywords_append_default` = 'y' WHERE keywords_append_default = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `keywords_append_default` = 'n' WHERE keywords_append_default = '0'");

			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `sitemap_include` = 'y' WHERE sitemap_include = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `sitemap_include` = 'n' WHERE sitemap_include = '0'");

			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_index` = 'y' WHERE robots_index = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_archive` = 'y' WHERE robots_archive = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_follow` = 'y' WHERE robots_follow = '1'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_index` = 'n' WHERE robots_index = '0'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_archive` = 'n' WHERE robots_archive = '0'");
			$EE->db->query("UPDATE `exp_nsm_better_meta` SET `robots_follow` = 'n' WHERE robots_follow = '0'");
		}

		// Update the extension
		$EE->db
			->where('module_name', ucfirst($this->addon_id))
			->update('modules', array('module_version' => $this->version));

		return false;
	}

	/**
	 * Uninstalls the module
	 *
	 * @return Boolean FALSE if uninstall failed, TRUE if it was successful
	 * @author Leevi Graham
	 **/
	public function uninstall()
	{

		$EE =& get_instance();
		$module_name = substr(__CLASS__, 0, -4);

		$EE->db->select('module_id');
		$query = $EE->db->get_where('modules', array('module_name' => $module_name));

		$EE->db->where('module_id', $query->row('module_id'));
		$EE->db->delete('module_member_groups');

		$EE->db->where('module_name', $module_name);
		$EE->db->delete('modules');

		$EE->db->where('class', $module_name);
		$EE->db->delete('actions');

		$EE->db->where('class', $module_name . "_mcp");
		$EE->db->delete('actions');

		if ($this->has_publish_fields) {
			$EE->load->library('layout');
			$EE->layout->delete_layout_tabs($this->tabs(), $module_name);
		}

		return true;
	}

} // END class Nsm_better_meta_upd
