/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: false, strict: true, newcap: true, immed: true */
/*global jQuery, EE, window, document, console, alert */
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
!function(e){"use strict";EE.namespace("EE.publish"),e.fn.ee_url_title=function(r,l){return this.each(function(){var t,a,s=EE.publish.default_entry_title?EE.publish.default_entry_title:"",i=EE.publish.word_separator?EE.publish.word_separator:"_",p=EE.publish.foreignChars?EE.publish.foreignChars:{},u=e(this).val()||"",n=new RegExp(i+"{2,}","g"),c="_"!==i?/\_/g:/\-/g,g="",E=EE.publish.url_title_prefix?EE.publish.url_title_prefix:"";
// Foreign Character Attempt
for(
// Make sure remove_periods has a default
"boolean"!=typeof l&&(l=!1),""!==s&&"title"===e(this).attr("id")&&u.substr(0,s.length)===s&&(u=u.substr(s.length)),u=E+u,u=u.toLowerCase().replace(c,i),t=0;t<u.length;t++)a=u.charCodeAt(t),a>=32&&a<128?g+=u.charAt(t):a in p&&(g+=p[a]);u=g,u=u.replace(/<(.*?)>/g,""),// Strip HTML
u=u.replace(/&[a-zA-Z]+;/g,""),// Strip HTML entites
u=u.replace(/\[\/?(b|i|u|del|em|ins|strong|pre|code|abbr|span|sup|sub|color|size|strike|url|email|style)\b=?.*?\]/g,""),// Strip valid inline BBCode
u=u.replace(/\s+/g,i),u=u.replace(/\//g,i),u=u.replace(/[^a-z0-9\-\._]/g,""),u=u.replace(/\+/g,i),u=u.replace(n,i),u=u.replace(/^[\-\_]|[\-\_]$/g,""),u=u.replace(/\.+$/g,""),l&&(u=u.replace(/\./g,"")),r&&e(r).val(u.substring(0,75))})}}(jQuery);