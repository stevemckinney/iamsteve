<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (! defined('TEMPLATE_SNIPPET_SELECT_VERSION'))
{
    // get the version from config.php
    require PATH_THIRD.'template_snippet_select/config.php';
    define('TEMPLATE_SNIPPET_SELECT_VERSION', $config['version']);
    define('TEMPLATE_SNIPPET_SELECT_NAME', $config['name']);
}

/**
 * ExpressionEngine Template Select Fieldtype Class
 * Based on Timothy Kelty's Template Select extension for EE 1.6
 *
 * @package     ExpressionEngine
 * @subpackage  Fieldtypes
 * @category    Template & Snippet Select
 * @author      Brian Litzinger
 * @copyright   Copyright 2010 - Brian Litzinger
 * @link        http://boldminded.com
 */
 
class Template_snippet_select_ft extends EE_Fieldtype {
   
    var $cache;
    var $has_array_data = TRUE;
    var $settings_exist = 'y';
    var $settings = array();
    
    var $info = array(
        'name'      => TEMPLATE_SNIPPET_SELECT_NAME,
        'version'   => TEMPLATE_SNIPPET_SELECT_VERSION
    );
  
    function Template_snippet_select_ft()
    {
        parent::EE_Fieldtype();
        
        // Create cache
        if (! isset($this->EE->session->cache[__CLASS__]))
        {
            $this->EE->session->cache[__CLASS__] = array();
        }
        $this->cache =& $this->EE->session->cache[__CLASS__];
    }
  
    /**
     * Normal Fieldtype settings
     */
    function display_settings($data)
    {
        $rows = $this->_get_field_settings($data);

        foreach ($rows as $row)
        {
            $this->EE->table->add_row($row[0], $row[1]);
        }
    }
    
    /**
     * Display Matrix Cell Settings
     */
    function display_cell_settings($data)
    {
        return $this->_get_field_settings($data);
    }
    
    /**
     * Display Low Variables Settings
     */
    function display_var_settings($data)
    {
        return $this->display_cell_settings($data);
    }

    /**
     * Save Normal Fieldtype settings
     */
    function save_settings($data)
    {
        $post = $this->EE->input->post('tss');
        
        return array(
            'template_snippet_select' => array(
                'field_templates' => array(
                    'show_all' => (isset($post['field_show_all_templates']) ? $post['field_show_all_templates'] : false),
                    'show_group' => (isset($post['field_show_group_templates']) ? $post['field_show_group_templates'] : false),
                    'show_selected' => (isset($post['field_show_selected_templates']) ? $post['field_show_selected_templates'] : false),
                    'templates' => (isset($post['field_template_select']) ? $post['field_template_select'] : false)
                ),
                'field_snippets' => array(
                    'show_all' => (isset($post['field_show_all_snippets']) ? $post['field_show_all_snippets'] : false),
                    'show_selected' => (isset($post['field_show_selected_snippets']) ? $post['field_show_selected_snippets'] : false),
                    'snippets' => (isset($post['field_snippet_select']) ? $post['field_snippet_select'] : false)
                )
            )
        );
    }
    
    /**
     * Save Matrix Cell Settings
     */
    function save_cell_settings($settings)
    {
        $settings = $settings['tss'];
        
        return array(
            'template_snippet_select' => array(
                'field_templates' => array(
                    'show_all' => isset($settings['field_show_all_templates']) ? $settings['field_show_all_templates'] : false,
                    'show_group' => isset($settings['field_show_group_templates']) ? $settings['field_show_group_templates'] : false,
                    'show_selected' => isset($settings['field_show_selected_templates']) ? $settings['field_show_selected_templates'] : false,
                    'templates' => isset($settings['field_template_select']) ? $settings['field_template_select'] : false
                ),
                'field_snippets' => array(
                    'show_all' => isset($settings['field_show_all_snippets']) ? $settings['field_show_all_snippets'] : false,
                    'show_selected' => isset($settings['field_show_selected_snippets']) ? $settings['field_show_selected_snippets'] : false,
                    'snippets' => isset($settings['field_snippet_select']) ? $settings['field_snippet_select'] : false
                )
            )
        );
    }
    
