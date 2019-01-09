/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
"use strict";!function(c){c(document).ready(function(){c("input:checkbox[data-any]").on("click",function(e){"--"==c(e.target).val()?e.target.checked&&c(e.target).closest("label").siblings("ul").find("input:checkbox:checked").click():e.target.checked&&e.target.checked&&c(e.target).closest("ul.nested-list").find('input:checkbox:checked[value="--"]').click()})})}(jQuery);