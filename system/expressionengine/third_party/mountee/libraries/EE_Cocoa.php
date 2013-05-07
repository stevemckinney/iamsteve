<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');     

class EE_Cocoa {
	var $EE_VERSION		 = 2;  
	
	// Author & Copyright: Padraig Kennedy, June 2011.
	
	// This is distributed as a component to an app and may only be used 
	// as intended by the app.  Please contact me at padraig.kennedy@gmail.com 
	// if you would like to discuss using it for any other purpose.
	
	// This abstract superclass should be subclassed to customise it for 
	// the app that will communicate with it.
	
	// The 'api' class is called with a post variable named 'data' containing
	// a json object that includes a 'command' variable.
	// Whatever is in the command variable will be called in the subclass with 
	// an 'api' prefix.
	
	// E.G.  {'command':'status'} would call $this->api_status($json_request)
	// api_status would be defined in the subclass.
	// Any data to be returned should be added to the $this->data[] array.
	// This array will be translated to JSON and outputted once the command 
	// function call finishes.
	
	function EE_Cocoa()
	{
		$this->starttime = microtime(true);
    	$this->EE =& get_instance();
    	$this->data = array("version"=>$this->VERSION);    	
    	
    	if ( ! function_exists('json_decode'))			// PHP 4 doesn't have decode_json()
		{
			$this->EE->load->library('Services_json');
		}
	}
	
	function _finish()
    {
    	$this->EE->load->library('javascript');
    	$this->data["response_time"] = round((microtime(true) - $this->starttime),5);
    	$this->data["ee_version"] = $this->EE_VERSION;  
		//send back an XID to use for the next request.
		$this->data["XID"] = XID_SECURE_HASH;
    	$this->data["site_name"] = $this->EE->config->item('site_short_name');
    	
    	echo $this->EE->javascript->generate_json($this->data);	
    	
    	die(); // DO NOT REMOVE THIS
    }
    
    function _is_authorised()
    {
    	return $this->EE->session->userdata['group_id'] == 1;
    }
     
    
    function _start()
    {
  	 	$this->data["logged_in"] 		= $this->EE->session->userdata['session_id']	== "0" ? FALSE:TRUE;
    	$this->data["is_admin"]			= $this->_is_authorised();
    	$this->data["session_id"]		= $this->EE->session->userdata['session_id'];
    
	    if(!$this->data["is_admin"]) 	
	    {
	    	if($this->data["responding_to_command"]=="status")
	       	{
	    		$this->data["site_label"] = $this->EE->config->item('site_label');
	    	   	$this->data["success"] = True;
	       	} 
	       	else
	       	{
       			$this->data["success"] = False;
    		}
       		
    		$this->_finish();
    	}
    
    }
     
    function api()	
    {
    	$this->_start();
    	
    	$instructions = (object)json_decode($this->EE->input->post('data'));
		
		$this->data["responding_to_command"] = @$instructions->command;
		
		if($this->data["responding_to_command"]=="")
		{
			echo "The Module is installed.";
			die();
		}

    	$command = "api_".$this->data["responding_to_command"];
    	
    	$this->$command($instructions);
    	
    	$this->_finish();
    }
    
    function api_logout()
    {
	    $this->EE->load->library('logger');
	    $this->EE->load->library('functions');
    
   		$this->EE->db->where('ip_address', $this->EE->input->ip_address());
		$this->EE->db->where('member_id', $this->EE->session->userdata('member_id'));
		$this->EE->db->delete('online_users');
		
		if(method_exists($this->EE->session,"destroy"))
		{
			$this->EE->session->destroy();
		} else 
		{ 
			$this->EE->db->where('session_id', $this->EE->session->userdata['session_id']);
			$this->EE->db->delete('sessions');
					
			$this->EE->functions->set_cookie($this->EE->session->c_uniqueid);		
			$this->EE->functions->set_cookie($this->EE->session->c_password);	
			$this->EE->functions->set_cookie($this->EE->session->c_session);	
			$this->EE->functions->set_cookie($this->EE->session->c_expire);	
			$this->EE->functions->set_cookie($this->EE->session->c_anon);
			$this->EE->functions->set_cookie('read_topics');  
			$this->EE->functions->set_cookie('tracker');  
		}
		
	
		$this->EE->functions->set_cookie('read_topics'); 

		$this->EE->logger->log_action($this->EE->lang->line('member_logged_out'));

		/* -------------------------------------------
		/* 'cp_member_logout' hook.
		/*  - Perform additional actions after logout
		/*  - Added EE 1.6.1
		*
			$edata = $this->extensions->call('cp_member_logout');
			if ($this->extensions->end_script === TRUE) return;
		/*
		/* -------------------------------------------*/
		$this->data["success"] = TRUE;
    }
}

?>