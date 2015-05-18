<?php
/**
 * NSM Better Meta Tag methods
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see				http://expressionengine.com/public_beta/docs/development/modules.html#control_panel_file
 */
class Nsm_better_meta
{

	/**
	 * Defines the default settings for an initial installation of this plugin.
	 * @access		public
	 * @var			array an array of keys and values
	 **/
	public $settings = array();
	private $ext;
	private $eeVersion;

	/**
	 * PHP5 constructor function.
	 * @access		public
	 * @param		array	$settings	an array of settings used to construct a new instance of this class.
	 * @return		void
	 **/
	public function __construct($settings='')
	{
		$this->EE =& get_instance();

		// Load the text and typography helpers
		$this->EE->load->helper('text');
		$this->EE->load->helper('typography');
        $this->EE->load->helper('date');

        $this->eeVersion = $this->EE->config->item('app_version');
        // since EE 2.10 we need to standardize the version date format if its not compliant
        if (0 === preg_match('/\d+\.\d+\.\d+/', $this->eeVersion)) {
            $this->eeVersion = preg_replace('/(\d)(\d)(\d+)/', '$1.$2.$3', $this->eeVersion);
        }

		// define a constant for the current site_id rather than calling $PREFS->ini() all the time
		if (defined('SITE_ID') == FALSE)
			define('SITE_ID', $this->EE->config->item('site_id'));

		if (class_exists('Nsm_better_meta_ext') == FALSE)
			include(PATH_THIRD. 'nsm_better_meta/ext.nsm_better_meta.php');

		//include_once(PATH_THIRD.'nsm_better_meta/lib/Morphine/Display'.EXT);

		$this->ext = new Nsm_better_meta_ext;
	}

	// =================
	// = Template tags =
	// =================

