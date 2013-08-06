<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// include config file
include PATH_THIRD.'low_replace/config.php';

$plugin_info = array(
	'pi_name'        => LOW_REPLACE_NAME,
	'pi_version'     => LOW_REPLACE_VERSION,
	'pi_author'      => 'Lodewijk Schutte ~ Low',
	'pi_author_url'  => 'http://loweblog.com/software/low-replace/',
	'pi_description' => 'Find and replace text by either simple string replacement or regular expression.',
	'pi_usage'       => Low_replace::usage()
);

/**
* Low Replace Plugin class
*
* @package        low_replace
* @author         Lodewijk Schutte <hi@gotolow.com>
* @link           http://gotolow.com/addons/low-replace
* @license        http://creativecommons.org/licenses/by-sa/3.0/
*/
class Low_replace {

	/**
	* Plugin return data
	*
	* @var         string
	*/
	public $return_data;

	// --------------------------------------------------------------------

	/**
	* Legacy Constructor
	*
	* @see         __construct()
	*/
	public function Low_replace()
	{
		return $this->__construct();
	}

	// --------------------------------------------------------------------

	/**
	* Constructor
	*
	* @return      string
	*/
	public function __construct()
	{
		// get global instance
		$this->EE =& get_instance();

		// fetch params
		$caseinsens	= ($this->EE->TMPL->fetch_param('casesensitive') == 'no');
		$multiple	= ($this->EE->TMPL->fetch_param('multiple') == 'yes');
		$regex		= ($this->EE->TMPL->fetch_param('regex') == 'yes');
		$flags		= $this->EE->TMPL->fetch_param('flags');
		$needle		= $this->EE->TMPL->fetch_param('find');
		$replace	= $this->EE->TMPL->fetch_param('replace');
		$haystack	= $this->EE->TMPL->tagdata;

		// clean up params
		$dirty		= array('SPACE', 'QUOTE', 'NEWLINE');
		$clean		= array(' ', '"', "\n");
		$needle		= str_replace($dirty, $clean, $needle);
		$replace	= str_replace($dirty, $clean, $replace);

		// regular expression replace
		if ($regex)
		{
			// If multiple, explode by pipe
			if ($multiple)
			{
				$needles = explode('|', $needle);
				$replacements = explode('|', $replace);
			}
			// if not, put neelde and replacement in single array
			else
			{
				$needles = array($needle);
				$replacements = array($replace);
			}

			// Replace PIPE with |
			$needles = $this->_replace_pipe($needles);
			$replacements = $this->_replace_pipe($replacements);

			// loop through needles and replace 'em
			foreach ($needles AS $i => $nee)
			{
				// prep needle first
				$nee = $this->_prep_regex($nee, $caseinsens, $flags);

				// If there isn't a paired replacement, use empty string
				$rep = isset($replacements[$i]) ? $replacements[$i] : '';

				// replace the haystack
				$haystack = preg_replace($nee, $rep, $haystack);
			}

			// return the haystack
			$this->return_data = $haystack;
		}
		// normal str_replace
		else
		{
			if ($multiple)
			{
				// convert needle to array
				$needle  = explode('|', $needle);

				// Replace PIPE with |
				$needle = $this->_replace_pipe($needle);

				// convert replace to array if vertical bar is found
				$replace = (substr_count($replace,'|') == 0) ? $replace : explode('|', $replace);
			}

			// perform str_replace
			$function = ($caseinsens) ? 'str_ireplace' : 'str_replace';
			$this->return_data = $function($needle, $replace, $haystack);
		}

		// Why not?
		return $this->return_data;
	}

	// --------------------------------------------------------------------

	/**
	* Prep string for regular expression pattern
	*
	* @access	private
	* @param	string
	* @param	bool
	* @return	string
	*/
	function _prep_regex($str, $caseinsens = FALSE, $flags = FALSE)
	{
		// check needle for first and last character
		if (substr($str,0,1)  != '/') { $str  = '/'.$str; }
		if (substr($str,-1,1) != '/') { $str .= '/'; }

		// add case insensitive flag
		if ($flags) { $str .= str_replace('i', '', $flags); }
		if ($caseinsens) { $str .= 'i'; }

		return $str;
	}

