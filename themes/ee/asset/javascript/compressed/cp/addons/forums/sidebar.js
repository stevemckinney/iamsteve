/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){$(".sidebar .folder-list .remove a.m-link").click(function(i){var t="."+$(this).attr("rel");$(t+" .checklist").html(""),$(t+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(t+" input[name='id']").val($(this).data("id")),i.preventDefault()})});