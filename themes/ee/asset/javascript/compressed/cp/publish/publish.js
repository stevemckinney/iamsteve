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
$(document).ready(function(){
// Load the category edit/delete modal and bind the submit handler
function e(a,i,s){$("div.box",a).html(i),EE.cp.formValidation.init(a),$("form",a).off("submit").on("submit",function(){return $.ajax({type:"POST",url:this.action,data:$(this).add('input[name="categories[]"]').serialize()+"&save_modal=yes",dataType:"json",success:function(i){"success"==i.messageType?(a.trigger("modal:close"),t(s,i.body)):e(a,i.body,s)}}),!1})}
// Load a new category field and bind necessary things
function t(e,t){var n=e.parents("fieldset").find(".setting-field"),o=a(e.data("groupId"));n.html(t),s($(".nestable",n)),
// Restore checked categories
i(e.data("groupId"),o),EE.cp.addLastToChecklists()}
// Returns an array of selected category IDs in a given category group
function a(e){var t=$('div[data-nestable-group="'+e+'"] ul.nested-list li input[type="checkbox"]:checked');return $.map(t,function(e){return $(e).val()})}
// Given an array of category IDs, checks those categories
function i(e,t){$.each(t,function(t,a){$('div[data-nestable-group="'+e+'"] input[value="'+a+'"]').prop("checked",!0).trigger("change")})}
// Binds our Nestable plugin to a given element, or .nestable if none specified
function s(e){var e=e||".nestable";$(e).nestable({listNodeName:"ul",listClass:"nestable-list",itemClass:"nestable-item",rootClass:"nestable",dragClass:"drag-tbl-row.nested-list",handleClass:"list-reorder",placeElement:$('<li><div class="tbl-row drag-placeholder"><div class="none"></div></div></li>'),expandBtnHTML:"",collapseBtnHTML:"",maxDepth:10,constrainToRoot:!0}).on("change",function(){EE.cp.addLastToChecklists(),$.ajax({url:EE.publish.reorder_categories.URL.replace("###",$(this).data("nestable-group")),data:{order:$(this).nestable("serialize")},type:"POST",dataType:"json"})})}var n=$("div.publish form");
// Autosaving
if(1==EE.publish.title_focus&&$("div.publish form input[name=title]").focus(),"new"==EE.publish.which&&$("div.publish form input[name=title]").bind("keyup blur",function(){$("div.publish form input[name=title]").ee_url_title($("div.publish form input[name=url_title]"))}),
// Emoji
EE.publish.smileys===!0&&$(".format-options .toolbar .emoji a").click(function(e){$(this).parents(".format-options").find(".emoji-wrap").slideToggle("fast"),e.preventDefault()}),EE.publish.autosave&&EE.publish.autosave.interval){var o=!1;n.on("entry:startAutosave",function(){n.trigger("entry:autosave"),o||(o=!0,setTimeout(function(){$.ajax({type:"POST",dataType:"json",url:EE.publish.autosave.URL,data:n.serialize(),success:function(e){n.find("div.alert.inline.warn").remove(),e.error?console.log(e.error):e.success?n.prepend(e.success):console.log("Autosave Failed"),o=!1}})},1e3*EE.publish.autosave.interval))});
// Start autosave when something changes
var r=$("textarea, input").not(":password,:checkbox,:radio,:submit,:button,:hidden"),l=$("select, :checkbox, :radio, :file");r.on("keypress change",function(){n.trigger("entry:startAutosave")}),l.on("change",function(){n.trigger("entry:startAutosave")})}
// Auto-assign category parents if configured to do so
"y"==EE.publish.auto_assign_cat_parents&&$("body").on("click",'input[name^="categories"]:checkbox',function(){
// If we're unchecking, make sure its children are also unchecked
$(this).is(":checked")||$(this).parents("li").first().find("input:checkbox").prop("checked",!1).trigger("change"),
// If we're checking, check its parents too
$(this).is(":checked")&&$(this).parents("li").find("> label input:checkbox").prop("checked",!0).trigger("change")}),
// Category management tools toggle
$("body").on("click",".toggle-tools a.toggle-btn",function(e){var t=$(this).parents(".nestable");
// On
$(this).hasClass("off")?($(this).removeClass("off"),$(this).addClass("on"),$(".list-reorder",t).clearQueue().animate({"margin-left":"-10px"},400),$(".toolbar",t).stop().fadeIn(),$("input[type=checkbox]",t).prop("disabled",!0)):(// Off
$(this).removeClass("on"),$(this).addClass("off"),$(".list-reorder",t).clearQueue().animate({"margin-left":"-50px"},400),$(".toolbar",t).stop().fadeOut(),$("input[type=checkbox]",t).prop("disabled",!1))}),
// Category modal
$("body").on("click","a[rel=modal-checkboxes-edit]",function(t){var a=$(this),i=a.attr("rel"),s=$("."+i),n=a.parents("fieldset").find("a.toggle-btn").hasClass("on"),o=EE.publish.add_category.URL.replace("###",$(this).data("groupId"));
// If we're in an editing state, be sure to return to an editing state
n&&(o+="/editing"),
// Clear out modal from last request
$("div.box",s).html('<p align="center"><a class="btn work" href="">Loading</a></p>'),
// Are we editing a category? Create a different form URL
$(this).data("contentId")&&(o=EE.publish.edit_category.URL.replace("###",$(this).data("groupId")+"/"+$(this).data("contentId"))),$.ajax({type:"GET",url:o,dataType:"html",success:function(t){e(s,t,a),
// Bind ee_url_title for new categories only
void 0===a.data("contentId")&&$("input[name=cat_name]",s).bind("keyup keydown",function(){$(this).ee_url_title("input[name=cat_url_title]")})}})}),
// Category deletion
$("body").on("click","a[rel=modal-checkboxes-confirm-remove]",function(e){var a=$("."+$(this).attr("rel")),i=$(this);
// Add the name of the category we're deleting to the modal
$(".checklist",a).html("").append("<li>"+$(this).data("confirm")+"</li>"),
// Set the category ID to send to the categories deletion handler
$('input[name="categories[]"]',a).val($(this).data("contentId")),$("form",a).off("submit").on("submit",function(){return $.ajax({type:"POST",url:this.action,data:$(this).serialize(),dataType:"json",success:function(e){"success"==e.messageType&&(a.trigger("modal:close"),t(i,e.body))}}),!1}),e.preventDefault()}),
// Initial binding on page load
s()});