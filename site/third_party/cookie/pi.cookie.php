<?php

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$plugin_info = array(
  'pi_name' => 'Cookie',
  'pi_version' => '2.0',
  'pi_author' => 'Philip Zaengle',
  'pi_author_url' => 'http://www.philipzaengle.com/',
  'pi_description' => 'Stores and retrieves custom cookies',
  'pi_usage' => Cookie::usage()
  );

/**
 * Memberlist Class
 *
 * @package			ExpressionEngine
 * @category		Plugin
 * @author			Philip Zaengle
 * @copyright		Copyright (c) 2009, Philip Zaengle
 * @link			http://philipzaengle.com
 */

class Cookie
{
	// --------------------------------------------------------------------

	/**
	 * Cookie
	 *
	 * This function returns a list of members
	 *
	 * @access	public
	 * @return	null
	 */

 function store()
 {
	
	$this->EE =& get_instance();
 	$name = $this->EE->TMPL->fetch_param('name');
 	$value = $this->EE->TMPL->fetch_param('value');
 	$seconds = $this->EE->TMPL->fetch_param('seconds');
		
	$this->EE->functions->set_cookie($name, $value, $seconds);
	
 }// End of store function

 
 function retrieve()
 {
 	$this->EE =& get_instance();
 	$name = $this->EE->TMPL->fetch_param('name');
	return $this->EE->input->cookie($name);
	//return "cookie value";
	
 }// End of retrieve function

	// --------------------------------------------------------------------

	/**
	 * Usage
	 *
	 * This function describes how the plugin is used.
	 *
	 * @access	public
	 * @return	string
	 */
	
  //  Make sure and use output buffering

  function usage()
  {
  ob_start(); 
  ?>
	To set a cookie using a tag:
	name="mycookie"
	value="the value to set"
	seconds="3600"

	Usage:
	{exp:cookie:store name="mycookie" value="EE rules!" seconds = "3600"}
	Sets a cookie named mycookie with the value "EE rules!". The cookie
	will last for 1 hour (3600 seconds).
	Set the seconds to zero to set a cookie that does not expire.

	To retrieve a cookie:
	{exp:cookie:retrieve name="mycookie"}
	If the cookie "mycookie" exists then it will return the value.
	If the cookie does not exist then it will return nothing.
	
	== Credit ==
	EE2.0 Developer: Philip Zaengle
	Original Developer: Eric Snyder of http://www.janasnyder.com/

  <?php
  $buffer = ob_get_contents();
	
  ob_end_clean(); 

  return $buffer;
  }
  // END

}
/* End of file pi.memberlist.php */ 
/* Location: ./system/expressionengine/third_party/memberlist/pi.memberlist.php */