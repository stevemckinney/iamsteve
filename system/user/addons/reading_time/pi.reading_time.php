<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
Copyright (C) 2015–2016 EllisLab, Inc.

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
 * Reading Time plugin class
 *
 * @package	    ExpressionEngine
 * @subpackage  Addons
 * @category    Plugin
 * @author      EllisLab Dev Team
 * @copyright   Copyright (c) 2015–2016, EllisLab, Inc.
 * @link        https://github.com/EllisLab/Reading-Time
 */
class Reading_time {

	/**
	 * @var The plugin return data, since we do our work in the constructor
	 **/
	public $return_data;

	/**
	 * Constructor, does all our work
	 *
	 * @return  nothing, since it's a constructor, so it sets $this->return_data
	 **/
	public function __construct()
	{
		$tagdata = ee()->TMPL->tagdata;
		$wpm = (ee()->TMPL->fetch_param('wpm')) ?: 200;

		$words = str_word_count(strip_tags($tagdata));
		$seconds = floor($words / $wpm * 60);

		// set the finished reading time as a date variable
		// for the most flexible of display options
		$vars['finished_reading_time'] = ee()->localize->now + $seconds;

		$this->return_data = ee()->TMPL->parse_variables($tagdata, array($vars));
	}
}
// END CLASS

// EOF
