<?php if (!defined("BASEPATH")) die("No direct script access allowed");



class Beanstalk_ping {

	var $EE;

	public function Beanstalk_ping() {
		$this->EE =& get_instance();
	}

	
	
	
	public function dump_cache()
	{
		$this->EE->functions->clear_caching('all');
	}

}