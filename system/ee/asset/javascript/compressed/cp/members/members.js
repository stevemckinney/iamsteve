/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(e){"use strict";e(document).ready(function(){e(".modal form").on("submit",function(n){"assign"==e('input[name="heir_action"]:checked').val()&&(e('input[type="radio"][name="heir"]').length&&0==e('input[type="radio"][name="heir"]:checked').length||""==e('input[type="hidden"][name="heir"]').val())&&(e(".modal .ajax .fieldset-invalid").show(),n.preventDefault())})})}(jQuery);