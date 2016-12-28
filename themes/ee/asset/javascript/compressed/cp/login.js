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
!function(t){"use strict";t(window).bind("onload",function(){t("input.btn").removeClass("work")}),t(document).ready(function(){t("form").submit(function(n){var o=t("input.btn",this);o.addClass("work"),""!=o.data("work-text")&&o.attr("value",o.data("work-text"))})})}(jQuery);