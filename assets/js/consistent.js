// picturefill
(function(e){"use strict";e.picturefill=function(){var t=e.document.getElementsByTagName("div");for(var n=0,r=t.length;n<r;n++)if(t[n].getAttribute("data-picture")!==null){var i=t[n].getElementsByTagName("div"),s=[];for(var o=0,u=i.length;o<u;o++){var a=i[o].getAttribute("data-media");(!a||e.matchMedia&&e.matchMedia(a).matches)&&s.push(i[o])}var f=t[n].getElementsByTagName("img")[0];s.length?(f||(f=e.document.createElement("img"),f.alt=t[n].getAttribute("data-alt"),t[n].appendChild(f)),f.src=s.pop().getAttribute("data-src")):f&&t[n].removeChild(f)}},e.addEventListener?(e.addEventListener("resize",e.picturefill,!1),e.addEventListener("DOMContentLoaded",function(){e.picturefill(),e.removeEventListener("load",e.picturefill,!1)},!1),e.addEventListener("load",e.picturefill,!1)):e.attachEvent&&e.attachEvent("onload",e.picturefill)})(this)

// onmediaquery.js
var MQ=function(b){b=b||{};b.init=function(a){this.callbacks=[];this.new_context=this.context="";if("undefined"!==typeof a)for(i=0;i<a.length;i++)this.addQuery(a[i]);this.addEvent(window,"resize",b.listenForChange,b);this.listenForChange()};b.listenForChange=function(){document.documentElement.currentStyle&&(query_string=document.documentElement.currentStyle.fontFamily);window.getComputedStyle&&(query_string=window.getComputedStyle(document.documentElement).getPropertyValue("font-family")); null!=query_string&&(query_string=query_string.replace(/['",]/g,""),query_string!==this.context&&(this.new_context=query_string,this.triggerCallbacks(this.new_context)),this.context=this.new_context)};b.addQuery=function(a){if(!(null==a||void 0==a))return this.callbacks.push(a),"string"==typeof a.context&&(a.context=[a.context]),"boolean"!==typeof a.call_for_each_context&&(a.call_for_each_context=!0),""!=this.context&&this._inArray(this.context,a.context)&&a.callback(),this.callbacks[this.callbacks.length- 1]};b.removeQuery=function(a){if(!(null==a||void 0==a))for(var c=-1;-1<(c=this.callbacks.indexOf(a));)this.callbacks.splice(c,1)};b.triggerCallbacks=function(a){var c,b;for(c=0;c<this.callbacks.length;c++)!1==this.callbacks[c].call_for_each_context&&this._inArray(this.context,this.callbacks[c].context)||(b=this.callbacks[c].callback,this._inArray(a,this.callbacks[c].context)&&void 0!==b&&b())};b.addEvent=function(a,c,b,d){null==a||void 0==a||(a.addEventListener?a.addEventListener(c,function(){b.call(d)}, !1):a.attachEven?a.attachEvent("on"+c,function(){b.call(d)}):a["on"+c]=function(){b.call(d)})};b._inArray=function(a,b){for(var e=b.length,d=0;d<e;d++)if(b[d]==a)return!0;return!1};return b}(MQ||{});

// !Lettering.JS 0.6.1 Copyright 2010, Dave Rupert http://daverupert.com
(function($){	
	var space = '/[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/';
	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				if(item === " ") klass = "space";
				else klass = "char";
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {
			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},

		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);

// !FitText.js 1.0 Copyright 2011, Dave Rupert http://daverupert.com
(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this); 
        
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default. 
      $(window).on('resize', resizer);
      	
    });

  };

})( jQuery );

// github.com/paulirish/jquery-ajax-localstorage-cache
// dependent on Modernizr's localStorage test

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {

  // Cache it ?
  if ( !Modernizr.localstorage || !options.localCache ) return;

  var hourstl = options.cacheTTL || 5;

  var cacheKey = options.cacheKey || 
                 options.url.replace( /jQuery.*/,'' ) + options.type + options.data;
  
  // isCacheValid is a function to validate cache
  if ( options.isCacheValid &&  ! options.isCacheValid() ){
    localStorage.removeItem( cacheKey );
  }
  // if there's a TTL that's expired, flush this item
  var ttl = localStorage.getItem(cacheKey + 'cachettl');
  if ( ttl && ttl < +new Date() ){
    localStorage.removeItem( cacheKey );
    localStorage.removeItem( cacheKey  + 'cachettl' );
    ttl = 'expired';
  }
  
  var value = localStorage.getItem( cacheKey );
  if ( value ){
    //In the cache? So get it, apply success callback & abort the XHR request
    // parse back to JSON if we can.
    if ( options.dataType.indexOf( 'json' ) === 0 ) value = JSON.parse( value );
    options.success( value );
    // Abort is broken on JQ 1.5 :(
    jqXHR.abort();
  } else {

    //If it not in the cache, we change the success callback, just put data on localstorage and after that apply the initial callback
    if ( options.success ) {
      options.realsuccess = options.success;
    }  
    options.success = function( data ) {
      var strdata = data;
      if ( this.dataType.indexOf( 'json' ) === 0 ) strdata = JSON.stringify( data );
      localStorage.setItem( cacheKey, strdata );
      if ( options.realsuccess ) options.realsuccess( data );
    };

    // store timestamp
    if ( ! ttl || ttl === 'expired' ) {
      localStorage.setItem( cacheKey  + 'cachettl', +new Date() + 1000 * 60 * 60 * hourstl );
    }
    
  }
});

