<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

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

// --------------------------------------------------------------------

/**
 * ExpressionEngine Cookie Consent Module
 *
 * @package		ExpressionEngine
 * @subpackage	Modules
 * @category	Modules
 * @author		ExpressionEngine Dev Team
 * @link		http://expressionengine.com
 */

class Cookie_consent {

	var $return_data			= '';	 	// Final data	


	/**
	  * Constructor
	  */
	public function __construct()
	{
		// Make a local reference to the ExpressionEngine super object
		$this->EE =& get_instance();

	}

	// ------------------------------------------------------------------------

	/**
	 *  Cookie tag
	 *
	 * @access	public
	 * @return	string
	 *
	 */
	public function message()
	{
		$cookies_allowed = ($this->EE->input->cookie('cookies_allowed')) ? 'yes' : 'no';
		
		$variables[] = array(
			'cookies_allowed' => $cookies_allowed,
			'cookies_allowed_link' => $this->cookies_allowed_link(),
			'clear_all_cookies_link' => $this->clear_cookies_link('all'),
			'clear_ee_cookies_link' => $this->clear_cookies_link('ee')
		);

		$this->return_data = $this->EE->TMPL->parse_variables($this->EE->TMPL->tagdata, $variables);

		return $this->return_data;

	}

	// --------------------------------------------------------------------

	/**
	 * Create cookies allowed link
	 *
	 * @access	public
	 * @return	string
	 *
	 */
	public function cookies_allowed_link()
	{
		$link = $this->EE->functions->fetch_site_index(0, 0).QUERY_MARKER.'ACT='
			.$this->EE->functions->fetch_action_id('Cookie_consent', 'set_cookies_allowed');

		$link .= AMP.'RET='.$this->EE->uri->uri_string();	
		
		return $link;		
	}

	// --------------------------------------------------------------------

	/**
	 * Create the 'clear cookies' link
	 *
	 * @access	public
	 * @param	string $clear_all URL with the AID for the clear_ee_cookies method
	 * @return	string
	 *
	 */
	public function clear_cookies_link($clear_all = 'ee')
	{
		$link = $this->EE->functions->fetch_site_index(0, 0).QUERY_MARKER.'ACT='
			.$this->EE->functions->fetch_action_id('Cookie_consent', 'clear_ee_cookies');

		$link .= AMP.'CLEAR='.$clear_all;			

		$link .= AMP.'RET='.$this->EE->uri->uri_string();	
		
		return $link;		
	}	

	// --------------------------------------------------------------------

	/**
	 * Set the 'cookies_allowed' cookie
	 *
	 * @access	public
	 * @return	string
	 *
	 */
	public function set_cookies_allowed()
	{
		$this->EE->lang->loadfile('cookie_consent');
		$expires = 60*60*24*365;  // 1 year

		$this->EE->functions->set_cookie('cookies_allowed', 'y', $expires);

		$ret = ($this->EE->input->get('RET')) ? $this->EE->input->get('RET') : '';
		$return_link = $this->EE->functions->create_url($ret);

		// Send them a success message and redirect link
		$data = array(
			'title' 	=> lang('cookies_allowed'),
			'heading'	=> lang('cookies_allowed'),
			'content'	=> lang('cookies_allowed_description'),
			'redirect'	=> $return_link,
			'link'		=> array($return_link, lang('cookies_return_to_page')),
			'rate'		=> 3
		);

		$this->EE->output->show_message($data);		
	}

	// --------------------------------------------------------------------

	/**
	 * Clear cookies
	 *
	 * @access	public
	 * @return	string
	 *
	 */
	public function clear_ee_cookies()
	{
		$this->EE->lang->loadfile('cookie_consent');
		
		$all = ($this->EE->input->get('CLEAR') == 'all') ? TRUE : FALSE;
		$prefix = ( ! $this->EE->config->item('cookie_prefix')) ? 'exp_' : $this->EE->config->item('cookie_prefix').'_';
		$expire = time() - 86500;

		// Load cookie helper
		$this->EE->load->helper('cookie');
		$prefix = ( ! $this->EE->config->item('cookie_prefix')) ? 
			'exp_' : $this->EE->config->item('cookie_prefix').'_';
		$prefix_length = strlen($prefix);

		foreach($_COOKIE as $name => $value)
		{
			// Is it an EE cookie?
			// Use Functions method so cookie properties properly set
			if (strncmp($name, $prefix, $prefix_length) == 0)
			{
				$this->EE->functions->set_cookie(substr($name, $prefix_length));
			}
			elseif ($all)
			{
				delete_cookie($name); //setcookie($name, FALSE, $expire, '/');  works
			}
		}

		$ret = ($this->EE->input->get('RET')) ? $this->EE->input->get('RET') : '';
		$return_link = $this->EE->functions->create_url($ret);

		// Send them a success message and redirect link
		$data = array(
			'title' 	=> lang('cookies_deleted'),
			'heading'	=> lang('cookies_deleted'),
			'content'	=> lang('cookies_deleted_description'),
			'redirect'	=> $return_link,
			'link'		=> array($return_link, lang('cookies_return_to_page')),
			'rate'		=> 3
		);

		$this->EE->output->show_message($data);
	}
}

// END CLASS

/* End of file mod.cookie_consent.php */
/* Location: ./system/expressionengine/modules/cookie_consent/mod.cookie_consent.php */