	// --------------------------------------------------------------------

	/**
	* Replace pipe key character
	*
	* @access	private
	* @param	mixed
	* @return	mixed
	*/
	function _replace_pipe($str)
	{
		$key = 'PIPE';
		$val = '|';
		
		if (is_array($str))
		{
			foreach ($str AS &$item)
			{
				$item = str_replace($key, $val, $item);
			}
		}
		else
		{
			$str = str_replace($key, $val, $str);
		}
		
		return $str;
	}
	
	// --------------------------------------------------------------------

	/**
	* Plugin usage
	*
	* @return	string
	*/
	function usage()
	{
		ob_start(); 
		?>
			This plugin works pretty much the same as the php str_replace() function:
			http://www.php.net/manual/en/function.str-replace.php and the preg_replace() function:
			http://www.php.net/manual/en/function.preg-replace.php

			ExpressionEngine strips the white space from the beginning and the end of each parameter. Because of this,
			if you want to replace something with a space, use the string "SPACE" instead.
			If you want to use a double quote in a parameter value, use the string "QUOTE" instead.

			*** EXAMPLES ***

			# Replace A with B:

			{exp:low_replace find="you" replace="we"}
			  text you want processed
			{/exp:low_replace}

			Result: text we want processed

			# Replace A with a space:

			{exp:low_replace find="o" replace="SPACE"}
			  text you want processed
			{/exp:low_replace}

			Result: text y u want pr cessed

			# Replace a space with nothing

			{exp:low_replace find="SPACE"}
			  text you want processed
			{/exp:low_replace}

			Result: textyouwantprocessed

			# Replace A, B and C with D:

			{exp:low_replace find="a|e|i|o|u" replace="X" multiple="yes"}
			  text you want processed
			{/exp:low_replace}

			Result: tXxt yXX wXnt prXcXssXd

			# Replace A, B and C with X, Y and Z:

			{exp:low_replace find="text|you|want" replace="words|we|have" multiple="yes"}
			  text you want processed
			{/exp:low_replace}

			Result: words we have processed

			# Regular Expression find and replace:

			{exp:low_replace find="\w+" replace="*" regex="yes"}
			  text you want processed
			{/exp:low_replace}

			Result: * * * *

			# Regular Expression find and replace with backreference:

			{exp:low_replace find="<a[^>]*href=QUOTE(.+)QUOTE[^>]*>(.*)<\/a>" replace="$2 ($1)" regex="yes"}
			  <a href="http://www.foo.com/">text</a> you want <a href="http://www.bar.com/">processed</a>
			{/exp:low_replace}

			Result: text (http://www.foo.com/) you want processed (http://www.bar.com/)
			
			{exp:low_replace find="PIPE|you" replace=",SPACE|some" multiple="yes"}
			  text|you|want|processed
			{/exp:low_replace}

			Result: text, some, want, processed

			{exp:low_replace find="\s+|\w+" replace="-|*" regex="yes" multiple="yes"}
			  text you want processed
			{/exp:low_replace}

			Result: -*-*-*-*-

			Note: if you want to replace something with nothing, best is to omit the replace parameter altogether.
			If you want to find multiple strings, always use the multiple="yes" parameter, or else it will search
			for the literal string, including vertical bars. The multiple parameter has no effect when using a
			regular expression find and replace.

			This function is case sensitive by default. Use the parameter casesensitive="no" to ignore case, both
			for a normal as for a regular expression find and replace.

			When using regex="yes" it is recommended that you set your Debug Preference (Admin > System Preferences
			> Output and Debugging Preferences) to 1, so Super Admins can make sure their regular expressions
			aren't generating server errors.

		<?php
		$buffer = ob_get_contents();

		ob_end_clean(); 

		return $buffer;
	}

	// --------------------------------------------------------------------

}
// END CLASS

/* End of file pi.low_replace.php */