/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){var t=function(t){$(".wrap .col-group:nth-child(2) .box").html(t.html),$.fuzzyFilter(),$('input[name="search"]').closest("form").attr("action",t.url),jQuery().toggle_all&&$("table").toggle_all(),window.history.pushState(null,"",t.url)};$('input[name="search"]').closest("form").on("submit",function(e){$.ajax({url:$(this).attr("action"),data:$(this).serialize(),type:"POST",dataType:"json",success:t}),e.preventDefault()}),$('input[name="search"]').on("interact",_.debounce(function(){"https:"===location.protocol&&navigator.userAgent.indexOf("Safari")>-1||$(this).closest("form").submit()},150)),$("body").on("click","form > .filters .sub-menu a, .filters .filter-clear a, .paginate ul li a",function(e){var a=$('input[name="search"]').serialize();$.ajax({url:$(this).attr("href")+"&"+a,type:"GET",dataType:"json",success:t}),e.preventDefault()})});