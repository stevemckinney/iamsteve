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
"use strict";!function(i){i(document).ready(function(){function e(e){i(".file-field-filepicker",e).FilePicker({callback:function(i,e){var l=e.input_value,n=e.input_img.closest("figure"),a=e.input_img.closest(".fields-upload-chosen-file").next(".fields-upload-chosen-name");e.modal.find(".m-close").click(),l.val("{filedir_"+i.upload_location_id+"}"+i.file_name).trigger("change"),n.toggleClass("no-img",!i.isImage),n.find("img").toggleClass("hidden",!i.isImage),i.isImage&&e.input_img.attr("src",i.thumb_path),a.html("<p><b>"+i.title+"</b></p>"),l.siblings(".fields-upload-chosen").removeClass("hidden"),l.siblings(".fields-upload-btn").addClass("hidden"),l.siblings("em").remove()}}),i("li.remove a").click(function(e){var l=i(this).closest(".fields-upload-chosen");l.addClass("hidden"),l.siblings("em").remove(),l.siblings('input[type="hidden"]').val("").trigger("change"),l.siblings(".fields-upload-btn").removeClass("hidden"),e.preventDefault()})}e(),Grid.bind("file","display",function(l){var n=i(".file-field-filepicker",l),a=i('input[type="hidden"]',l),t=a.attr("name").replace(/[\[\]']+/g,"_");n.attr("data-input-value",a.attr("name")),n.attr("data-input-image",t),i(".fields-upload-chosen img",l).attr("id",t),e(l)})})}(jQuery);