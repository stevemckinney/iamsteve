/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
/* This file exposes three callback functions:
 *
 * EE.manager.showPrefsRow and EE.manager.hidePrefsRow and
 * EE.manager.refreshPrefs
 */
/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: false, strict: true, newcap: true, immed: true */
/*global $, jQuery, EE, window, document, console, alert */
"use strict";!function(t){t(document).ready(function(){function a(e,o){t("div.box",e).html(o),
// Bind validation
EE.cp.formValidation.init(e),t("form",e).on("submit",function(){return t.ajax({type:"POST",url:this.action,data:t(this).serialize()+"&save_modal=yes",dataType:"json",success:function(t){"success"==t.messageType?e.trigger("modal:close"):a(e,t.body)}}),!1})}t("table .toolbar .settings a").click(function(e){var o=t("."+t(this).attr("rel"));t.ajax({type:"GET",url:EE.template_settings_url.replace("###",t(this).data("template-id")),dataType:"html",success:function(t){a(o,t)}})}),
// Reorder template groups
EE.cp.folderList.onSort("template-group",function(a){
// Create an array of template group names
var e=t.map(t("> li",a),function(a){return t(a).data("group_name")});t.ajax({url:EE.templage_groups_reorder_url,data:{groups:e},type:"POST",dataType:"json"})})})}(jQuery);