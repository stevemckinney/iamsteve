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
EE.cp.formValidation.init(t),$("form",t).on("submit",function(){return $.ajax({type:"POST",url:this.action,data:$(this).serialize()+"&save_modal=yes",dataType:"json",success:function(e){"success"==e.messageType?t.trigger("modal:close"):loadSettingsModal(t,e.body)}}),!1})}!function(t){var e=function(e,i){var a=t("."+i.rel),n=function(t){var e={modal:a,input_value:i.input_value,input_name:i.input_name,input_img:i.input_img,source:i.source};i.callback(t,e)};t.get(e,function(t){if(a.find("div.box").html(t),"undefined"!=typeof i.selected){var e=a.find('tbody *[data-id="'+i.selected+'"]');e.addClass("selected"),"A"==e.prop("tagName")?e.parents("td").addClass("selected"):e.parents("tr").addClass("selected")}}),t(".modal-file").off("click",".filepicker-item, tbody > tr"),t(".modal-file").on("click",".filepicker-item, tbody > tr:not(.tbl-action)",function(e){e.stopPropagation();var l=t(this).data("id"),s=t(this).data("url"),r=t(this);r.data("selected",l),a.find("tbody .selected").toggleClass("selected"),i.selected=l,i.source.data("selected",l);var o=t(this);"A"==o.prop("tagName")?o.parents("td").addClass("selected"):o.parents("tr").addClass("selected"),i.ajax===!1?n(t(this)):t.ajax({url:s,success:function(t){n(t)},dataType:"json"})}),t(".modal-file").on("click",'.filters a:not([href=""]), .paginate a:not([href=""]), thead a:not([href=""])',function(e){e.preventDefault();var a=t(this).attr("href");t(this).parents("div.box").load(a),(t(i.source).hasClass("markItUpButton")||t(i.source).hasClass("rte-upload"))&&t('.publish .toolbar.rte li.m-link[rel="modal-file"], .publish .toolbar.html-btns li.m-link[rel="modal-file"]').attr("href",a)}),
// Capture form submission
t(".modal-file").on("submit","form",function(e){var i=t(this).attr("action"),a=t("input[name=search], input[name=perpage]",this);
// Only do this if we're on the file listing screen
0!=a.size()&&(e.preventDefault(),t(this).parents("div.box").load(i+"&"+a.serialize()))}),t(".modal-file").on("click",".tbl-action .action",function(e){e.preventDefault(),t("div.box",a).html("<iframe></iframe>");var i=t("iframe",a);i.css("border","none"),i.css("width","100%");
// bind an unload event on the frame that hides it
// this prevents a flash of json when uploading
var l=function(){t(i[0].contentWindow).on("unload",function(){i.hide()})};i.load(function(e){var s=t(this).contents().find("body");t(s).find("pre").length&&(s=t(s).find("pre")),s=s.html();try{s=JSON.parse(s),n(s)}catch(e){i.show(),l();var r=t(this).contents().find("body").height();t(".box",a).height(r),t(this).height(r)}}),i.attr("src",t(this).attr("href")),l()})};t.fn.FilePicker=function(i){return this.off("click"),this.each(function(){t(this).on("click",function(){var a={};
// Duplicate the defaults object
for(var n in i)a[n]=i[n];a.url=t(this).attr("href"),a.rel=t(this).attr("rel"),a.source=t(this),a.input_value?a.input_value=t(a.input_value):a.input_value=t('input[name="'+t(this).data("input-value")+'"], textarea[name="'+t(this).data("input-value")+'"]'),a.input_name?a.input_name=t(a.input_name):a.input_name=t("#"+t(this).data("input-name")),a.input_img?a.input_img=t(a.input_img):a.input_img=t("#"+t(this).data("input-image")),"selected"in a||(a.selected=t(this).data("selected")),e(a.url,a)})})},t(document).ready(function(){t(".filepicker").click(function(i){var a=(t("."+t(this).attr("rel")),{source:t(this),input_value:t('input[name="'+t(this).data("input-value")+'"], textarea[name="'+t(this).data("input-value")+'"]'),input_name:t("#"+t(this).data("input-name")),input_img:t("#"+t(this).data("input-image")),selected:t(this).data("selected"),url:t(this).attr("href"),rel:t(this).attr("rel")}),n=t(this).data("callback");t(this);"undefined"!=typeof n&&0!==n.length?a.callback=function(t,e){for(var i=[t,e],a=n.split("."),l=a.pop(),s=window,r=0;r<a.length;r++)s=s[a[r]];return s[l].apply(this,i)}:a.callback=function(t,e){e.modal.find(".m-close").click(),e.input_value.val(t.file_id),e.input_name.html(t.file_name),e.input_img.html("<img src='"+t.path+"' />")},e(a.url,a)})})}(jQuery);