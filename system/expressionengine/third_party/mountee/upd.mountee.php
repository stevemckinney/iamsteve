<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');     

class Mountee_upd {
	// Version as required by EE.
	var $version 		= 2.2;

	function Mountee_upd()
    {
    	$this->EE =& get_instance();
    }
      
	function install()	
	{
		// Install the module in the modules table
		$data = array(
				'module_name'		=> 'Mountee',
				'module_version'	=> $this->version,
				'has_cp_backend'	=> 'n',
				'has_publish_fields'=> 'n'
		);
		
		$this->EE->db->insert('modules', $data);
		
		return TRUE;
	}
	
	function uninstall()
	{	
		$this->EE->db->where('module_name','Mountee');
		$this->EE->db->delete('modules');		
		
		return TRUE;
	}
	
	function update($current='')
	{

		if ($current == $this->version)
		{
			return FALSE;
		}
			
		if ($current < $this->version) 
		{
			$this->EE->db->where('module_name','Mountee');
			$this->EE->db->update('modules', array('module_version'	=> $this->version));
		} 
		
		if ($current < 1.9)
		{
			$this->EE->db->where('class','Mountee');
			$this->EE->db->delete('actions');
		}
		
		return TRUE; 
	}

}

?>