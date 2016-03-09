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
"use strict";!function(i){i(document).ready(function(){function e(e){i(".file-field-filepicker",e).FilePicker({callback:function(i,e){var n=e.input_value;
// Close the modal
e.modal.find(".m-close").click(),
// Assign the value {filedir_#}filename.ext
n.val("{filedir_"+i.upload_location_id+"}"+i.file_name),i.isImage?(
// Set the thumbnail
e.input_img.show(),e.input_img.removeClass("hidden"),e.input_img.attr("src",i.thumb_path),n.siblings("figure").find(".toolbar .txt-only").remove(),n.siblings("figure").removeClass("no-image")):(n.siblings("figure").addClass("no-image"),e.input_img.hide(),n.siblings("figure").find(".toolbar").prepend('<li class="txt-only"><a href="#"><b>'+i.title+"</b></a></li>")),
// Show the figure
n.siblings("figure").show(),
// Hide the upload button
n.siblings("p.solo-btn").hide(),
// Hide the "missing file" error
n.siblings("em").hide()}}),i("li.remove a").click(function(e){var n=i(this).closest("figure");n.hide(),n.siblings("em").hide(),// Hide the "missing file" erorr
n.siblings('input[type="hidden"]').val(""),n.siblings("p.solo-btn").show(),e.preventDefault()})}e(),Grid.bind("file","display",function(n){var l=i(".file-field-filepicker",n),t=i('input[type="hidden"]',n),a=t.attr("name").replace(/[\[\]']+/g,"_");l.attr("data-input-value",t.attr("name")),l.attr("data-input-image",a),i(".file-chosen img",n).attr("id",a),e(n)})})}(jQuery);