<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
Copyright (C) 2004 - 2016 EllisLab, Inc.

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
 * Allow_eecode Class
 *
 * @package			ExpressionEngine
 * @category		Plugin
 * @author			EllisLab
 * @copyright		Copyright (c) 2004 - 2016, EllisLab, Inc.
 * @link			https://github.com/EllisLab/Allow-Eecode
 */

class Allow_eecode {

    public $return_data;

	/**
	 * Constructor
	 *
	 * @access	public
	 * @return	void
	 */

    function __construct($str = '')
    {
		$str = ($str == '') ? ee()->TMPL->tagdata : $str;

        $query = ( ! ee()->TMPL->fetch_param('query') ) ? 'n' : ee()->TMPL->fetch_param('query');
        $embed = ( ! ee()->TMPL->fetch_param('embed') ) ? 'n' : ee()->TMPL->fetch_param('embed');

        if ($query != 'yes')
        {
        	$str = preg_replace("/&#123;exp:query(.*?)&#125;/","TgB903He0mnv3dd098$1TgB903He0mnv3dd099",$str);
			$str = str_replace('&#123;/exp:query&#125;', 'Mu87ddk2QPoid990iod', $str);
        }

		if ($embed != 'yes')
		{
			$str = str_replace('&#123;embed', 'a9f83fa8b65b27e43a9db5fa4b2f62c8a23330e6', $str);
		}

        $array1 = array('&#123;',	'&#125;',	'{&#47;');
        $array2 = array('{',		'}',		'{/');

        $str = str_replace($array1,$array2,$str);

		if (preg_match_all("#\{.+?}#si", $str, $matches))
		{
			for ($i = 0, $total = count($matches[0]); $i < $total; $i++)
			{
				$str = str_replace($matches['0'][$i],
									str_replace(array('&#8220;', '&#8221;', '&#8216;','&#8217;'), array('"', '"', "'", "'"), $matches['0'][$i]),
									$str);
			}
		}

        if ($query == 'n')
        {
        	$str = str_replace('TgB903He0mnv3dd098', '&#123;exp:query', $str);
        	$str = str_replace('TgB903He0mnv3dd099', '&#125;', $str);
			$str = str_replace('Mu87ddk2QPoid990iod', '&#123;/exp:query&#125;', $str);
        }

		if ($embed == 'n')
		{
			$str = str_replace('a9f83fa8b65b27e43a9db5fa4b2f62c8a23330e6', '&#123;embed', $str);
		}

 		$this->return_data = $str;
	}
}
// END CLASS

// EOF
