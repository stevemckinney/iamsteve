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
/*!
 * ExpressionEngine Custom Interact jQuery Event
 *
 * @package		ExpressionEngine
 * @subpackage	Control Panel
 * @category	Control Panel
 * @author		EllisLab Dev Team
 * @link		https://ellislab.com
 */
!function(t){function e(e,a){return t(e).map(function(){return this.elements?t.makeArray(this.elements):this}).filter(function(){return this.name}).map(a)}function a(t){if(jQuery.nodeName(t,"textarea"))return!0;if(!jQuery.nodeName(t,"input"))return!1;var e=t.type;return!e||("text"==e||"password"==e||"search"==e||"url"==e||"email"==e||"tel"==e)}function i(e,a,i){i=i||0,setTimeout(function(){var i=t.data(e,"_interact_cache"),n=e.value;i!==n&&(t.event.trigger("interact",a,e),t.data(e,"_interact_cache",n))},i)}var n={};t.event.special.interact={add:function(c){if(void 0===c.selector){if(t.nodeName(this,"form"))return void e(this,function(){t.event.special.interact.add.call(this,c)});if(a(this))return t.data(this,"_interact_cache",this.value),t.event.add(this,"keyup.specialInteract change.specialInteract",function(){i(this,c.data)}),void t.event.add(this,"input.specialInteract cut.specialInteract paste.specialInteract",function(){i(this,c.data,25)});t.event.add(this,"change.specialInteract",function(){t.event.trigger("interact",c.data,this)})}else n[this]=c,t.event.add(this,"keyup.specialInteract change.specialInteract input.specialInteract cut.specialInteract paste.specialInteract",function(e){t(this).find(n[this].selector).has(e.target)&&(a(e.target)?(t.data(this,"_interact_cache",this.value),t.inArray(e.type,["input","cut","paste"])?i(e.target,n[this].data,25):i(e.target,n[this].data)):t.event.trigger("interact",n[this].data,e.target))})},remove:function(e){delete n[this],t(this).unbind(".specialInteract")}}}(jQuery);