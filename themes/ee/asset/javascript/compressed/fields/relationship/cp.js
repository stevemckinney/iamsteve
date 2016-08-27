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
"use strict";!function(e){e(document).ready(function(){function a(a,s,r){var n=e(a).closest("fieldset").find("div.col.last").eq(0),d=e(a).closest("fieldset").serialize(),c=EE.publish.field.URL+"&field_name="+e(n).find(".relate-wrap").data("field"),o=e(a).attr("name");
// Assume it's in a Grid
if(0==n.length){n=e(a).closest("td");var h=e(n).data("row-id")?e(n).data("row-id"):e(n).data("new-row-id");d=e(n).find("input").serialize()+"&column_id="+e(n).data("column-id")+"&row_id="+h,c=EE.publish.field.URL+"&field_name="+e(a).closest("table").attr("id")}s&&(d+="&channel="+s),
// Cancel the last AJAX request
clearTimeout(t),l&&l.abort(),t=setTimeout(function(){l=e.ajax({url:c,data:d,type:"POST",dataType:"json",success:function(a){e(n).html(a.html);
// Set focus back to current search field and place cursor at the end
var t=e("input[name="+o+"]",n).focus(),l=t.val();t.val(""),t.val(l),e(".w-8.relate-wrap .scroll-wrap",n).sortable(i)}})},r)}
// Single Relationship:
//   When the radio button is clicked, copy the chosen data into the
//   div.relate-wrap-chosen area
e("div.publish").on("click",".relate-wrap input:radio",function(a){var t=e(this).closest(".relate-wrap"),l=e(this).closest("label"),i=e(this).closest(".scroll-wrap").data("template").replace(/{entry-id}/g,e(this).val()).replace(/{entry-title}/g,l.data("entry-title")).replace(/{channel-title}/g,l.data("channel-title"));t.find(".relate-wrap-chosen .no-results").closest("label").hide().removeClass("block"),t.find(".relate-wrap-chosen .relate-manage").remove(),t.find(".relate-wrap-chosen").first().append(i),t.removeClass("empty")}),
// Multiple Relationships
//   When checkbox is clicked, copy the chosen data into the second
//   div.relate-wrap div.scroll-wrap area
e("div.publish").on("click",".relate-wrap input:checkbox",function(a){var t=e(this).closest(".relate-wrap").siblings(".relate-wrap").first(),l=e(this).closest("label"),i=e("<div/>").text(l.data("entry-title")).html(),s=e(this).closest(".scroll-wrap").data("template").replace(/{entry-id}/g,e(this).val()).replace(/{entry-title}/g,i).replace(/{channel-title}/g,l.data("channel-title"));
// If the checkbox was unchecked run the remove event
// If the checkbox was unchecked run the remove event
return 0==e(this).prop("checked")?void t.find(".scroll-wrap a[data-entry-id="+e(this).val()+"]").click():(t.find(".scroll-wrap .no-results").hide(),t.removeClass("empty"),t.find(".scroll-wrap").first().append(s),t.find(".scroll-wrap label").last().data("entry-title",i).data("channel-id",l.data("channel-id")).data("channel-title",l.data("channel-title")).prepend('<span class="relate-reorder"></span>'),void e(this).siblings("input:hidden").val(t.find(".scroll-wrap label").length))}),
// Removing Relationships
e("div.publish").on("click",".relate-wrap .relate-manage a",function(a){var t=e(this).closest(".relate-wrap"),l=e(this).closest(".relate-wrap");
// Is this a multiple relationship?
t.hasClass("w-8")?t=t.siblings(".relate-wrap").first():t.addClass("empty"),t.find(".scroll-wrap :checked[value="+e(this).data("entry-id")+"]").attr("checked",!1).parents(".choice").removeClass("chosen").find("input:hidden").val(0),t.find('.scroll-wrap input[type="hidden"][value='+e(this).data("entry-id")+"]").remove(),e(this).closest("label").remove(),0==l.find(".relate-manage").length&&(l.hasClass("w-8")?l.addClass("empty").find(".no-results").show():l.find(".relate-wrap-chosen .no-results").closest("label").show().removeClass("hidden").addClass("block")),a.preventDefault()});var t,l;
// Filter by Channel
e("div.publish").on("click",".relate-wrap .relate-actions .filters a[data-channel-id]",function(t){a(this,e(this).data("channel-id"),0),e(document).click(),// Trigger the code to close the menu
t.preventDefault()}),
// Search Relationships
e("div.publish").on("interact",".relate-wrap .relate-actions .relate-search",function(t){var l=e(this).closest(".relate-actions").find(".filters .has-sub .faded").data("channel-id");
// In Grids, this field got its name reset
e(this).attr("name").indexOf("search_related")!=-1?e(this).attr("name","search_related"):e(this).attr("name","search"),a(this,l,150)});
// Sortable!
var i={axis:"y",cursor:"move",handle:".relate-reorder",items:"label"};e(".w-8.relate-wrap .scroll-wrap").sortable(i),e(".publish form").on("submit",function(a){e(".w-8.relate-wrap .scroll-wrap").each(function(){var a,t=e(this).closest(".relate-wrap").siblings(".relate-wrap").first();
// Adding a new grid row will enable all the disabled sort fields
e(this).find('input:hidden[name$="[sort][]"]').attr("disabled","disabled");var l=1;e(this).find("label.relate-manage").each(function(){a=t.find('input[name$="[data][]"][value='+e(this).data("entry-id")+"]").closest("label");var i=a.find('input:hidden[name$="[sort][]"]').first();i.removeAttr("disabled"),i.val(l),l++})})})})}(jQuery);