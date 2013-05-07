<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');     

if ( ! defined('PATH_THIRD'))
{
	require(APPPATH."third_party/mountee/libraries/EE_Cocoa.php"); 
} else {
	require(PATH_THIRD."mountee/libraries/EE_Cocoa.php"); 
}

class Mountee_mcp extends EE_Cocoa {
	var $DEFAULT_SITE_ID;	
	var $VERSION 		 = "2.2";
	var $EE_VERSION		 = 2;  
	 
	function Mountee_mcp()
	{
		parent::EE_Cocoa();         
    	
    	$this->DEFAULT_SITE_ID = $this->EE->config->item('site_id');
    	
    	if ( ! function_exists('json_decode'))			// PHP 4 doesn't have decode_json()
		{
			$this->EE->load->library('Services_json');
		}

		if ($this->EE->config->item('save_tmpl_files') == 'y' AND $this->EE->config->item('tmpl_file_basepath') != '')
		{
			$this->data["filesync"] = True;
		} 
		else
		{
			$this->data["filesync"] = False;
		}   
	}	
	
	/*
		GET Requests
	*/
	
	function status()
	{
		$this->_start();
		$this->data["site_label"] = $this->EE->config->item('site_label');
		$this->data["base_url"] = $this->EE->config->item('base_url');
		$this->data["success"] = True;
		$this->_finish();
	}   
	
	function list_all()
    {
   		$this->_start();
   		$sql = "SELECT 	group_id,
						group_name, 
						is_site_default
				FROM 	".$this->EE->db->dbprefix."template_groups
				WHERE	site_id = ".$this->DEFAULT_SITE_ID;

		$group_query = $this->EE->db->query($sql); 
		$groups = $group_query->result();
			
		$this->data["groups"] = array();
		
		foreach($groups as $group)
		{

			// Get the templates for each group
			$sql = "SELECT 	t.template_id,
							t.group_id,
							t.template_name,
							t.template_type,
							t.edit_date,
							t.cache,
							t.refresh,
							t.allow_php,
							t.php_parse_location,
							t.hits,
							t.template_data,								
							t.save_template_file
					FROM	".$this->EE->db->dbprefix."templates t 
					JOIN	".$this->EE->db->dbprefix."template_groups g 	ON g.group_id = t.group_id
					WHERE	g.site_id = ".$this->DEFAULT_SITE_ID."
					AND		g.group_id = ".$this->EE->db->escape($group->group_id);
					
			$template_query = $this->EE->db->query($sql); 
			$results = $template_query->result();			
			
			$templates = array();
			
			foreach($results as $template) 
			{
				
				$templates[] = array(	"id" 				=> (int)$template->template_id,
										"name" 				=> $template->template_name,
										"type"				=> $template->template_type,
										"last_modified" 	=> (int)$template->edit_date,
										"should_cache"  	=> (bool)($template->cache =="y"),
										"cache_refresh"		=> (int)$template->refresh,										
										"allow_php"  		=> (bool)($template->allow_php =="y"),
										"php_parse_output"	=> (bool)($template->php_parse_location =="o"),												
										"hits"				=> (int)$template->hits,
										"data"				=> base64_encode($template->template_data),
										"save_template_file"=> (bool)($template->save_template_file =="y")
									);
			}
				
			$this->data["groups"][] = array("id" => (int)$group->group_id,
											"name" => $group->group_name,
											"templates" => $templates 
											);
			

			if($group->is_site_default=="y")
			{
				$this->data["index"] = (int)$group->group_id;
			}
		}

		// Get Snippets
		$sql = "SELECT 	snippet_id,
						snippet_name,
						snippet_contents
				FROM	".$this->EE->db->dbprefix."snippets 
				WHERE	site_id = ".$this->DEFAULT_SITE_ID."
				OR 		site_id = 0"; // Global snippets get set to site 0
				
		$snippet_query = $this->EE->db->query($sql); 
		$results = $snippet_query->result();
		
		$snippets = array();
		
		foreach($results as $snippet)
		{
			$snippets[] = array("id" 				=> (int)$snippet->snippet_id,
								"name" 				=> $snippet->snippet_name,
								"data"				=> base64_encode($snippet->snippet_contents)
								);
		}
		
		$this->data["snippets"] = $snippets;
					
					
		// Get Global Variables
							
		$sql = "SELECT 	variable_id,
						variable_name,
						variable_data
				FROM	".$this->EE->db->dbprefix."global_variables 
				WHERE	site_id = ".$this->DEFAULT_SITE_ID;
				
		$var_query = $this->EE->db->query($sql); 
		$results = $var_query->result();
		
		$variables = array();
		
		foreach($results as $variable)
		{
			$variables[] = array(	"id" 				=> (int)$variable->variable_id,
									"name" 				=> $variable->variable_name,
									"data"				=> base64_encode($variable->variable_data)
								);
		}
		
		$this->data["variables"] = $variables;
					
		$this->data["success"] = True;
		$this->_finish();
    }
	