    /**
     * Save Low Variables Settings
     */
    function save_var_settings($settings)
    {
        return $this->save_settings($settings);
    }
    
    /**
     * Normal Fieldtype Display
     */
    function display_field($data)
    {
        $group_id = $this->_get_group_id($this->field_id);
        
        $templates = $this->_templates_select($data, $this->field_name, $this->field_id);
        $snippets  = $this->_snippets_select($data, $this->field_name, $this->field_id);
        
        $return = form_dropdown($this->field_name, array(lang('none'), 'Templates' => $templates, 'Snippets' => $snippets), $data, 'id="'. $this->field_name .'"');
        
        // If the current user is an Admin, give them a link to edit the templates that appear
        if($this->EE->session->userdata['group_id'] == 1 AND $group_id)
        {
            $return .= '<br /><small style="display: inline-block; margin-top: 5px; color: rgba(0,0,0, 0.5);"><a href="'. BASE.AMP.'C=admin_content'.AMP.'M=field_edit'.AMP.'field_id='.$this->field_id.AMP.'group_id='.$group_id .'">Edit Available Templates & Snippets</a></small>';
        }
        
        return $return;
    }

    /**
     * Matrix Cell Display
     */
    function display_cell($data)
    {
        $group_id = $this->_get_group_id($this->field_id);
        
        $templates = $this->_templates_select($data, $this->cell_name, $this->field_id);
        $snippets  = $this->_snippets_select($data, $this->cell_name, $this->field_id);
        
        $return['class'] = 'template-select-matrix';
        $return['data'] = form_dropdown($this->cell_name, array(lang('none'), 'Templates' => $templates, 'Snippets' => $snippets), $data, 'id="'. $this->cell_name .'"');
        
        // If the current user is an Admin, give them a link to edit the templates that appear
        if($this->EE->session->userdata['group_id'] == 1 AND $group_id)
        {
            $return['data'] .= '<br /><small style="display: inline-block; margin-top: 5px; color: rgba(0,0,0, 0.5);"><a href="'. BASE.AMP.'C=admin_content'.AMP.'M=field_edit'.AMP.'field_id='.$this->field_id.AMP.'group_id='.$group_id .'">Edit Available Templates & Snippets</a></small>';
        }
        
        return $return;
    }
    
    /**
     * Low Variables Fieldtype Display
     */
    function display_var_field($data)
    {
        return $this->display_field($data);
    }
    
    /**
     * Print the embed tag, with parameters if defined
     */
    function replace_tag($data, $params = '', $tagdata = '')
    {
        // If it's numeric, then we have a Snippet ID, otherwise we have a template
        if(is_numeric($data) and $data and isset($this->EE->config->_global_vars[$this->_get_snippet($data)]))
        {
            return $this->EE->config->_global_vars[$this->_get_snippet($data)];
        }
        elseif($data)
        {
            if($params AND isset($params['embed']) AND $params['embed'] == 'y')
            {
                $p = array();
                foreach($params as $param => $value)
                {
                    $p[] = $param .'="'. $value .'"';
                }
                
                return '{embed="'. $data .'" '. implode(" ", $p) .'}';
            }
            elseif(isset($params['embed']) AND $params['embed'] == 'y')
            {
                return '{embed="'. $data .'"}';
            }
            else
            {
                return $data;
            }
        }
        else
        {
            return '';
        }
    }
    
