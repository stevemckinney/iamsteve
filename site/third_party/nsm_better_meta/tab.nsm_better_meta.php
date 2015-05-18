<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * NSM Better Meta Tab
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see				http://expressionengine.com/public_beta/docs/development/modules.html#tab_file
 */
class Nsm_better_meta_tab
{
	public function __construct()
	{
		$this->EE =& get_instance();
		$this->addon_id = strtolower(substr(__CLASS__, 0, -4));
	}
	
	/**
	 * This function creates the fields that will be displayed on the publish page. It must return $settings, a multidimensional associative array specifying the display settings and values associated with each of your custom fields.
	 *
	 * The settings array:
	 * field_id: The name of the field
	 * field_type: The field type
	 * field_label: The field label- typically a language variable is used here
	 * field_instructions: Instructions for the field
	 * field_required: Indicates whether to include the 'required' class next to the field label: y/n
	 * field_data: The current data, if applicable
	 * field_list_items: An array of options, otherwise an empty string.
	 * options: An array of options, otherwise an empty string.
	 * selected: The selected value if applicable to the field_type
	 * field_fmt: Allowed field format options, if applicable: an associative array or empty string.
	 * field_show_fmt: Determines whether the field format dropdown shows: y/n. Note- if 'y', you must specify the options available in field_fmt
	 * field_pre_populate: Allows you to pre-populate a field when it is a new entry.
	 * field_text_direction: The direction of the text: ltr/rtl
	 *
	 * @param int $channel_id The channel_id the entry is currently being created in
	 * @param mixed $entry_id The entry_id if an edit, false for new entries
	 * @return array The settings array
	 */
	public function publish_tabs($channel_id, $entry_id = FALSE)
	{
	
		$this->EE->lang->loadfile('nsm_better_meta');

		$field_settings[] = array(
					'field_id'             => 'meta',
					'field_label'          => "NSM Better Meta",
					'field_required'       => 'n',
					'field_data'           => '',
					'field_list_items'     => '',
					'field_fmt'            => '',
					'field_instructions'   => '',
					'field_show_fmt'       => 'n',
					'field_pre_populate'   => 'n',
					'field_text_direction' => 'ltr',
					'field_type'           => 'nsm_better_meta',
					'field_channel_id'     => $channel_id
				);

		if(isset($this->EE->cp))
		{
			$this->EE->load->library($this->addon_id."_helper");
			$this->EE->nsm_better_meta_helper->addJS('extension_settings.js');
		}

		return $field_settings;
	}

	/**
	 * Allows you to validate the data after the publish form has been submitted but before any additions to the database. Returns FALSE if there are no errors, an array of errors otherwise.
	 *
	 * @param $params  multidimensional associative array containing all of the data available on the current submission.
	 * @return mixed Returns FALSE if there are no errors, an array of errors otherwise
	 */
	public function validate_publish()
	{
		return TRUE;
	}

	/**
	 * Allows the insertion of data after the core insert/update has been done, thus making available the current $entry_id. Returns nothing.
	 *
	 * @param array $params an associative array, the top level arrays consisting of: 'meta', 'data', 'mod_data', and 'entry_id'.
	 * @return void
	 */
	public function publish_data_db($params)
	{
		
		if (empty($params['mod_data']['meta'])) {
			return;
		}

		$entry_meta = $params["mod_data"]["meta"];

		if (!class_exists('Nsm_better_meta_ext')) {
			require_once(PATH_THIRD . "/nsm_better_meta/ext.nsm_better_meta.php");
		}

		$fields = array_keys(Nsm_better_meta_ext::$meta_table_fields);

		// NSM Multi Language Integration
		if(count($entry_meta) == 1)
		{
			$entry_meta[0]['entry_default'] = 'y';
		}

		foreach ($entry_meta as &$meta)
		{
			$meta["entry_id"] = $params["entry_id"];
			$meta["site_id"] = $params["meta"]["site_id"];
			$meta["channel_id"] = $params["meta"]["channel_id"];
			$meta["url_title"] = $params["meta"]["url_title"];

			// set empty values to NULL
			// Conceptually, NULL means “a missing unknown value” and it is treated somewhat differently from other values.
			// We use null to inherit the default channel settings
			foreach ($fields as $field)
			{
				// test for set field that is not empty. Note "0" is not empty and is an explict setting
				$value = (isset($meta[$field]) && $meta[$field] !== "") ? $meta[$field] : null;
				$this->EE->db->set("`{$field}`", $value);
			}

			// Update if there is an entry id
			if(isset($meta["id"]) && ! empty($meta["id"]))
			{
				$this->EE->db->where('id', $meta["id"]);
				$this->EE->db->update('nsm_better_meta'); 
			}
			// create a new meta record
			else
			{
				$this->EE->db->insert("nsm_better_meta");
				//$meta["id"] = $this->EE->db->insert_id();
			}
		}
	}

	/**
	 * Called near the end of the entry delete function, this allows you to sync your records if any are tied to channel entry_ids. Returns nothing.
	 *
	 * @param array $entry_ids The deleted entrys
	 * Array
     * (
     *   [entry_ids] => Array
     *   (
     *     [0] => 41
     *   )
     * )
	 * @return void
	 */
	public function publish_data_delete_db($params)
	{
	    $this->EE->db->where_in('entry_id', $params['entry_ids']);
        $this->EE->db->delete('nsm_better_meta');
	}

}
