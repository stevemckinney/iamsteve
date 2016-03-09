/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.1.0
 * @filesource
 */
$(document).ready(function(){$("fieldset :input:hidden").attr("disabled",!0),$('select[name="m_field_type"]').on("change",function(){$("fieldset :input:hidden").attr("disabled",!0),$("fieldset input[type=hidden], fieldset :input:visible").attr("disabled",!1)})});