    /**
     * Low Variables replace tag
     */
    function display_var_tag($data, $params = '', $tagdata = '')
    {
        $this->replace_tag($data, $params, $tagdata);
    }
    

    
    /**
    * Template Groups Multi-select
    *
    * @return string  multi-select HTML
    * @access private
    */
    private function _templates_select($data)
    {
        $this->EE->lang->loadfile('template_snippet_select');
        $settings = $this->_get_settings();
        $settings = $settings['field_templates'];
        $templates = $this->_get_templates();

        // Get the templates (if they exist)
        if($templates->num_rows() == 0)
        {
            $return = '';
        }
        elseif(is_array($settings))
        {
            $template_options = array();
            
            foreach($templates->result_array() as $row)
            {
                // Depending on which settings show the appropriate templates
                if(isset($settings['show_all']) AND $settings['show_all'] == 'y')
                {
                    $file = $row['group_name'] .'/'. $row['template_name'];
                    $template_options[$file] = $file;
                }
                elseif(isset($settings['show_group']) AND $settings['show_group'] !== false AND in_array($row['group_name'], $settings['show_group']))
                {
                    $file = $row['group_name'] .'/'. $row['template_name'];
                    $template_options[$file] = $file;
                }
                elseif(isset($settings['show_selected']) AND $settings['show_selected'] == 'y' AND in_array($row['template_id'], $settings['templates']))
                {
                    $file = $row['group_name'] .'/'. $row['template_name'];
                    $template_options[$file] = $file;
                }
            }
            
            // $return = count($template_options) > 0 ? $template_options : array(lang('template_not_defined'));
            $return = count($template_options) > 0 ? $template_options : ''; 
        }
        else
        {
            $return = array(lang('template_not_defined'));
        }
        
        return $return;
    }
    
    /**
    * Snippets Multi-select
    *
    * @return string  multi-select HTML
    * @access private
    */
    private function _snippets_select($data)
    {
        $this->EE->lang->loadfile('template_snippet_select');
        $settings = $this->_get_settings();
        $settings = $settings['field_snippets'];
        $snippets = $this->_get_snippets();
        
        // Get the snippets (if they exist)
        if($snippets->num_rows() == 0)
        {
            $return = '';
        }
        elseif(is_array($settings))
        {
            $snippet_options = array();
            
            foreach($snippets->result_array() as $row)
            {
                if(is_array($settings['snippets']) AND in_array($row['snippet_id'], $settings['snippets']) OR $settings['show_all'] == 'y')
                {
                    $snippet_options[$row['snippet_id']] = $row['snippet_name'];
                }
            }
            
            // $return = count($snippet_options) > 0 ? $snippet_options : array(lang('snippet_not_defined'));
            $return = count($snippet_options) > 0 ? $snippet_options : ''; 
        }
        else
        {
            $return = array(lang('snippet_not_defined'));
        }

        return $return;
    }
    
    private function _create_template_options($templates, $multi_select = false)
    {
        $options = array();

        foreach($templates->result_array() as $row) 
        {
            $file = $row['group_name'] .'/'. $row['template_name'];
            $options[$row['template_id']] = $file;
        }
        
        return $options;
    }
    
    private function _create_snippet_options($snippets, $multi_select = false)
    {
        $options = array();
        
        foreach($snippets->result_array() as $row)
        {
            $options[$row['snippet_id']] = $row['snippet_name'];
        }
        
        return $options;
    }
    
    private function _get_templates()
    {
        if(!isset($this->cache['templates']))
        {
            // Get the current Site ID
            $site_id = $this->EE->config->item('site_id');

            $sql = "SELECT tg.group_name, t.template_name, t.template_id
                    FROM exp_template_groups tg, exp_templates t
                    WHERE tg.group_id = t.group_id
                    AND tg.site_id = '".$site_id."' 
                    ORDER BY tg.group_name, t.template_name";

            $this->cache['templates'] = $this->EE->db->query($sql);
        }
        
        return $this->cache['templates'];
    }
    
    private function _get_snippet($snippet_id)
    {
        if(!isset($this->cache['snippet_'. $snippet_id]))
        {
            $this->EE->db->select('snippet_name');
            $this->EE->db->where('snippet_id', $snippet_id);
            $this->EE->db->from('snippets');
            $query = $this->EE->db->get();
        
            $this->cache['snippet_'. $snippet_id] = $query->row('snippet_name');
        }
        
        return $this->cache['snippet_'. $snippet_id];
    }
    
