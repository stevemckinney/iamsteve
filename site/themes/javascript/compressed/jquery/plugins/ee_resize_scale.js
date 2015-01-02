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
!function(e){var i={resize_width:"#resize_width",resize_height:"#resize_height",submit_resize:"",cancel_resize:"",oversized_class:"oversized",default_height:0,default_width:0,resize_confirm:"",callback_resize:"",callback_submit:"",callback_cancel:""};e.fn.resize_scale=function(a){return this.each(function(){var t=e.extend({},i,a),l=e(this),s=e(t.resize_width,l),c=e(t.resize_height,l),h=e(t.submit_resize,l),r=e(t.cancel_resize,l);t.default_height=parseInt(t.default_height,10),t.default_width=parseInt(t.default_width,10),s.add(c).keyup(function(){r.show();var i,a=e(this),l=a.attr("id"),h="resize_height"===l?s:c;i="resize_width"===l?t.default_height/t.default_width:t.default_width/t.default_height,h.val(Math.round(i*a.val())),s.val()>t.default_width||c.val()>t.default_height?(s.addClass(t.oversized_class),c.addClass(t.oversized_class)):(c.removeClass(t.oversized_class),s.removeClass(t.oversized_class)),"function"==typeof t.callback_resize&&t.callback_resize.call(this,{width:s.val(),height:c.val()})}),h.off("click","**").on("click",function(i){if(e("."+t.oversized_class).size()){var a=confirm(t.resize_confirm);0==a?i.preventDefault():"function"==typeof t.callback_submit?t.callback_submit.call(this):l.trigger("submit")}}),r.size()&&r.click(function(e){e.preventDefault(),s.val(t.default_width).removeClass(t.oversized_class),c.val(t.default_height).removeClass(t.oversized_class),"function"==typeof t.callback_cancel&&t.callback_cancel.call(this,{width:s.val(),height:c.val()}),r.hide()})})}}(jQuery);
=======

(function(b){var h={resize_width:"#resize_width",resize_height:"#resize_height",submit_resize:"",cancel_resize:"",oversized_class:"oversized",default_height:0,default_width:0,resize_confirm:"",callback_resize:"",callback_submit:"",callback_cancel:""};b.fn.resize_scale=function(i){return this.each(function(){var a=b.extend({},h,i),d=b(this),c=b(a.resize_width,d),e=b(a.resize_height,d),j=b(a.submit_resize,d),f=b(a.cancel_resize,d);a.default_height=parseInt(a.default_height,10);a.default_width=parseInt(a.default_width,
10);c.add(e).keyup(function(){f.show();var g=b(this),d=g.attr("id");("resize_height"===d?c:e).val(Math.round(("resize_width"===d?a.default_height/a.default_width:a.default_width/a.default_height)*g.val()));c.val()>a.default_width||e.val()>a.default_height?(c.addClass(a.oversized_class),e.addClass(a.oversized_class)):(e.removeClass(a.oversized_class),c.removeClass(a.oversized_class));"function"===typeof a.callback_resize&&a.callback_resize.call(this,{width:c.val(),height:e.val()})});j.off("click",
"**").on("click",function(c){b("."+a.oversized_class).size()&&(!1==confirm(a.resize_confirm)?c.preventDefault():"function"===typeof a.callback_submit?a.callback_submit.call(this):d.trigger("submit"))});f.size()&&f.click(function(b){b.preventDefault();c.val(a.default_width).removeClass(a.oversized_class);e.val(a.default_height).removeClass(a.oversized_class);"function"===typeof a.callback_cancel&&a.callback_cancel.call(this,{width:c.val(),height:e.val()});f.hide()})})}})(jQuery);
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