	function list_snippets()
    {
		
		$this->_start();
		$sql = "SELECT 	snippet_id,
						snippet_name,
						snippet_contents
				FROM	".$this->EE->db->dbprefix."snippets 
				WHERE	site_id = ".$this->DEFAULT_SITE_ID."
				OR 		site_id = 0"; // Global snippets get set to site 0;
				
		$snippet_query = $this->EE->db->query($sql); 
		$results = $snippet_query->result();
		
		$snippets = array();
		
		foreach($results as $snippet)
		{
			$snippets[] = array("id" 				=> (int)$snippet->snippet_id,
								"name" 				=> $snippet->snippet_name,
								"data"				=> base64_encode($snippet->snippet_contents)
								);
		}
		
		$this->data["snippets"] = $snippets;
		
		$this->data["success"] = True;
		$this->_finish();

    }
    
    function read_snippet_data()
    {
    	$this->_start();
    	$this->_snippet_data($this->EE->input->get("snippet_id"));
    	$this->_finish();
    }
    
    
    function list_variables()
    {
		$this->_start();
		$sql = "SELECT 	variable_id,
						variable_name,
						variable_data
				FROM	".$this->EE->db->dbprefix."global_variables 
				WHERE	site_id = ".$this->DEFAULT_SITE_ID;
				
				
		$var_query = $this->EE->db->query($sql); 
		$results = $var_query->result();
		
		$variables = array();
		
		foreach($results as $variable)
		{
			$variables[] = array(	"id" 				=> (int)$variable->variable_id,
									"name" 				=> $variable->variable_name,
									"data"				=> base64_encode($variable->variable_data)
								);
		}
		
		$this->data["variables"] = $variables;
		$this->data["success"] = True;
		$this->_finish();
		
    }

	function read_variable_data()
	{
		$this->_start();
		$this->_variable_data($this->EE->input->get("variable_id"));
		$this->_finish();
	}

    
    function list_templates_for_group()
    {
    	$this->_start();
    	$sql = "SELECT 	t.template_id,
    					t.group_id,
    					t.template_name,
    					t.template_type,
    					t.edit_date,
    					t.cache,
    					t.refresh,
    					t.allow_php,
    					t.php_parse_location,
    					t.hits,
    					t.template_data,
    					t.save_template_file
    			FROM	".$this->EE->db->dbprefix."templates t 
    			JOIN	".$this->EE->db->dbprefix."template_groups g 	ON g.group_id = t.group_id
    			WHERE	g.site_id = ".$this->DEFAULT_SITE_ID."
    			AND		g.group_id = ".$this->EE->db->escape($this->EE->input->get("group_id"));
    			
    	$query = $this->EE->db->query($sql); 
    	$results = $query->result();			
    	
    	$this->data["templates"] = array();
    	
    	foreach($results as $template) 
    	{
    		$template_filename = $template->template_name; 
    		
    		$this->data["templates"][$template_filename] = array(	"id" 				=> (int)$template->template_id,
    																"name" 				=> $template->template_name,
    																"type"				=> $template->template_type,
    																"last_modified" 	=> (int)$template->edit_date,
    																"should_cache"  	=> (bool)($template->cache =="y"),
    																"cache_refresh"		=> (int)$template->refresh,
    																"allow_php"  		=> (bool)($template->allow_php =="y"),
    																"php_parse_output"	=> (bool)($template->php_parse_location =="o"),												
    																"hits"				=> (int)$template->hits,
    																"data"				=> base64_encode($template->template_data),
    																"save_template_file"=> (bool)($template->save_template_file =="y")																	
    															);
    	}
    	
    	$this->data["success"] = True;
    	$this->_finish();
    }
    
    function read_template_data()
    {
    	$this->_start();
    	$this->_template_data($this->EE->input->get("template_id"));
    	$this->_finish();    	
    }
    
    function list_groups()
    {
    	$this->_start();
    	$sql = "SELECT 	group_id,
						group_name, 
						is_site_default
				FROM 	".$this->EE->db->dbprefix."template_groups
				WHERE	site_id = ".$this->DEFAULT_SITE_ID;

		$query = $this->EE->db->query($sql); 
		$results = $query->result();
			
		$this->data["groups"] = array();
		
		foreach($results as $group)
		{
			$this->data["groups"][] = array("id" => (int)$group->group_id, "name" => $group->group_name);
			
			if($group->is_site_default=="y")
			{
				$this->data["index"] = (int)$group->group_id;
			}
		}
		$this->data["success"] = True;
		$this->_finish();   
    }
     
