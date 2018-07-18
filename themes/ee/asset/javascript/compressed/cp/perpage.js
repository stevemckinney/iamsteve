/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
$(document).ready(function(){$('input[name="perpage"]').on("change keyup",function(e){var a=parseInt($(this).data("threshold")),n=parseInt($(this).val());if(n>=a){if(0==$("#threshold-warning").length){var t='<div id="threshold-warning" class="alert warn">';t=t+"<p>"+$(this).data("threshold-text")+"</p>",t+='<a class="close" href=""></a>',t+="</div>",$("body").prepend(t)}}else $("#threshold-warning").remove()})});