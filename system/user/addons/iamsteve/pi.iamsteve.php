<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Iamsteve plugin class
 *
 * @package     ExpressionEngine
 * @subpackage  Addons
 * @category    Plugin
 * @author      EllisLab Dev Team
 * @copyright   Copyright (c) 2015–2016, EllisLab, Inc.
 * @link        https://github.com/EllisLab/Reading-Time
 */
class Iamsteve {
  
  public $return_data = '';
  private $json_ld_open;
  private $json_ld_close;
  private $base_url;
  private $site_name;
  
  public function __construct()
  {
    $this->EE = get_instance();
    
    // Find the global theme_url variable
    if($this->EE->config->item('global_vars')['global:theme_url'] !== false)
    {
      $this->base_url = $this->EE->config->item('global_vars')['global:theme_url'];
    }
    else
    {
      $this->base_url = $this->EE->config->item('base_url');
    }
    
    // Find the site_name
    if($this->EE->config->item('site_name') !== false)
    {
      $this->site_name = $this->EE->config->item('site_name');
    }
    
    // Setup openings tags
    $this->json_ld_open = '<script type="application/ld+json"> {';
    $this->json_ld_close = '} </script>';
  }
  
  public function fixer($theurl='')
	{
		if ($theurl == '')
    {
      $theurl = ee()->TMPL->tagdata;
    }
    
		$removetrailingslash = ee()->TMPL->fetch_param('removetrailingslash');

		if ($removetrailingslash == 'yes' || $removetrailingslash == 'true')
		{
			$patterns = '{\/P0$}';
		}
		else
		{
			$patterns = '{P0$}';
		}

		$replacements = '';

		$this->return_data = preg_replace($patterns, $replacements, $theurl);
		return $this->return_data;
	}
  
  public function json_ld()
  { 
    $html = $this->json_ld_person();
    $html .= $this->json_ld_organisation();
    $html .= $this->json_ld_website();
    
    return $html;
  }
  
  public function json_ld_website()
  {
    $html = $this->json_ld_open;
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "WebSite",';
      $html .= '"name": "iamsteve",';
      $html .= '"alternateName": "iamsteve",';
      $html .= '"url": "' . $this->base_url . '",';
    $html .= $this->json_ld_close;
  }
  
  public function json_ld_person()
  {
    $html = $this->json_ld_open;
    
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "Person",';
      $html .= '"name": "Steve McKinney",';
      $html .= '"url": "' . $this->base_url . '",';
      $html .= '"sameAs": [';
        $html .= '"https://twitter.com/irsteve",';
        $html .= '"https://facebook.com/stemckinney",';
        $html .= '"https://instagram.com/stevemckinney",';
        $html .= '"https://uk.linkedin.com/in/steve-mckinney-5b5836102",';
        $html .= '"https://plus.google.com/u/0/114129050502065289651"';
      $html .= ']';
      
    $html .= $this->json_ld_close;
    
    return $html;
  }
  
  public function json_ld_organisation()
  {
    $html = $this->json_ld_open;
    
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "Organization",';
      $html .= '"url": "' . $this->base_url . '",';
      $html .= '"logo": "' . $this->base_url . '/assets/images/iamsteve-logo.png"';
    
    $html .= $this->json_ld_close;
    
    return $html;
  }
  
  public function json_ld_list_item($position, $id, $name)
  {
    $html = '{';
      $html .= '"@type": "ListItem",';
      $html .= '"position": ' . $position . ',';
      $html .= '"item": {';
        $html .= '"@id": "' . $id . '",';
        $html .= '"name": "' . $name . '"';
      $html .= '}';
    $html .= '}';
    
    return $html;
  }
  
  public function json_ld_breadcrumbs()
  {
    $html = $this->json_ld_open;
    
      $html .= '"@context": "http://schema.org",';
      $html .= '"@type": "BreadcrumbList",';
      $html .= '"itemListElement": [';
        
        $html .= $this->json_ld_list_item('1', $this->base_url, $this->site_name);
        
      $html .= ']';
        
    $html .= $this->json_ld_close;
    
    return $html;
  }

  public function background($image = '')
  {
    $image =  ee()->TMPL->fetch_param('image');
    
    switch ( strtolower( pathinfo( $image, PATHINFO_EXTENSION ) ) )
    {
      case 'jpeg' :
      case 'jpg' :
        $id = imagecreatefromjpeg($image);
      break;
      
      case 'png' :
        $id = imagecreatefrompng($image);
      break;
      
      case 'gif' :
        $id = imagecreatefromgif($image);
      break;
      
      default:
        throw new InvalidArgumentException('File "' . $filename . '" is not valid jpg, png or gif image.');
      break;
    }
    
    if ( $id )
    {
      $rgb = imagecolorat($id, 2, 2);
      $cols = imagecolorsforindex($id, $rgb);
      $r = dechex($cols['red']);
      $g = dechex($cols['green']);
      $b = dechex($cols['blue']);
    
      return '#' . $r . $g . $b;
    }
  }
  
  public function number($from = '', $to = '')
  {
    // Parameters
    if ($from == '')
    {
      $from = ee()->TMPL->fetch_param('from', '0');
    }

    if ($to == '')
    {
      $to = ee()->TMPL->fetch_param('to', '9');
    }

    // no from? Set to 0
    if (!is_numeric($from))
    {
      $from = '0';
    }

    // no to? Set to 9
    if (!is_numeric($to))
    {
      $to = '9';
    }

    // return random number
    return strval(rand(intval($from), intval($to)));
  }

  public function is_mobile()
  {
    if ( empty($_SERVER['HTTP_USER_AGENT']) )
    {
      $is_mobile = false;  
    } 
    elseif (
         strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false // many mobile devices (all iPhone, iPad, etc.)
      || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
      || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
      || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
      || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
      || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
      || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false )
    {
      $is_mobile = true;
    }
    else
    {
      $is_mobile = false;
    }
    
    return $is_mobile;
  }
}
// END CLASS

// EOF