    function api_create_snippet($instructions) 
   	{	
    	$data = array(	'site_id' 			=> $this->DEFAULT_SITE_ID,
    					'snippet_name'		=> $instructions->name,
						"snippet_contents"	=> "");
    	
    	$this->EE->db->insert('snippets', $data);
    	
    	$this->data["success"] = True;
    	
    	$this->_snippet_data($this->EE->db->insert_id());
   	}
   	
   	function api_update_snippet($instruction)
    {		
		$data = str_replace("\\","",$instruction->data);
		$data = str_replace(" ","+",$data);		
		$decoded = base64_decode($data);
				
		$update = array("snippet_contents" 	=> 	$decoded );
						
		$this->EE->db->where('snippet_id', $instruction->snippet_id);		
		$this->EE->db->update('snippets', $update);
		
		$this->EE->functions->clear_caching('all');				
		
		$this->data["success"] = True;
		
		$this->_snippet_data($instruction->snippet_id);
    }
    
    
    
    function _snippet_data($snippet_id)
    {
    	$sql = "SELECT 	s.snippet_id,
    					s.snippet_contents,
						s.snippet_name
				FROM	".$this->EE->db->dbprefix."snippets s 
				WHERE	(s.site_id = ".$this->DEFAULT_SITE_ID." OR 		s.site_id = 0)
				AND		s.snippet_id = ".$this->EE->db->escape($snippet_id);

		$query = $this->EE->db->query($sql); 	
		
		if($query->num_rows()==0)
		{
			$this->data["snippet"] = False;
			$this->data["success"] = False;
		} 
		
		else 
		{			
			$snippet = $query->row();
			
			$this->data["snippet"] 	= array("id" 				=> (int)$snippet->snippet_id,
											"name" 				=> $snippet->snippet_name,
											"data"				=> base64_encode($snippet->snippet_contents)
											);	
											
			$this->data["success"] = True;
		}
    }
    
    function api_delete_snippet($instructions)
    {
    	$this->EE->db->delete('snippets', array("snippet_id" => $instructions->snippet_id));
    	$this->data["success"] = $this->EE->db->affected_rows() != 0;
    	$this->EE->functions->clear_caching('all');
    }
    
    function api_rename_snippet($instructions)
    {
	  	$data = array(	'snippet_name'		=> $instructions->name );	
						
		$this->EE->db->where("snippet_id",$instructions->snippet_id);		
		$this->EE->db->update("snippets",$data);
		
		$this->EE->functions->clear_caching('all');
		
		$this->data["success"] = True;
    }
    
    ///! Global Variables
 
        
    function api_create_variable($instructions) 
   	{	
    	$data = array(	'site_id' 			=> $this->DEFAULT_SITE_ID,
    					'variable_name'		=> $instructions->name,
						'variable_data'		=> "");
    	
    	$this->EE->db->insert('global_variables', $data);
    	
    	$this->data["success"] = True;
    	
    	$this->_variable_data($this->EE->db->insert_id());
   	}
   	
   	function api_update_variable($instructions)
    {		
		$data = str_replace("\\","", $instructions->data);
		$data = str_replace(" ","+",$data);		
		$decoded = base64_decode($data);
				
		$update = array("variable_data" 	=> 	$decoded );
						
		$this->EE->db->where('variable_id', $instructions->variable_id);
		$this->EE->db->update('global_variables', $update);
		
		$this->EE->functions->clear_caching('all');				
		
		$this->data["success"] = True;
		
		$this->_variable_data($instructions->variable_id);
    }
    
   
    function _variable_data($id)
    {
    	$sql = "SELECT 	v.variable_id,
    					v.variable_data,
						v.variable_name
				FROM	".$this->EE->db->dbprefix."global_variables v 
				WHERE	v.site_id = ".$this->DEFAULT_SITE_ID."
				AND		v.variable_id = ".$this->EE->db->escape($id);

		$query = $this->EE->db->query($sql); 	
		
		if($query->num_rows()==0)
		{
			$this->data["variable"] = False;
			$this->data["success"]  = False;
		} 
		
		else 
		{			
			$variable = $query->row();
			
			$this->data["variable"] 	= array("id" 				=> (int)$variable->variable_id,
												"name" 				=> $variable->variable_name,
												"data"				=> base64_encode($variable->variable_data)
												);	
			$this->data["success"] = True;												
		}
    }
    
