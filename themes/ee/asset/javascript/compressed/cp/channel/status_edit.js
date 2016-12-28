/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.4.0
 * @filesource
 */
!function(t){"use strict";t(document).ready(function(){var o=t(".status-tag");t('input[name="status"]').on("keyup",function(n){var s=t(this).val()?t(this).val():EE.status.default_name;o.text(s)}),t("input.color-picker").minicolors({changeDelay:200,change:function(n,s){o.css("background-color",n).css("border-color",n),t.post(EE.status.foreground_color_url,{highlight:n},function(t){o.css("color","#"+t)},"json")}})})}(jQuery);