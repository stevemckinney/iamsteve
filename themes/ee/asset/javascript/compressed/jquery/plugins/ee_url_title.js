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
!function(e){"use strict";EE.namespace("EE.publish"),e.fn.ee_url_title=function(r,l){return this.each(function(){var t,a,i=EE.publish.default_entry_title?EE.publish.default_entry_title:"",s=EE.publish.word_separator?EE.publish.word_separator:"_",p=EE.publish.foreignChars?EE.publish.foreignChars:{},u=e(this).val()||"",g=new RegExp(s+"{2,}","g"),n="_"!==s?/\_/g:/\-/g,c="",h=EE.publish.url_title_prefix?EE.publish.url_title_prefix:"";for("boolean"!=typeof l&&(l=!1),""!==i&&"title"===e(this).attr("id")&&u.substr(0,i.length)===i&&(u=u.substr(i.length)),u=h+u,u=u.toLowerCase().replace(n,s),t=0;t<u.length;t++)a=u.charCodeAt(t),a>=32&&128>a?c+=u.charAt(t):a in p&&(c+=p[a]);u=c,u=u.replace(/<(.*?)>/g,""),u=u.replace(/&[a-zA-Z]+;/g,""),u=u.replace(/\[\/?(b|i|u|del|em|ins|strong|pre|code|abbr|span|sup|sub|color|size|strike|url|email|style)\b=?.*?\]/g,""),u=u.replace(/\s+/g,s),u=u.replace(/\//g,s),u=u.replace(/[^a-z0-9\-\._]/g,""),u=u.replace(/\+/g,s),u=u.replace(g,s),u=u.replace(/^[\-\_]|[\-\_]$/g,""),u=u.replace(/\.+$/g,""),l&&(u=u.replace(/\./g,"")),r&&(e(r).val(u.substring(0,75)),e(r).trigger("change"))})}}(jQuery);