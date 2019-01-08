/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){var n=function(n){var n=n||window.event,o="The file name conflict has not been resolved.";return n&&(n.returnValue=o),o},o=function(n){$.ajax({type:"POST",url:$(".w-12 .box form.settings").attr("action"),data:$(".w-12 .box form.settings").serialize()+"&submit=cancel",async:!1})};$(window).on("beforeunload",n),$(window).on("unload",o),$(".form-standard form").on("submit",function(){$(window).off("beforeunload",n),$(window).off("unload",o)})});