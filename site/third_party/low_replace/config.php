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
	define('LOW_REPLACE_PACKAGE', 'low_replace');
	define('LOW_REPLACE_VERSION', '2.1.0');
	define('LOW_REPLACE_DOCS',    'http://gotolow.com/addons/low-replace');
}

/**
 * < EE 2.6.0 backward compat
 */
if ( ! function_exists('ee'))
{
	function ee()
	{
		static $EE;
		if ( ! $EE) $EE = get_instance();
		return $EE;
	}
}

/**
 * NSM Addon Updater
 */
$config['name']    = LOW_REPLACE_NAME;
$config['version'] = LOW_REPLACE_VERSION;
$config['nsm_addon_updater']['versions_xml'] = LOW_REPLACE_DOCS.'/feed';
