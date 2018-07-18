/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
$(document).ready(function(){$(".light .toolbar .remove a.m-link").click(function(t){var i="."+$(this).attr("rel");$(i+" .checklist").html(""),$(i+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(i+" input[name='id']").val($(this).data("id")),t.preventDefault()})});