	/**
	 * Takes the default metadata template setup for this site, and inserts all of the default and user-defined metadata into it.
	 *
	 * @access		public
	 * @return	string HTML meta content fields containing the metadata specific to this tag instance
	 **/
	public function template()
	{
		
		// Cache the settings attached to this tag instance, locally.
		// 	This is more for ease of access (shorter variable name) than any actual function
		$extension_settings	= $this->ext->settings;

		// // If the user has disabled NSM Better Meta, don't output anything - just return null.
		// if (isset($extension_settings['enabled']) !== TRUE || $extension_settings['enabled'] != TRUE)
		// 	return;

		// This lists the metadata parameters that are allowed to be output by this template.
		// It is a master list, and will need to be updated to accommodate anything that will be used as part of the replacement.
		$valid_parameters	= array(
			'entry_id', 'channel_id', 'site_id', 'url_title', 'language',
			'title', 'title_suffix', 'title_prefix', 'site_title', 'hide_site_title',
			'description', 'keywords', 'author', 'publisher', 'rights',
			'date_created', 'date_modified', 'date_valid',
			'identifier', 'canonical_url',
			'robots', 'robots_index', 'robots_follow', 'robots_archive',
			'geo_region', 'geo_placename', 'geo_latitude', 'geo_longitude',
			'sitemap_archive', 'sitemap_follow', 'sitemap_include', 'tag_prefix'
		);

		// our meta containers in order of least important to most
		$default_metadata	= array(); // the default site meta
		$entry_metadata		= array(); // data pulled from the actual entry
		$nsm_bm_metadata	= array(); // meta pulled from the NSM Better Meta Tab
		$embed_vars			= array(); // params embedded from a parent template
		$tag_params			= is_array($this->EE->TMPL->tagparams) ? $this->EE->TMPL->tagparams : array(); // tag params

		//Default meta data for the site based on the extension settings

		// Cache default meta from settings
		$default_metadata	= $extension_settings['default_site_meta'];

		// Setup any dynamically defined metadata fields such as the dates
		$default_metadata['date_created']	= $this->EE->localize->now;
		$default_metadata['date_modified']	= $this->EE->localize->now;
		$default_metadata['date_valid']		= $this->EE->localize->now + (($this->EE->TMPL->fetch_param('valid_offset')) ? $this->EE->TMPL->fetch_param('valid_offset') : 525600);
		$default_metadata['identifier']		= $this->EE->functions->fetch_current_uri();

        // Sanatise the default meta
		$default_metadata = $this->_validateParameterArray($default_metadata, $valid_parameters, FALSE);
		$default_metadata["title"] = FALSE;

		/**
		 * Get embedded variables and tag params attached to this tag instance
		 */
		foreach ($this->EE->TMPL->embed_vars as $key => $value) {
			$embed_vars[substr($key, 6)] = $value;
		}

		/**
		 * Get layout variables and tag params attached to this tag instance
		 */
		foreach ($this->EE->TMPL->layout_vars as $key => $value) {
			$embed_vars[$key] = $value;
		}

        // Sanatise the tag params
		$tag_params	= $this->_validateParameterArray(array_merge($embed_vars, $tag_params), $valid_parameters);
		// Entry data and NSM metadata from the publish form
		$entry_id	= isset($tag_params["entry_id"]) ? $tag_params["entry_id"] : FALSE;
		$url_title	= isset($tag_params["url_title"]) ? $tag_params["url_title"] : FALSE;
		$channel_id	= isset($tag_params["channel_id"]) ? $tag_params["channel_id"] : FALSE;
		$site_id	= isset($tag_params["site_id"]) ? $tag_params["site_id"] : SITE_ID;

		// if there is an entry id or url title lets grab the entry meta
		if (ctype_digit($entry_id) || $url_title) {
			$where = ($entry_id) ? "exp_channel_titles.entry_id = " . $this->EE->db->escape($entry_id)
									: "exp_channel_titles.url_title = " . $this->EE->db->escape($url_title);

			if ($channel_id) {
				$where .= " AND exp_channel_titles.channel_id = " . $this->EE->db->escape($channel_id);
			}

			$where .= " AND exp_channel_titles.site_id = " . $this->EE->db->escape($site_id);

			// Get default language entry meta from tab - for now, this is just
			// 	the first entry found (languages aren't implemented yet)
			$sql = "
				SELECT
					exp_members.screen_name							as e_author,
					exp_channel_titles.entry_id						as e_entry_id,
					exp_channel_titles.channel_id					as e_channel_id,
					exp_channel_titles.site_id						as e_site_id,
					exp_channel_titles.title						as e_title,
					exp_channel_titles.url_title					as e_url_title,
					exp_channel_titles.entry_date					as e_date_created,
					exp_channel_titles.edit_date					as e_date_modified,
					exp_channel_titles.expiration_date				as e_date_valid,
					exp_channel_titles.author_id					as e_author_id,
					exp_channel_titles.day							as e_day,
					exp_channel_titles.month						as e_month,
					exp_channel_titles.year							as e_year,
					exp_nsm_better_meta.language_id					as e_language,
					exp_nsm_better_meta.title						as meta_title,
					exp_nsm_better_meta.description					as meta_description,
					exp_nsm_better_meta.keywords					as meta_keywords,
					exp_nsm_better_meta.keywords_append_default		as meta_keywords_append_default,
					exp_nsm_better_meta.publisher					as meta_publisher,
					exp_nsm_better_meta.author						as meta_author,
					exp_nsm_better_meta.rights						as meta_rights,
					exp_nsm_better_meta.canonical_url				as meta_canonical_url,
					exp_nsm_better_meta.robots_index				as meta_robots_index,
					exp_nsm_better_meta.robots_follow				as meta_robots_follow,
					exp_nsm_better_meta.robots_archive				as meta_robots_archive,
					exp_nsm_better_meta.sitemap_include				as meta_sitemap_include,
					exp_nsm_better_meta.sitemap_change_frequency	as meta_sitemap_change_frequency,
					exp_nsm_better_meta.sitemap_priority			as meta_sitemap_priority,
					exp_nsm_better_meta.geo_region					as meta_geo_region,
					exp_nsm_better_meta.geo_placename				as meta_geo_placename,
					exp_nsm_better_meta.geo_latitude				as meta_geo_latitude,
					exp_nsm_better_meta.geo_longitude				as meta_geo_longitude
				FROM
					exp_channel_titles
				INNER JOIN
					exp_members ON exp_channel_titles.author_id = exp_members.member_id
				LEFT JOIN
					exp_nsm_better_meta ON exp_channel_titles.entry_id = exp_nsm_better_meta.entry_id
				WHERE
					({$where})
					AND
					(
						exp_nsm_better_meta.language_id = ? OR
						exp_nsm_better_meta.entry_default = 1 OR
						# NULL for entries that have no meta
						exp_nsm_better_meta.language_id IS NULL
					)
				ORDER BY exp_nsm_better_meta.language_id DESC
				LIMIT 1";

			/**
			 * NSM Multi Language integration
			 */
			$db_language_id = FALSE;

			if (isset($tag_params['language'])) {
				$db_language_id = $tag_params['language'];
			} elseif (isset($this->EE->config->_global_vars['nsm_lang'])) {
				$db_language_id = $this->EE->config->_global_vars['nsm_lang'];
			}

			$query_result = $this->EE->db->query($sql, array($db_language_id));

			if ($query_result->num_rows > 0) {
				$entry_data = $query_result->first_row('array');
				
				// There is a LIMIT of 1 on this result, so grab the first row
				foreach ($entry_data as $key => $value) {
					if (strpos( $key, "meta_") !== FALSE) {
						$nsm_bm_metadata[substr($key, 5)] = $value;
					} elseif (strpos($key, "e_") !== FALSE) {
						$entry_metadata[substr($key, 2)] =  $value;
					}
				}

				// append the default keywords but only if keywords exist
				// later on if keywords are still empty we'll add teh default ones
				if ($entry_data['meta_keywords_append_default'] == "y" && !empty($entry_data['meta_keywords'])) {
					$nsm_bm_metadata['keywords'] .= ", " . $default_metadata['keywords'];
				}

				/**
				 * Setup our enabled fields to parse out entry meta that isn't enabled anymore
				 */
				// build default settings
				$extension_settings['channels'][$entry_metadata['channel_id']] = $this->ext->getChannelSettings(
					$entry_metadata['channel_id']
				);
				
				$enabled_fields = $extension_settings['channels'][$entry_metadata['channel_id']]['enabled_fields'];
				// Robots fields
				if (in_array('robots', $enabled_fields)) {
					$enabled_fields[] = 'robots_archive';
					$enabled_fields[] = 'robots_follow';
					$enabled_fields[] = 'robots_index';
				}

				// Geo fields
				if (in_array('geo', $enabled_fields)) {
					$enabled_fields[] = 'geo_region';
					$enabled_fields[] = 'geo_placename';
					$enabled_fields[] = 'geo_latitude';
					$enabled_fields[] = 'geo_longitude';
				}

				// Sitemap fields
				if (in_array('sitemap', $enabled_fields)) {
					$enabled_fields[] = 'sitemap_archive';
					$enabled_fields[] = 'sitemap_follow';
					$enabled_fields[] = 'sitemap_include';
				}

				// remove robots, sitemap and geo from enabled fields
				$enabled_fields = array_filter($enabled_fields, create_function('$v', 'return ($v == "robots" || $v == "sitemap" || $v == "geo") ? FALSE : TRUE;'));

				// Remove disabled fields from meta data
				// we do this just incase the admin has disabled fields after meta has been entered
				foreach ($nsm_bm_metadata as $key => $value) {
					if (!in_array($key, $enabled_fields)) {
						unset($nsm_bm_metadata[$key]);
					}
				}

				// ... and sanitise our database meta data
				// remove all empty properties
				$entry_metadata		= $this->_validateParameterArray($entry_metadata, $valid_parameters);
				$nsm_bm_metadata	= $this->_validateParameterArray($nsm_bm_metadata, $valid_parameters);

			}
		}

		// Merge all the meta data
		// This ensures that the correct precendence is maintained
		$merged_final_metadata = array_merge($entry_metadata, $nsm_bm_metadata, $tag_params);

		// merge the default meta data into the merged_final_metadata if the value doesn't exist or is empty
		foreach ($default_metadata as $key => $value) {
			if (!isset($merged_final_metadata[$key]) || empty($merged_final_metadata[$key])) {
				$merged_final_metadata[$key] = $value;
			}
		}

		// Encode any strings that might have wayward high-bit ASCII characters - this needs to be done before the dividers are added
		foreach ($merged_final_metadata as $key => $value) {
			if (version_compare(phpversion(), "5.2.3", "<" )) {
				$merged_final_metadata[$key] = htmlentities($value, ENT_QUOTES, "UTF-8");
			} else {
				$merged_final_metadata[$key] = htmlentities($value, ENT_QUOTES, "UTF-8", FALSE);
			}
		}

		/**
		 * Customise the meta
		 */

		// Build the title
		$title_parts = array();

		// prefix
		if (isset($merged_final_metadata['title_prefix'])) {
			$title_parts[] = $merged_final_metadata['title_prefix'];
		}
		// title
		$title_parts[] = $merged_final_metadata['title'];
		// suffix
		if (isset($merged_final_metadata['title_suffix'])) {
			$title_parts[] = $merged_final_metadata['title_suffix'];
		}
		// site title
		if (!isset($tag_params["hide_site_title"]) || $tag_params["hide_site_title"] != "y") {
			$title_parts[] = $default_metadata['site_title'];
		}
		// remove empty title parts
		$title_parts = array_filter($title_parts, create_function('$v', 'return (empty($v) ? FALSE : TRUE);'));
		// join with the divider
		// Set a default value for the divider entry if there is none
		if (isset($extension_settings['divider']) === FALSE) {
			$extension_settings['divider'] = "0";
		}
		$merged_final_metadata['title'] = str_replace("##", Nsm_better_meta_ext::$dividers[$extension_settings['divider']], implode(" ## ", $title_parts));

		// Build the robots values
		// @todo FIgure out something a bit nicer
		$merged_final_metadata['robots_index']		= ($merged_final_metadata['robots_index'] === "y") ? 'index' : 'noindex';
		$merged_final_metadata['robots_follow']		= ($merged_final_metadata['robots_follow'] === "y") ? 'follow' : 'nofollow';
		$merged_final_metadata['robots_archive']	= ($merged_final_metadata['robots_archive'] == "y") ? 'archive' : 'noarchive';

		$merged_final_metadata['robots'] = $merged_final_metadata['robots_index'] . "," . $merged_final_metadata['robots_follow'] . "," . $merged_final_metadata['robots_archive'];

		// Process the dates
		foreach (array('date_created', 'date_modified', 'date_valid') as $date_key) {
			// @TODO: check if the value is a string
			if(ctype_digit($merged_final_metadata[$date_key]))
			{
                if (version_compare($this->eeVersion, '2.6.0', '>')) {
                    $value = ($date_key != "date_modified") ? $merged_final_metadata[$date_key] : mysql_to_unix($merged_final_metadata[$date_key]);
                    $merged_final_metadata[$date_key] = $this->EE->localize->format_date($this->EE->localize->format["DATE_W3C"], $value);
                } else {
                    $value = ($date_key != "date_modified") ? $merged_final_metadata[$date_key] : $this->EE->localize->timestamp_to_gmt($merged_final_metadata[$date_key]);
                    $merged_final_metadata[$date_key] = $this->EE->localize->decode_date($this->EE->localize->format["DATE_W3C"], $value);
                }
			}
		}

		// Now output the keys with a prefix of "entry_" so that they can be used in templates. This is primarily for
		// 	conditional inclusion of data - ie. {if entry_description} ... {/if}
		foreach ($merged_final_metadata as $key => $value) {
			$merged_final_metadata['entry_' . $key] = $value;
		}
		
		// Ensure that we have a copy of the meta_template
		$template = ($this->EE->TMPL->tagdata) ? $this->EE->TMPL->tagdata : $extension_settings['meta_template'];

		// Prepare any conditionals in the template
		$template = $this->EE->functions->prep_conditionals($template, $merged_final_metadata);

		// Now prepare our metadata template by replacing all keys in the text with our return values.
		foreach ($merged_final_metadata as $key => $value) {
			$tag_key = (!empty($tag_params['tag_prefix']) ? $tag_params['tag_prefix'].$key : $key);
			if (strpos($template, LD.$tag_key.RD) !== FALSE) {
				$template = str_replace(LD.$tag_key.RD, $value, $template);
			}
		}

		// Return our newly built template for inclusion into the template!
		return $template;
	}

