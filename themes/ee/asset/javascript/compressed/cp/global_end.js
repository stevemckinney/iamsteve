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
!function(t){"use strict";t("table").each(function(){var a;t(this).data("table_config")&&(a=t(this).data("table_config"),t.isPlainObject(a)||(a=t.parseJSON(a)),t(this).table(a)),jQuery().toggle_all&&t(this).toggle_all()})}(jQuery);