// very basic get dribbble shots function
/*global $, jQuery*/
function getshots(name, count, el) {
	'use strict';
	var opt = { player: name, shot_count: count,  elem: el };
	var html = [], i = 0;
	
	$.ajax({
		url: 'http://api.dribbble.com/players/' + opt.player + '/shots',
		localCache: true,
		cacheTTL: 48,
		cacheKey: 'dribbble',
		type: 'GET',
		dataType: 'jsonp',
		success: function (s, status, xhr) {
			html += '<h3><a href="http://dribbble.com/' + opt.player + '" title="View all my shots on Dribbble">Dribbble shots</a></h3>';
			
			$.each(s.shots, function (i, shot) {
				if (i > opt.shot_count) { 
					return false;
				}
				
	    	var created = shot.created_at, c = created.split(' ')[0];
				html += '<figure class="shot">';
				html += '<img src="' + shot.image_teaser_url + '" alt="' + shot.title + '">';
				html += '<a href="' + shot.url + '" title="View ' + shot.title + ' on Dribbble">';
				html += '<figcaption>';
				html += '<span>' + shot.title + '</span>';
				html += '<i data-icon="heart">' + shot.likes_count + '</i>';
				html += '<i data-icon="calendar">' + c + '</i>';
				html += '</figcaption>';
				html += '</figure>';
				html += '</a>';
				i += 1;
	    });
	    
	    $("." + opt.elem).html(html);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			var html = [];
			html += '<h3><a href="http://dribbble.com/' + opt.player + '">Dribbble shots</a></h3>';
			html += '<p>Failed to because of ' + errorThrown + '</p>';
			$(opt.elem).html(html);
		}
	});
}

/**
 *	iamsteve.me site js
 */
$(window).load(function() { 
	$("html").addClass("loaded");
});
$(function() {
	var $html = $("html"),
			$window = $(window),
			$body = $("body"),
			$header = $("[role=\"banner\"]"),
			$d = $(document),
			$top = $(".top");
			$nav = $("header").find("nav"),
			page = window.location.pathname,
			name = page.split('/'),
			$dribbble = 'dribbble',
			next = $('.next a').attr('href'),
			prev = $('.prev a').attr('href');
		
	// general stuff
	// $nav.addClass('hidden');
	$('.title').lettering();
	$('.title').fitText(1, { minFontSize: '48px', maxFontSize: '72px' });
	$('.wordpress_post_formats .title').fitText(1, { minFontSize: '28px', maxFontSize: '68px' });
	
	// do stuff at each breakpoint
	var queries = [
		{
			context: 'a',
			callback: function() { 
				getshots('stevemckinney', 1, $dribbble); }
		},
		{
			context: ['a'],
			call_for_each_context: false,
			callback: function() { 
				getshots('stevemckinney', 1, $dribbble);
			}
		},
		{
			context: ['b'],
			call_for_each_context: false,
			callback: function() { 
				getshots('stevemckinney', 2, $dribbble);
			}
		},
		{
			context: ['c'],
			call_for_each_context: false,
			callback: function() { 
				getshots('stevemckinney', 1, $dribbble);
			}
		},
		{
			context: ['c', 'd', 'e', 'f'],
			call_for_each_context: true,
			callback: function() {
				if($body.hasClass('shown')) $body.removeClass('shown');
			}
		},
		{
			context: ['d', 'e', 'f'],
			call_for_each_context: false,
			callback: function() {
				getshots('stevemckinney', 3, $dribbble);
			}
		}
	];
	MQ.init(queries);
	
	$top.click(function(e) {
		$("body, html").animate({ scrollTop: 0 }, 350, function() {
			$(this).blur();
		}); 		
		e.preventDefault();
	});
	
	$(".mobile").click(function(e) {
    $body.toggleClass("shown");
    e.preventDefault();
	});
			
	$d.on("keydown", function(k) {
		// if were in an input make sure we can still type
		if($(k.target).is(":input")) {
			return; }
		// s key to focus on search
		else if(k.keyCode == 83) {
			$("#keywords").focus(); k.preventDefault(); }
		// left arrow / prev
		else if(k.which == 37 || k.keyCode == 37) {
			if (prev) {
				var url = prev;
				window.location = url; } }
		// right arrow / next
		else if(k.which == 39 || k.keyCode == 39) {
			if (next) {
				var url = next;
				window.location = url; } }
		else {
			return true; }
	});
	$("header").find("h1 a").trigger("hover");
});