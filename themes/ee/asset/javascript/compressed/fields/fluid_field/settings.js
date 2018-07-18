/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2018, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
"use strict";!function(e){e(document).ready(function(){e(".modal-remove-field input.btn").on("click",function(t){t.preventDefault(),e(".form-standard form").off("submit"),e("button[type=submit][value=save]").click()}),e(".form-standard form").on("submit",function(t){for(var i,n=EE.fields.fluid_field.fields,o=!1,f=0,d=n.length;f<d;f++)if(i=e('[name="field_channel_fields[]"][value="'+n[f]+'"]'),0==i.size()||"checkbox"==i.attr("type")&&0==i.prop("checked")){o=!0;break}o&&(t.preventDefault(),e(".modal-remove-field input.btn").attr("disabled",!1),e(".modal-remove-field").trigger("modal:open"))})})}(jQuery);