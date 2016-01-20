<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Low Replace Plugin class
 *
 * @package        low_replace
 * @author         Lodewijk Schutte <hi@gotolow.com>
 * @link           http://gotolow.com/addons/low-replace
 * @license        http://creativecommons.org/licenses/by-sa/3.0/
 */
class Low_replace {

	// --------------------------------------------------------------------
	// PROPERTIES
	// --------------------------------------------------------------------

	/**
	 * Plugin return data
	 *
	 * @var         string
	 */
	public $return_data;

	// --------------------------------------------------------------------

	/**
	 * Replacement codes
	 */
	private $_map = array(
		'SPACE'   => ' ',
		'QUOTE'   => '"',
		'NEWLINE' => "\n",
		'PIPE'    => '|'
	);

	// --------------------------------------------------------------------
	// METHODS
	// --------------------------------------------------------------------

	/**
	 * Constructor just calls the text() method
	 *
	 * @see         text()
	 */
	public function __construct()
	{
		return $this->text();
	}

	/**
	 * Does the replace action
	 *
	 * @access      public
	 * @return      string
	 */
	public function text()
	{
		// -------------------------------------------
		// Init return data
		// -------------------------------------------

		$this->return_data = ee()->TMPL->tagdata;

		// -------------------------------------------
		// Get parameters
		// -------------------------------------------

		$find    = ee()->TMPL->fetch_param('find');
		$replace = ee()->TMPL->fetch_param('replace', '');
		$case    = ee()->TMPL->fetch_param('casesensitive', ee()->TMPL->fetch_param('case'));
		$regex   = ee()->TMPL->fetch_param('regex');
		$flags   = ee()->TMPL->fetch_param('flags');

		// -------------------------------------------
		// Make sure find and replace values are arrays
		// -------------------------------------------

		if (ee()->TMPL->fetch_param('multiple') == 'yes')
		{
			$find    = explode('|', $find);
			$replace = explode('|', $replace);
		}
		else
		{
			$find    = array($find);
			$replace = array($replace);
		}

		// -------------------------------------------
		// Clean up find/replace values
		// -------------------------------------------

		$find    = array_map(array($this, '_clean'), $find);
		$replace = array_map(array($this, '_clean'), $replace);

		// -------------------------------------------
		// Regular Expression or String Replace?
		// -------------------------------------------

		if (in_array($regex, array('yes', 'raw')))
		{
			foreach ($find as $i => $pattern)
			{
				// Prep pattern
				if ($regex != 'raw')
				{
					$pattern = $this->_prep_regex($pattern, ($case == 'yes'), $flags);
				}

				// If there isn't a paired replacement, use empty string
				$str = isset($replace[$i]) ? $replace[$i] : '';

				// Replace it
				$this->return_data = preg_replace($pattern, $str, $this->return_data);
			}
		}
		else
		{
			// Only 1 replacement? Flatten it
			if (count($replace) == 1) $replace = current($replace);

			// Get method
			$method = ($case == 'yes') ? 'str_replace' : 'str_ireplace';

			// Replace it
			$this->return_data = $method($find, $replace, $this->return_data);
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
	function _prep_regex($str, $case = FALSE, $flags = FALSE)
	{
		// check needle for first and last character
		if (substr($str,0,1)  != '/') $str  = '/'.$str;
		if (substr($str,-1,1) != '/') $str .= '/';

		// add case insensitive flag
		if ($flags) $str .= str_replace('i', '', $flags);
		if ( ! $case) $str .= 'i';

		return $str;
	}

	/**
	 * Clean values and return
	 */
	private function _clean($str)
	{
		return str_replace(
			array_keys($this->_map),
			array_values($this->_map),
			$str
		);
	}

	// --------------------------------------------------------------------

}
// END CLASS

/* End of file pi.low_replace.php */