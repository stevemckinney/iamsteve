/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
"use strict";!function(t){t(document).ready(function(){function e(a,r){t("div.box",a).html(r),EE.cp.formValidation.init(a),SelectField.renderFields(a),t("form",a).on("submit",function(){return t.ajax({type:"POST",url:this.action,data:t(this).serialize()+"&save_modal=yes",dataType:"json",success:function(t){"success"==t.messageType?a.trigger("modal:close"):e(a,t.body)}}),!1})}t("table .toolbar .settings a").click(function(a){var r=t("."+t(this).attr("rel"));t.ajax({type:"GET",url:EE.template_settings_url.replace("###",t(this).data("template-id")),dataType:"html",success:function(t){e(r,t)}})}),EE.cp.folderList.onSort("template-group",function(e){var a=t.map(t("> li",e),function(e){return t(e).data("group_name")});t.ajax({url:EE.templage_groups_reorder_url,data:{groups:a},type:"POST",dataType:"json"})})})}(jQuery);