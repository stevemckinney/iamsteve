/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
"use strict";!function(t){t(document).ready(function(){t("table .toolbar .view a").click(function(e){var i=t(this).attr("rel");t.ajax({type:"GET",url:EE.file_view_url.replace("###",t(this).data("file-id")),dataType:"html",success:function(e){t("."+i+" div.box").html(e)}})})})}(jQuery);