$(document).ready(function(){
// =============================================
// For backwards compatibility: adding $.browser
// from: https://github.com/jquery/jquery-migrate
// =============================================
jQuery.uaMatch=function(t){t=t.toLowerCase();var e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}},
// Don't clobber any existing jQuery.browser in case it's different
jQuery.browser||(matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),
// Chrome is Webkit, but Webkit is also Safari.
browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),jQuery.browser=browser),
// ==============================
// open links in NEW window / tab
// ==============================
// listen for clicks on anchor tags
// that include rel="external" attributes
$("body").on("click",'a[rel="external"]',function(t){
// open a new window pointing to
// the href attribute of THIS anchor click
window.open(this.href),
// stop THIS href from loading
// in the source window
t.preventDefault()}),
// ===============
// scroll smoothly
// ===============
// listen for clicks on elements with a class of scroll
$(".scroll").on("click",function(){
// stop #top from reloading
// the source window and appending to the URI
// animate the window scroll to
// #top for 800 milliseconds
return $("#top, html").animate({scrollTop:0},800),!1}),
// ============
// scroll wraps
// ============
// look for each scroll-wrap within a setting field
$(".setting-field .scroll-wrap").each(function(){
// determine the height of this scroll-wrap.
var t=$(this).height();
// if it's greater than or equal to 200,
t>="200"&&
// pop a pr class on it.
$(this).addClass("pr")}),
// look for each tbl-wrap
$(".tbl-wrap").each(function(){
// determine the width of this tbl-wrap.
var t=$(this).width(),e=$(this).children("table").width();
// if tbl-wrap's width less than the table's width,
t<e&&
// pop a pb class on it.
$(this).addClass("pb")}),
// =========
// sub menus
// =========
// listen for clicks on elements with a class of has-sub
$("body").on("click",".has-sub",function(){
// stop THIS from reloading
// the source window and appending to the URI
// and stop propagation up to document
// close OTHER open sub menus
// when clicking THIS sub menu trigger
// thanks me :D
// toggles THIS sub menu
// thanks pascal
return $(".open").not(this).removeClass("open").siblings(".sub-menu").hide(),$(this).siblings(".sub-menu").toggle().end().toggleClass("open"),!1}),
// listen for clicks to the document
$(document).on("click",function(t){
// check to see if we are inside a sub-menu or not.
$(t.target).closest(".sub-menu").length||
// close OTHER open sub menus
// when clicking outside ANY sub menu trigger
// thanks me :D
$(".open").removeClass("open").siblings(".sub-menu").hide()}),
// =========
// sub menus (NEW)
// =========
// listen for clicks on elements with a class of has-sub
$(".nav-has-sub").on("click",function(){
// stop THIS from reloading
// the source window and appending to the URI
// and stop propagation up to document
// close OTHER open sub menus
// when clicking THIS sub menu trigger
// thanks me :D
// toggles THIS sub menu
// thanks pascal
// focus the filter box if one exists
return $(".nav-open").not(this).removeClass("nav-open").siblings(".nav-sub-menu").hide(),$(this).siblings(".nav-sub-menu").toggle().end().toggleClass("nav-open"),$(this).siblings(".nav-sub-menu").find(".autofocus").focus(),!1}),
// listen for clicks to the document
$(document).on("click",function(t){
// check to see if we are inside a sub-menu or not.
$(t.target).closest(".nav-sub-menu").length||
// close OTHER open sub menus
// when clicking outside ANY sub menu trigger
// thanks me :D
$(".nav-open").removeClass("nav-open").siblings(".nav-sub-menu").hide()}),
// listen for clicks to the document
$(document).on("click",function(t){
// check to see if we are inside a sub-menu or not.
$(t.target).closest(".sub-menu, .date-picker-wrap").length||
// close OTHER open sub menus
// when clicking outside ANY sub menu trigger
// thanks me :D
$(".open").removeClass("open").siblings(".sub-menu").hide()}),
// ====
// tabs
// ====
// listen for clicks on tabs
$("body").on("click",".tab-wrap ul.tabs a",function(){
// set the tabClassIs variable
// tells us which .tab to control
var t=$(this).attr("rel");
// stop THIS from reloading
// the source window and appending to the URI
// and stop propagation up to document
// close OTHER .tab(s), ignores the currently open tab
// removes the .tab-open class from any open tabs, and hides them
// add a class of .act to THIS tab
// add a class of .open to the proper .tab
return $(".tb-act").removeClass("tb-act"),$(this).parents("ul").parents(".tab-wrap").addClass("tb-act"),$(".tb-act ul a").not(this).removeClass("act"),$(".tb-act .tab").not(".tab."+t+".tab-open").removeClass("tab-open"),$(this).addClass("act"),$(".tb-act .tab."+t).addClass("tab-open"),!1}),
// ==============
// version pop up
// ==============
// hide version-info box
$(".version-info").hide(),
// listen for clicks to elements with a class of version
$(".version").on("click",function(t){
// show version-info box
$(".version-info").show(),
// stop THIS href from loading
// in the source window
t.preventDefault()}),
// listen for clicks to elements with a class of close inside of version-info
$(".version-info .close").on("click",function(){
// stop THIS from reloading
// the source window and appending to the URI
// and stop propagation up to document
// hide version-info box
return $(".version-info").hide(),!1}),
// ====================
// modal windows -> WIP
// ====================
// hide overlay and any modals, so that fadeIn works right
$(".overlay, .modal-wrap, .modal-form-wrap").hide(),
// prevent modals from popping when disabled
$("body").on("click",".disable",function(){
// stop THIS href from loading
// in the source window
return!1}),$("body").on("modal:open",".modal-wrap, .modal-form-wrap",function(t){
// set the heightIs variable
// this allows the overlay to be scrolled
var e=$(document).height();
// fade in the overlay
$(".overlay").fadeIn("fast").css("height",e),
// fade in modal
$(this).fadeIn("slow"),
// remember the scroll location on open
$(this).data("scroll",$(document).scrollTop()),
// scroll up, if needed, but only do so after a significant
// portion of the overlay is show so as not to disorient the user
$(this).is(".modal-form-wrap")||setTimeout(function(){$(document).scrollTop(0)},100),$(document).one("keydown",function(t){27===t.keyCode&&$(".modal-wrap, .modal-form-wrap").trigger("modal:close")})}),$("body").on("modal:close",".modal-wrap, .modal-form-wrap",function(t){
// fade out the overlay
$(".overlay").fadeOut("slow"),
// fade out the modal
$(".modal-wrap, .modal-form-wrap").fadeOut("fast"),$(this).is(".modal-form-wrap")||$(document).scrollTop($(this).data("scroll"))}),
// listen for clicks to elements with a class of m-link
$("body").on("click",".m-link",function(t){
// set the modalIs variable
var e=$(this).attr("rel");$("."+e).trigger("modal:open"),
// stop THIS href from loading
// in the source window
t.preventDefault()}),
// listen for clicks on the element with a class of overlay
$("body").on("click",".m-close",function(t){$(this).closest(".modal-wrap, .modal-form-wrap").trigger("modal:close"),
// stop THIS from reloading the source window
t.preventDefault()}),$("body").on("click",".overlay",function(){$(".modal-wrap, .modal-form-wrap").trigger("modal:close")}),
// ==================================
// highlight checks and radios -> WIP
// ==================================
// listen for clicks on inputs within a choice classed label
$("body").on("click change",".choice input",function(){$('.choice input[name="'+$(this).attr("name")+'"]').each(function(t,e){$(this).parents(".choice").toggleClass("chosen",$(this).is(":checked"))})}),
// Highlight table rows when checked
$("body").on("click","table tr",function(t){"A"!=t.target.nodeName&&$(this).children("td:last-child").children("input[type=checkbox]").click()}),
// Prevent clicks on checkboxes from bubbling to the table row
$("body").on("click","table tr td:last-child input[type=checkbox]",function(t){t.stopPropagation()}),
// Toggle the bulk actions
$("body").on("change","table tr td:last-child input[type=checkbox]",function(){$(this).parents("tr").toggleClass("selected",$(this).is(":checked")),0==$(this).parents("table").find("input:checked").length?$(this).parents(".tbl-wrap").siblings(".tbl-bulk-act").hide():$(this).parents(".tbl-wrap").siblings(".tbl-bulk-act").show()}),
// "Table" lists
$("body").on("click change",".tbl-list .check-ctrl input",function(){$(this).parents(".tbl-row").toggleClass("selected",$(this).is(":checked"));var t=$(this).parents(".tbl-list"),e=t.find(".check-ctrl input:checked").length==t.find(".check-ctrl input").length;$(this).parents(".tbl-list-wrap").find(".tbl-list-ctrl input").prop("checked",e),
// Toggle the bulk actions
0==t.find(".check-ctrl input:checked").length?$(this).parents(".tbl-list-wrap").siblings(".tbl-bulk-act").hide():$(this).parents(".tbl-list-wrap").siblings(".tbl-bulk-act").show()}),
// Select all for "table" lists
$("body").on("click",".tbl-list-ctrl input",function(){$(this).parents(".tbl-list-wrap").find(".tbl-list .check-ctrl input").prop("checked",$(this).is(":checked")).trigger("change")}),
// ======================
// grid navigation -> WIP
// ======================
// listen for clicks on elements classed with .grid-next
$(".grid-next").on("click",function(t){
// animate the scrolling of grid-clip forwards
// to the next grid-item
$(".grid-clip").animate({scrollLeft:"+=310"},800),
// stop page from reloading
// the source window and appending # to the URI
t.preventDefault()}),
// listen for clicks on elements classed with .grid-back
$(".grid-back").on("click",function(t){
// animate the scrolling of grid-clip backwards
// to the previous grid-item
$(".grid-clip").animate({scrollLeft:"-=310"},800),
// stop page from reloading
// the source window and appending # to the URI
t.preventDefault()}),
// =======================
// publish collapse -> WIP
// =======================
// listen for clicks on .sub-arrows
$(".setting-txt .sub-arrow").on("click",function(){
// toggle the .setting-field and .setting-text
$(this).parents(".setting-txt").siblings(".setting-field").toggle(),
// toggle the instructions
$(this).parents("h3").siblings("em").toggle(),
// toggle a class of .field-closed on the h3
$(this).parents("h3").toggleClass("field-closed")}),
// ===================
// input range sliders
// ===================
// listen for input on a range input
$('input[type="range"]').on("input",function(){
// set the newVal var
var t=$(this).val(),e=$(this).attr("id");
// change the value on the fly
$('output[for="'+e+'"]').html(t)}),
// ===============================
// filters custom input submission
// ===============================
$('.filters .filter-search input[type="text"]').keypress(function(t){10!=t.which&&13!=t.which||$(this).closest("form").submit()})});