    function api_delete_variable($instructions)
    {
    	$this->EE->db->delete('global_variables', array("variable_id" => $instructions->variable_id));
    	$this->data["success"] = $this->EE->db->affected_rows() != 0;
    	$this->EE->functions->clear_caching('all');
    }
    
    function api_rename_variable($instructions)
    {
	  	$data = array(	'variable_name'		=> $instructions->name );	
						
		$this->EE->db->where("variable_id",$instructions->variable_id);		
		$this->EE->db->update("global_variables",$data);
		
		$this->EE->functions->clear_caching('all');
		
		$this->data["success"] = True;
    }
    
    ///! Template Preferences
    			
    function api_set_hits($instructions) 
    {
    	$this->EE->db->where("template_id", $instructions->template_id);
    	$this->EE->db->update("templates", array('hits'=>$instructions->val));
    	
    	$this->data["success"] = True;
    }  
    
	function api_set_type($instructions) 
    {
    	$this->EE->db->where("template_id", $instructions->template_id);
    	$this->EE->db->update("templates", array('template_type'=>$instructions->val));
    	
    	$this->data["success"] = True;
    }    
    
    function api_set_php($instructions) 
   	{
    	$this->EE->db->where("template_id", $instructions->template_id);
    	
    	switch($instructions->val)
    	{
	    	case "off":
	    		$data = array('allow_php' => 'n');
	    		break;
    		case "output":
    			$data = array('allow_php' => 'y', 'php_parse_location' => 'o');
    			break;
    		case "input":
    			$data = array('allow_php' => 'y', 'php_parse_location' => 'i');
    			break;
    	}
    	
  		$this->EE->db->update("templates", $data);
    	
    	$this->data["success"] = True;
   	}
   	
    function api_set_caching($instructions) 
   	{
    	$this->EE->db->where("template_id", $instructions->template_id);
    	
    	if($instructions->val=="0")
    	{
    		$data = array('cache' => 'n');
    	} else
    	{
    		$data = array('cache' => 'y', 'refresh' => $instructions->val);
    	}
    	
  		$this->EE->db->update("templates", $data);
    	
    	$this->data["success"] = True;
   	}
    
     ///! Templates
     
    				
    function api_delete_template($instructions)
    {
    	// todo: delete revisions too?
		$this->EE->db->delete('templates', array("template_id" => $instructions->template_id));
    	$this->data["success"] = $this->EE->db->affected_rows() != 0;
    	$this->EE->functions->clear_caching('all');
    }
    
    function api_move_template($instructions)
    {
	  	$data = array(	'group_id' 			=> $instructions->group_id,
						"edit_date"			=> $this->EE->localize->now,
						"last_author_id" 	=> $this->EE->session->userdata['member_id']
						);	
						
		$this->EE->db->where("template_id", $instructions->template_id);		
		$this->EE->db->update("templates",$data);
				
		$this->EE->functions->clear_caching('all');

		$this->data["success"] = True;
    }
    
    function api_rename_template($instructions)
    {
	  	$data = array(	'template_name'		=> $instructions->name,
						"edit_date"			=> $this->EE->localize->now,
						"template_type"		=> $instructions->type,
						"last_author_id" 	=> $this->EE->session->userdata['member_id']
						);	

		$this->EE->db->where("template_id", $instructions->template_id);		
		$this->EE->db->update("templates",$data);
		
		$this->EE->functions->clear_caching('all');
		
		$this->data["success"] = True;
    }
    
    function api_create_template($instructions) 
   	{
   		$data = array(	'site_id' 			=> $this->DEFAULT_SITE_ID,
    					'group_id' 			=> $instructions->group_id,
    					'template_name'		=> $instructions->name,
						"edit_date"			=> $this->EE->localize->now,
						"last_author_id" 	=> $this->EE->session->userdata['member_id'],
						"template_type"		=> $instructions->type);
    	
    	$this->EE->db->insert('templates', $data);
    	
    	
    	$this->data["success"] = True;
    	
    	$this->_template_data($this->EE->db->insert_id());
   	}

