/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
<<<<<<< HEAD
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
=======
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
<<<<<<< HEAD
function get_selected_tab(){return selected_tab}function tab_focus(t){$(".menu_"+t).parent().is(":visible")||$("a.delete_tab[href=#"+t+"]").trigger("click"),$(".tab_menu li").removeClass("current"),$(".menu_"+t).parent().addClass("current"),$(".main_tab").hide(),$("#"+t).show(),$(".main_tab").css("z-index",""),$("#"+t).css("z-index","5"),selected_tab=t,$(".main_tab").sortable("refreshPositions")}function setup_tabs(){var t=500,e="";$(".tab_menu li a").droppable({accept:".field_selector, .publish_field",tolerance:"pointer",forceHelperSize:!0,deactivate:function(){clearTimeout(e),$(".tab_menu li").removeClass("highlight_tab")},drop:function(t,e){return field_id=e.draggable.attr("id").substring(11),tab_id=$(this).attr("title").substring(5),setTimeout(function(){$("#hold_field_"+field_id).prependTo("#"+tab_id),$("#hold_field_"+field_id).hide().slideDown()},0),tab_focus(tab_id),!1},over:function(){tab_id=$(this).attr("title").substring(5),$(this).parent().addClass("highlight_tab"),e=setTimeout(function(){return tab_focus(tab_id),!1},t)},out:function(){""!=e&&clearTimeout(e),$(this).parent().removeClass("highlight_tab")}}),$("#holder .main_tab").droppable({accept:".field_selector",tolerance:"pointer",drop:function(t,e){field_id=e.draggable.attr("id").substring("hide_title"==e.draggable.attr("id")||"hide_url_title"==e.draggable.attr("id")?5:11),tab_id=$(this).attr("id"),$("#hold_field_"+field_id).prependTo("#"+tab_id),$("#hold_field_"+field_id).hide().slideDown()}}),$(".tab_menu li.content_tab a, #publish_tab_list a.menu_focus").unbind(".publish_tabs").bind("mousedown.publish_tabs",function(t){tab_id=$(this).attr("title").substring(5),tab_focus(tab_id),t.preventDefault()}).bind("click.publish_tabs",function(){return!1}),setTimeout(function(){$(".main_tab").sortable({connectWith:".main_tab",appendTo:"#holder",helper:"clone",forceHelperSize:!0,handle:".handle",start:function(t,e){e.item.css("width",$(this).parent().css("width"))},stop:function(t,e){e.item.css("width","100%")}})},1500)}var selected_tab="";EE.tab_focus=tab_focus,$(".tab_menu li:first").addClass("current"),setup_tabs();
=======

var selected_tab="";function get_selected_tab(){return selected_tab}function tab_focus(a){$(".menu_"+a).parent().is(":visible")||$("a.delete_tab[href=#"+a+"]").trigger("click");$(".tab_menu li").removeClass("current");$(".menu_"+a).parent().addClass("current");$(".main_tab").hide();$("#"+a).show();$(".main_tab").css("z-index","");$("#"+a).css("z-index","5");selected_tab=a;$(".main_tab").sortable("refreshPositions")}EE.tab_focus=tab_focus;
function setup_tabs(){var a="";$(".tab_menu li a").droppable({accept:".field_selector, .publish_field",tolerance:"pointer",forceHelperSize:!0,deactivate:function(){clearTimeout(a);$(".tab_menu li").removeClass("highlight_tab")},drop:function(a,b){field_id=b.draggable.attr("id").substring(11);tab_id=$(this).attr("title").substring(5);setTimeout(function(){$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown()},0);tab_focus(tab_id);return!1},over:function(){tab_id=
$(this).attr("title").substring(5);$(this).parent().addClass("highlight_tab");a=setTimeout(function(){tab_focus(tab_id);return!1},500)},out:function(){""!=a&&clearTimeout(a);$(this).parent().removeClass("highlight_tab")}});$("#holder .main_tab").droppable({accept:".field_selector",tolerance:"pointer",drop:function(a,b){field_id="hide_title"==b.draggable.attr("id")||"hide_url_title"==b.draggable.attr("id")?b.draggable.attr("id").substring(5):b.draggable.attr("id").substring(11);tab_id=$(this).attr("id");
$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown()}});$(".tab_menu li.content_tab a, #publish_tab_list a.menu_focus").unbind(".publish_tabs").bind("mousedown.publish_tabs",function(a){tab_id=$(this).attr("title").substring(5);tab_focus(tab_id);a.preventDefault()}).bind("click.publish_tabs",function(){return!1});setTimeout(function(){$(".main_tab").sortable({connectWith:".main_tab",appendTo:"#holder",helper:"clone",forceHelperSize:!0,handle:".handle",start:function(a,
b){b.item.css("width",$(this).parent().css("width"))},stop:function(a,b){b.item.css("width","100%")}})},1500)}$(".tab_menu li:first").addClass("current");setup_tabs();
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
