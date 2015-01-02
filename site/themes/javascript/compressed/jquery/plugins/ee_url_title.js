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
!function(e){"use strict";EE.namespace("EE.publish"),e.fn.ee_url_title=function(r,t){return this.each(function(){var l,a,i=EE.publish.default_entry_title?EE.publish.default_entry_title:"",s=EE.publish.word_separator?EE.publish.word_separator:"_",p=EE.publish.foreignChars?EE.publish.foreignChars:{},u=e(this).val()||"",E=new RegExp(s+"{2,}","g"),h="_"!==s?/\_/g:/\-/g,n="",c=EE.publish.url_title_prefix?EE.publish.url_title_prefix:"";for("boolean"!=typeof t&&(t=!1),""!==i&&"title"===e(this).attr("id")&&u.substr(0,i.length)===i&&(u=u.substr(i.length)),u=c+u,u=u.toLowerCase().replace(h,s),l=0;l<u.length;l++)a=u.charCodeAt(l),a>=32&&128>a?n+=u.charAt(l):a in p&&(n+=p[a]);u=n,u=u.replace("/<(.*?)>/g",""),u=u.replace(/\s+/g,s),u=u.replace(/\//g,s),u=u.replace(/[^a-z0-9\-\._]/g,""),u=u.replace(/\+/g,s),u=u.replace(E,s),u=u.replace(/^[\-\_]|[\-\_]$/g,""),u=u.replace(/\.+$/g,""),t&&(u=u.replace(/\./g,"")),r&&e(r).val(u.substring(0,75))})}}(jQuery);
=======

(function(f){EE.namespace("EE.publish");f.fn.ee_url_title=function(h,g){return this.each(function(){var b=EE.publish.default_entry_title?EE.publish.default_entry_title:"",c=EE.publish.word_separator?EE.publish.word_separator:"_",i=EE.publish.foreignChars?EE.publish.foreignChars:{},a=f(this).val()||"",j=RegExp(c+"{2,}","g"),d="_"!==c?/\_/g:/\-/g,e="",k=EE.publish.url_title_prefix?EE.publish.url_title_prefix:"";"boolean"!==typeof g&&(g=!1);""!==b&&"title"===f(this).attr("id")&&a.substr(0,b.length)===
b&&(a=a.substr(b.length));a=(k+a).toLowerCase().replace(d,c);for(b=0;b<a.length;b++)d=a.charCodeAt(b),32<=d&&128>d?e+=a.charAt(b):d in i&&(e+=i[d]);a=e.replace("/<(.*?)>/g","");a=a.replace(/\s+/g,c);a=a.replace(/\//g,c);a=a.replace(/[^a-z0-9\-\._]/g,"");a=a.replace(/\+/g,c);a=a.replace(j,c);a=a.replace(/^[\-\_]|[\-\_]$/g,"");a=a.replace(/\.+$/g,"");g&&(a=a.replace(/\./g,""));h&&f(h).val(a.substring(0,75))})}})(jQuery);
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
