/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
"use strict";!function(i){i(document).ready(function(){EE.filePickerCallback=function(i,e){var a=e.input_value;if(0==a.size()&&(a=e.source.parents(".markItUpContainer").find("textarea.markItUpEditor")),e.modal.find(".m-close").click(),file_string="{filedir_"+i.upload_location_id+"}"+i.file_name,i.isImage){var t='<img src="'+file_string+'"';t+=' alt=""',i.file_hw_original&&(dimensions=i.file_hw_original.split(" "),t=t+' height="'+dimensions[0]+'" width="'+dimensions[1]+'"'),t+=">",a.insertAtCursor(t)}else a.insertAtCursor('<a href="'+file_string+'">'+i.file_name+"</a>")},setTimeout(function(){i(".textarea-field-filepicker, li.html-upload").FilePicker({callback:EE.filePickerCallback})},1e3),i(".tbl-wrap table").on("grid:addRow",function(e,a){i(a).find(".grid-textarea").each(function(){var e=i(this).find("textarea").attr("name");i(this).find(".textarea-field-filepicker, li.html-upload").attr("data-input-value",e)}),i(a).find(".textarea-field-filepicker, li.html-upload").FilePicker({callback:EE.filePickerCallback})})})}(jQuery);