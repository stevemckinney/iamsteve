/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
$(document).ready(function(){$(".light .toolbar .remove a.m-link").click(function(t){var i="."+$(this).attr("rel");$(i+" .checklist").html(""),$(i+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(i+" input[name='id']").val($(this).data("id")),t.preventDefault()})});