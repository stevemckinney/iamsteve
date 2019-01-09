/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(t){"use strict";t(window).bind("onload",function(){t("input.btn").removeClass("work")}),t(document).ready(function(){t("form").submit(function(n){var o=t("input.btn",this);o.addClass("work"),""!=o.data("work-text")&&o.attr("value",o.data("work-text"))})})}(jQuery);