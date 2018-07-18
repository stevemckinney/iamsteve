/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
"use strict";!function(c){c(document).ready(function(){c("input:checkbox[data-any]").on("click",function(e){"--"==c(e.target).val()?e.target.checked&&c(e.target).closest("label").siblings("ul").find("input:checkbox:checked").click():e.target.checked&&e.target.checked&&c(e.target).closest("ul.nested-list").find('input:checkbox:checked[value="--"]').click()})})}(jQuery);