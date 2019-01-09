/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(t){"use strict";t("table").each(function(){var a;t(this).data("table_config")&&(a=t(this).data("table_config"),t.isPlainObject(a)||(a=t.parseJSON(a)),t(this).table(a)),jQuery().toggle_all&&t(this).toggle_all()})}(jQuery);