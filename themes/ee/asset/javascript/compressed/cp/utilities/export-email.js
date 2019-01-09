/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
EE.cp.export_email={buttons:$('button[name="export"]'),site:"all",init:function(){EE.cp.export_email._init()},_init:function(){this._bindButton()},_bindButton:function(){var t=this;this.buttons.on("click",function(e){e.preventDefault(),button=$(e.target),button.addClass("work"),button.text(button.data("work-text")),t._disableButton(!0),t._sendAjaxRequest(0)})},_disableButton:function(t){this.buttons.attr("disabled",!0),t?(this.buttons.addClass("work"),this.buttons.val(this.buttons.data("work-text"))):this.buttons.addClass("disable")},_enableButton:function(){this.buttons.attr("disabled",!1).removeClass("work").removeClass("disable")},_sendAjaxRequest:function(t){var e=new XMLHttpRequest,n=this,r={progress:0,validate_email:$('input[name="validate_email"]').val()};void 0!==t&&(r={progress:t,validate_email:$('input[name="validate_email"]').val()}),r=Object.keys(r).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(r[t])}).join("&"),e.open("POST",EE.export_email.endpoint,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),e.setRequestHeader("X-CSRF-TOKEN",EE.CSRF_TOKEN),e.onload=function(){try{var t=JSON.parse(e.responseText)}catch(r){return void n._presentError(r)}if(e.status>=200&&e.status<400){if(void 0==t.status)return void n._presentError(t);if("error"==t.status)return void n._presentError(t.message);if("finished"==t.status)return n._updateProgress(100),void(window.location=EE.export_email.base_url);var o=document.createEvent("HTMLEvents");o.initEvent("mousemove",!0,!1),document.dispatchEvent(o),n._updateProgress(n._getPercentageForResponse(t)),n._sendAjaxRequest(t.progress)}else{if("error"==t.status)return void n._presentError(t.message);n._presentError(t)}},e.onerror=function(){n._presentError(response)},e.send(r)},_getPercentageForResponse:function(t){var e=0,n=EE.export_email.total_members;return e=Math.round(parseInt(t.progress)/n*100),e>100?100:e},_updateProgress:function(t){var e=$(".progress-bar"),n=$(".progress",e);e.is(":not(:visible)")&&e.show(),n.css("width",t+"%")},_presentError:function(t){var e=EE.export_email.ajax_fail_banner.replace("%body%",t),n=document.createElement("div"),r=document.querySelectorAll("form")[0];n.innerHTML=e,r.insertBefore(n,r.firstChild),this._enableButton(),this._disableButton()}},"loading"!=document.readyState?EE.cp.export_email.init():document.addEventListener("DOMContentLoaded",EE.cp.export_email.init),$(document).ready(function(){$(".form-standard form").off("submit"),$('button[type="submit"]').on("click",function(t){$(t.target).hide()})});