	function api_update_template($instructions)
    {		
		$data = str_replace("\\","",$instructions->template_data);
		$data = str_replace(" ","+",$data);		
		$decoded = base64_decode($data);
		
		/**	 Save revision cache */
				
		if ($this->EE->config->item('save_tmpl_revisions')=='y' && strlen($decoded))  // If the update blanks it out, don't bother saving a revision.
		{
			$revision = array(
							'item_id'			=> $instructions->id,
							'item_table'		=> $this->EE->db->dbprefix.'templates',
							'item_field'		=> 'template_data',
							'item_data'			=> $decoded,
							'item_date'			=> $this->EE->localize->now,
							'item_author_id'	=> $this->EE->session->userdata['member_id']
						 );

			$this->EE->db->insert("revision_tracker", $revision);
		}
	
		
		$update = array("template_data" 	=> 	$decoded,
						"edit_date"			=> 	$this->EE->localize->now,
						"last_author_id" 	=>  $this->EE->session->userdata['member_id']);
						
		$this->EE->db->where('template_id', $instructions->id);
		$this->EE->db->update('templates', $update);
		
		$this->EE->functions->clear_caching('all');				
		
		$this->data["success"] = True;
		
		$this->_template_data($instructions->id);
    }


    
    
    function _template_data($template_id)
    {
    	$sql = "SELECT 	t.template_id,
						t.group_id,
						t.template_name,
						t.template_type,
						t.template_data,
						t.edit_date,
						t.cache,
						t.refresh,
						t.allow_php,
						t.php_parse_location,
						t.hits,
						t.save_template_file
				FROM	".$this->EE->db->dbprefix."templates t 
				WHERE	t.site_id = ".$this->DEFAULT_SITE_ID."
				AND		t.template_id = ".$this->EE->db->escape($template_id);

		$query = $this->EE->db->query($sql); 	
		
		if($query->num_rows()==0)
		{
			$this->data["template"] = False;
			$this->data["success"] = False;			
		} 
		
		else 
		{			
			$template = $query->row();
			
			$this->data["template"] = array("id" 				=> (int)$template->template_id,
											"group_id" 			=> (int)$template->group_id,
											"name" 				=> $template->template_name,
											"type"				=> $template->template_type,
											"last_modified" 	=> (int)$template->edit_date,
											"should_cache"  	=> (bool)($template->cache =="y"),
											"cache_refresh"		=> (int)$template->refresh,
											"allow_php"  		=> (bool)($template->allow_php =="y"),
											"php_parse_output"	=> (bool)($template->php_parse_location =="o"),												
											"hits"				=> (int)$template->hits,
											"data"				=> base64_encode($template->template_data),
											"save_template_file"=> (bool)($template->save_template_file =="y")
											);	
			$this->data["success"] = True;											
		}
    }
    
    
    ///! Groups
	function api_set_site_default($instructions)
 	{ 		
		$this->EE->db->where("site_id", $this->DEFAULT_SITE_ID);
		$this->EE->db->update("template_groups",array("is_site_default" => 'n'));
				
		$this->EE->db->where("group_id", $instructions->group_id);
		$this->EE->db->update("template_groups",array("is_site_default" => 'y'));
		
		$this->data["success"] = True;
 	}  

    function api_delete_group($instructions) 
   	{
    	$this->EE->db->delete('templates', array("group_id" => $instructions->group_id));
    	$this->EE->db->delete('template_groups', array("group_id" => $instructions->group_id));    	
    	
    	$this->data["success"] = $this->EE->db->affected_rows() != 0;
    	$this->EE->functions->clear_caching('all');
   	}
    
    function api_create_group($instructions) 
   	{
		/* 
		
		1. Unfortunately, we can't use the EE create template API, because 
		   it automatically creates a new index template in the folder.
		   We want to be able to drag and drop in an entire directory 
		   structure, without random empty index files showing up.
		
		2. Creating a new folder in OS X defaults with a name of "Untitled Folder"
		   which is an invalid group name as it contains a space.  We must therefore
		   do some basic URL safety conversion.  
		   
		   UPDATE: This must happen in MacFuse
		   because finder will ask to retrieve the folder by the name it provided.
		*/
   		
   		$group_order = $this->EE->db->count_all('template_groups') + 1;
   		
		$data = array(	'site_id'			=> $this->DEFAULT_SITE_ID,
						'group_name'		=> $instructions->group_name,
						'group_order'		=> $group_order,
						'is_site_default' 	=> 'n');
						
		$this->EE->db->insert('template_groups',$data);						
		
		$this->data["group_id"] = $this->EE->db->insert_id();
		$this->data["success"] = True;											
   	}

	function api_rename_group($instructions) 
	{
 
   		$update = array("group_name" => $instructions->new_name);
   		$this->EE->db->where('group_id', $instructions->group_id);
   		$this->EE->db->update('template_groups', $update);
   		
   		$this->EE->functions->clear_caching('all');
   		
   		$this->data["success"] = True;
   	}
    

}

?>