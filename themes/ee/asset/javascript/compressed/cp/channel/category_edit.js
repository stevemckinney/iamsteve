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
"use strict";!function(i){EE.cp.categoryEdit={init:function(e){var e=e||i("body"),t=i("input[name=cat_image_select]",e).parent(),a=i("input[name=cat_image]",e),n=a.parents("figure");""==a.attr("value")?n.hide():t.hide(),i("input[value=choose], li.edit a",e).addClass("m-link").attr("rel","modal-file").attr("href",EE.category_edit.filepicker_url).FilePicker({callback:function(e,l){l.modal.find(".m-close").click(),a.val("{filedir_"+e.upload_location_id+"}"+e.file_name),i("img",n).attr("src",e.path),a.parents("figure").show(),t.hide(),a.siblings("em").hide()}}),i("li.remove a",e).click(function(a){var n=i(this).parents("figure");n.hide(),n.siblings("em").hide(),n.find('input[type="hidden"]').val(""),a.preventDefault(),i("input[value=none]",e).click(),t.show()})}}}(jQuery);