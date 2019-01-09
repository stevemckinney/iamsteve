/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$.fn.eeTableReorder=function(e){return this.each(function(){var t={sortableContainer:"tbody",handle:"td.reorder-col",cancel:"td.sort-cancel",item:"> tr"},n={};n=$.extend(n,t,e),$(n.sortableContainer,this).sortable({axis:"y",containment:"parent",handle:n.handle,cancel:n.cancel,items:n.item,sort:EE.sortable_sort_helper,forcePlaceholderSize:!0,helper:function(e,t){var n=t.children(),r=t.clone();return r.find("input[type=radio]:enabled").each(function(){$(this).attr("name",20*Math.random())}),r.children().each(function(e){$(this).width(n.eq(e).width())}),r},start:function(t,n){void 0!==e.beforeSort&&e.beforeSort(n.item)},stop:function(t,n){void 0!==e.afterSort&&e.afterSort(n.item)}})})};