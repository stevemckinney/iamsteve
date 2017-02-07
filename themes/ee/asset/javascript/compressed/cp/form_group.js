/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
!function(e){"use strict";function t(t,a,o){i(t,o,a),t.toggle(a),t.each(function(t,a){var i=e(a).closest("fieldset");i.hasClass("invalid")&&0==i.find("input:visible").not("input.btn").size()&&(i.removeClass("invalid"),i.find("em.ee-form-error-message").remove())})}function a(a,i,n){a.each(function(){e(this).toggle(i),e(this).nextUntil("h2, .form-ctrls").each(function(){var a=e(this),s=a.data("group");s&&(o[s]=!i),i&&s?t(a,c[s],n):t(a,i,n)})})}function i(t,a,i){t.find(":radio").each(function(){var t=e(this);t.attr("disabled",!i);var a=t.data("el_checked");a||(a="checked"==e(this).attr("checked"),t.data("el_checked",a),t.change(function(){t.data("el_checked",t.prop("checked"))})),i&&t.prop("checked",a)})}var o={"always-hidden":!1},c={"always-hidden":!1};e(document).ready(function(){var t=e("*[data-group-toggle]:radio");i(t,"",!1),e("*[data-group-toggle]").each(function(t,a){if(!e(this).is(":radio")||e(this).is(":checked")){var i=e(this).data("groupToggle"),o=e(this).val();e.each(i,function(e,t){(void 0==c[t]||0==c[t])&&(c[t]=!(e!=o))})}}),e("*[data-group-toggle]").each(function(t,a){if(!e(this).is(":radio")||e(this).is(":checked")){EE.cp.form_group_toggle(this);e(this).data("groupToggle")}})}),EE.cp.form_group_toggle=function(i){var n=e(i).data("groupToggle"),s=e(i).val();c={"always-hidden":!1};var d=function(i,n){var d=e('*[data-group="'+n+'"]'),r=e('*[data-section-group="'+n+'"]');(void 0==c[n]||0==c[n])&&(c[n]=i==s),t(d,o[n]?!1:i==s),a(r,c[n])};e.each(n,function(e,t){e!=s&&d(e,t)}),d(s,n[s]);var r=e(i).closest("form");r.find("fieldset.last").not(".grid-wrap fieldset").removeClass("last"),r.find("h2, .form-ctrls").each(function(){e(this).prevAll("fieldset:visible").first().addClass("last")})}}(jQuery);