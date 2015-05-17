<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * NSM Better Meta Field Type
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see 			http://expressionengine.com/public_beta/docs/development/fieldtypes.html
 */
class Nsm_better_meta_ft extends EE_Fieldtype
{
	/**
	 * Field info - Required
	 * 
	 * @access public
	 * @var array
	 */
	public $info = array(
		'name'		=> 'NSM Better Meta',
		'version'	=> '1.1.8'
	);

	/**
	 * The field settings array
	 * 
	 * @access public
	 * @var array
	 */
	public $settings = array();

	/**
	 * The field type - used for form field prefixes. Must be unique and match the class name. Set in the constructor
	 * 
	 * @access private
	 * @var string
	 */
	private $field_type = '';

	/**
	 * Constructor
	 * 
	 * @access public
	 * 
	 * Calls the parent constructor
	 */
	public function __construct()
	{
		$this->field_type = 'nsm_better_meta';
        parent::__construct();
	}

	/**
	 * Display the field in the publish form
	 * 
	 * @access public
	 * @param $data String Contains the current field data. Blank for new entries.
	 * @return String The custom field HTML
	 * 
	 * Returns the meta tab
	 * 
	 * $this->settings = 
	 *  Array
	 *  (
	 *      [field_id] => nsm_better_meta__nsm_better_meta
	 *      [field_label] => NSM Better Meta
	 *      [field_required] => n
	 *      [field_data] => 
	 *      [field_list_items] => 
	 *      [field_fmt] => 
	 *      [field_instructions] => 
	 *      [field_show_fmt] => n
	 *      [field_pre_populate] => n
	 *      [field_text_direction] => ltr
	 *      [field_type] => nsm_better_meta
	 *      [field_name] => nsm_better_meta__nsm_better_meta
	 *      [field_channel_id] => 
	 *  )
	 */
	public function display_field($data)
	{
		if (!class_exists('Nsm_better_meta_ext') ) {
			include_once(PATH_THIRD.'nsm_better_meta/ext.nsm_better_meta.php');
		}

		$ext = new Nsm_better_meta_ext();

		$channel_id = (isset($this->settings["field_channel_id"])) 
						? $this->settings["field_channel_id"] 
						: $this->EE->input->get('channel_id');

		$ext->settings['channels'][$channel_id] = $ext->getChannelSettings($channel_id);

        $this->EE->load->library($this->field_type."_helper");

		$entry_meta = (($entry_id = $this->EE->input->get('entry_id')) && empty($data))
						? $this->EE->db->from('nsm_better_meta')
							->where(array('entry_id' => $entry_id))
							->get()
							->result_array()
						: $data;

		if(! is_array($entry_meta) || empty($entry_meta))
		{
 			foreach(array_keys(Nsm_better_meta_ext::$meta_table_fields) as $field)
				$entry_meta[0][$field] = FALSE;
		}

		$field_data = array(
			'show_nsm_better_meta' => (
				empty($ext->settings['channels'][$channel_id]['enabled_fields'])
				? false
				: true
			),
			"input_prefix" => $this->field_name,
			"entry_meta" => $entry_meta,
			"ext_settings" => $ext->settings,
			"channel_id" => $channel_id
		);

		return $this->EE->load->view('fieldtype/field', $field_data, TRUE);
	}
}
