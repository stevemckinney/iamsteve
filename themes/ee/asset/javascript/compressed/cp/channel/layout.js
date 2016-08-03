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
$(document).ready(function(){function e(){var e=n.find("a.act").parents("li").eq(0);return n.find("li").index(e)}function a(e){var a=$(e).parents("fieldset").eq(0);return $("div.tab-open fieldset").index(a)}function t(){n.find("li a").droppable({accept:"fieldset.sortable",hoverClass:"highlight",tolerance:"pointer",drop:function(a,t){if(
// Stop the Timeout
clearTimeout(d),
// Open the tab
$(this).trigger("click"),
// Remove the fieldset from the old tab
t.draggable.remove(),
// Add the fieldset to the new tab
$('<fieldset class="col-group sortable"></fieldset>').append(t.draggable.html()).prependTo($("div.tab-open")),$(t.draggable).hasClass("required")){$("div.tab-open fieldset:first-child").addClass("required");var l=$(this).closest("li");$(l).find(".tab-off").length>0&&$(l).find(".tab-off").trigger("click")}
// Add the field to the publish_layout array
EE.publish_layout[e()].fields.unshift(i),i=null,
// Make sure the last element has the last class
$("fieldset.sortable").removeClass("last"),$("fieldset.sortable:last-child").addClass("last")},over:function(e,a){tab=this,d=setTimeout(function(){$(tab).trigger("click"),s.sortable("refreshPositions")},o)},out:function(e,a){clearTimeout(d)},deactivate:function(e,a){clearTimeout(d)}})}
// remove debug - it has tabs and we don't want fields to end up in them
// we'll add it back in after all the events are bound
var i,l=$("#debug").remove(),n=$(".wrap ul.tabs"),s=$(".wrap div.tab");
// Sorting the tabs
n.sortable({cancel:"li:first-child",items:"li",start:function(e,a){tab_index_at_start=n.find("li").index(a.item[0])},update:function(e,a){var t=n.find("li").index(a.item[0]),i=EE.publish_layout.splice(tab_index_at_start,1);EE.publish_layout.splice(t,0,i[0]),tab_index_at_start=NaN}}),
// Prevent clicking the move icon from refreshing
$(".move a").on("click",function(){return!1});var d,o=500;t();var r={appendTo:"div.box.publish",connectWith:"div.tab",cursor:"move",forceHelperSize:!0,forcePlaceholderSize:!0,handle:"li.move a",helper:"clone",items:"fieldset.sortable",placeholder:"drag-placeholder",start:function(a,t){var l=s.filter(".tab-open").find("fieldset").index(t.item[0]);i=EE.publish_layout[e()].fields.splice(l,1)[0],t.placeholder.append('<div class="none"></div>')},stop:function(a,t){if(t.position!=t.originalPosition){if(null!=i){var l=s.filter(".tab-open").find("fieldset").index(t.item[0]);EE.publish_layout[e()].fields.splice(l,0,i),i=null}$("fieldset.sortable").removeClass("last"),$("fieldset.sortable:last-child").addClass("last")}}};
// Sorting the fields
s.sortable(r),
// Saving the on/off state of tabs
$(".tab-on, .tab-off").on("click",function(e){var a=$(this).parents("li").eq(0),t=n.find("li").index(a),i=s.filter("."+$(a).find("a").eq(0).attr("rel"));return EE.publish_layout[t].visible&&i.has(".required").length>0?void $("body").prepend(EE.alert.required.replace("%s",a.text())):(EE.publish_layout[t].visible=!EE.publish_layout[t].visible,$(this).toggleClass("tab-on tab-off"),void e.preventDefault())}),
// Adding a tab
$(".modal-add-new-tab button").on("click",function(e){var a=$('.modal-add-new-tab input[name="tab_name"]'),i=$('.modal-add-new-tab input[name="tab_name"]').val(),l="custom__"+i.replace(/ /g,"_").replace(/&/g,"and").toLowerCase(),d=/^[^*>:+()\[\]=|"'.#$]+$/;if(// allow all unicode characters except for css selectors and $
$(".modal-add-new-tab .setting-field em").remove(),a.parents("fieldset").removeClass("invalid"),""===i)
// Show the required_tab_name alert
a.after($("<em></em>").append(a.data("required"))),a.parents("fieldset").addClass("invalid");else if(d.test(i)){for(var o=!1,u=0;u<EE.publish_layout.length;u++)EE.publish_layout[u].id==l&&(o=!0);if(o)
// Show the duplicate_tab_name alert
a.after($("<em></em>").append(a.data("duplicate"))),a.parents("fieldset").addClass("invalid");else{var f={fields:[],id:l,name:i,visible:!0};EE.publish_layout.push(f);var p=$("ul.tabs li").length;n.find("li a").droppable("destroy"),n.append('<li><a href="" rel="t-'+p+'">'+i+'</a> <span class="tab-remove"></span></li>'),s.filter(".t-"+(p-1)).after('<div class="tab t-'+p+'"></div>'),t(),
// Update tabs
s=$(".wrap div.tab"),s.eq(-1).sortable(r),$(".modal-add-new-tab .m-close").trigger("click")}}else
// Show the illegal_tab_name alert
a.after($("<em></em>").append(a.data("illegal"))),a.parents("fieldset").addClass("invalid");e.preventDefault()}),$(".modal-add-new-tab .m-close").on("click",function(e){$('.modal-add-new-tab input[name="tab_name"]').val(""),$(".modal-add-new-tab .setting-field em").remove(),$('.modal-add-new-tab input[name="tab_name"]').parents("fieldset").removeClass("invalid")}),
// If you submit the form, trigger the submit button click
$(".modal-add-new-tab form").on("submit",function(e){$(".modal-add-new-tab .submit").trigger("click"),e.preventDefault()}),
// Removing a tab
n.on("click",".tab-remove",function(e){var a=$(this).parents("li").eq(0),t=$("ul.tabs li").index(a),i=s.filter("."+$(a).find("a").eq(0).attr("rel"));return i.html().trim()?void $("body").prepend(EE.alert.not_empty.replace("%s",a.text())):(EE.publish_layout.splice(t,1),a.remove(),void i.remove())}),
// Saving the hide/unhide state of fields
$("div.publish form").on("click","li.hide a, li.unhide a",function(t){var i=e(),l=a(this);EE.publish_layout[i].fields[l].visible=!EE.publish_layout[i].fields[l].visible,$(this).parents("li").eq(0).toggleClass("hide unhide"),t.preventDefault()}),
// Saving the collapsed state
$(".sub-arrow").on("click",function(t){var i=e(),l=a(this);EE.publish_layout[i].fields[l].collapsed=!EE.publish_layout[i].fields[l].collapsed,t.preventDefault()}),$("div.publish form").on("submit",function(e){$('input[name="field_layout"]').val(JSON.stringify(EE.publish_layout))}),
// put debug back
$("body").append(l)});