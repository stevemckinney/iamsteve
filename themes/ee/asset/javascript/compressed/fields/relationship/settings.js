/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2015, EllisLab, Inc.
 * @license		https://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
"use strict";!function(c){c(document).ready(function(){c("input:checkbox[data-any]").on("click",function(e){"--"==c(e.target).val()?e.target.checked&&c(e.target).closest("label").siblings("ul").find("input:checkbox:checked").click():e.target.checked&&e.target.checked&&c(e.target).closest("ul.nested-list").find('input:checkbox:checked[value="--"]').click()})})}(jQuery);