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
/**
 * Plugin to handle sorting on our reorderable tables, provides
 * two callbacks for sorting events.
 *
 * Example:
 *
 * $('#mytable').eeTableReorder({
 *		beforeSort: function(row) {
 *			// Do something before sort
 *		},
 *		afterSort: function(row) {
 *			// Do something after sort
 *		}
 * });
 *
 * @param Object params An object literal containing key/value
 * pairs to provide optional settings.
 *
 * @option Function beforeSort (optional) Callback function to be
 * called before sorting starts, accepts table row object as
 * parameter.
 *
 * @option Function afterSort (optional) Callback function to be
 * called after sorting completes, accepts table row object as
 * parameter.
 *
 */
$.fn.eeTableReorder=function(e){return this.each(function(){$("tbody",this).sortable({axis:"y",// Only allow vertical dragging
containment:"parent",// Contain to parent
handle:"td.reorder-col",// Set drag handle
cancel:"td.sort-cancel",// Do not allow sort on this handle
items:"tr",// Only allow these to be sortable
sort:EE.sortable_sort_helper,// Custom sort handler
forcePlaceholderSize:!0,// Custom sort handler
helper:function(e,t){var r=t.children(),n=t.clone();
// Make sure radio buttons retain their state after sort,
// explanation:
// Upon finishing the sort, the new row will be put down
// before the helper is destroyed, so for a brief moment
// in time, there are multiple sets of radios with the
// same name, and given the nature of radio buttons, only
// one can be selected within the same name group, and the
// helper wins; so, we'll just assign a random name to each 
return n.find("input[type=radio]:enabled").each(function(){$(this).attr("name",20*Math.random())}),n.children().each(function(e){
// Set helper cell sizes to match the original sizes
$(this).width(r.eq(e).width())}),n},
// Before sort starts
start:function(t,r){void 0!==e.beforeSort&&e.beforeSort(r.item)},
// After sort finishes
stop:function(t,r){void 0!==e.afterSort&&e.afterSort(r.item)}})})};