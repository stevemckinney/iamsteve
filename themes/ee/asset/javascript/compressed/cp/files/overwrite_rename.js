/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.5.3
 * @filesource
 */
$(document).ready(function(){var n=function(n){var n=n||window.event,o="The file name conflict has not been resolved.";return n&&(n.returnValue=o),o},o=function(n){$.ajax({type:"POST",url:$(".w-12 .box form.settings").attr("action"),data:$(".w-12 .box form.settings").serialize()+"&submit=cancel",async:!1})};$(window).on("beforeunload",n),$(window).on("unload",o),$(".form-standard form").on("submit",function(){$(window).off("beforeunload",n),$(window).off("unload",o)})});