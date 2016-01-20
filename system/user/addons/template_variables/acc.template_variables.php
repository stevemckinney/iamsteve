<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine Template Variables Reference Accessory
 *
 * @package		ExpressionEngine
 * @subpackage	Control Panel
 * @category	Accessories
 * @author		Matthew Krivanek
 * @link		http://www.sherpawebstudios.com
 */
class Template_variables_acc {
	
	var $name			= 'Template Variables';
	var $id				= 'template_variables';
	var $version		= '1.1';
	var $description	= 'ExpressionEngine Custom Fields, Snippets and Global Variables';
	var $sections		= array();

	/**
	 * Constructor
	 */
	function Template_variables_acc()
	{
		$this->EE =& get_instance();
		$this->EE->lang->loadfile('template_variables');
		$this->_include_theme_css('template_variables');
		$this->_include_theme_js('jquery-ui-1.8.2.tabs.min');
		$this->_include_theme_js('ZeroClipboard');
		$this->_include_theme_js('template_variables');
	}
	
	// --------------------------------------------------------------------
	
	/**
	 * Set Sections
	 *
	 * Set content for the accessory
	 *
	 * @access	public
	 * @return	void
	 */
	function set_sections()
	{
		$variables = $this->_get_variable_data();

		if(empty($variables['field_groups']))
		{
			$this->sections[$this->EE->lang->line('custom_fields')] = 
				'<p>'.$this->EE->lang->line('no_custom_fields').'</p>';
		}
		else
		{
			$this->sections[$this->EE->lang->line('custom_fields')] = 
				$this->EE->load->view('custom_fields', $variables, TRUE);			
		}
		
		if(empty($variables['snippets']))
		{
			$this->sections[$this->EE->lang->line('snippets')] = 
				'<p>'.$this->EE->lang->line('no_snippets').'</p>';
		}
		else
		{		
			$this->sections[$this->EE->lang->line('snippets')] = 
				$this->EE->load->view('snippets', $variables, TRUE);
		}

		if(empty($variables['global_variables']))
		{
			$this->sections[$this->EE->lang->line('global_variables')] = 
				'<p>'.$this->EE->lang->line('no_global_variables').'</p>';
		}
		else
		{		
			$this->sections[$this->EE->lang->line('global_variables')] = 
				$this->EE->load->view('global_variables', $variables, TRUE);
		}		
	}

	// --------------------------------------------------------------------
	
	/**
	 * Get Variable Data
	 *
	 * Get array of variables
	 *
	 * @access	private
	 * @return	$variables
	 */
	function _get_variable_data()
	{
		$variables = array();
		
		$site_id = $this->EE->config->item('site_id');
		
		$field_groups = $this->EE->db->query("SELECT group_id, group_name FROM exp_field_groups WHERE site_id=".$site_id." ORDER BY group_name");	
		
		if ($field_groups->num_rows() > 0)
		{
			$custom_fields = $this->EE->db->query("SELECT field_id, group_id, field_label, field_order, field_name, field_type FROM exp_channel_fields WHERE site_id=".$site_id." ORDER BY field_order");
			
			$i = 0; 
			
		    foreach($field_groups->result_array() as $field_group)
		    {
				$variables['field_groups'][] = array(
													 'group_id' => $field_group['group_id'],
													 'group_name' => $field_group['group_name'],
													 'new_custom_field_link' => BASE.AMP.'C=admin_content'.AMP.'M=field_edit'.AMP.'group_id='.$field_group['group_id']
													);

				if ($custom_fields->num_rows() > 0)
				{
				    foreach($custom_fields->result_array() as $custom_field)
				    {
						if($custom_field['group_id'] == $field_group['group_id'])
						{
					        $variables['field_groups'][$i]['custom_fields'][] = array(
																  'field_id' => $custom_field['field_id'],
																  'field_label' => $custom_field['field_label'], 
																  'field_order' => $custom_field['field_order'], 
																  'field_name' => $custom_field['field_name'], 
																  'field_type' => $custom_field['field_type'],
																  'field_link' => BASE.AMP.'C=admin_content'.AMP.'M=field_edit'.AMP.'field_id='.$custom_field['field_id'].AMP.'group_id='.$custom_field['group_id']
																 );
						}
				    }
				}
				$i++;
			}
		}

		
		$snippets = $this->EE->db->query("SELECT snippet_id, snippet_name FROM exp_snippets");

		if ($snippets->num_rows() > 0)
		{
		    foreach($snippets->result_array() as $row)
		    {
		        $variables['snippets'][] = array(
												 'snippet_id' => $row['snippet_id'],
												 'snippet_name' => $row['snippet_name'],
												 'snippet_link' => BASE.AMP.'C=design'.AMP.'M=snippets_edit'.AMP.'snippet='.$row['snippet_name']
												);
		    }
		}

		$global_variables = $this->EE->db->query("SELECT variable_id, variable_name FROM exp_global_variables");

		if ($global_variables->num_rows() > 0)
		{
		    foreach($global_variables->result_array() as $row)
		    {
		        $variables['global_variables'][] = array(
														'variable_id' => $row['variable_id'], 
														'variable_name' => $row['variable_name'],
														'variable_link' => BASE.AMP.'C=design'.AMP.'M=global_variables_update'.AMP.'variable_id='.$row['variable_id']
														);
		    }
		}

		return $variables;
	}

	// --------------------------------------------------------------------	
	
	/**
	 * Asset Includes
	 *
	 * Private functions to set
	 *
	 * @access	private
	 * @return	void
	 *  
	 */

	// Credit to Brandon Kelly for this method.
	private function _theme_url()
	{
		if (! isset($this->cache['theme_url']))
		{
			$theme_folder_url = $this->EE->config->item('theme_folder_url');
			if (substr($theme_folder_url, -1) != '/') $theme_folder_url .= '/';
			$this->cache['theme_url'] = $theme_folder_url.'third_party/template_variables/';
		}

		return $this->cache['theme_url'];
	}
	
 	// Because ZeroClipboard requires an absolute path, we need to include 
	// our JS and the ZeroClipboard.swf in the publicly accessible themes folder.
	// So, load_package_js is out, include_theme_js is in!
	private function _include_theme_js($file)
	{
		// Need to set the path to the clipboard file
		if($file == 'template_variables') 
		{
			$this->EE->cp->add_to_foot('<script type="text/javascript">pathToZeroClipboardSwf = "'.$this->_theme_url().'scripts/ZeroClipboard.swf";</script>');
		}
		
		$this->EE->cp->add_to_foot('<script type="text/javascript" src="'.$this->_theme_url().'scripts/'.$file.'.js"></script>');
	}
	
	// Because we're including our JS files in the themes folder, this way as well. 
	// Credit to Brandon Kelly for this method.
	private function _include_theme_css($file)
	{
		$this->EE->cp->add_to_head('<link rel="stylesheet" type="text/css" href="'.$this->_theme_url().'css/'.$file.'.css" />');
	}
	
}
// END CLASS

/* End of file acc.template_variables.php */
/* Location: ./system/expressionengine/third_party/template_variables/acc.template_variables.php */