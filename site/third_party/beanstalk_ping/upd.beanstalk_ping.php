<?php if (!defined("BASEPATH")) die("No direct script access allowed");


class Beanstalk_ping_upd {

	private	$EE;
	public $version = 1;
	
	public function __construct() {
		$this->EE =& get_instance();
		$this->EE->load->dbforge();
	}
	

	public function install() {
		$module = array(
			'module_name' 			=> 'Beanstalk_ping',
			'module_version'		=> $this->version,
			'has_cp_backend'		=> 'y',
			'has_publish_fields' 	=> 'n'
		);
		
		$this->EE->db->insert('modules', $module);
		
		$action = array(
			'class' => 'Beanstalk_ping',
			'method' => 'dump_cache'
		);
		
		$this->EE->db->insert('actions', $action);
						
		return TRUE;
	}

	public function uninstall() {
		$this->EE->db->where('module_name', 'Beanstalk_ping')->delete('modules');
		$this->EE->db->where('class', 'Beanstalk_ping')->delete('actions');
		
		return TRUE;
	}

	public function update($version = '') {
	
		return TRUE;
	}
}