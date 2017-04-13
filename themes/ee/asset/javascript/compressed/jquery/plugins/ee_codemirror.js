/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 2.9.0
 * @filesource
 */
!function(e){"use strict";function r(){try{if("localStorage"in window&&null!==window.localStorage)return localStorage.setItem("ee_ping",1),localStorage.removeItem("ee_ping"),!0}catch(e){return!1}}function t(e){var r=e.match(/^\t+/gm),t=e.match(/^[ ]+/gm),i=r?r.length:0,o=t?t.length:0;return!(o>i)}function i(r){var i=r.height(),o=r[0].value,n=t(o),a=CodeMirror.fromTextArea(r[0],{lineWrapping:!0,lineNumbers:!0,autoCloseBrackets:!0,mode:"ee",smartIndent:!1,indentWithTabs:n,lint:EE.codemirror_linter});return e(".CodeMirror").resizable({handles:"s",resize:function(){a.setSize(null,e(this).height()),a.refresh()}}),a.setSize(null,i),a}EE.namespace("EE.design");var o=r()?localStorage:{setItem:function(e,r){var t=new Date;t.setTime(t.getTime()+5e3),document.cookie=e+"="+escape(r)+"; expires="+t.toGMTString()+"; path=/"},removeItem:function(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT"},getItem:function(e){var r=new RegExp("[,; ]"+e+"=([^\\s,;]*)"),t=" "+document.cookie,i=t.match(r);return i?unescape(i[1]):void 0}};e.fn.toggleCodeMirror=function(){this.each(function(){var r=e(this),t=o.getItem("codemirror.disabled"),n=r.data("codemirror.initialized"),a=r.data("codemirror.editor");!n&&!t||n&&t?(a=i(r),o.removeItem("codemirror.disabled"),r.data("codemirror.editor",a)):n&&(a.toTextArea(),r.data("codemirror.editor",!1),o.setItem("codemirror.disabled",!0)),r.data("codemirror.initialized",!0)})}}(jQuery);