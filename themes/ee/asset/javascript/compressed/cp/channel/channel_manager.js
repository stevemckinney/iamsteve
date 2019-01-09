/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(e){new MutableSelectField("field_groups",EE.channelManager.fieldGroup);var n={onFormLoad:function(n){FieldManager.fireEvent("fieldModalDisplay",n),EE.cp.fieldToggleDisable(n),e("input[name=field_label]",n).bind("keyup keydown",function(){e(this).ee_url_title("input[name=field_name]",!0)})}};new MutableSelectField("custom_fields",Object.assign(EE.channelManager.fields,n)),new MutableSelectField("cat_group",EE.channelManager.catGroup);var n={onFormLoad:function(n){var a=e(".status-tag",n);e('input[name="status"]',n).on("keyup",function(n){var t=e(this).val()?e(this).val():EE.status.default_name;a.text(t)}),e("input.color-picker",n).minicolors({changeDelay:200,change:function(n,t){a.css("background-color",n).css("border-color",n),e.post(EE.status.foreground_color_url,{highlight:n},function(e){a.css("color","#"+e)},"json")}})}};new MutableSelectField("statuses",Object.assign(EE.channelManager.statuses,n))}(jQuery);