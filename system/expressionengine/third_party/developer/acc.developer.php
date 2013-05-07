<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine Developer Accessory
 *
 * @package		Developer
 * @category	Accessory
 * @description	Adds functionality for developers
 * @author		Ben Croker
 * @link		http://www.putyourlightson.net/developer
 */
 

class Developer_acc
{
	var $name	 		= 'Developer';
	var $id	 			= 'developer';
	var $version	 	= '1.5';
	var $description	= 'Adds functionality for developers';
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
		$this->sections[] = '<script type="text/javascript" charset="utf-8">$("#accessoryTabs a.developer").parent().remove();</script>';

		
		// check if super admin
		if ($this->EE->session->userdata('group_id') != 1)
		{
			return;
		}
		
		
		$theme_folder_url = $this->EE->config->slash_item('theme_folder_url').'third_party/developer/';
		
		$html = '<li id="developer_acc" class="parent"><a href="#" class="first_level" tabindex="-1">Developer</a><ul>';
		
		
		// templates	
		$query = $this->EE->template_model->get_template_groups();
				
		$html .= '<li class="parent"><a href="'.BASE.'&C=design&M=manager" tabindex="-1">Templates</a><ul>';
		
		foreach ($query->result() as $row)
		{						
			$html .= '<li class="subparent"><a href="'.BASE.'&C=design&M=manager&tgpref='.$row->group_id.'" tabindex="-1">'.$row->group_name.'</a><ul>';
			
			// get templates in this group
			$template_query = $this->EE->template_model->get_templates(NULL, array(), array('exp_templates.group_id' => $row->group_id));
			
			foreach ($template_query->result() as $template)
			{
				$html .= '<li><a href="'.BASE.'&C=design&M=edit_template&id='.$template->template_id.'" tabindex="-1">'.$template->template_name.'</a></li>';
			}
			
			$html .= '<li><a href="'.BASE.'&C=design&M=new_template&group_id='.$row->group_id.'" tabindex="-1" class="add">Add Template</a></li>';
			
			$html .= '</ul></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=design&M=new_template_group" tabindex="-1" class="add">Add Template Group</a></li></ul></li>';
		
		
		// custom fields
		$this->EE->load->model('field_model');	
		$query = $this->EE->field_model->get_field_groups();
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=admin_content&M=field_group_management" tabindex="-1">Custom Fields</a><ul>';
		
		foreach ($query->result() as $row)
		{			
			$html .= '<li class="subparent"><a href="'.BASE.'&C=admin_content&M=field_management&group_id='.$row->group_id.'" tabindex="-1">'.$row->group_name.'</a><ul>';
			
			// get fields in this group
			$field_query = $this->EE->field_model->get_fields($row->group_id);
			
			foreach ($field_query->result() as $field)
			{		
				$html .= '<li><a href="'.BASE.'&C=admin_content&M=field_edit&field_id='.$field->field_id.'&group_id='.$row->group_id.'" tabindex="-1">'.$field->field_name.'</a></li>';
			}
			
			$html .= '<li><a href="'.BASE.'&C=admin_content&M=field_edit&group_id='.$row->group_id.'" tabindex="-1" class="add">Add Field</a></li>';
			
			$html .= '</ul></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=admin_content&M=field_group_edit" tabindex="-1" class="add">Add Field Group</a></li></ul></li>';
		
		
		// channels
		$this->EE->load->model('channel_model');	
		$query = $this->EE->channel_model->get_channels();
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=admin_content&M=channel_management" tabindex="-1">Channels</a><ul>';

		foreach ($query->result() as $row)
		{			
			$html .= '<li><a href="'.BASE.'&C=admin_content&M=channel_edit_group_assignments&channel_id='.$row->channel_id.'" tabindex="-1" class="tip">groups</a><a href="'.BASE.'&C=admin_content&M=channel_edit&channel_id='.$row->channel_id.'" tabindex="-1">'.$row->channel_title.'</a></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=admin_content&M=channel_add" tabindex="-1" class="add">Add Channel</a></li></ul></li>';
		
		
		// categories
		$this->EE->load->model('category_model');	
		$query = $this->EE->category_model->get_categories('', $this->EE->config->item('site_id'));
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=admin_content&M=category_management" tabindex="-1">Categories</a><ul>';

		foreach ($query->result() as $row)
		{			
			$html .= '<li class="subparent"><a href="'.BASE.'&C=admin_content&M=category_editor&group_id='.$row->group_id.'" tabindex="-1">'.$row->group_name.'</a><ul>';			
			
			// get categories in this group
			$categories_query = $this->EE->category_model->get_channel_categories($row->group_id);
			
			foreach ($categories_query->result() as $category)
			{		
				$html .= '<li><a href="'.BASE.'&C=admin_content&M=category_edit&cat_id='.$category->cat_id.'&group_id='.$row->group_id.'" tabindex="-1">'.$category->cat_name.'</a></li>';
			}
			
			$html .= '<li><a href="'.BASE.'&C=admin_content&M=category_edit&group_id='.$row->group_id.'" tabindex="-1" class="add">Add Category</a></li>';
			
			$html .= '</ul></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=admin_content&M=edit_category_group" tabindex="-1" class="add">Add Category Group</a></li></ul></li>';
		
		
		// member groups
		$this->EE->load->model('member_model');	
		$query = $this->EE->member_model->get_member_groups();
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=members&M=member_group_manager" tabindex="-1">Member Groups</a><ul>';

		foreach ($query->result() as $row)
		{			
			$html .= '<li><a href="'.BASE.'&C=members&M=view_all_members&group_id='.$row->group_id.'" tabindex="-1" class="tip">members</a><a href="'.BASE.'&C=members&M=edit_member_group&group_id='.$row->group_id.'" tabindex="-1">'.$row->group_title.'</a></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=members&M=edit_member_group" tabindex="-1" class="add">Add Member Group</a></li></ul></li>';
		
		
		// upload preferences
		$upload_preferences = array();
		
		if (version_compare(APP_VER, '2.4', '>='))
		{
			$this->EE->load->model('File_upload_preferences_model');	
			$upload_preferences = $this->EE->File_upload_preferences_model->get_file_upload_preferences();
		}
		else
		{
			$this->EE->load->model('tools_model');	
			$upload_preferences = $this->EE->tools_model->get_upload_preferences()->result_array();
		}
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=content_files&M=file_upload_preferences" tabindex="-1">Upload Destinations</a><ul>';

		foreach ($upload_preferences as $row)
		{			
			$html .= '<li><a href="'.BASE.'&C=content_files&M=edit_upload_preferences&id='.$row['id'].'" tabindex="-1">'.$row['name'].'</a></li>';
		}
		
		$html .= '<li><a href="'.BASE.'&C=content_files&M=edit_upload_preferences" tabindex="-1" class="add">Add Upload Destination</a></li></ul></li>';
				
		
		// divider
		$html .= '<li class="nav_divider"></li>';
		
		
		// modules		
		$this->EE->db->select('module_name');
		$this->EE->db->where('has_cp_backend', 'y');
		$this->EE->db->order_by('module_name', 'asc');
		$query = $this->EE->db->get('modules');
		
		$html .= '<li class="parent"><a href="'.BASE.'&C=addons_modules" tabindex="-1">Modules</a><ul>';

		foreach ($query->result() as $row)
		{
			$html .= '<li><a href="'.BASE.'&C=addons_modules&M=show_module_cp&module='.strtolower($row->module_name).'" tabindex="-1">'.str_replace('_', ' ', $row->module_name).'</a></li>';
		}
		
		$html .= '</ul></li>';
		
		
		// admin
		$html .= '<li class="parent"><a href="'.BASE.'&C=admin_system" tabindex="-1">Admin</a><ul>';
		$html .= '<li><a href="'.BASE.'&C=admin_system&M=localization_settings" tabindex="-1">Localization Settings</a></li>';
		$html .= '<li><a href="'.BASE.'&C=admin_system&M=email_configuration" tabindex="-1">Email Configuration</a></li>';
		$html .= '<li><a href="'.BASE.'&C=admin_system&M=output_debugging_preferences" tabindex="-1">Output and Debugging</a></li>';	
		$html .= '<li><a href="'.BASE.'&C=admin_system&M=security_session_preferences" tabindex="-1">Security and Session</a></li>';
		$html .= '<li><a href="'.BASE.'&C=admin_content&M=global_channel_preferences" tabindex="-1">Channel Preferences</a></li>';
		$html .= '<li><a href="'.BASE.'&C=members&M=member_config" tabindex="-1">Membership Preferences</a></li>';
		$html .= '</ul></li>';
		
		
		// tools
		$html .= '<li class="parent"><a href="'.BASE.'&C=tools" tabindex="-1">Tools</a><ul>';
		$html .= '<li><a href="'.BASE.'&C=tools_data&M=sql_query_form" tabindex="-1" class="tip">query</a><a href="'.BASE.'&C=tools_data&M=sql_view_database" tabindex="-1">SQL Manager</a></li>';
		$html .= '<li><a href="'.BASE.'&C=tools_utilities&M=php_info" tabindex="-1">PHP Info</a></li>';
		$html .= '<li><a href="'.BASE.'&C=tools_logs&M=view_cp_log" tabindex="-1">Control Panel Log</a></li>';
		$html .= version_compare(APP_VER, '2.4', '>=') ? '<li><a href="'.BASE.'&C=tools_logs&M=view_developer_log" tabindex="-1">Developer Log</a></li>' : '';		
		$html .= '</ul></li>';
		
		
		// divider
		$html .= '<li class="nav_divider"></li>';
		
		
		// other links
		$html .= '<li><a href="'.BASE.'&C=admin_system&M=general_configuration" tabindex="-1">General Configuration</a></li>';	
		
				
		$html .= '</ul>';
		
		
		// add slashes
		$html = addslashes($html);
		
		
		// add css, js and html
		$this->EE->cp->add_to_head('
		<!-- Developer begin -->
		<style type="text/css">
			#developer_acc li {display: list-item !important;}
			#developer_acc li.subparent {background: url(/themes/cp_themes/default/images/nav_arrow_light.png) center right no-repeat;}
			#developer_acc a.add {font-style: italic;}
			#developer_acc a.tip {display: none; position: absolute; right: 0; background: #000; padding: 2px 3px; font-style: italic; font-size: 11px;}
			#developer_acc li.active > a.tip {display: block;}
		</style>		
		<script type="text/javascript">
			var developer = \''.$html.'\';
			$(document).ready(function()
			{
					$("div#mainMenu ul#navigationTabs li:last").before($(developer));
			});
		</script>
		<!-- Developer end -->
		');
	}
	
}
// END CLASS

/* End of file acc.developer.php */
/* Location: ./system/expressionengine/third_party/developer/acc.developer.php */