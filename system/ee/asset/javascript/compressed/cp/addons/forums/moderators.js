/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){$(".light .toolbar .remove a.m-link").click(function(t){var i="."+$(this).attr("rel");$(i+" .checklist").html(""),$(i+" .checklist").append("<li>"+$(this).data("confirm")+"</li>"),$(i+" input[name='id']").val($(this).data("id")),t.preventDefault()})});