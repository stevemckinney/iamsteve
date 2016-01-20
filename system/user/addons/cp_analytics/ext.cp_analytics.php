<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cp_analytics_ext
{
	var $settings        = array();
	var $name            = 'CP Analytics Settings';
	var $version         = '1.0.1';
	var $description     = 'Google account settings for the CP Analytics accessory.';
	var $settings_exist  = 'y';
	var $docs_url        = 'http://github.com/amphibian/acc.cp_analytics.ee_addon';
	var $slug			 = 'cp_analytics';


	function Cp_analytics_ext($settings='')
	{
	    $this->settings = $settings;
	    $this->EE =& get_instance();
	}

	
	function settings_form($current)
	{	    
		// Initialize our variable array
		$vars = array();
		
		// Get current site	
		$site = $this->EE->config->item('site_id');
		
		// This removes the current username/password
		if(isset($_GET['analytics_reset']))
		{
			$settings = $this->get_settings(TRUE);	
			$settings[$site]['user'] = '';
			$settings[$site]['password'] = '';
			$settings[$site]['profile'] = '';
			$settings[$site]['authenticated'] = '';

			$this->EE->db->where('class', ucfirst(get_class($this)));
			$this->EE->db->update('extensions', array('settings' => serialize($settings)));
			$this->EE->functions->redirect(
				BASE.AMP.'C=addons_extensions'.
				AMP.'M=extension_settings'.
				AMP.'file='.$this->slug
			);
			exit;	
		}
		
		// Only grab settings for the current site
		$vars['current'] = (isset($current[$site])) ? $current[$site] : $current;
		
		// We need our file name for the settings form
		$vars['file'] = $this->slug;
		
		// If we have a username and password, try and authenticate and fetch our profile list
		if(isset($vars['current']['authenticated']) && $vars['current']['authenticated'] == 'y')
		{
			require_once(PATH_THIRD.'cp_analytics/libraries/gapi.class.php');				
			$ga_user = $vars['current']['user'];
			$ga_password = base64_decode($vars['current']['password']);
			
			$ga = new gapi($ga_user, $ga_password);
			$ga->requestAccountData(1,100);
			
			if($ga->getResults())
			{
				$vars['ga_profiles'] = array('' => '--');
				foreach($ga->getResults() as $result)
				{
				  $vars['ga_profiles'][$result->getProfileId()] = $result->getTitle();
				}
			}
		}
		
		// We have our vars set, so load and return the view file
		return $this->EE->load->view('settings', $vars, TRUE);
	}
	
	
	function save_settings()
	{
		// Get all settings
		$settings = $this->get_settings(TRUE);

		// Get current site	
		$site = $this->EE->config->item('site_id');
				
		// print_r($settings); exit();
		
		// If we're posting a username and password,
		// check if they authenticate, and store them if they do.
		// If not, discard and throw the authentication error flag
		
		if(isset($_POST['user']) && isset($_POST['password']))
		{
			require_once(PATH_THIRD.'cp_analytics/libraries/gapi.class.php');				
			$ga_user = $_POST['user'];
			$ga_password = $_POST['password'];
			$ga = new gapi($ga_user, $ga_password);
			if($ga->getAuthToken() != FALSE)
			{
				$settings[$site]['user'] = $_POST['user'];
				$settings[$site]['password'] = base64_encode($_POST['password']);
				$settings[$site]['authenticated'] = 'y';
			}
			else
			{
				// The credentials don't authenticate, so zero us out
				$settings[$site]['user'] = '';
				$settings[$site]['password'] = '';
				$settings[$site]['profile'] = '';
				$settings[$site]['authenticated'] = 'n';
			}
		}
		
		if(isset($_POST['profile']))
		{
			$settings[$site]['profile'] = $_POST['profile'];			
			$settings[$site]['hourly_cache'] = '';
			$settings[$site]['daily_cache'] = '';
		}
			
		$this->EE->db->where('class', ucfirst(get_class($this)));
		$this->EE->db->update('extensions', array('settings' => serialize($settings)));
		
		$this->EE->session->set_flashdata('message_success', $this->EE->lang->line('preferences_updated'));
		
		$this->EE->functions->redirect(
				BASE.AMP.'C=addons_extensions'.
				AMP.'M=extension_settings'.
				AMP.'file='.$this->slug
			);
		exit;
	}

	
	function get_settings($all_sites = FALSE)
	{
		$get_settings = $this->EE->db->query("SELECT settings 
			FROM exp_extensions 
			WHERE class = '".ucfirst(get_class($this))."' 
			LIMIT 1");
		
		$this->EE->load->helper('string');
		
		if ($get_settings->num_rows() > 0 && $get_settings->row('settings') != '')
        {
        	$settings = strip_slashes(unserialize($get_settings->row('settings')));
        	$settings = ($all_sites == TRUE) ? $settings : $settings[$this->EE->config->item('site_id')];
        }
        else
        {
        	$settings = array();
        }
        return $settings;
	}
	
		
	function activate_extension()
	{

	  $this->EE->db->query($this->EE->db->insert_string('exp_extensions',
	    	array(
				'extension_id' => '',
		        'class'        => ucfirst(get_class($this)),
		        'method'       => '',
		        'hook'         => '',
		        'settings'     => '',
		        'priority'     => 10,
		        'version'      => $this->version,
		        'enabled'      => "y"
				)
			)
		);
	}


	function update_extension($current='')
	{
	    if ($current == '' OR $current == $this->version)
	    {
	        return FALSE;
	    }
	    
		$this->EE->db->query("UPDATE exp_extensions 
	     	SET version = '". $this->EE->db->escape_str($this->version)."' 
	     	WHERE class = '".ucfirst(get_class($this))."'");
	}

	
	function disable_extension()
	{	    
		$this->EE->db->query("DELETE FROM exp_extensions WHERE class = '".ucfirst(get_class($this))."'");
	}

}