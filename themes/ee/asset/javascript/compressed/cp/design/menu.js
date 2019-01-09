/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){$(".sidebar .folder-list .remove a.m-link").click(function(t){var e="."+$(this).attr("rel");$(e+" .checklist").html(""),$(e+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(e+" input[name='group_name']").val($(this).data("group_name")),t.preventDefault()})});