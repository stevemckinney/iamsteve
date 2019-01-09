/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(e){e('div[data-input-value^="categories["]').each(function(t,a){var r=e(a).data("inputValue").replace("categories[cat_group_id_","").replace("]",""),i={createUrl:EE.categories.createUrl.replace("###",r),editUrl:EE.categories.editUrl.replace("###",r+"/###"),removeUrl:EE.categories.removeUrl,fieldUrl:EE.categories.fieldUrl.replace("###",r),onFormLoad:function(t){t.find("form").attr("action").includes("create")&&e("input[name=cat_name]",t).bind("keyup keydown",function(){e(this).ee_url_title("input[name=cat_url_title]",!0)})}};new MutableSelectField(e(a).data("inputValue"),i)})}(jQuery);