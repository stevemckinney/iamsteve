/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e){n.call(e,r,e[r]);t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data));l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r){return n.stringify(t.tokenize(e,r))},tokenize:function(e,n){var r=t.Token,i=[e],s=n.rest;if(s){for(var o in s)n[o]=s[o];delete n.rest}e:for(var o in n){if(!n.hasOwnProperty(o)||!n[o])continue;var u=n[o],a=u.inside,f=!!u.lookbehind||0;u=u.pattern||u;for(var l=0;l<i.length;l++){var c=i[l];if(i.length>e.length)break e;if(c instanceof r)continue;u.lastIndex=0;var h=u.exec(c);if(h){f&&(f=h[1].length);var p=h.index-1+f,h=h[0].slice(f),d=h.length,v=p+d,m=c.slice(0,p+1),g=c.slice(v+1),y=[l,1];m&&y.push(m);var b=new r(o,a?t.tokenize(h,a):h);y.push(b);g&&y.push(g);Array.prototype.splice.apply(i,y)}}}return i},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e;this.content=t};n.stringify=function(e){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]"){for(var r=0;r<e.length;r++)e[r]=n.stringify(e[r]);return e.join("")}var i={type:e.type,content:n.stringify(e.content),tag:"span",classes:["token",e.type],attributes:{}};i.type=="comment"&&(i.attributes.spellcheck="true");t.hooks.run("wrap",i);var s="";for(var o in i.attributes)s+=o+'="'+(i.attributes[o]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+s+">"+i.content+"</"+i.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r])));self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}})();;
Prism.languages.markup={comment:/&lt;!--[\w\W]*?--(&gt;|&gt;)/g,prolog:/&lt;\?.+?\?&gt;/,doctype:/&lt;!DOCTYPE.+?&gt;/,cdata:/&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,tag:{pattern:/&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?&gt;/gi,inside:{tag:{pattern:/^&lt;\/?[\w:-]+/i,inside:{punctuation:/^&lt;\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|&gt;|"/g}},punctuation:/\/?&gt;/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&amp;#?[\da-z]{1,8};/gi};Prism.hooks.add("wrap",function(e){e.type==="entity"&&(e.attributes.title=e.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:/@[\w-]+?(\s+[^;{]+)?(?=\s*{|\s*;)/gi,url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,property:/(\b|\B)[a-z-]+(?=\s*:)/ig,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,ignore:/&(lt|gt|amp);/gi,punctuation:/[\{\};:]/g};Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{style:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css}}});;
Prism.languages.clike={comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},string:/("|')(\\?.)*?\1/g,keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,number:/\b-?(0x)?\d*\.?[\da-f]+\b/g,operator:/[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,number:/\b(-?(0x)?\d*\.?[\da-f]+|NaN|-?Infinity)\b/g});Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}});Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,inside:{tag:{pattern:/(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript}}});;
Prism.fn = Prism.fn || {};

// Taken from Dabblet source & renamed
Prism.fn.createRegExp = function(str, replacements, flags) {
	for(var id in replacements) {
		var replacement = replacements[id],
			idRegExp = RegExp('{{' + id + '}}', 'gi');

		if(replacement.source) {
			replacement = replacement.source.replace(/^\^|\$$/g, '');
		}

		// Don't add extra parentheses if they already exist
		str = str.replace(RegExp('\\(' + idRegExp.source + '\\)', 'gi'), '(' + replacement + ')');

		str = str.replace(idRegExp, '(?:' + replacement + ')');
	}

	return RegExp(str, flags);
};

Prism.regExp = Prism.regExp || {};

Prism.regExp.number = /-?\d*\.?\d+/;

Prism.languages.sass = Prism.languages.scss = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},

	'control': /@(if|else if|else|for|each|while)/i,
	'directive': /@(import|extend|debug|warn)/i,
	'keyword': /&amp;|@(mixin|include|function|return)/i,

	'atrule': /@[\w-]+?(?=(\s+.+)?(\s*{|\s*;))/gi,
	//'url': /url\((["']?).*?\1\)/gi,
	'string': /("|')(\\?.)*?\1/g,
	'url': /([-a-z]+-)*url(?=\()/gi, // compassified

	'placeholder': /%[-_\w]+/i,
	'variable': /\$[-_\w]+/i,

	'property': /(\b|\B)[a-z-]+(?=\s*:)/ig,

	'important': /\B!important\b/gi,
	'statement': /\B!(default|optional)\b/gi,

	'boolean': /\b(true|false)\b/g,
	'null': /\b(null)\b/g,
	'number': /\b-?(0x)?(\d*\.?\d+|([\da-f]{3}){1,2})(?=(ddpx|px|pt|cm|mm|in|em|ex|pc)|\b)/g,

	// sass short mixin declaration
	'mixin': /(^|\\n)\\s*=.*/g,
	'mixin': /(^|\\n)\\s*\\+.*/g,

	// specific css values (taken from dabblet source)
	'gradient': /\b(repeating-)?(linear|radial)-gradient\(((rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
	'abslength': Prism.fn.createRegExp('(\\b|\\B){{number}}{{unit}}\\b', {
		number: Prism.regExp.number,
		unit: /(cm|mm|in|pt|pc|px)/
	}, 'gi'),
	'easing': Prism.fn.createRegExp('\\b{{bezier}}\\B|\\b{{keyword}}(?=\\s|;|\\}|$)', {
		bezier: Prism.fn.createRegExp('cubic-bezier\\(({{number}},\\s*){3}{{number}}\\)', {
			number: Prism.regExp.number
		}),
		keyword: /linear|ease(-in)?(-out)?/
	}, 'gi'),
	'time': Prism.fn.createRegExp('(\\b|\\B){{number}}m?s\\b', {
		number: Prism.regExp.number
	}, 'gi'),
	'angle': Prism.fn.createRegExp('(\\b|\\B){{number}}(deg|g?rad|turn)\\b', {
		number: Prism.regExp.number
	}, 'gi'),
	'fontfamily': /(("|')[\w\s]+\2,\s*|\w+,\s*)*(sans-serif|serif|monospace|cursive|fantasy)\b/gi,

	'entity': /\\[\da-f]{1,8}/gi,

	//'selector-id': /#(\\w|-|_)+/g,
	//'selector-class': /\\.(\\w|-|_)+/g,
	'selector': /[^;\{\}\(\)\s][^;\{\}\(\)]*(?=\s*\{)/g,

	'operator': /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g,

	'unit': /\b(ddpx|px|pt|cm|mm|in|em|ex|pc)\b|%/i,

	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[\{\}\(\);:,\.#]/g
};
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
			
	$html.addClass("loaded");
	$("pre").addClass('language-scss');
	$(".gist pre").removeClass('language-scss');
	// general stuff
	// $nav.addClass('hidden');
	$('.title').lettering();
	$('.title').fitText(1.5, { minFontSize: '36px', maxFontSize: '72px' });
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