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
!function(e){"use strict";e(document).ready(function(){e("tbody","table").sortable({connectWith:"tbody",axis:"y",// Only allow vertical dragging
handle:"td.reorder-col",// Set drag handle
cancel:"td.sort-cancel",// Do not allow sort on this handle
items:"tr",// Only allow these to be sortable
sort:EE.sortable_sort_helper,// Custom sort handler
forcePlaceholderSize:!0,// Custom sort handler
helper:function(r,t){var o=t.children(),a=t.clone();
// Make sure radio buttons retain their state after sort,
// explanation:
// Upon finishing the sort, the new row will be put down
// before the helper is destroyed, so for a brief moment
// in time, there are multiple sets of radios with the
// same name, and given the nature of radio buttons, only
// one can be selected within the same name group, and the
// helper wins; so, we'll just assign a random name to each
return a.find("input[type=radio]:enabled").each(function(){e(this).attr("name",20*Math.random())}),a.children().each(function(r){
// Set helper cell sizes to match the original sizes
e(this).width(o.eq(r).width())}),a},stop:function(r){e.ajax({url:EE.forums.reorder_url,data:{order:e('input[name="order[]"]').serialize()},type:"POST",dataType:"json",error:function(r,t,o){
// Let the user know something went wrong
0==e("body > .banner").size()&&e("body").prepend(EE.alert.reorder_ajax_fail)}})}}),e(".tbl-ctrls").sortable({axis:"y",// Only allow vertical dragging
handle:"th.reorder-col",// Set drag handle
items:".tbl-wrap",// Only allow these to be sortable
sort:EE.sortable_sort_helper,// Custom sort handler
forcePlaceholderSize:!0,// Custom sort handler
update:function(r,t){e.ajax({url:EE.forums.reorder_url,data:{order:e('input[name="order[]"]').serialize()},type:"POST",dataType:"json",error:function(r,t,o){
// Let the user know something went wrong
0==e("body > .banner").size()&&e("body").prepend(EE.alert.reorder_ajax_fail)}})}})})}(jQuery);