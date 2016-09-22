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
/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: false, strict: true, newcap: true, immed: true */
/*global $, jQuery, EE, window, document, console, alert */
"use strict";function loadSettingsModal(t,e){$("div.box",t).html(e),
// Bind validation
EE.cp.formValidation.init(t),$("form",t).on("submit",function(){return $.ajax({type:"POST",url:this.action,data:$(this).serialize()+"&save_modal=yes",dataType:"json",success:function(e){"success"==e.messageType?t.trigger("modal:close"):loadSettingsModal(t,e.body)}}),!1})}!function(t){var e=function(e,a){var i=t("."+a.rel),n=function(t){var e={modal:i,input_value:a.input_value,input_name:a.input_name,input_img:a.input_img,source:a.source};a.callback(t,e)};t.get(e,function(t){if(i.find("div.box").html(t),"undefined"!=typeof a.selected){var e=i.find('tbody *[data-id="'+a.selected+'"]');e.addClass("selected"),"A"==e.prop("tagName")?e.parents("td").addClass("selected"):e.parents("tr").addClass("selected")}}),t(".modal-file").off("click",".filepicker-item, tbody > tr:not(.tbl-action)"),t(".modal-file").on("click",".filepicker-item, tbody > tr:not(.tbl-action)",function(e){if(t(e.target).is("a[rel=external]"))return!0;e.stopPropagation();var l=t(this).data("id"),s=t(this).data("url"),r=t(this);r.data("selected",l),i.find("tbody .selected").toggleClass("selected"),a.selected=l,a.source.data("selected",l);var o=t(this);"A"==o.prop("tagName")?o.parents("td").addClass("selected"):o.parents("tr").addClass("selected"),a.ajax===!1?n(t(this)):t.ajax({url:s,success:function(t){n(t)},dataType:"json"})}),t(".modal-file").on("click",'.filters a:not([href=""]), .paginate a:not([href=""]), thead a:not([href=""])',function(e){e.preventDefault();var i=t(this).attr("href");t(this).parents("div.box").load(i),(t(a.source).hasClass("markItUpButton")||t(a.source).hasClass("rte-upload"))&&t('.publish .toolbar.rte li.m-link[rel="modal-file"], .publish .toolbar.html-btns li.m-link[rel="modal-file"]').attr("href",i)}),
// Capture form submission
t(".modal-file").on("submit","form",function(e){var a=t(this).attr("action"),i=t("input[name=search], input[name=perpage]",this);
// Only do this if we're on the file listing screen
0!=i.size()&&(e.preventDefault(),t(this).parents("div.box").load(a+"&"+i.serialize()))}),t(".modal-file").on("click",".tbl-action .action",function(e){e.preventDefault(),t("div.box",i).html("<iframe></iframe>");var a=t("iframe",i);a.css("border","none"),a.css("width","100%");
// bind an unload event on the frame that hides it
// this prevents a flash of json when uploading
var l=function(){t(a[0].contentWindow).on("unload",function(){a.hide()})};a.load(function(e){var s=t(this).contents().find("body");t(s).find("pre").length&&(s=t(s).find("pre")),s=s.html();try{s=JSON.parse(s),n(s)}catch(e){a.show(),l();var r=t(this).contents().find("body").height();t(".box",i).height(r),t(this).height(r)}}),a.attr("src",t(this).attr("href")),l()})};t.fn.FilePicker=function(a){return this.off("click"),this.each(function(){t(this).on("click",function(){var i={};
// Duplicate the defaults object
for(var n in a)i[n]=a[n];i.url=t(this).attr("href"),i.rel=t(this).attr("rel"),i.source=t(this),i.input_value?i.input_value=t(i.input_value):i.input_value=t('input[name="'+t(this).data("input-value")+'"], textarea[name="'+t(this).data("input-value")+'"]'),i.input_name?i.input_name=t(i.input_name):i.input_name=t("#"+t(this).data("input-name")),i.input_img?i.input_img=t(i.input_img):i.input_img=t("#"+t(this).data("input-image")),"selected"in i||(i.selected=t(this).data("selected")),e(i.url,i)})})},t(document).ready(function(){t(".filepicker").click(function(a){var i=(t("."+t(this).attr("rel")),{source:t(this),input_value:t('input[name="'+t(this).data("input-value")+'"], textarea[name="'+t(this).data("input-value")+'"]'),input_name:t("#"+t(this).data("input-name")),input_img:t("#"+t(this).data("input-image")),selected:t(this).data("selected"),url:t(this).attr("href"),rel:t(this).attr("rel")}),n=t(this).data("callback");t(this);"undefined"!=typeof n&&0!==n.length?i.callback=function(t,e){for(var a=[t,e],i=n.split("."),l=i.pop(),s=window,r=0;r<i.length;r++)s=s[i[r]];return s[l].apply(this,a)}:i.callback=function(t,e){e.modal.find(".m-close").click(),e.input_value.val(t.file_id),e.input_name.html(t.file_name),e.input_img.html("<img src='"+t.path+"' />")},e(i.url,i)})})}(jQuery);