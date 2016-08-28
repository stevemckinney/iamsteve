<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
Copyright (C) 2016 EllisLab, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
ELLISLAB, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of EllisLab, Inc. shall not be
used in advertising or otherwise to promote the sale, use or other dealings
in this Software without prior written authorization from EllisLab, Inc.
*/

/**
 * EllisLab Cookie plugin
 *
 * @package     ExpressionEngine
 * @subpackage  Addons
 * @category    Plugin
 * @author      EllisLab
 * @copyright   Copyright (c) 2016, EllisLab, Inc.
 * @link        https://github.com/EllisLab/Cookie
 */
class Cookie {

	/*
	 * @var  string  The plugin return data, not used since this plugin requires a method
	 */
	public $return_data;

	/**
	 * Constructor
	 *
	 * @access	public
	 * @return	void
	 */
	public function __construct()
	{

	}

	// ----------------------------------------------------------------------

	/**
	 * Set Cookie value
	 *
	 * @access	public
	 * @return	void
	 */
	public function set()
	{
		$name = ee()->TMPL->fetch_param('name');
		$value = ee()->TMPL->fetch_param('value');
		$expire = ee()->TMPL->fetch_param('expire');

		ee()->input->set_cookie($name, $value, $expire);
	}

	// ----------------------------------------------------------------------

	/**
	 * Get Cookie value
	 *
	 * Runs XSS Clean by default, since this value is being output to a template
	 *
	 * @access	public
	 * @return	string
	 */
	public function get()
	{
		$name = ee()->TMPL->fetch_param('name');
		$sanitize = (ee()->TMPL->fetch_param('sanitize') == 'no') ? FALSE : TRUE;

		$cookie = ee()->input->cookie($name, $sanitize);

		if (ee()->TMPL->fetch_param('htmlentities') !== 'no')
		{
			$cookie = htmlentities($cookie, ENT_QUOTES, 'UTF-8');
		}

		return $cookie;
	}

	// ----------------------------------------------------------------------

	/**
	 * Delete Cookie
	 *
	 * @access	public
	 * @return	void
	 */
	public function delete()
	{
		$name = ee()->TMPL->fetch_param('name');

		ee()->input->delete_cookie($name);
	}
}
// END CLASS

// EOF
