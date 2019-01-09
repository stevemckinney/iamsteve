/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
$(document).ready(function(){var n=function(t){var o=$(".modal-confirm-new-version"),e=t.target;t.preventDefault(),o.trigger("modal:open"),$(".modal input.btn").one("click",function(t){t.preventDefault(),o.trigger("modal:close"),$("form").off("submit",n),$('button[name="submit"]').off("click",n),$(e).click()})};$("form").on("submit",n),$('button[name="submit"]').on("click",n)});