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
$(document).ready(function(){$(".remove_size").click(function(){var e=$(this).attr("size_short_name_").substr(16),t=$(this).parent().parent();return alert(e),$.ajax({dataType:"json",data:"id="+e,url:EE.BASE+"&C=content_files&M=delete_dimension",success:function(e){"success"===e.response?($.ee_notice(EE.lang.size_deleted,{type:"success",open:!0,close_on_click:!0}),$(t).fadeOut("slow",function(){$(this).remove()})):$.ee_notice(EE.lang.size_not_deleted,{type:"error",open:!0,close_on_click:!0})}}),!1})});
=======

$(document).ready(function(){$(".remove_size").click(function(){var a=$(this).attr("size_short_name_").substr(16),b=$(this).parent().parent();alert(a);$.ajax({dataType:"json",data:"id="+a,url:EE.BASE+"&C=content_files&M=delete_dimension",success:function(a){"success"===a.response?($.ee_notice(EE.lang.size_deleted,{type:"success",open:!0,close_on_click:!0}),$(b).fadeOut("slow",function(){$(this).remove()})):$.ee_notice(EE.lang.size_not_deleted,{type:"error",open:!0,close_on_click:!0})}});return!1})});
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
