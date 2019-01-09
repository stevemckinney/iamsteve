/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(e){"use strict";EE.namespace("EE.publish"),e.fn.ee_url_title=function(r,l){return this.each(function(){var t,a,i=EE.publish.default_entry_title?EE.publish.default_entry_title:"",s=EE.publish.word_separator?EE.publish.word_separator:"_",p=EE.publish.foreignChars?EE.publish.foreignChars:{},u=EE.publish.url_length?EE.publish.url_length:200,g=e(this).val()||"",n=new RegExp(s+"{2,}","g"),h="_"!==s?/\_/g:/\-/g,E="_"==s?/\._/g:/\.\-/g,c="",_=EE.publish.url_title_prefix?EE.publish.url_title_prefix:"";for("boolean"!=typeof l&&(l=!1),""!==i&&"title"===e(this).attr("id")&&g.substr(0,i.length)===i&&(g=g.substr(i.length)),g=_+g,g=g.toLowerCase().replace(h,s),t=0;t<g.length;t++)a=g.charCodeAt(t),a>=32&&a<128?c+=g.charAt(t):a in p&&(c+=p[a]);g=c,g=g.replace(/<(.*?)>/g,""),g=g.replace(/&[a-zA-Z]+;/g,""),g=g.replace(/\[\/?(b|i|u|del|em|ins|strong|pre|code|abbr|span|sup|sub|color|size|strike|url|email|style)\b=?.*?\]/g,""),g=g.replace(/\s+/g,s),g=g.replace(/\//g,s),g=g.replace(/[^a-z0-9\-\._]/g,""),g=g.replace(E,s),g=g.replace(/\+/g,s),g=g.replace(n,s),g=g.replace(/^[\-\_]|[\-\_]$/g,""),g=g.replace(/\.+$/g,""),l&&(g=g.replace(/\./g,"")),r&&(e(r).val(g.substring(0,u)),e(r).trigger("change"))})}}(jQuery);