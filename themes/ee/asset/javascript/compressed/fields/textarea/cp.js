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
"use strict";!function(i){i(document).ready(function(){i(".textarea-field-filepicker").FilePicker({callback:function(i,e){var n=e.input_value;
// Output as image tag if image
if(
// Close the modal
e.modal.find(".m-close").click(),
// Assign the value {filedir_#}filename.ext
file_string="{filedir_"+i.upload_location_id+"}"+i.file_name,i.isImage){var l='<img src="'+file_string+'"';l+=' alt=""',i.file_hw_original&&(dimensions=i.file_hw_original.split(" "),l=l+' height="'+dimensions[0]+'" width="'+dimensions[1]+'"'),l+=">",n.insertAtCursor(l)}else
// Output link if non-image
n.insertAtCursor('<a href="'+file_string+'">'+i.file_name+"</a>")}})})}(jQuery);