    private function _get_snippets()
    {
        if(!isset($this->cache['snippets']))
        {
            // Get the current Site ID
            $site_id = $this->EE->config->item('site_id');

            $sql = "SELECT *
                    FROM exp_snippets
                    WHERE site_id = '".$site_id."' 
                    OR site_id = '0'
                    ORDER BY snippet_name";

            $this->cache['snippets'] = $this->EE->db->query($sql);
        }
        
        return $this->cache['snippets'];
    }
    
    private function _get_settings()
    {
        // If it's a Matrix field
        if(isset($this->settings['template_snippet_select']) AND is_array($this->settings['template_snippet_select'])) 
        {
            return $this->settings['template_snippet_select'];
        }
        // It's not a Matrix field
        elseif(isset($this->settings['template_snippet_select']))
        {
            return unserialize(base64_decode($this->settings['template_snippet_select']));
        }
        else
        {
            return array();
        }
    }
    
    private function _get_group_id($field_id = false)
    {
        // For Low Variables, $field_id isn't available, so degrade gracefully.
        if(!$field_id)
            return false;
        
        if(!isset($this->cache['group_id'][$field_id]))
        {
            $this->EE->db->select('group_id');
            $this->EE->db->where('field_id', $field_id);
            $this->EE->db->from('channel_fields');
            $query = $this->EE->db->get();
        
            foreach($query->result_array() as $row)
            {
                $this->cache['group_id'][$field_id] = $row['group_id'];
            }
        }
        
        return $this->cache['group_id'][$field_id];
    }
    
    private function _get_field_settings($settings)
    {
        $this->EE->lang->loadfile('template_snippet_select');
        $templates = $this->_get_templates();
        $snippets = $this->_get_snippets();

        // All the stuff for Templates
        $settings = (!isset($settings['template_snippet_select']) OR $settings['template_snippet_select'] == '') ? array() : $settings['template_snippet_select'];

        $template_checkbox_options = '<p>'. form_checkbox('tss[field_show_all_templates]', 'y', (isset($settings['field_templates']['show_all']) AND $settings['field_templates']['show_all'] == 'y') ? TRUE : FALSE, 'id="show_all_templates" class="show_all_templates"') . ' <label for="show_all_templates">Show all</label></p>';

        $groups = array();
        foreach($templates->result_array() as $template)
        {
            if(!in_array($template['group_name'], $groups))
            {
                $template_checkbox_options .= '<p>'. form_checkbox('tss[field_show_group_templates][]', $template['group_name'], (isset($template['group_name']) AND isset($settings['field_templates']['show_group']) AND is_array($settings['field_templates']['show_group']) AND in_array($template['group_name'], $settings['field_templates']['show_group'])) ? TRUE : FALSE, 'class="show_group_templates" id="show_'. $template['group_name'] .'"') . ' <label for="show_'. $template['group_name'] .'">Show all <i>'. $template['group_name'] .'</i> templates</label></p>';
            }
            $groups[] = $template['group_name'];
        }
        
        $template_checkbox_options .= '<p>'. form_checkbox('tss[field_show_selected_templates]', 'y', (isset($settings['field_templates']['show_selected']) AND $settings['field_templates']['show_selected'] == 'y') ? TRUE : FALSE, 'id="show_selected_templates" class="show_selected_templates"') . ' <label for="show_selected_templates">Show only specific templates</label></p>';
        
        // All the stuff for Snippets
        $snippet_checkbox_options = '<p>'. form_checkbox('tss[field_show_all_snippets]', 'y', (isset($settings['field_snippets']['show_all']) AND $settings['field_snippets']['show_all'] == 'y') ? TRUE : FALSE, 'id="show_all_snippets" class="show_all_snippets"') . ' <label for="show_all_snippets">Show all</label></p>';
        $snippet_checkbox_options .= '<p>'. form_checkbox('tss[field_show_selected_snippets]', 'y', (isset($settings['field_snippets']['show_selected']) AND $settings['field_snippets']['show_selected'] == 'y') ? TRUE : FALSE, 'id="show_selected_snippets" class="show_selected_snippets"') . ' <label for="show_selected_snippets">Show only specific snippets</label></p>';
        
        if($snippets->num_rows() == 0)
        {
            $snippet_options = '<p>No Snippets exist.</p>';
        }
        else
        {
            $snippet_options = form_multiselect('tss[field_snippet_select][]', $this->_create_snippet_options($snippets, true), isset($settings['field_snippets']['snippets']) ? $settings['field_snippets']['snippets'] : array(), 'class="field_snippet_select" size="10" style="display: none;"');
        }
        
        $this->_load_js();
        
        return array(
            array(
                '<strong>'. lang('template_setting_title') .'</strong>',
                $template_checkbox_options .
                form_multiselect('tss[field_template_select][]', $this->_create_template_options($templates, true), isset($settings['field_templates']['templates']) ? $settings['field_templates']['templates'] : array(), 'size="10" class="field_template_select" style="display: none;"')
            ),
            array(
                '<strong>'. lang('snippet_setting_title') .'</strong>',
                $snippet_checkbox_options .
                $snippet_options
            )
        );
    }
    
