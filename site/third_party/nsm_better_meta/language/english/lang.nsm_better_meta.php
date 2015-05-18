<?php
/**
 * NSM Better Meta Language File
 *
 * @package			NsmBetterMeta
 * @version			1.1.8
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2015 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-better-meta
 * @see				http://expressionengine.com/public_beta/docs/development/modules.html#lang_file
 */

$lang = array(

	'nsm_better_meta'						=> 'NSM Better Meta',
	"nsm_better_meta_title" 				=> "NSM Better Meta",
	'nsm_better_meta_module_name'			=> 'NSM Better Meta',
	'nsm_better_meta_module_description'	=> 'SEO Meta and XML sitemap module',

	'channel_title'				=> 'Channel title',
	'element'					=> 'Element',
	'displayed_options'			=> 'Displayed options',
	'title'						=> 'Title',
	'publish_tab'				=> 'Publish tab',
	'site_title'				=> 'Site title',
	'site_title_info'			=> 'Added to the end of your entry title.',
	'entry_title_divider'		=> 'Entry title divider',
	'entry_title_divider_info'	=> 'Glue for the concatenated meta title.',
	'description'				=> 'Description',
	'keywords'					=> 'Keywords',
	'append_default_keywords'	=> 'Append default keywords?',
	'author'					=> 'Author',
	'publisher'					=> 'Publisher',
	'rights'					=> 'Rights',
	'canonical_url'				=> 'Canonical URL',
	'robots'					=> 'Robots metadata',
	'robots_meta'				=> 'Robots meta',
	'sitemap_metadata'			=> 'Sitemap metadata',
	'sitemap'					=> 'Sitemap',
	'geo_meta'					=> 'GEO metadata',
	'geo_meta_info'				=> 'GEO meta tags describe the geographic position of the content described in the page.',
	'geo_meta_default_info'		=> 'As the vast majority of content will originate from the same location, you can specify a default locations here.',
	'default_location'			=> 'Default location',
	'default_location_info'		=> 'Click on the map to set your default location',
	'google_maps_api_key'		=> 'Google Maps API key',
	'google_maps_api_key_info'	=> 'Enter your <a href="http://code.google.com/apis/maps/signup.html">Google Maps API Key</a> to display a map in the publish tab facilitating easy location lookup.',
	'geo'						=> 'Geo',
	'region'					=> 'Region',
	'region_info'				=> 'Region is a combination of country code and region code (joined with a dash "-") as defined by <a href="http://en.wikipedia.org/wiki/ISO_3166-1">ISO3166-1</a> &amp; <a href="http://en.wikipedia.org/wiki/ISO_3166-2">ISO3166-2</a>. Eg: AU-NSW for NSW, Australia',
	'placename'					=> 'Placename',
	'placename_info'			=> 'Placename is a name as defined by the <a href="http://www.getty.edu/research/conducting_research/vocabularies/tgn/" rel="external">Getty Thesaurus of Geographic Names</a>.',
	'latitude'					=> 'Latitude',
	'longitude'					=> 'Longitude',
	'robots_metadata'			=> 'Robots Metadata',
	'robots_meta_info'			=> 'How would you like search engine robots to act when they crawl the page by default?',
	'index_entry'				=> 'Index entry',
	'archive_entry'				=> 'Archive entry',
	'follow_external_links'		=> 'Follow external links',
	'sitemap_meta'				=> 'Sitemap meta',
	'sitemap_meta_info'			=> '<p>Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs in the site) so that search engines can more intelligently crawl the site.</p>
									<p>NSM Better Meta adds sitemap meta to each of your entries. You can explicitly set the meta data for each entry or use the channel default values. This meta data can then be used when generating sitemaps for search engines.</p>',
	'change_frequency'			=> 'Change frequency',
	'priority'					=> 'Priority',
	'include_in_sitemap'		=> 'Include in sitemap',

	'enable_extension_title'	=> 'Extension access',
	'enable_extension_info'		=> 'NSM Better Meta can be enabled per on a per site basis and further restricted by member group.',
	'enable_extension_label'	=> 'Enable NSM Better Meta for this site?',
	'enable_groups_label'		=> 'Which member groups can edit an entry\'s meta data?',
	
	'publish_tab_customisation_title'	=> 'Publish tab customisation',
	'publish_tab_customisation_info'	=> 'Specify which channels display the NSM Better Meta tab and which fields are visible.',

	'default_meta_values_title'			=> 'Default site meta',
	'default_site_meta_values_info'		=> 'The following values will be used as the default site meta. Loading entry specific meta will override these values with the exception of site title. The site title will be appended to the template specifc meta title.',

	'meta_template_title'		=> 'Metadata template',
	'meta_template_info'		=> '<p>The meta template is outputted by the <code>{exp:nsm_better_meta:template}</code> after variable substitution.
									The following variables will be replaced with their meta values generated from the site defaults, entry meta or tag parameters. They can also be used in conditional statements.</p>
									<ul class="tag-list">
										<li>{title}</li>
										<li>{description}</li>
										<li>{keywords}</li>
										<li>{author}</li>
										<li>{publisher}</li>
										<li>{date_created}</li>
										<li>{date_modified}</li>
										<li>{date_valid}</li>
										<li>{publisher}</li>
										<li>{rights}</li>
										<li>{canonical_url}</li>
										<li>{robots}</li>
										<li>{geo_region}</li>
										<li>{geo_placename}</li>
										<li>{geo_latitude}</li>
										<li>{geo_longitude}</li>
									</ul>',

	'meta_template_label'		=> 'Metadata template',

	'recommended_title_length'			=> 'Recommended length 66 characters',
	'recommended_description_length'	=> 'Recommended length 150 characters',
	'recommended_keywords_length'		=> 'Recommended length 100 characters',

	'tab_info' => 'Leave any of the fields blank to use the default settings for this site.',
	
	'use_default_setting' => '-- Use default site settings --',
	'save_extension_settings'	=> 'Save extension settings',
	
	'extension_settings_saved_success' => 'Extension settings have been saved.',


	// Added by Tony Friday, 6 November 2009
	'site_settings'			=> 'Site settings',
	'channel_preferences'	=> 'Channel preferences',
	'default_settings'		=> 'Default settings',

	'alert.info.leave_blank_to_inherit' => 'Leave fields blank to inherit site defaults',
	'alert.no_better_meta_set' => 'No settings have been defined for this channel. Please check your NSM Better Meta extension settings.',
	'alert.error.no_channels_exist' => 'No channels have been created in this site',
	'alert.success.extension_settings_saved' => 'Extension settings have been saved.',


	// END
	''=>''
    
  );

?>
