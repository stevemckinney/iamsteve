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
"use strict";$(document).ready(function(){var e=$(".editAccordion"),s=$("#template_data");$(".button").css("float","right"),e.children("div").hide(),e.children("h3").css("cursor","pointer").addClass("collapsed").parent().addClass("collapsed"),e.css("borderTop",$(".editAccordion").css("borderBottom")),e.children("h3").click(function(){var e=$(this);e.hasClass("collapsed")?(e.siblings().slideDown("fast"),e.removeClass("collapsed").parent().removeClass("collapsed")):(e.siblings().slideUp("fast"),e.addClass("collapsed").parent().addClass("collapsed"))}),e.filter(".open").find("h3").each(function(){$(this).siblings().show(),$(this).removeClass("collapsed").parent().removeClass("collapsed")}),s.createSelection(0,0),EE.template_edit_url=EE.BASE+"&C=design&M=template_edit_ajax",EE.access_edit_url=EE.BASE+"&C=design&M=access_edit_ajax",$("#revisions").submit(function(){var e=$("#revision_id").val();return"clear"===e?window.open(EE.template.url+e,"Revision","height=350, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0, screenX=60, left=60, screenY=60, top=60"):"0"!=e&&window.open(EE.template.url+e,"Revision"),!1}),$("#template_data").toggleCodeMirror()});
=======

$(document).ready(function(){var b=$(".editAccordion"),c=$("#template_data");$(".button").css("float","right");b.children("div").hide();b.children("h3").css("cursor","pointer").addClass("collapsed").parent().addClass("collapsed");b.css("borderTop",$(".editAccordion").css("borderBottom"));b.children("h3").click(function(){var a=$(this);a.hasClass("collapsed")?(a.siblings().slideDown("fast"),a.removeClass("collapsed").parent().removeClass("collapsed")):(a.siblings().slideUp("fast"),a.addClass("collapsed").parent().addClass("collapsed"))});
b.filter(".open").find("h3").each(function(){$(this).siblings().show();$(this).removeClass("collapsed").parent().removeClass("collapsed")});c.markItUp(EE.template.markitup);c.createSelection(0,0);EE.template_edit_url=EE.BASE+"&C=design&M=template_edit_ajax";EE.access_edit_url=EE.BASE+"&C=design&M=access_edit_ajax";$("#revisions").submit(function(){var a=$("#revision_id").val();"clear"===a?window.open(EE.template.url+a,"Revision","height=350, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0, screenX=60, left=60, screenY=60, top=60"):
"0"!=a&&window.open(EE.template.url+a,"Revision");return!1})});
>>>>>>> 0fa8825dc34df02ef80cbe3b3e72c69db1cc2cc1
