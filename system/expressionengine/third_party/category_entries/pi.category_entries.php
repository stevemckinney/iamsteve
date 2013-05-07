<?php

/**
 * @package Category_entries
 * @description Extends the Channel entries tag to order entries by a given set of categories.
 * @author Isaac Raway <isaac.raway@gmail.com>
 * @version 0.2
 *
 * @changelog 0.2   Added support for orderby="cat_order" to order the entries in the order that
 *                  the categories are ordered in within their group.
 *
 **/

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$plugin_info = array(
    'pi_name'        => 'Category Entries',
    'pi_version'     => '0.1',
    'pi_author'      => 'Isaac Raway',
    'pi_author_url'  => 'http://www.metasushi.com/',
    'pi_description' => 'Extends the Channel entries tag to order entries by a given set of categories.',
    'pi_usage'       => Category_entries::usage()
  );

class Category_entries {

    var $error_box_s = '<p style=\"border:1px solid red; padding: 2px; background: yellow; color: black;\"><b>';
    var $error_box_e = '</b></p>';
    var $return_data = "";

    function Category_entries()
    {
        return $this->__construct();
    }

    function __construct()
    {
        $this->EE = &get_instance();

        $categories = $this->EE->TMPL->fetch_param('category');

        if($categories)
        {
            $categories = explode('|', $categories);

            $p_orderby  = $this->EE->TMPL->fetch_param('orderby', 'entry_date');
            $orderby    = $p_orderby;


            // See if the field is a custom field, or a built in field
            if(array_search($orderby, array('comment_total', 'date', 'edit_date', 'entry_id',
                    'expiration_date', 'most_recent_comment', 'random', 'screen_name', 'title',
                    'url_title', 'username', 'view_count_one', 'view_count_two',
                    'view_count_three', 'view_count_four')) === FALSE)
            {
                // Must be a custom field
                $query = $this->EE->db->where('field_name', $orderby)->get('exp_channel_fields');
                if($query->num_rows() > 0)
                {
                    $orderby = 'field_id_'.$query->row()->field_id;
                } else {
                    // Invalid, switch to default
                    $orderby = 'entry_date';
                }
            } else {
                // Rewrite a few fields to their real column names
                switch($orderby)
                {
                    case 'date': $orderby = 'entry_date'; break;
                    case 'most_recent_comment': $orderby = 'recent_comment_date'; break;
                    case 'random': case 'rand': $orderby = 'RAND()'; break;
//                     case 'order': $orderby = 'cat_order'; break;
                }
            }

            // Default to descending sort for date fields
            if($orderby == 'entry_date' OR $orderby == 'edit_date')
            {
                $default_sort = 'DESC';
            } else {
                $default_sort = 'ASC';
            }

            $sort = $this->EE->TMPL->fetch_param('sort', $default_sort);

            if(in_array($p_orderby, array('cat_order', 'cat_name', 'cat_url_title', 'cat_description')))
            {
                // Get an order of the requested categories based on the selected field
                $cat_query = $this->EE->db->where_in('cat_id', $categories)
                                          ->order_by($p_orderby, $sort)
                                          ->get('exp_categories');
                // Rebuild the categories list from the results
                $categories = array();
                foreach($cat_query->result() as $row)
                {
                    $categories[] = $row->cat_id;
                }
            }


            // Find the entries requested
            $query = $this->EE->db->where_in('cat_id', $categories)
                                  ->join('exp_channel_titles', 'exp_channel_titles.entry_id = exp_category_posts.entry_id')
                                  ->join('exp_channel_data', 'exp_channel_data.entry_id = exp_category_posts.entry_id')
                                  ->join('exp_members', 'exp_members.member_id = exp_channel_titles.author_id')
                                  ->order_by($orderby, $sort)
                                  ->get('exp_category_posts');

            // Order entry ids by their category, in the order specified
            $entry_ids = array();

            foreach($categories as $cat_id)
            {
                foreach($query->result() as $row)
                {
                    if($row->cat_id == $cat_id)
                    {
                        $entry_ids[] = $row->entry_id;
                    }
                }
            }

            $entry_ids = implode('|', $entry_ids);
            $this->EE->TMPL->tagparams['fixed_order'] = $entry_ids;
        }

        if(!class_exists('Channel'))
        {
            require_once(APPPATH.'modules/channel/mod.channel.php');
        }
        $C = new Channel();
        $this->return_data = $C->entries();
    }

    function usage()
    {
    return <<<END

Supports all parameters and variables supported by {exp:channel:entries}.
Entries will be grouped by the categories given in the category parameter,
then ordered as set by the orderby parameter.

Currently only works with a list of categories separated by pipes. Entries
from all of these categories will be returned in the order the categories are
specified.

Examples:

Within the categories 2, 3, 1...<br/><br/>

Order by random<br/>
<ul>
{exp:category_entries category="2|3|1" orderby="random"}
<li>{title} {categories}{category_name}{/categories}</li>
{/exp:category_entries}
</ul>

Order by date<br/>
<ul>
{exp:category_entries category="2|3|1" orderby="date"}
<li>{title} {categories}{category_name}{/categories} - {entry_date}</li>
{/exp:category_entries}
</ul>

Order by date ASC<br/>
<ul>
{exp:category_entries category="2|3|1" orderby="date" sort="ASC"}
<li>{title} {categories}{category_name}{/categories} - {entry_date}</li>
{/exp:category_entries}
</ul>

Order by author<br/>
<ul>
{exp:category_entries category="2|3|1" orderby="author"}
<li>{title} {categories}{category_name}{/categories}</li>
{/exp:category_entries}
</ul>


Order by custom field ASC...<br/>

<ul>
{exp:category_entries category="2|3|1" orderby="custom_field_order"}
<li>{title} {categories}{category_name}{/categories} - {custom_field_order}</li>
{/exp:category_entries}
</ul>

Order by custom field DESC...<br/>

<ul>
{exp:category_entries category="2|3|1" orderby="custom_field_order" sort="DESC"}
<li>{title} {categories}{category_name}{/categories} - {custom_field_order}</li>
{/exp:category_entries}
</ul>

END;
    }
}
