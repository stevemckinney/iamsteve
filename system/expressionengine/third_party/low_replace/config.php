<?php

/**
* Low Replace config file
*
* @package        low_replace
* @author         Lodewijk Schutte <hi@gotolow.com>
* @link           http://gotolow.com/addons/low-replace
* @license        http://creativecommons.org/licenses/by-sa/3.0/
*/

if ( ! defined('LOW_REPLACE_NAME'))
{
	define('LOW_REPLACE_NAME',    'Low Replace');
	define('LOW_REPLACE_VERSION', '2.0.3');
}
 
$config['name']    = LOW_REPLACE_NAME;
$config['version'] = LOW_REPLACE_VERSION;
 
$config['nsm_addon_updater']['versions_xml'] = 'http://gotolow.com/addons/low-replace/feed';
