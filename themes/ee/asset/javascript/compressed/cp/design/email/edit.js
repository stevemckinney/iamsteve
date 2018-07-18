/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
"use strict";$(document).ready(function(){$(".tab .arrow-list li a").on("click",function(e){var t=$('textarea[name="template_data"]'),a=t.data("codemirror.editor");a.replaceSelection($(this).text()),a.refresh(),e.preventDefault()})});