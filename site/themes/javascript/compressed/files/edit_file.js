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
 * @since		Version 2.4
 * @filesource
 */
<<<<<<< HEAD
var EE=EE||{};EE.publish=EE.publish||{},EE.publish.edit_file=EE.publish.edit_file||{},function(e){EE.publish.edit_file.reset_tabs=function(){e(".panel-menu li").removeClass("current").filter(":first").addClass("current"),e(".panels > div").removeClass("current").filter(":first").addClass("current")},EE.publish.edit_file.change_tabs=function(){EE.publish.edit_file.reset_tabs(),e(".panel-menu li a").click(function(i){var t=e(this).data("panel");e(".panels").children().hide().removeClass("current").filter("#"+t).show().addClass("current"),e(this).parent().addClass("current").siblings().removeClass("current"),i.preventDefault()})},EE.publish.edit_file.change_tabs(),EE.publish.edit_file.image_tool_select=function(){e("#image_tools input[name=image_tool]").click(function(){e(this).parent().parent().siblings().find("div").slideUp(),e(this).parent().siblings("div").slideDown(),"resize"!=e(this).val()&&(e("#resize_height").val(EE.filemanager.image_height),e("#resize_width").val(EE.filemanager.image_width)),e("input[name=action]").val(e(this).val())})},EE.publish.edit_file.image_tool_select(),e("form#edit_file_metadata").resize_scale({cancel_resize:"#cancel_resize",default_height:EE.filemanager.image_height,default_width:EE.filemanager.image_width})}(jQuery);
=======

var EE=EE||{};EE.publish=EE.publish||{};EE.publish.edit_file=EE.publish.edit_file||{};
(function(a){EE.publish.edit_file.reset_tabs=function(){a(".panel-menu li").removeClass("current").filter(":first").addClass("current");a(".panels > div").removeClass("current").filter(":first").addClass("current")};EE.publish.edit_file.change_tabs=function(){EE.publish.edit_file.reset_tabs();a(".panel-menu li a").click(function(b){var c=a(this).data("panel");a(".panels").children().hide().removeClass("current").filter("#"+c).show().addClass("current");a(this).parent().addClass("current").siblings().removeClass("current");
b.preventDefault()})};EE.publish.edit_file.change_tabs();EE.publish.edit_file.image_tool_select=function(){a("#image_tools input[name=image_tool]").click(function(){a(this).parent().parent().siblings().find("div").slideUp();a(this).parent().siblings("div").slideDown();"resize"!=a(this).val()&&(a("#resize_height").val(EE.filemanager.image_height),a("#resize_width").val(EE.filemanager.image_width));a("input[name=action]").val(a(this).val())})};EE.publish.edit_file.image_tool_select();a("form#edit_file_metadata").resize_scale({cancel_resize:"#cancel_resize",
default_height:EE.filemanager.image_height,default_width:EE.filemanager.image_width})})(jQuery);
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