	/**
	 * Renders XML for wiki pages.
	 *
	 * @access public
	 * @return string XML sitemap entries for wiki pages
	 **/
	public function wiki_pages_xml()
	{
		$wrap_output_with_xml_tags = $this->EE->TMPL->fetch_param('wrap_output_with_xml_tags');
		$format_output = $this->EE->TMPL->fetch_param('format_output');
		$base_path = $this->EE->TMPL->fetch_param('base_path');
		$limit = $this->EE->TMPL->fetch_param('limit', 100);
		$offset = $this->EE->TMPL->fetch_param('limit', 0);

		// Parse the access groups
		$access_groups = $this->EE->TMPL->fetch_param('access_groups', "5");
		$access_groups = explode("|", $access_groups);

		$this->EE->db
				->from('exp_wikis')
				->join('exp_wiki_page', 'exp_wikis.wiki_id = exp_wiki_page.wiki_id')
				->join('exp_wiki_namespaces', 'exp_wiki_page.page_namespace = exp_wiki_namespaces.namespace_name', 'left')
				->limit($limit)
				->offset($offset);

		// Getting a particular wiki?
		if($wiki_id = $this->EE->TMPL->fetch_param('wiki'))
			$this->EE->db->where_in('exp_wikis.wiki_short_name', str_replace("|",",",$wiki_id));

		// Getting a particular namespace?
		if($namespace = $this->EE->TMPL->fetch_param('namespace'))
			$this->EE->db->where_in('exp_wiki_page.page_namespace', $namespace);

		// Get the results
		$wiki_query = $this->EE->db->get()->result_array();

		$ret 		= '';
		$tagdata = "
	<url>
		<loc>{page_url}</loc>
		<lastmod>{last_updated}</lastmod>
	</url>";

		// Loop over the wiki pages
		foreach ($wiki_query as $key => &$wiki_page)
		{
			// Pull the wiki page access groups based on the namespace
			$wiki_page_access_groups = (empty($wiki_page["namespace_name"])) ? $wiki_page['wiki_users'] : $wiki_page["namespace_users"];
			// Are there any allowed groups
			$allowed_groups = explode("|", $wiki_page_access_groups);
			// Is this member in the allowed groups
			if(!in_array($this->EE->session->userdata['group_id'], $allowed_groups))
			{
				unset($wiki_query[$key]);
				continue;
			}

			// Create the page URL
			$page_url = "";
			if($base_path) $page_url = $base_path . "/";
			if($wiki_page['page_namespace']) $page_url .= $wiki_page['page_namespace'] . ":";
			$page_url .= $wiki_page['page_name'];
			$wiki_page['page_url'] = $this->EE->functions->create_url($page_url);

			// Set the last updated date
			$wiki_page['last_updated'] = date(DATE_W3C, $wiki_page['last_updated']);
		}

		if($wrap_output_with_xml_tags == 'yes')
			$ret = "<?xml version='1.0' encoding='UTF-8'?>\n<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";

		if(count($wiki_query) > 0)
			$ret .= $this->EE->TMPL->parse_variables($tagdata, $wiki_query);

		if($wrap_output_with_xml_tags == 'yes')
			$ret .= "\n</urlset>";

		return (!$format_output) ? str_replace(array("\n", "\t"), "", $ret) : $ret;
	}

