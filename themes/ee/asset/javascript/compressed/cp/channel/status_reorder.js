/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
!function(e){"use strict";e(document).ready(function(){e("table").eeTableReorder({afterSort:function(r){e.ajax({url:EE.statuses.reorder_url,data:{order:e('input[name="order[]"]').serialize()},type:"POST",dataType:"json",error:function(r,a,t){0==e("body > .banner").size()&&e("body").prepend(EE.alert.reorder_ajax_fail)}})}})})}(jQuery);