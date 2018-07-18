/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
"use strict";!function(e){EE.cp.categoryEdit={init:function(i){var i=i||e("body"),t=e("input[name=cat_image_select]",i).parent(),a=e("input[name=cat_image]",i),l=a.parents("figure");""==a.attr("value")?l.hide():t.hide(),e("fieldset input[value=choose], fieldset li.edit a",i).addClass("m-link").attr("rel","modal-file").attr("href",EE.category_edit.filepicker_url).FilePicker({callback:function(i,n){n.modal.find(".m-close").click(),a.val("{filedir_"+i.upload_location_id+"}"+i.file_name),e("img",l).attr("src",i.path),a.parents("figure").show(),t.hide(),a.siblings("em").hide()}}),e("li.remove a",i).click(function(a){var l=e(this).parents("figure");l.hide(),l.siblings("em").hide(),l.find('input[type="hidden"]').val(""),a.preventDefault(),e("input[value=none]",i).click(),t.show()})}}}(jQuery);