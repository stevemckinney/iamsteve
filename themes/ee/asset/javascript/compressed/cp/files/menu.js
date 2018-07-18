/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
$(document).ready(function(){$(".sidebar .folder-list .remove a.m-link").click(function(i){var t="."+$(this).attr("rel");$(t+" .checklist").html(""),$(t+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(t+" input[name='dir_id']").val($(this).data("dir_id")),i.preventDefault()})});