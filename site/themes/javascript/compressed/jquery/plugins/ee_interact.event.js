/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
<<<<<<< HEAD
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
=======
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
<<<<<<< HEAD
!function(t){function e(e,n){return t(e).map(function(){return this.elements?t.makeArray(this.elements):this}).filter(function(){return this.name}).map(n)}function n(t){if(jQuery.nodeName(t,"textarea"))return!0;if(!jQuery.nodeName(t,"input"))return!1;var e=t.type;return e?"text"==e||"password"==e||"search"==e||"url"==e||"email"==e||"tel"==e?!0:!1:!0}function i(e,n,i){i=i||0,setTimeout(function(){var i=t.data(e,"_interact_cache"),a=e.value;i!==a&&(t.event.trigger("interact",n,e),t.data(e,"_interact_cache",a))},i)}t.event.special.interact={setup:function(a,c){return t.nodeName(this,"form")?void e(this,function(){t.event.special.interact.setup.call(this,a,c)}):n(this)?(t.data(this,"_interact_cache",this.value),t.event.add(this,"keyup.specialInteract change.specialInteract",function(){i(this,a)}),void t.event.add(this,"input.specialInteract cut.specialInteract paste.specialInteract",function(){i(this,a,25)})):void t.event.add(this,"change.specialInteract",function(){t.event.trigger("interact",a,this)})},teardown:function(){t(this).unbind(".specialInteract")}}}(jQuery);
=======

(function(b){function f(a,d){return b(a).map(function(){return this.elements?b.makeArray(this.elements):this}).filter(function(){return this.name}).map(d)}function g(a){if(jQuery.nodeName(a,"textarea"))return!0;if(!jQuery.nodeName(a,"input"))return!1;a=a.type;return!a||"text"==a||"password"==a||"search"==a||"url"==a||"email"==a||"tel"==a?!0:!1}function c(a,d,c){setTimeout(function(){var c=b.data(a,"_interact_cache"),e=a.value;c!==e&&(b.event.trigger("interact",d,a),b.data(a,"_interact_cache",e))},
c||0)}b.event.special.interact={setup:function(a,d){b.nodeName(this,"form")?f(this,function(){b.event.special.interact.setup.call(this,a,d)}):g(this)?(b.data(this,"_interact_cache",this.value),b.event.add(this,"keyup.specialInteract change.specialInteract",function(){c(this,a)}),b.event.add(this,"input.specialInteract cut.specialInteract paste.specialInteract",function(){c(this,a,25)})):b.event.add(this,"change.specialInteract",function(){b.event.trigger("interact",a,this)})},teardown:function(){b(this).unbind(".specialInteract")}}})(jQuery);
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
