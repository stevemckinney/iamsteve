<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2012, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Cookie Check Module
 *
 * @package		ExpressionEngine
 * @subpackage	Modules
 * @category	Modules
 * @author		ExpressionEngine Dev Team
 * @link		http://expressionengine.com
 */
class Cookie_consent_mcp {

	/**
	 * Constructor
	 *
	 * @access	public
	 */
	public function Cookie_consent_mcp()
	{
		// Make a local reference to the ExpressionEngine super object
		$this->EE =& get_instance();
	}

	// --------------------------------------------------------------------

	/**
	 * Module Index Page
	 *
	 * @access	public
	 * @return	string Parsed index view file
	 */	
	public function index()
	{
		$this->EE->cp->set_variable('cp_page_title', $this->EE->lang->line('cookie_consent_module_name'));

		$vars['show_lcb'] = 1;
		$vars['show_lcb'] = 0;
		
    	$this->EE->db->select('settings');
    	$this->EE->db->where('class', 'Cookie_consent_ext');
    	$query = $this->EE->db->get('extensions');

		if ($query->num_rows() > 0)
		{
			$row = $query->row();
			$settings = unserialize($row->settings);
			$vars['show_lcb'] = ($settings['show_cp_login_cb'] == 'y') ? 1 : 0;			
			$vars['auto_delete'] = ($settings['auto_delete_all'] == 'y') ? 1 : 0;	
		}
		
		return $this->EE->load->view('index', $vars, TRUE);
	}

	// --------------------------------------------------------------------

	/**
	 * Save the extension settings
	 *
	 * @access	public
	 * @return	void
	 */	
	public function save_ext_settings()
	{
		$settings['show_cp_login_cb'] = ($this->EE->input->post('show_cp_login_cb') == 'y') ? 'y' : 'n';
		$settings['auto_delete_all'] = ($this->EE->input->post('auto_delete_all') == 'y') ? 'y' : 'n';
				
    	$this->EE->db->where('class', 'Cookie_consent_ext');
    	$this->EE->db->update('extensions', array('settings' => serialize($settings)));

    	$this->EE->session->set_flashdata('message_success', lang('preferences_updated'));

        $this->EE->functions->redirect(
            BASE.AMP.'C=addons_modules'.AMP.'M=show_module_cp'.AMP.'module=cookie_consent'
    		);		
	
	}
}
// End Cookie_consent CP Class

/* End of file mcp.cookie_consent.php */
/* Location: ./system/expressionengine/modules/cookie_consent/mcp.cookie_consent.php */