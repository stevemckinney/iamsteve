<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cp_analytics_acc {

	var $name			= 'CP Analytics';
	var $id				= 'cp_analytics_acc';
	var $version		= '1.0.1';
	var $description	= 'Display your Google Analytics stats in the EE control panel.';
	var $sections		= array();
	var $slug			= 'cp_analytics';
	var $extension		= 'Cp_analytics_ext';


	function Cp_analytics_acc()
	{
		$this->EE =& get_instance();
		$this->EE->cp->load_package_css('accessory');
		$this->EE->lang->loadfile('cp_analytics');
	}


	function set_sections()
	{
		$settings = $this->get_settings();
		$this->name = "Google Analytics";

		if(empty($settings['user']) || empty($settings['password']) || empty($settings['profile']) || $settings['authenticated'] != 'y')
		{
			$this->sections[$this->EE->lang->line('analytics_not_configured')] = 
				'<p><a href="'.
				BASE.AMP.'C=addons_extensions'.
				AMP.'M=extension_settings'.
				AMP.'file='.$this->slug.
				'">'.$this->EE->lang->line('analytics_not_configured_message').
				'</a></p>';
		}
		else
		{
			$ga_user = $settings['user'];
			$ga_password = base64_decode($settings['password']);
			$ga_profile_id = $settings['profile'];
			
			// Check to see if we have a hourly cache, and if it's still valid
			if(isset($settings['hourly_cache']['cache_time']) && 
				$this->EE->localize->set_localized_time() < strtotime('+60 minutes', $settings['hourly_cache']['cache_time']))
			{
				$today = $settings['hourly_cache'];
				$today['hourly_updated'] = date('g:ia', $settings['hourly_cache']['cache_time']);
			}
			else
			{
				$today = $this->fetch_hourly_stats($ga_user, $ga_password, $ga_profile_id);
				$today['hourly_updated'] = date('g:ia', $this->EE->localize->set_localized_time());
			}
				
			// Check to see if we have a daily cache, and if it's still valid
			if(isset($settings['daily_cache']['cache_date']) && 
				$settings['daily_cache']['cache_date'] == date('Y-m-d', $this->EE->localize->set_localized_time()))
			{
				$daily = $settings['daily_cache'];
				$daily['daily_updated'] = $settings['daily_cache']['cache_date'];
			}
			else
			{
				$daily = $this->fetch_daily_stats($ga_user, $ga_password, $ga_profile_id);
				$daily['daily_updated'] = date('Y-m-d', $this->EE->localize->set_localized_time());
			}
			
			$combined = array_merge($today, $daily);
			
			if(isset($today) && isset($daily))
			{				
				$this->sections[$this->EE->lang->line('analytics_recently')] = 
					$this->EE->load->view('recent', $combined, TRUE);
					
				$this->sections[$this->EE->lang->line('analytics_lastmonth')] = 
					$this->EE->load->view('lastmonth', $daily['lastmonth'], TRUE);
					
				$this->sections[$this->EE->lang->line('analytics_top_content')] = 
					$this->EE->load->view('content', $daily['lastmonth'], TRUE);
				
				$this->sections[$this->EE->lang->line('analytics_top_referrers')] = 
					$this->EE->load->view('referrers', $daily['lastmonth'], TRUE);
			}
			else
			{
				// We couldn't fetch our account data for some reason
				$this->sections[$this->EE->lang->line('analytics_trouble_connecting')] = 
					$this->EE->lang->line('analytics_trouble_connecting_message');
			}	
		}		
	}
	
	
	function get_settings($all_sites = FALSE)
	{
		$get_settings = $this->EE->db->query("SELECT settings 
			FROM exp_extensions 
			WHERE class = '".$this->extension."' 
			LIMIT 1");
		
		$this->EE->load->helper('string');
		
		if ($get_settings->num_rows() > 0 && $get_settings->row('settings') != '')
        {
        	$settings = strip_slashes(unserialize($get_settings->row('settings')));
        	$settings = ($all_sites == FALSE && isset($settings[$this->EE->config->item('site_id')])) ? 
        		$settings[$this->EE->config->item('site_id')] : 
        		$settings;
        }
        else
        {
        	$settings = array();
        }
        return $settings;
	}	
	
	
	function fetch_hourly_stats($ga_user, $ga_password, $ga_profile_id)
	{
		$data = array();
		$data['cache_time'] = $this->EE->localize->set_localized_time();					

		require_once(PATH_THIRD.'cp_analytics/libraries/gapi.class.php');
		
		$today = new gapi($ga_user,$ga_password);
		$ga_auth_token = $today->getAuthToken();
		$today->requestReportData(
			$ga_profile_id,
			array('date'),
			array('pageviews','visits', 'timeOnSite'),
			'','',
			date('Y-m-d'),
			date('Y-m-d')
		);
		
		$data['visits'] = 
		number_format($today->getVisits());
		
		$data['pageviews'] = 
		number_format($today->getPageviews());
		
		$data['pages_per_visit'] = 
		$this->analytics_avg_pages($today->getPageviews(), $today->getVisits());
		
		$data['avg_visit'] = 
		$this->analytics_avg_visit($today->getTimeOnSite(), $today->getVisits());
		
		// Now cache it
		$settings = $this->get_settings(TRUE);
		$settings[$this->EE->config->item('site_id')]['hourly_cache'] = $data;
		
		$this->EE->db->where('class', $this->extension);
		$this->EE->db->update('extensions', array('settings' => serialize($settings)));				

		return $data;
	}


	function fetch_daily_stats($ga_user, $ga_password, $ga_profile_id)
	{
		$data = array();
		$data['cache_date'] = date('Y-m-d', $this->EE->localize->set_localized_time());					

		require_once(PATH_THIRD.'cp_analytics/libraries/gapi.class.php');
		
		// Compile yesterday's stats
		$yesterday = new gapi($ga_user,$ga_password);
		$ga_auth_token = $yesterday->getAuthToken();
		$yesterday->requestReportData(
			$ga_profile_id,
			array('date'),
			array('pageviews','visits', 'timeOnSite'),
			'','',
			date('Y-m-d', strtotime('yesterday')),
			date('Y-m-d', strtotime('yesterday'))
		);
		
		// Get account data so we can store the profile info
		$data['profile'] = array();
		$yesterday->requestAccountData(1,100);
		foreach($yesterday->getResults() as $result)
		{
			if($result->getProfileId() == $ga_profile_id)
			{
				$data['profile']['id'] = $result->getProfileId();
				$data['profile']['title'] = $result->getTitle();
			}
		}					
		
		$data['yesterday']['visits'] = 
		number_format($yesterday->getVisits());
		
		$data['yesterday']['pageviews'] = 
		number_format($yesterday->getPageviews());
		
		$data['yesterday']['pages_per_visit'] = 
		$this->analytics_avg_pages($yesterday->getPageviews(), $yesterday->getVisits());
		
		$data['yesterday']['avg_visit'] = 
		$this->analytics_avg_visit($yesterday->getTimeOnSite(), $yesterday->getVisits());
		
		// Compile last month's stats
		$lastmonth = new gapi($ga_user,$ga_password,$ga_auth_token);
		$lastmonth->requestReportData($ga_profile_id,
			array('date'),
			array('pageviews','visits', 'newVisits', 'timeOnSite', 'bounces', 'entrances'),
			'date', '',
			date('Y-m-d', strtotime('31 days ago')),
			date('Y-m-d', strtotime('yesterday'))
		);
		
		$data['lastmonth']['date_span'] = 
		date('F jS Y', strtotime('31 days ago')).' &ndash; '.date('F jS Y', strtotime('yesterday'));
		
		$data['lastmonth']['visits'] = 
		number_format($lastmonth->getVisits());
		$data['lastmonth']['visits_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'visits');
		
		$data['lastmonth']['pageviews'] = 
		number_format($lastmonth->getPageviews());
		$data['lastmonth']['pageviews_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'pageviews');
		
		$data['lastmonth']['pages_per_visit'] = 
		$this->analytics_avg_pages($lastmonth->getPageviews(), $lastmonth->getVisits());
		$data['lastmonth']['pages_per_visit_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'avgpages');
		
		$data['lastmonth']['avg_visit'] = 
		$this->analytics_avg_visit($lastmonth->getTimeOnSite(), $lastmonth->getVisits());
		$data['lastmonth']['avg_visit_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'time');
		
		$data['lastmonth']['bounce_rate'] = 
		($lastmonth->getBounces() > 0 && $lastmonth->getBounces() > 0) ? 
		round( ($lastmonth->getBounces() / $lastmonth->getEntrances()) * 100, 2 ).'%' : '0%';
		$data['lastmonth']['bounce_rate_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'bouncerate');
		
		$data['lastmonth']['new_visits'] = 
		($lastmonth->getNewVisits() > 0 && $lastmonth->getVisits() > 0) ? 
		round( ($lastmonth->getNewVisits() / $lastmonth->getVisits()) * 100, 2).'%' : '0%';					
		$data['lastmonth']['new_visits_sparkline'] = 
		$this->analytics_sparkline($lastmonth->getResults(), 'newvisits');

		// Compile last month's top content
		$topcontent = new gapi($ga_user,$ga_password,$ga_auth_token);
		$topcontent->requestReportData($ga_profile_id,
			array('hostname', 'pagePath'),
			array('pageviews'),
			'-pageviews', '',
			date('Y-m-d', strtotime('31 days ago')),
			date('Y-m-d', strtotime('yesterday')),
			null, 16
		);
		
		$data['lastmonth']['content'] = array();
		$i = 0;
		
		// Make a temporary array to hold page paths
		// (for checking dupes resulting from www vs non-www hostnames)
		$paths = array();
		
		foreach($topcontent->getResults() as $result)
		{
			// Do we already have this page path?
			$dupe_key = array_search($result->getPagePath(), $paths);
			if($dupe_key !== FALSE)
			{
				// Combine the pageviews of the dupes
				$data['lastmonth']['content'][$dupe_key]['count'] = 
				($result->getPageviews() + $data['lastmonth']['content'][$dupe_key]['count']);
			}
			else
			{
				$url = (strlen($result->getPagePath()) > 20) ? 
					substr($result->getPagePath(), 0, 20).'&hellip;' : 
					$result->getPagePath();
				$data['lastmonth']['content'][$i]['title'] = 
				'<a href="http://'.$result->getHostname().$result->getPagePath().'" target="_blank">'.
				$url.'</a>';
				$data['lastmonth']['content'][$i]['count'] = $result->getPageviews();

				// Store the page path at the same position so we can check for dupes
				$paths[$i] = $result->getPagePath();

				$i++;
			}
		}
		
		// Slice down to 8 results
		$data['lastmonth']['content'] = array_slice($data['lastmonth']['content'], 0, 8);
		
		// Compile last month's top referrers
		$referrers = new gapi($ga_user,$ga_password,$ga_auth_token);
		$referrers->requestReportData($ga_profile_id,
			array('source', 'referralPath', 'medium'),
			array('visits'),
			'-visits', '',
			date('Y-m-d', strtotime('31 days ago')),
			date('Y-m-d', strtotime('yesterday')),
			null, 8
		);
		
		$data['lastmonth']['referrers'] = array();
		$i = 0;
		foreach($referrers->getResults() as $result)
		{
			$data['lastmonth']['referrers'][$i]['title'] = 
			($result->getMedium() == 'referral') ?
			'<a href="http://'.$result->getSource() . $result->getReferralPath().'" target="_blank">'.$result->getSource().'</a>' : $result->getSource();
			$data['lastmonth']['referrers'][$i]['count'] = number_format($result->getVisits());
			$i++;
		}
		
		// Now cache it
		$settings = $this->get_settings(TRUE);
		$settings[$this->EE->config->item('site_id')]['daily_cache'] = $data;
		
		$this->EE->db->where('class', $this->extension);
		$this->EE->db->update('extensions', array('settings' => serialize($settings)));			

		return $data;
	}
	
		
	function analytics_avg_pages($pageviews, $visits)
	{
		return ($pageviews > 0 && $visits > 0) ? round($pageviews / $visits, 2) : 0;
	}
	

	function analytics_avg_visit($seconds, $visits)
	{
		if($seconds > 0 && $visits > 0)
		{
			$avg_secs = $seconds / $visits;
			// This little snippet by Carson McDonald, from his Analytics Dashboard WP plugin
			$hours = floor($avg_secs / (60 * 60));
			$minutes = floor(($avg_secs - ($hours * 60 * 60)) / 60);
			$seconds = $avg_secs - ($minutes * 60) - ($hours * 60 * 60);
			return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
		}
		else
		{
			return '00:00:00';
		}
	}
	
	
	function analytics_sparkline($data_array, $metric)
	{
		$max = 0; $stats = array();
		
		foreach($data_array as $result)
		{
			switch($metric) {
				case "pageviews":
					$datapoint = $result->getPageviews();
					break;
				case "visits":	
					$datapoint = $result->getVisits();
					break;
				case "time":
					$datapoint = $result->getTimeOnSite();
					break;
				case "avgpages":
					$datapoint = ($result->getVisits() > 0 && $result->getPageViews() > 0) ? $result->getPageviews() / $result->getVisits() : 0;
					break;
				case "bouncerate":
					$datapoint = ($result->getEntrances() > 0 && $result->getBounces() > 0) ? $result->getBounces() / $result->getEntrances() : 0;
					break;
				case "newvisits":
					$datapoint =  ($result->getNewVisits() > 0 && $result->getVisits() > 0) ? $result->getNewVisits() / $result->getVisits() : 0;
					break;
			}
			$max = ($max < $datapoint) ? $datapoint : $max;
			$stats[] = $datapoint;
		}
		
		return '<img src="http://chart.apis.google.com/chart?cht=ls&amp;chs=120x20&amp;chm=B,FFFFFF66,0,0,0&amp;chco=FFFFFFEE&amp;chf=c,s,FFFFFF00|bg,s,FFFFFF00&chd=t:'.implode(',',$stats).'&amp;chds=0,'.$max.'" alt="" />';
	}		


}