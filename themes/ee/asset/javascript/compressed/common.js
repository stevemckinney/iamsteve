$(document).ready(function(){jQuery.uaMatch=function(t){t=t.toLowerCase();var e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}},jQuery.browser||(matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),jQuery.browser=browser),$("body").on("click",'a[rel="external"]',function(t){window.open(this.href),t.preventDefault()}),$(".scroll").on("click",function(){return $("#top, html").animate({scrollTop:0},800),!1}),$(".setting-field .scroll-wrap").each(function(){var t=$(this).height();t>="200"&&$(this).addClass("pr")}),$(".tbl-wrap").each(function(){var t=$(this).width(),e=$(this).children("table").width();t<e&&$(this).addClass("pb")}),$("body").on("click",".has-sub",function(){return $(".open").not(this).removeClass("open").siblings(".sub-menu").hide(),$(this).siblings(".sub-menu").toggle().end().toggleClass("open"),!1}),$(document).on("click",function(t){$(t.target).closest(".sub-menu").length||$(".open").removeClass("open").siblings(".sub-menu").hide()}),$(".nav-has-sub").on("click",function(){return $(".nav-open").not(this).removeClass("nav-open").siblings(".nav-sub-menu").hide(),$(this).siblings(".nav-sub-menu").toggle().end().toggleClass("nav-open"),$(this).siblings(".nav-sub-menu").find(".autofocus").focus(),!1}),$(document).on("click",function(t){$(t.target).closest(".nav-sub-menu").length||$(".nav-open").removeClass("nav-open").siblings(".nav-sub-menu").hide()}),$(document).on("click",function(t){$(t.target).closest(".sub-menu, .date-picker-wrap").length||$(".open").removeClass("open").siblings(".sub-menu").hide()}),$("body").on("click",".tab-wrap ul.tabs a",function(){var t=$(this).attr("rel");return $(".tb-act").removeClass("tb-act"),$(this).parents("ul").parents(".tab-wrap").addClass("tb-act"),$(".tb-act ul a").not(this).removeClass("act"),$(".tb-act .tab").not(".tab."+t+".tab-open").removeClass("tab-open"),$(this).addClass("act"),$(".tb-act .tab."+t).addClass("tab-open"),!1}),$(".version-info").hide(),$(".version").on("click",function(t){$(".version-info").show(),t.preventDefault()}),$(".version-info .close").on("click",function(){return $(".version-info").hide(),!1}),$(".overlay, .modal-wrap, .modal-form-wrap").hide(),$("body").on("click",".disable",function(){return!1}),$("body").on("modal:open",".modal-wrap, .modal-form-wrap",function(t){var e=$(document).height();$(".overlay").fadeIn("fast").css("height",e),$(this).fadeIn("slow"),$(this).data("scroll",$(document).scrollTop()),$(this).is(".modal-form-wrap")||setTimeout(function(){$(document).scrollTop(0)},100),$(document).one("keydown",function(t){27===t.keyCode&&$(".modal-wrap, .modal-form-wrap").trigger("modal:close")})}),$("body").on("modal:close",".modal-wrap, .modal-form-wrap",function(t){$(".overlay").fadeOut("slow"),$(".modal-wrap, .modal-form-wrap").fadeOut("fast"),$(this).is(".modal-form-wrap")||$(document).scrollTop($(this).data("scroll"))}),$("body").on("click",".m-link",function(t){var e=$(this).attr("rel");$("."+e).trigger("modal:open"),t.preventDefault()}),$("body").on("click",".m-close",function(t){$(this).closest(".modal-wrap, .modal-form-wrap").trigger("modal:close"),t.preventDefault()}),$("body").on("click",".overlay",function(){$(".modal-wrap, .modal-form-wrap").trigger("modal:close")}),$("body").on("click change",".choice input",function(){$('.choice input[name="'+$(this).attr("name")+'"]').each(function(t,e){$(this).parents(".choice").toggleClass("chosen",$(this).is(":checked"))})}),$("body").on("click","table tr",function(t){"A"!=t.target.nodeName&&$(this).children("td:last-child").children("input[type=checkbox]").click()}),$("body").on("click","table tr td:last-child input[type=checkbox]",function(t){t.stopPropagation()}),$("body").on("change","table tr td:last-child input[type=checkbox]",function(){$(this).parents("tr").toggleClass("selected",$(this).is(":checked")),0==$(this).parents("table").find("input:checked").length?$(this).parents(".tbl-wrap").siblings(".tbl-bulk-act").hide():$(this).parents(".tbl-wrap").siblings(".tbl-bulk-act").show()}),$("body").on("click change",".tbl-list .check-ctrl input",function(){$(this).parents(".tbl-row").toggleClass("selected",$(this).is(":checked"));var t=$(this).parents(".tbl-list"),e=t.find(".check-ctrl input:checked").length==t.find(".check-ctrl input").length;$(this).parents(".tbl-list-wrap").find(".tbl-list-ctrl input").prop("checked",e),0==t.find(".check-ctrl input:checked").length?$(this).parents(".tbl-list-wrap").siblings(".tbl-bulk-act").hide():$(this).parents(".tbl-list-wrap").siblings(".tbl-bulk-act").show()}),$("body").on("click",".tbl-list-ctrl input",function(){$(this).parents(".tbl-list-wrap").find(".tbl-list .check-ctrl input").prop("checked",$(this).is(":checked")).trigger("change")}),$(".grid-next").on("click",function(t){$(".grid-clip").animate({scrollLeft:"+=310"},800),t.preventDefault()}),$(".grid-back").on("click",function(t){$(".grid-clip").animate({scrollLeft:"-=310"},800),t.preventDefault()}),$("div.publish form").on("click",".setting-txt .sub-arrow",function(t){$(this).parents(".setting-txt").siblings(".setting-field").toggle(),$(this).parents("h3").siblings("em").toggle(),$(this).parents("h3").toggleClass("field-closed")}),$('input[type="range"]').on("input",function(){var t=$(this).val(),e=$(this).attr("id");$('output[for="'+e+'"]').html(t)}),$('.filters .filter-search input[type="text"]').keypress(function(t){10!=t.which&&13!=t.which||$(this).closest("form").submit()})});