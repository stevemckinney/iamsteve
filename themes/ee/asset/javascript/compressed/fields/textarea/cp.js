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
"use strict";!function(i){i(document).ready(function(){
// Need to make sure this is loaded after markItUp has added the image button :-/
setTimeout(function(){i(".textarea-field-filepicker, li.html-upload").FilePicker({callback:function(i,e){var t=e.input_value;
// Output as image tag if image
if(
// May be a markItUp button
0==t.size()&&(t=e.source.parents(".markItUpContainer").find("textarea.markItUpEditor")),
// Close the modal
e.modal.find(".m-close").click(),
// Assign the value {filedir_#}filename.ext
file_string="{filedir_"+i.upload_location_id+"}"+i.file_name,i.isImage){var n='<img src="'+file_string+'"';n+=' alt=""',i.file_hw_original&&(dimensions=i.file_hw_original.split(" "),n=n+' height="'+dimensions[0]+'" width="'+dimensions[1]+'"'),n+=">",t.insertAtCursor(n)}else
// Output link if non-image
t.insertAtCursor('<a href="'+file_string+'">'+i.file_name+"</a>")}})},1e3)})}(jQuery);