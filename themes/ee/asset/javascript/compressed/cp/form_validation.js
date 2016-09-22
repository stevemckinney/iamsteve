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
!function(t){t(document).ready(function(){EE.cp.formValidation.init()}),EE.cp.formValidation={paused:!1,_validationCallbacks:[],pause:function(t){if(this.paused=!0,void 0===t){var i=this;setTimeout(function(){i.resume()},3e3)}},resume:function(){this.paused=!1},/**
	 * @param	{jQuery object}	form	Optional jQuery object of form
	 */
init:function(i){var i=i||t("form"),e=this;
// These are the text input selectors we listen to for activity
this._textInputSelectors="input[type=text], input[type=number], input[type=password], textarea",i.each(function(i,s){e._bindButtonStateChange(t(s)),e._bindForms(t(s))}),this._focusFirstError(),this._scrollGrid()},/**
	 * Bind inputs to the validation routine. Text inputs will trigger a
	 * validation request on blur, while others will trigger on change.
	 *
	 * @param	{jQuery object}	container	jQuery object of container of elements
	 */
bindInputs:function(i){var e=this;t(this._textInputSelectors,i).blur(function(){
// Unbind keydown validation when the invalid field loses focus
t(this).data("validating",!1);var i=t(this);setTimeout(function(){e._sendAjaxRequest(i)},0)}),t("input[type=checkbox], input[type=radio], input[type=hidden], select",i).change(function(){var i=t(this);setTimeout(function(){e._sendAjaxRequest(i)},0)}),
// Upon loading the page with invalid fields, bind the text field
// timer to correct the validation as the user types (for AJAX
// validation only)
t("form.ajax-validate fieldset.invalid, form.ajax-validate div.grid-publish:has(div.invalid)").each(function(){e._bindTextFieldTimer(t(this))})},/**
	 * Given a field name, sets a callback for that field to get called on
	 * validation. Handy if you need to do extra processing or change anything
	 * about the default DOM manipulation that this library does upon validation
	 * success or failure. Only the root name of a field may be passed in. For
	 * example, if you have field[row][column], then `field` must be passed in.
	 * You'll then get a notificaiton for each field under that field's umbrella
	 * but also the object of the actual field being validated.
	 *
	 * @param	{string}	fieldName	Root name of field to get notified of validation for
	 * @param	{callback}	callback	Callback function for validation event
	 */
bindCallbackForField:function(t,i){this._validationCallbacks[t]=i},/**
	 * Upon form validation error, set the focus on the first text field that
	 * has a validation error; specifically set the cursor at the end, as
	 * focus() will select the entire contents of the text box
	 */
_focusFirstError:function(){
// Get the first container that has a text input inside it, then get
// the first text input
var i=t(".invalid").has(this._textInputSelectors).first().find(this._textInputSelectors).first();
// Bail if no field to focus
if(0!=i.size()){
// Multiply by 2 to ensure the cursor always ends up at the end;
// Opera sometimes sees a carriage return as 2 characters
var e=2*i.val().length;
// Focus and set cursor to the end of the string
i.focus(),i[0].setSelectionRange(e,e)}},/**
	 * If a field inside a Grid input has an error, the error could be off
	 * screen on smaller screens, so we'll scroll the Grid to the first field
	 * that has a problem
	 */
_scrollGrid:function(){var i=t(".invalid").has("input, select, textarea").first();if(i.parents(".grid-publish").size()>0){var e=i.position();i.parents(".tbl-wrap").scrollLeft(e.left)}},/**
	 * Detects a form submission and changes the form's submit button
	 * to its working state
	 *
	 * @param	{jQuery object}	form	Optional jQuery object of form
	 */
_bindButtonStateChange:function(i){var e=t(".form-ctrls input.btn, .form-ctrls button.btn",i);
// Bind form submission to update button text
i.submit(function(s){
// Add "work" class to make the buttons pulsate
// If the submit was trigger by a button click, disable it to prevent futher clicks
// Update the button text to the value of its "work-text" data attribute
// Replace button text with working text and disable the button to prevent further clicks
return e.size()>0&&(e.addClass("work"),e.each(function(e,a){return s.target==a?(a.prop("disabled",!0),
// Some controllers rely on the presence of the submit button in POST, but it won't
// make it to the controller if it's disabled, so add it back as a hidden input
i.append(t("<input/>",{type:"hidden",name:a.name,value:a.value})),!1):void 0}),""!=e.data("work-text")&&(e.is("input")?e.attr("value",e.data("work-text")):e.is("button")&&e.text(e.data("work-text")))),!0})},/**
	 * Binds forms with a class of 'ajax-validate' to the AJAX
	 * validation routines
	 *
	 * @param	{jQuery object}	form	Optional jQuery object of form
	 */
_bindForms:function(i){var e=this;i.has(".form-ctrls .btn").each(function(i,s){var a=t(this);a.find(".form-ctrls input.btn");e.bindInputs(a),e._dismissSuccessAlert(a)})},/**
	 * When a form element is interacted with after the form has been
	 * successfully submitted, hide the success message
	 */
_dismissSuccessAlert:function(i){t("input, select, textarea",i).change(function(t){var e=i.find("div.alert.success");e.size()>0&&e.remove()})},/**
	 * Tells us whether or not there are any errors left on the form
	 *
	 * @param	{jQuery object}	form	jQuery object of form
	 */
_errorsExist:function(i){return 0!=t("fieldset.invalid, td.invalid",i).size()},/**
	 * Sends an AJAX request to the form's action, it's up to the form
	 * handler to detect that it's an AJAX request and handle the
	 * request differently
	 *
	 * @param	{jQuery object}	field	jQuery object of field validating
	 */
_sendAjaxRequest:function(i){if(!this.paused){var e=i.parents("form");
// Just reset the button for forms that don't validate over AJAX
if(!e.hasClass("ajax-validate"))return void this._toggleErrorForFields(i,"success");var s=this,a=e.attr("action"),n=e.serialize();t.ajax({url:a,data:n+"&ee_fv_field="+i.attr("name"),type:"POST",dataType:"json",success:function(t){s._toggleErrorForFields(i,t)}})}},/**
	 * Given a field, marks the field as valid in the UI
	 *
	 * @param	{jQuery object}	field	jQuery object of field
	 */
markFieldValid:function(t){this._toggleErrorForFields(t,"success")},/**
	 * Given a field, marks the field as invalid in the UI with an error message
	 *
	 * @param	{jQuery object}	field	jQuery object of field
	 * @param	{mixed}			message	Error message to show by invalid field
	 */
markFieldInvalid:function(t,i){this._toggleErrorForFields(t,i)},/**
	 * Does all the UI DOM work necessary to mark a field (in)valid on the screen
	 *
	 * @param	{jQuery object}	field	jQuery object of field validating
	 * @param	{mixed}			message	Return from AJAX request, 'success' marks a field as valid
	 */
_toggleErrorForFields:function(i,e){var s=i.parents("form"),a=i.parents("div[class*=setting]").not("div[class=setting-note]"),n=a.parents("fieldset").size()>0?a.parents("fieldset"):a.parent(),r="em.ee-form-error-message",d=!1,o=i.parents(".tab"),l=o.size()>0?o.attr("class").match(/t-\d+/):"",// Grabs the tab identifier (ex: t-2)
u=t(o).parents(".tab-wrap").find('a[rel="'+l+'"]'),// Tab link
// See if this tab has its own submit button
c=o.size()>0&&o.find(".form-ctrls input.btn").size()>0,
// Finally, grab the button of the current form
f=c?o.find(".form-ctrls .btn"):s.find(".form-ctrls .btn");
// Validation success, return the form to its original, submittable state
if(
// If we're in a Grid input, re-assign some things to apply classes
// and show error messages in the proper places
n.hasClass("grid-publish")&&(n=n.find("div.setting-txt"),a=i.parents("td"),d=!0),"success"==e)
// For Grid, we also need to remove the class on the cell and do some
// special handling of the invalid class on the Grid field label
d?(a.removeClass("invalid"),
// For Grid, only remove the invalid class from the label if no
// more errors exist in the Grid
0==n.parent().find("td.invalid").size()&&(n.removeClass("invalid"),
// Remove error message below Grid field
a.parents("div.setting-field").find("> "+r).remove())):n.removeClass("invalid"),a.find("> "+r).remove(),
// If no more errors on this tab, remove invalid class from tab
u.size()>0&&!this._errorsExist(o)&&u.removeClass("invalid"),
// Re-enable submit button only if all errors are gone
(!this._errorsExist(s)||!this._errorsExist(o)&&c)&&(f.removeClass("disable").removeAttr("disabled"),f.each(function(i,e){e=t(e),e.is("input")?e.attr("value",e.data("submit-text")):e.is("button")&&e.text(e.data("submit-text"))}));else{
// Bind timer for text fields to validate field while typing
this._bindTextFieldTimer(a),n.addClass("invalid"),
// Specify the Grid cell the error is in
d&&a.addClass("invalid");
// We'll get HTML back from the validator, create an element
// out of it
var v=t("<div/>").html(e.error).contents();
// Don't double up on error messages
a.has(r).length&&a.find(r).remove(),a.append(v),
// Mark tab as invalid
u.size()>0&&u.addClass("invalid"),
// Disable submit button
f.addClass("disable").attr("disabled","disabled"),f.is("input")?f.attr("value",EE.lang.btn_fix_errors):f.is("button")&&f.text(EE.lang.btn_fix_errors)}
// There may be callbacks for fields that need to do extra processing
// on validation; check for those and call them
var p=i.attr("name").replace(/\[.+?\]/g,"");void 0!==this._validationCallbacks[p]&&this._validationCallbacks[p]("success"==e,e.error,i)},/**
	 * When a text field comes back as invalid, we'll bind a timer to it to
	 * check it's validity every half second after a key press, that way the
	 * user knows a field is fixed without having to remove focus from the field.
	 * Each key press resets the timer, so it's only when the keyboard has been
	 * inactive for a half second while the field is still in focus that the
	 * AJAX request to validate the form fires.
	 *
	 * @param	{jQuery object}	container	jQuery object of field's container
	 */
_bindTextFieldTimer:function(i){var e,s=this,a=t(this._textInputSelectors,i);
// Don't double-up on bindings
a.data("validating")!==!0&&
// Bind the timer on keydown and change
a.data("validating",!0).on("keydown change",function(){
// Reset the timer, no need to validate if user is still typing
void 0!==e&&clearTimeout(e);var i=t(this);
// Wait half a second, then clear the timer and send the AJAX request
e=setTimeout(function(){clearTimeout(e),s._sendAjaxRequest(i)},500)})}}}(jQuery);