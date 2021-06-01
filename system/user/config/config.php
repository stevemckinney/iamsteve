<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['legacy_member_templates'] = 'y';
$config['allow_php'] = 'y';
// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system_configuration_overrides.html

$config['app_version'] = '6.0.3';
$config['encryption_key'] = '9ac600b457b0a565b58fee75daf06d751c0d084a';
$config['session_crypt_key'] = '58bbd09bcfc3f5479d9d6015e6a8deab6e0bd59e';
$config['database'] = array(
	'expressionengine' => array(
		'hostname' => 'localhost',
		'database' => '',
		'username' => '',
		'password' => '',
		'dbprefix' => 'exp_',
		'char_set' => 'utf8mb4',
		'dbcollat' => 'utf8mb4_unicode_ci',
		'port'     => ''
	),
);
$config['show_ee_news'] = 'y';
$config['share_analytics'] = 'y';
$config['save_tmpl_files'] = 'y';

// Modify everything in the master config
require $_SERVER['DOCUMENT_ROOT'] . '/config/config.master.php';

// EOF