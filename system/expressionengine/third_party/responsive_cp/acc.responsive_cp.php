<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine Responsive CP Accessory
 *
 * @package		Responsive CP
 * @category	Accessory
 * @author		Ben Croker
 * @link		http://www.putyourlightson.net/responsive-cp/
 */
 

class Responsive_cp_acc
{
	var $name	 		= 'Responsive CP';
	var $id	 			= 'responsive_cp';
	var $version	 	= '1.1.1';
	var $description	= 'Makes CP theme responsive';
	var $sections	 	= array();
	
	// --------------------------------------------------------------------
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		$this->EE =& get_instance();
	} 

	// --------------------------------------------------------------------
	
	/**
	* Set Sections
	*/
	function set_sections()
	{
		// hide accessory
		$this->sections[] = '<script type="text/javascript">$("#accessoryTabs a.responsive_cp").parent().remove();</script>';

		// get theme folder
		$theme_folder_url = $this->EE->config->slash_item('theme_folder_url').'third_party/responsive_cp/';
		
		// add meta tag
		$this->EE->cp->add_to_head('<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />');
		
		// link css file
		$this->EE->cp->add_to_head('<link rel="stylesheet" type="text/css" href="'.$theme_folder_url.'css/responsive_cp.css" media="screen" />');
				
		// insert all images in logos folder
		$theme_folder_path = $this->EE->config->slash_item('theme_folder_path').'third_party/responsive_cp/logos/';		
		
		if ($files = @scandir($theme_folder_path))
		{
			$images = array();
			
			foreach ($files as $file)
			{
				// if file exists and is an image
				if (is_file($theme_folder_path.$file) AND getimagesize($theme_folder_path.$file))
				{
					$images[] = '<img src="'.$theme_folder_url.'logos/'.$file.'" />';					
				}
			}
			
			if (count($images))
			{
				$js = '$("#footer").prepend(\''.implode(' ', $images).'<br/><br/>\');';
				$this->EE->cp->add_to_foot('<script type="text/javascript">'.$js.'</script>');		
			}
		}
	}

}
// END CLASS

/* End of file acc.responsive_cp.php */
/* Location: ./system/expressionengine/third_party/responsive_cp/acc.responsive_cp.php */