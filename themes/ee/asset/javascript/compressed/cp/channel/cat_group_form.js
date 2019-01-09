/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(e){var i={onFormLoad:function(i){FieldManager.fireEvent("fieldModalDisplay",i),EE.cp.fieldToggleDisable(i),""==e("input[name=field_name]").val()&&e("input[name=field_label]",i).bind("keyup keydown",function(){e(this).ee_url_title("input[name=field_name]",!0)})}};new MutableSelectField("category_fields",Object.assign(EE.categoryField,i))}(jQuery);