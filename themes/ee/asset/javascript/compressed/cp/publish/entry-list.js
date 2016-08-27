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
$(document).ready(function(){var t=function(t){$(".wrap .col-group:nth-child(2) .box").html(t.html),$.fuzzyFilter(),$('input[name="search"]').closest("form").attr("action",t.url),jQuery().toggle_all&&$("table").toggle_all(),window.history.pushState(null,"",t.url)};
// Submitting the search form
$('input[name="search"]').closest("form").on("submit",function(e){$.ajax({url:$(this).attr("action"),data:$(this).serialize(),type:"POST",dataType:"json",success:t}),e.preventDefault()}),
// Typing into the search form
$('input[name="search"]').on("interact",_.debounce(function(){$(this).closest("form").submit()},150)),
// Selecting a channel filter
$("body").on("click","form > .filters .sub-menu a, .filters .filter-clear a, .paginate ul li a",function(e){var a=$('input[name="search"]').serialize();$.ajax({url:$(this).attr("href")+"&"+a,type:"GET",dataType:"json",success:t}),e.preventDefault()})});