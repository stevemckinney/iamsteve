/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.2.0
 * @filesource
 */
"use strict";!function(s){s(document).ready(function(){s("body").on("click","a.toggle-btn",function(t){if(!(s(this).hasClass("disabled")||s(this).parents(".toggle-tools").size()>0)){var i=s(this).find('input[type="hidden"]');s(this).hasClass("off")?(s(this).removeClass("off"),s(this).addClass("on"),s(i).val(1)):(s(this).removeClass("on"),s(this).addClass("off"),s(i).val(0)),t.preventDefault()}})})}(jQuery);