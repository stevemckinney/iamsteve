sethrefs = function () {
	
	if (document.querySelectorAll) {
	
		var datahrefs = document.querySelectorAll('[data-href]'),
				dhcount = datahrefs.length;
		
		while (dhcount-- > 0) {
			
			var ele = datahrefs[dhcount],
					addevent = function (ele, event, func) {
					
						if(ele.addEventListener) ele.addEventListener(event, link, false);
						else ele.attachEvent('on' + event, link);
					
					},
					link = function (event) {
						
						var target = event.target,
								url = this.getAttribute('data-href');
						
						if (!target.href) {
					    		
			    		var newevent = document.createEvent("MouseEvents");
			    		
			    		if (newevent.initMouseEvent) {
			    		
			    			var newlink = document.createElement("a");
		    			  
		    			  newlink.setAttribute('href', url);
		    			  newlink.innerHTML = 'link event';
		    			  
	    					newevent.initMouseEvent(event.type, true, false, window, event.detail, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button, null);
	    					
	    					newlink.dispatchEvent(newevent);
				    	
				    	}
				    	else {
				    	
				    		var meta = (event.metaKey) ? '_self' : '_blank';
				    		
				    		window.open(url, meta);
				    	
				    	}
					    
						}
						
					};
			
			addevent(ele, 'click', link);
		
		}
	
	}
	
};

sethrefs();
/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+scss */
self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=t.util.clone(e[r]));return a;case"Array":return e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var a=t.util.clone(t.languages[e]);for(var r in n)a[r]=n[r];return a},insertBefore:function(e,n,a,r){r=r||t.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==n)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return t.languages.DFS(t.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,n,a){for(var r in e)e.hasOwnProperty(r)&&(n.call(e,r,e[r],a||r),"Object"===t.util.type(e[r])?t.languages.DFS(e[r],n):"Array"===t.util.type(e[r])&&t.languages.DFS(e[r],n,r))}},highlightAll:function(e,n){for(var a,r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),i=0;a=r[i++];)t.highlightElement(a,e===!0,n)},highlightElement:function(a,r,i){for(var l,o,s=a;s&&!e.test(s.className);)s=s.parentNode;if(s&&(l=(s.className.match(e)||[,""])[1],o=t.languages[l]),o){a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,s=a.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var g=a.textContent;if(g){g=g.replace(/^(?:\r?\n|\r)/,"");var u={element:a,language:l,grammar:o,code:g};if(t.hooks.run("before-highlight",u),r&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){u.highlightedCode=n.stringify(JSON.parse(e.data),l),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(u.element),t.hooks.run("after-highlight",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code}))}else u.highlightedCode=t.highlight(u.code,u.grammar,u.language),t.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(a),t.hooks.run("after-highlight",u)}}},highlight:function(e,a,r){var i=t.tokenize(e,a);return n.stringify(t.util.encode(i),r)},tokenize:function(e,n){var a=t.Token,r=[e],i=n.rest;if(i){for(var l in i)n[l]=i[l];delete n.rest}e:for(var l in n)if(n.hasOwnProperty(l)&&n[l]){var o=n[l];o="Array"===t.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var g=o[s],u=g.inside,c=!!g.lookbehind,f=0,h=g.alias;g=g.pattern||g;for(var p=0;p<r.length;p++){var d=r[p];if(r.length>e.length)break e;if(!(d instanceof a)){g.lastIndex=0;var m=g.exec(d);if(m){c&&(f=m[1].length);var y=m.index-1+f,m=m[0].slice(f),v=m.length,k=y+v,b=d.slice(0,y+1),w=d.slice(k+1),O=[p,1];b&&O.push(b);var N=new a(l,u?t.tokenize(m,u):m,h);O.push(N),w&&O.push(w),Array.prototype.splice.apply(r,O)}}}}}return r},hooks:{all:{},add:function(e,n){var a=t.hooks.all;a[e]=a[e]||[],a[e].push(n)},run:function(e,n){var a=t.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(n)}}},n=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(n.stringify=function(e,a,r){if("string"==typeof e)return e;if("[object Array]"==Object.prototype.toString.call(e))return e.map(function(t){return n.stringify(t,a,e)}).join("");var i={type:e.type,content:n.stringify(e.content,a,r),tag:"span",classes:["token",e.type],attributes:{},language:a,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}t.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'" '+o+">"+i.content+"</"+i.tag+">"},!self.document)return self.addEventListener?(self.addEventListener("message",function(e){var n=JSON.parse(e.data),a=n.language,r=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r,t.languages[a])))),self.close()},!1),self.Prism):self.Prism;var a=document.getElementsByTagName("script");return a=a[a.length-1],a&&(t.filename=a.src,document.addEventListener&&!a.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((?:(["'])(\\\n|\\?.)*?\1|.*?)\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,string:/("|')(\\\n|\\?.)*?\1/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').+?\1/gi,inside:{"attr-name":{pattern:/^\s*style/gi,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/gi,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\\n|\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|-?Infinity)\b/g,"function":/(?!\d)[a-z0-9_$]+(?=\()/gi}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind:!0},atrule:/@[\w-]+(?=\s+(\(|\{|;))/gi,url:/([-a-z]+-)*url(?=\()/gi,selector:/([^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}),Prism.languages.insertBefore("scss","atrule",{keyword:/@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}),Prism.languages.insertBefore("scss","property",{variable:/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}),Prism.languages.insertBefore("scss","function",{placeholder:/%[-_\w]+/i,statement:/\B!(default|optional)\b/gi,"boolean":/\b(true|false)\b/g,"null":/\b(null)\b/g,operator:/\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|%)\s+/g});

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
		}
	});
}
/*global $, jQuery*/

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
			$badges = 'badges',
			next = $('.next a').attr('href'),
			prev = $('.prev a').attr('href');
			
	$html.addClass("loaded");
	$("pre").addClass('language-scss language-markup');
	$(".gist pre").removeClass('language-scss language-markup');
	
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