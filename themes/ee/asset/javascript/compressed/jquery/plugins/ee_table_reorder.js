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
$.fn.eeTableReorder=function(e){return this.each(function(){$("tbody",this).sortable({axis:"y",containment:"parent",handle:"td.reorder-col",cancel:"td.sort-cancel",items:"tr",sort:EE.sortable_sort_helper,forcePlaceholderSize:!0,helper:function(e,t){var r=t.children(),n=t.clone();return n.find("input[type=radio]:enabled").each(function(){$(this).attr("name",20*Math.random())}),n.children().each(function(e){$(this).width(r.eq(e).width())}),n},start:function(t,r){void 0!==e.beforeSort&&e.beforeSort(r.item)},stop:function(t,r){void 0!==e.afterSort&&e.afterSort(r.item)}})})};