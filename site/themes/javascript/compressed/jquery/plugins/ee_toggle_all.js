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
 * @since		Version 2.3
 * @filesource
 */
<<<<<<< HEAD
!function(e){e.fn.toggle_all=function(){function t(t){var c=t.find("tbody tr").get();t.data("table_config")&&t.bind("tableupdate",function(){c=t.table("get_current_data").html_rows,t.find("input:checkbox").prop("checked",!1)}),this.getColumn=function(t){return e.map(c,function(e){return e.cells[t]})}}var c={$table:"",rowCache:"",column:0,tableCells:[],shift:!1,init:function(e,t,c){this.$table=e,this.rowCache=t,this.column=c,this.tableCells=this.rowCache.getColumn(this.column),this.checkboxListen(),this.tableListen(),this.shiftListen()},checkboxListen:function(){var t=this;e(this.tableCells).each(function(c){e(this).find("input[type=checkbox]").unbind("click").click(function(){if(currentlyChecked=t.checkboxChecked(c),t.shift&&currentlyChecked!==!1){var n=currentlyChecked>c?c:currentlyChecked,i=currentlyChecked>c?currentlyChecked:c;e(t.tableCells).slice(n,i).find("input[type=checkbox]").attr("checked",!0)}})})},tableListen:function(){var e=this;this.$table.bind("tableupdate",function(){e.tableCells=e.rowCache.getColumn(e.column),e.checkboxListen()})},shiftListen:function(){var t=this;e(window).bind("keyup keydown",function(e){t.shift=e.shiftKey})},checkboxChecked:function(t){if(e(this.tableCells).find("input[type=checkbox]").not(":eq("+t+")").find(":checked").size()>1)return!1;var c=0;return e(this.tableCells).each(function(n){return n!==t&&e(this).find("input[type=checkbox]").is(":checked")?(c=n,!1):void 0}),c}};return this.each(function(){var n=e(this),i={},h=new t(n);n.find("th").has("input:checkbox").each(function(){var t=this.cellIndex,o=e(this).find(":checkbox");e(this).click(function(c){var n=o.prop("checked");c.target!=o.get(0)&&(n=!n,o.prop("checked",n));var i=h.getColumn(t);e(i).find(":checkbox").prop("checked",n)}),i[t]=o,c.init(n,h,t)}),n.delegate("td","click",function(t){var c=this.cellIndex,n=!0;return i[c]&&e(t.target).is(":checkbox")?t.target.checked?(e.each(h.getColumn(c),function(){return e(this).find(":checkbox").prop("checked")?void 0:(n=!1,!1)}),void i[c].prop("checked",n)):(i[c].prop("checked",!1),!0):!0})})}}(jQuery);
=======

(function(b){b.fn.toggle_all=function(){function h(a){var c=a.find("tbody tr").get();a.data("table_config")&&a.bind("tableupdate",function(){c=a.table("get_current_data").html_rows;a.find("input:checkbox").prop("checked",!1)});this.getColumn=function(a){return b.map(c,function(b){return b.cells[a]})}}return this.each(function(){var a=b(this),c={},f=new h(a);a.find("th").has("input:checkbox").each(function(){var a=this.cellIndex,d=b(this).find(":checkbox");b(this).click(function(c){var e=d.prop("checked");
c.target!=d.get(0)&&(e=!e,d.prop("checked",e));c=f.getColumn(a);b(c).find(":checkbox").prop("checked",e)});c[a]=d});a.delegate("td","click",function(a){var d=this.cellIndex,g=!0;if(!c[d]||!b(a.target).is(":checkbox"))return!0;if(!a.target.checked)return c[d].prop("checked",!1),!0;b.each(f.getColumn(d),function(){if(!b(this).find(":checkbox").prop("checked"))return g=!1});c[d].prop("checked",g)})})}})(jQuery);
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
