/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		https://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
$(document).ready(function(){function e(){var e=n.find("a.act").parents("li").eq(0);return n.find("li").index(e)}function a(e){var a=$(e).parents("fieldset").eq(0);return $("div.tab-open fieldset").index(a)}function i(){n.find("li a").droppable({accept:"fieldset.sortable",hoverClass:"highlight",tolerance:"pointer",drop:function(a,i){if(
// Stop the Timeout
clearTimeout(d),
// Open the tab
$(this).trigger("click"),
// Remove the fieldset from the old tab
i.draggable.remove(),
// Add the fieldset to the new tab
$('<fieldset class="col-group sortable"></fieldset>').append(i.draggable.html()).prependTo($("div.tab-open")),$(i.draggable).hasClass("required")){$("div.tab-open fieldset:first-child").addClass("required");var l=$(this).closest("li");$(l).find(".tab-off").length>0&&$(l).find(".tab-off").trigger("click")}
// Add the field to the publish_layout array
EE.publish_layout[e()].fields.unshift(t),t=null,
// Make sure the last element has the last class
$("fieldset.sortable").removeClass("last"),$("fieldset.sortable:last-child").addClass("last")},over:function(e,a){tab=this,d=setTimeout(function(){$(tab).trigger("click"),s.sortable("refreshPositions")},o)},out:function(e,a){clearTimeout(d)},deactivate:function(e,a){clearTimeout(d)}})}
// remove debug - it has tabs and we don't want fields to end up in them
// we'll add it back in after all the events are bound
var t,l=$("#debug").remove(),n=$(".wrap ul.tabs"),s=$(".wrap div.tab");
// Sorting the tabs
n.sortable({cancel:"li:first-child",items:"li",start:function(e,a){tab_index_at_start=n.find("li").index(a.item[0])},update:function(e,a){var i=n.find("li").index(a.item[0]),t=EE.publish_layout.splice(tab_index_at_start,1);EE.publish_layout.splice(i,0,t[0]),tab_index_at_start=NaN}}),
// Prevent clicking the move icon from refreshing
$(".move a").on("click",function(){return!1});var d,o=500;i(),
// Sorting the fields
s.sortable({appendTo:"div.box.publish",connectWith:"div.tab",cursor:"move",forceHelperSize:!0,forcePlaceholderSize:!0,handle:"li.move a",helper:"clone",items:"fieldset.sortable",placeholder:"drag-placeholder",start:function(a,i){var l=s.filter(".tab-open").find("fieldset").index(i.item[0]);t=EE.publish_layout[e()].fields.splice(l,1)[0],i.placeholder.append('<div class="none"></div>')},stop:function(a,i){if(i.position!=i.originalPosition){if(null!=t){var l=s.filter(".tab-open").find("fieldset").index(i.item[0]);EE.publish_layout[e()].fields.splice(l,0,t),t=null}$("fieldset.sortable").removeClass("last"),$("fieldset.sortable:last-child").addClass("last")}}}),
// Saving the on/off state of tabs
$(".tab-on, .tab-off").on("click",function(e){var a=$(this).parents("li").eq(0),i=n.find("li").index(a),t=s.filter("."+$(a).find("a").eq(0).attr("rel"));return EE.publish_layout[i].visible&&t.has(".required").length>0?void $("body").prepend(EE.alert.required.replace("%s",a.text())):(EE.publish_layout[i].visible=!EE.publish_layout[i].visible,$(this).toggleClass("tab-on tab-off"),void e.preventDefault())}),
// Adding a tab
$(".modal-add-new-tab button").on("click",function(e){var a=$('.modal-add-new-tab input[name="tab_name"]'),t=$('.modal-add-new-tab input[name="tab_name"]').val(),l="custom__"+t.replace(/ /g,"_").replace(/&/g,"and").toLowerCase(),d=/^[^*>:+()\[\]=|"'.#$]+$/;if(// allow all unicode characters except for css selectors and $
$(".modal-add-new-tab .setting-field em").remove(),a.parents("fieldset").removeClass("invalid"),""===t)
// Show the required_tab_name alert
a.after($("<em></em>").append(a.data("required"))),a.parents("fieldset").addClass("invalid");else if(d.test(t)){for(var o=!1,r=0;r<EE.publish_layout.length;r++)EE.publish_layout[r].id==l&&(o=!0);if(o)
// Show the duplicate_tab_name alert
a.after($("<em></em>").append(a.data("duplicate"))),a.parents("fieldset").addClass("invalid");else{var u={fields:[],id:l,name:t,visible:!0};EE.publish_layout.push(u);var f=$("ul.tabs li").length;n.find("li a").droppable("destroy"),n.append('<li><a href="" rel="t-'+f+'">'+t+'</a> <span class="tab-remove"></span></li>'),s.filter(".t-"+(f-1)).after('<div class="tab t-'+f+'"></div>'),i(),
// Update tabs
s=$(".wrap div.tab"),$(".modal-add-new-tab .m-close").trigger("click")}}else
// Show the illegal_tab_name alert
a.after($("<em></em>").append(a.data("illegal"))),a.parents("fieldset").addClass("invalid");e.preventDefault()}),$(".modal-add-new-tab .m-close").on("click",function(e){$('.modal-add-new-tab input[name="tab_name"]').val(""),$(".modal-add-new-tab .setting-field em").remove(),$('.modal-add-new-tab input[name="tab_name"]').parents("fieldset").removeClass("invalid")}),
// If you submit the form, trigger the submit button click
$(".modal-add-new-tab form").on("submit",function(e){$(".modal-add-new-tab .submit").trigger("click"),e.preventDefault()}),
// Removing a tab
n.on("click",".tab-remove",function(e){var a=$(this).parents("li").eq(0),i=$("ul.tabs li").index(a),t=s.filter("."+$(a).find("a").eq(0).attr("rel"));return t.html()?void $("body").prepend(EE.alert.not_empty.replace("%s",a.text())):(EE.publish_layout.splice(i,1),a.remove(),void t.remove())}),
// Saving the hide/unhide state of fields
$("div.publish form").on("click","li.hide a, li.unhide a",function(i){var t=e(),l=a(this);EE.publish_layout[t].fields[l].visible=!EE.publish_layout[t].fields[l].visible,$(this).parents("li").eq(0).toggleClass("hide unhide"),i.preventDefault()}),
// Saving the collapsed state
$(".sub-arrow").on("click",function(i){var t=e(),l=a(this);EE.publish_layout[t].fields[l].collapsed=!EE.publish_layout[t].fields[l].collapsed,i.preventDefault()}),$("div.publish form").on("submit",function(e){$('input[name="field_layout"]').val(JSON.stringify(EE.publish_layout))}),
// put debug back
$("body").append(l)});