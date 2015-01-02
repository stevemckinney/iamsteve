/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
<<<<<<< HEAD
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
=======
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
<<<<<<< HEAD
$(document).ready(function(){$("select[name=upload_dirs]").change(function(){var e=$(this).val();$.ajax({url:EE.BASE+"&C=content_files&M=get_dir_cats",type:"POST",data:{XID:EE.XID,upload_directory_id:e},success:function(e){if(e.error===!0)return void $("#file_cats").html("");var t='<fieldset class="holder">'+e+"</fieldset>";$("#file_cats").html(t),$("#file_cats").find(".edit_categories_link").hide()},error:function(){$("#file_cats").html("")}})})});
=======

$(document).ready(function(){$("select[name=upload_dirs]").change(function(){var b=$(this).val();$.ajax({url:EE.BASE+"&C=content_files&M=get_dir_cats",type:"POST",data:{XID:EE.XID,upload_directory_id:b},success:function(a){!0===a.error?$("#file_cats").html(""):($("#file_cats").html('<fieldset class="holder">'+a+"</fieldset>"),$("#file_cats").find(".edit_categories_link").hide())},error:function(){$("#file_cats").html("")}})})});
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