	/**
	 * Renders XML for channel entries. Uses the Channel module
	 *
	 * @access public
	 * @return string XML sitemap entries for channel entries
	 **/
	public function entries_xml()
	{
		// Make a couple of suggestions about default return values
		$this->EE->TMPL->tagparams['disable'] = $this->EE->TMPL->fetch_param('disable', "categories|custom_fields|category_fields|member_data|pagination");
		$this->EE->TMPL->tagparams['dynamic'] = $this->EE->TMPL->fetch_param('dynamic', "no");
		$this->EE->TMPL->tagparams['limit'] = $this->EE->TMPL->fetch_param('limit', 500);
		$site_id = isset($tag_params["site_id"]) ? $tag_params["site_id"] : SITE_ID;

		$channelEntries		= $this->_getEntriesWithMetadata();

		// If there are no channel entries found, return FALSE
		if($channelEntries === FALSE || $channelEntries->query->num_rows() == 0)
			return FALSE;

		$site_pages = $this->EE->config->item('site_pages');
		$site_pages = $site_pages[$site_id];

		$use_page_url		= ($this->EE->TMPL->fetch_param('use_page_url') == "no") ? FALSE : TRUE;
		$loc				= $this->EE->TMPL->fetch_param('loc') ? $this->EE->TMPL->fetch_param('loc') : FALSE;
		$wrap_output_with_xml_tags = ($this->EE->TMPL->fetch_param('wrap_output_with_xml_tags') == "yes") ? TRUE : FALSE;
		$format_output 		= ($this->EE->TMPL->fetch_param('format_output') == "yes") ? TRUE : FALSE;

		$ret 		= '';

        if ($this->EE->TMPL->tagdata) {
            $tagdata = $this->EE->TMPL->tagdata;
        } else {
            $tagdata = "
                <url>
                    <loc>{sitemap_entry_loc}</loc>
                    <lastmod>{sitemap_last_mod}</lastmod>
                    <changefreq>{sitemap_change_frequency}</changefreq>
                    <priority>{sitemap_priority}</priority>
                </url>";
        }

		// loop over the results
		foreach ($channelEntries->query->result_array as $key => &$entry)
		{
			// Load the page url
			if ($use_page_url AND isset($site_pages['uris'][$entry['entry_id']]) === TRUE) {
				$entry["sitemap_entry_loc"] = $this->EE->functions->create_url($site_pages['uris'][$entry['entry_id']]);
			} else {
				$entry["sitemap_entry_loc"] = $this->EE->TMPL->parse_variables_row($loc, $entry);
			}

			if($entry["sitemap_entry_loc"] == FALSE)
			{
				unset($channelEntries->query->result_array[$key]);
				continue;
			}

            if (version_compare($this->eeVersion, '2.6.0', '>')) {
                $entry["sitemap_last_mod"] = date(DATE_W3C, mysql_to_unix($entry['edit_date']));
            } else {
                $entry["sitemap_last_mod"] = date(DATE_W3C, $this->EE->localize->timestamp_to_gmt($entry['edit_date']));
            }
		}

		if($wrap_output_with_xml_tags) {
			$ret = "<?xml version='1.0' encoding='UTF-8'?>\n<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";
		}

		if(count($channelEntries->query->result_array) > 0) {
			$channelEntries->query->result_array = array_values($channelEntries->query->result_array);
			$ret .= $this->EE->TMPL->parse_variables($tagdata, $channelEntries->query->result_array);
		}

		if($wrap_output_with_xml_tags) {
			$ret .= "\n</urlset>";
		}

		return (!$format_output) ? str_replace(array("\n", "\t"), "", $ret) : $ret;
	}

