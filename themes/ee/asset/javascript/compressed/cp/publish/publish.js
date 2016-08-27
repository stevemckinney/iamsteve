/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2016, EllisLab, Inc.
 * @license		https://expressionengine.com/license
 * @link		https://ellislab.com
 * @since		Version 3.0
 * @filesource
 */
$(document).ready(function(){var e=$("div.publish form");
// Autosaving
if(1==EE.publish.title_focus&&$("div.publish form input[name=title]").focus(),"new"==EE.publish.which&&$("div.publish form input[name=title]").bind("keyup blur",function(){$("div.publish form input[name=title]").ee_url_title($("div.publish form input[name=url_title]"))}),
// Emoji
EE.publish.smileys===!0&&$(".format-options .toolbar .emoji a").click(function(e){$(this).parents(".format-options").find(".emoji-wrap").slideToggle("fast"),e.preventDefault()}),EE.publish.autosave&&EE.publish.autosave.interval){var t=!1;e.on("entry:startAutosave",function(){e.trigger("entry:autosave"),t||(t=!0,setTimeout(function(){$.ajax({type:"POST",dataType:"json",url:EE.publish.autosave.URL,data:e.serialize(),success:function(i){e.find("div.alert.inline.warn").remove(),i.error?console.log(i.error):i.success?e.prepend(i.success):console.log("Autosave Failed"),t=!1}})},1e3*EE.publish.autosave.interval))});
// Start autosave when something changes
var i=$("textarea, input").not(":password,:checkbox,:radio,:submit,:button,:hidden"),o=$("select, :checkbox, :radio, :file");i.on("keypress change",function(){e.trigger("entry:startAutosave")}),o.on("change",function(){e.trigger("entry:startAutosave")})}});