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
"use strict";function updateVocabulary(a){var t=$(a).attr("href");$.ajax({url:t+"&method=updatevocab",success:function(t){"finished"!==t.status?($(a).html(t.message),updateVocabulary(a)):updateParameters(a)},dataType:"json"})}function updateParameters(a){var t=$(a).attr("href");$.ajax({url:t+"&method=updateparams",success:function(t){"finished"!==t.status?($(a).html(t.message),updateParameters(a)):($(a).html(t.finished),$(a).toggleClass("work"))},dataType:"json"})}!function(a){a(".spam-detail").on("click",function(t){var e="."+a(this).attr("rel"),s=a(document).height();a(".overlay").fadeIn("slow").css("height",s),a(".modal-wrap"+e).fadeIn("slow"),t.preventDefault(),a("#top").animate({scrollTop:0},100),e=a(e),e.find(".date").html(a(this).data("date")),e.find(".ip").html(a(this).data("ip")),e.find(".content").html(a(this).data("content"))}),a(".update").on("click",function(t){t.preventDefault();var e=this,s=a(this).attr("href");a(e).toggleClass("work"),a.ajax({url:s+"&method=download",success:function(t){"success"in t&&(a(e).html(t.success),a.ajax({url:s+"&method=prepare",success:function(a){"success"in a&&updateVocabulary(e)},dataType:"json"})),"error"in t&&(0==a("body > .banner").size()&&a("body").prepend(EE.alert.download_ajax_fail.replace("%s",t.error)),a(e).removeClass("work"))},dataType:"json"})})}(jQuery);