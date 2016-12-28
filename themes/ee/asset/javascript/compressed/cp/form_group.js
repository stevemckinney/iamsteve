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
!function(t){"use strict";function a(t,a,e){i(t,e,a),t.toggle(a)}function e(e,i,r){e.each(function(){t(this).toggle(i),t(this).nextUntil("h2, .form-ctrls").each(function(){var e=t(this),d=e.data("group");d&&(o[d]=!i),i&&d?a(e,c[d],r):a(e,i,r)})})}function i(a,e,i){a.find(":radio").each(function(){var a=t(this);a.attr("disabled",!i);var e=a.data("el_checked");e||(e="checked"==t(this).attr("checked"),a.data("el_checked",e),a.change(function(){a.data("el_checked",a.prop("checked"))})),i&&a.prop("checked",e)})}var o={"always-hidden":!1},c={"always-hidden":!1};t(document).ready(function(){var a=t("*[data-group-toggle]:radio");i(a,"",!1),t("*[data-group-toggle]").each(function(a,e){if(!t(this).is(":radio")||t(this).is(":checked")){var i=t(this).data("groupToggle"),o=t(this).val();t.each(i,function(t,a){c[a]=!(t!=o)})}}),t("*[data-group-toggle]").each(function(a,e){if(!t(this).is(":radio")||t(this).is(":checked")){EE.cp.form_group_toggle(this);t(this).data("groupToggle")}})}),EE.cp.form_group_toggle=function(i){var r=t(i).data("groupToggle"),d=t(i).val();t.each(r,function(i,r){var n=t('*[data-group="'+r+'"]'),s=t('*[data-section-group="'+r+'"]');c[r]=i==d,a(n,!o[r]&&i==d),e(s,i==d)});var n=t(i).closest("form");n.find("fieldset.last").removeClass("last"),n.find("h2, .form-ctrls").each(function(){t(this).prevAll("fieldset:visible").first().addClass("last")})}}(jQuery);