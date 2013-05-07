<?php if (!defined("BASEPATH")) die("No direct script access allowed");



class Beanstalk_ping_mcp {
	private $EE;
	
	public $data 		= array();
	public $docs_url	= "";
	

	public function __construct() {
		$this->EE =& get_instance();
	
	}
	

	public function index() {
		
		$id = $this->EE->cp->fetch_action_id('Beanstalk_ping', 'dump_cache');
		$data['url'] = $this->EE->functions->create_url('/') . "?ACT=" . $id;
		
		
		return $this->EE->load->view('index', $data, TRUE);
	}
	

}