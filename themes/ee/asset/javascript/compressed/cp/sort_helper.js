/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
EE.sortable_sort_helper=function(e,t){var i=0==$(this).sortable("option","axis")?"y":$(this).sortable("option","axis"),r=$(this),o=r.children(".ui-sortable-placeholder:first"),s="y"==i?t.helper.outerHeight():t.helper.outerWidth(),h="y"==i?t.position.top:t.position.left,l=h+s;o.height(t.helper.outerHeight()),r.children(":visible").each(function(){var e=$(this);if(!e.hasClass("ui-sortable-helper")&&!e.hasClass("ui-sortable-placeholder")){var t="y"==i?e.outerHeight():e.outerWidth(),a="y"==i?e.position().top:e.position().left,n=a+t,p=Math.min(s,t)/2;if(h>a&&h<n){var f=h-a;if(f<p)return o.insertBefore(e),r.sortable("refreshPositions"),!1}else if(l<n&&l>a){var f=n-l;if(f<p)return o.insertAfter(e),r.sortable("refreshPositions"),!1}}})};