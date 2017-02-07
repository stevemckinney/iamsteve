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
$.fn.eeTableReorder=function(e){return this.each(function(){var t={sortableContainer:"tbody",handle:"td.reorder-col",cancel:"td.sort-cancel",item:"> tr"},n={};n=$.extend(n,t,e),$(n.sortableContainer,this).sortable({axis:"y",containment:"parent",handle:n.handle,cancel:n.cancel,items:n.item,sort:EE.sortable_sort_helper,forcePlaceholderSize:!0,helper:function(e,t){var n=t.children(),r=t.clone();return r.find("input[type=radio]:enabled").each(function(){$(this).attr("name",20*Math.random())}),r.children().each(function(e){$(this).width(n.eq(e).width())}),r},start:function(t,n){void 0!==e.beforeSort&&e.beforeSort(n.item)},stop:function(t,n){void 0!==e.afterSort&&e.afterSort(n.item)}})})};