/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
"use strict";!function(t){t(document).ready(function(){t("table .toolbar .view a").click(function(e){var i=t(this).attr("rel");t.ajax({type:"GET",url:EE.file_view_url.replace("###",t(this).data("file-id")),dataType:"html",success:function(e){t("."+i+" div.box").html(e)}})})})}(jQuery);