	// =====================
	// = Private functions =
	// =====================

	protected function _getEntriesWithMetadata()
	{
		// if no weblog class exists
		if(class_exists('Channel') === FALSE)
		{
			require PATH_MOD.'channel/mod.channel'.EXT;
		}
		// create a new weblog object
		$channelInstance = new Channel;

        // enable pagination if its not disabled
        if (true === $channelInstance->enable['pagination']) {
            $channelInstance->pagination->paginate = true;
        }

		// initialise it
		$channelInstance->initialize();
		$channelInstance->uri = ($channelInstance->query_string != '') ? $channelInstance->query_string : 'index.php';

		if ($channelInstance->enable['custom_fields'] == TRUE)
		{
			$channelInstance->fetch_custom_channel_fields();
		}

		// build the sql query based on our tag params
		$channelInstance->build_sql_query();

		// if there was no sql
		if ($channelInstance->sql == '')
		{
			// return the template no results tag
			return FALSE;
		}

		// Construct a select for our additonal fields, reliant upon the LEFT JOIN "nsm_bm"
		$select_sql = ", nsm_bm.sitemap_priority as sitemap_priority, 
							nsm_bm.sitemap_change_frequency as sitemap_change_frequency,
							nsm_bm.sitemap_include as sitemap_include
						FROM ";

		// Construct the LEFT JOIN "nsm_bm"
		$join_sql = "AS t LEFT JOIN exp_nsm_better_meta AS nsm_bm ON t.entry_id = nsm_bm.entry_id";

		// Construct WHERE statement, looking for explicit values set in the metadata tab.
		//	If the metadata tab is saved with default values, the string will be empty (but not null)
		//	If the metadata tab is saved with no values, the string will be NULL
		$where_sql = "WHERE (nsm_bm.sitemap_include = 'y' || nsm_bm.sitemap_include IS NULL) AND";

		// Concatenate the Channel's SQL with the SELECT, JOIN and WHERE clauses from above to produce a single SQL statement
		$sql = str_replace(array("FROM", "AS t", "WHERE"), array($select_sql, $join_sql, $where_sql), $channelInstance->sql);
		//print($sql);

		// Execute the query
		$channelInstance->query = $this->EE->db->query($sql);

		// get the extension settings
		$extension_settings = $this->ext->settings;
		$channelInstance->query->result_array();

		// Iterate through each of the found channel entries
		foreach ($channelInstance->query->result_array as $key => &$entry)
		{
			// if there are no channel settings for this entry
			// get the freak outta here
			if(! isset($extension_settings['channels'][$entry['channel_id']]))
			{
				unset($channelInstance->query->result_array[$key]);
				--$channelInstance->query->num_rows;
				continue;
			}

			// build default settings
			$extension_settings['channels'][$entry['channel_id']] = $this->ext->getChannelSettings(
				$entry['channel_id']
			);
			
			$channel_settings = $extension_settings['channels'][$entry['channel_id']];
			
			// inherit from defaults
			if(is_null($entry["sitemap_include"]))
				$entry["sitemap_include"] = $channel_settings["sitemap_include"];

			// Check if the user would like this channel entry included in the sitemap
			if($entry['sitemap_include'] == "y")
			{
				// inherit from defaults
				if(is_null($entry["sitemap_priority"]))
					$entry["sitemap_priority"] = $channel_settings["sitemap_priority"];

				// inherit from defaults
				if(is_null($entry["sitemap_change_frequency"]))
					$entry["sitemap_change_frequency"] = $channel_settings["sitemap_change_frequency"];
		
				// Lowercase the value of the 'sitemap_change_frequency' key
				$entry["sitemap_change_frequency"] = strtolower($entry["sitemap_change_frequency"]);
			}
			else
			{
				// The user has chosen not to include this channel entry in the site map. Remove it from the result set.
				unset($channelInstance->query->result_array[$key]);
				--$channelInstance->query->num_rows;
			}
		}

		// if no rows
		if ($channelInstance->query->num_rows() == 0)
		{
			// return the no templates url
			return FALSE;
		}

		return $channelInstance;
	}

	// ===============================
	// = Replace with PHP5 extension =
	// ===============================

	/**
	 * Validates an array of keys and values, based upon whether the values of the keys are empty, or if the keys are on a valid entries list
	 *
	 * @param $arr		array An array of keys and values to be validated
	 * @param $okarr	array A flat array of values that will be used to validate $arr
	 **/
	private function _validateParameterArray($arr, $okarr, $remove_empty = TRUE)
	{
		if (is_array($arr) === FALSE)
		{
			return array();
		}

		$local_arr = $arr;

		foreach ($local_arr as $key => $value)
		{
			if (is_array($value))
			{
				continue;
			}

			// Clear out any:
			//	* keys that are not part of the approved list
			//	* keys with values that start with {embed}
			//	* empty values if required
			if (
				($remove_empty && empty($value)) OR
				in_array($key, $okarr) !== TRUE OR
				strpos('embed', $key) !== FALSE
			)
			{
				unset($local_arr[$key]);
			}
		}

		return $local_arr;
	}
}