    private function _load_js()
    {
        if(!isset($this->cache['js_added']))
        {
            $script = '
                function show_all_templates(on_load){
                    if($(".show_all_templates").is(":checked")){
                        $(".show_group_templates, .show_selected_templates").attr("checked", false).attr("disabled", true);
                    } else if(!on_load) {
                        $(".show_group_templates, .show_selected_templates").attr("disabled", false);
                    }
                }
                function show_group_templates(on_load){
                    if($("input[name*=\'field_show_group\']").is(":checked")){
                        $(".show_all_templates, .show_selected_templates").attr("checked", false).attr("disabled", true);
                    } else if(!on_load) {
                        $(".show_all_templates, .show_selected_templates").attr("disabled", false);
                    }
                }
                function show_selected_templates(on_load){
                    if($(".show_selected_templates").is(":checked")){
                        $(".show_group_templates, .show_all_templates").attr("checked", false).attr("disabled", true);
                        $(".field_template_select").show();
                    } else if(!on_load) {
                        $(".show_group_templates, .show_all_templates").attr("disabled", false);
                        $(".field_template_select").hide();
                        $(".field_template_select option").attr("selected", false);
                    }
                }
                
                function show_all_snippets(on_load){
                    if($(".show_all_snippets").is(":checked")){
                        $(".show_group_snippets, .show_selected_snippets").attr("checked", false).attr("disabled", true);
                    } else if(!on_load) {
                        $(".show_group_snippets, .show_selected_snippets").attr("disabled", false);
                    }
                }
                function show_selected_snippets(on_load){
                    if($(".show_selected_snippets").is(":checked")){
                        $(".show_all_snippets").attr("checked", false).attr("disabled", true);
                        $(".field_snippet_select").show();
                    } else if(!on_load) {
                        $(".show_all_snippets").attr("disabled", false);
                        $(".field_snippet_select").hide();
                        $(".field_snippet_select option").attr("selected", false);
                    }
                }
                
                $(".show_all_templates").live("click", function(){
                    show_all_templates(false);
                });
                $(".show_group_templates").live("click", function(){
                    show_group_templates(false);
                });
                $(".show_selected_templates").live("click", function(){
                    show_selected_templates(false);
                });
                
                $(".show_all_snippets").live("click", function(){
                    show_all_snippets(false);
                });
                $(".show_selected_snippets").live("click", function(){
                    show_selected_snippets(false);
                });
                
                show_all_templates(true);
                show_group_templates(true);
                show_selected_templates(true);
                
                show_all_snippets(true);
                show_selected_snippets(true);
            ';

            $this->EE->cp->add_to_foot('<!-- BEGIN Template & Snippet Select JS --><script type="text/javascript">$(function(){'. preg_replace("/\s+/", " ", $script) .'});</script><!-- END Template & Snippet Select JS -->');
        }
        
        $this->cache['js_added'] = true;
    }
    
    private function debug($str, $die = false)
    {
        echo '<pre>';
        var_dump($str);
        echo '</pre>';
        
        if($die) die;
    }
}
