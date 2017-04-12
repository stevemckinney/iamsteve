<?php

/**
 * Environment Declaration
 * 
 * This switch statement sets our environment. The environment is used primarily
 * in our custom config file setup. It is also used, however, in the front-end
 * index.php file and the back-end admin.php file to set the debug mode
 * 
 * @package    Focus Lab Master Config
 * @version    1.1.1
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 */

if ( ! defined('ENV') )
{ 
  $production = 'iamsteve.me';
  $development = 'dev.iamsteve.me';
  $local = 'iamsteve.dev';
  
	switch ( strtolower( $_SERVER['HTTP_HOST'] ) )
	{	
		case $local :
			define('ENV', 'local');
			define('ENV_FULL', 'Local');
			define('ENV_DOMAIN', $local);
			define('ENV_DEBUG', true);
		break;

		case 'dev.iamsteve.me' :
			define('ENV', 'dev');
			define('ENV_FULL', 'Development');
			define('ENV_DOMAIN', $development);
			define('ENV_DEBUG', FALSE);
		break;

		case 'iamsteve.me' :
			define('ENV', 'prod');
			define('ENV_FULL', 'Production');
			define('ENV_DOMAIN', $production);
			define('ENV_DEBUG', FALSE);
		break;
	}
}

/* End of file config.env.php */
/* Location: ./config/config.env.php */