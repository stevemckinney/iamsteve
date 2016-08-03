/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2010-01-23
 * @link    http://jscolor.com
 */
var jscolor={dir:EE.PATH_CP_GBL_IMG,// location of jscolor directory (leave empty to autodetect)
bindClass:"color",// class name
binding:!0,// automatic binding via <input class="...">
preloading:!0,// use image preloading?
install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){jscolor.binding&&jscolor.bind(),jscolor.preloading&&jscolor.preload()},getDir:function(){if(!jscolor.dir){var e=jscolor.detectDir();jscolor.dir=e!==!1?e:"jscolor/"}return jscolor.dir},detectDir:function(){for(var e=location.href,o=document.getElementsByTagName("base"),t=0;t<o.length;t+=1)o[t].href&&(e=o[t].href);for(var o=document.getElementsByTagName("script"),t=0;t<o.length;t+=1)if(o[t].src&&/(^|\/)jscolor\.js([?#].*)?$/i.test(o[t].src)){var r=new jscolor.URI(o[t].src),s=r.toAbsolute(e);// remove filename
return s.path=s.path.replace(/[^\/]+$/,""),s.query=null,s.fragment=null,s.toString()}return!1},bind:function(){for(var matchClass=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i"),e=document.getElementsByTagName("input"),i=0;i<e.length;i+=1){var m;if(!e[i].color&&e[i].className&&(m=e[i].className.match(matchClass))){var prop={};if(m[3])try{eval("prop="+m[3])}catch(eInvalidProp){}e[i].color=new jscolor.color(e[i],prop)}}},preload:function(){for(var e in jscolor.imgRequire)jscolor.imgRequire.hasOwnProperty(e)&&jscolor.loadImage(e)},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(e){jscolor.imgRequire[e]=!0},loadImage:function(e){jscolor.imgLoaded[e]||(jscolor.imgLoaded[e]=new Image,jscolor.imgLoaded[e].src=jscolor.getDir()+e)},fetchElement:function(e){return"string"==typeof e?document.getElementById(e):e},addEvent:function(e,o,t){e.addEventListener?e.addEventListener(o,t,!1):e.attachEvent&&e.attachEvent("on"+o,t)},fireEvent:function(e,o){if(e)if(document.createEventObject){var t=document.createEventObject();e.fireEvent("on"+o,t)}else if(document.createEvent){var t=document.createEvent("HTMLEvents");t.initEvent(o,!0,!0),e.dispatchEvent(t)}else e["on"+o]&&// alternatively use the traditional event model (IE5)
e["on"+o]()},getElementPos:function(e){var o=e,t=e,r=0,s=0;if(o.offsetParent)do r+=o.offsetLeft,s+=o.offsetTop;while(o=o.offsetParent);for(;(t=t.parentNode)&&"BODY"!==t.nodeName.toUpperCase();)r-=t.scrollLeft,s-=t.scrollTop;return[r,s]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getMousePos:function(e){return e||(e=window.event),"number"==typeof e.pageX?[e.pageX,e.pageY]:"number"==typeof e.clientX?[e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,e.clientY+document.body.scrollTop+document.documentElement.scrollTop]:void 0},getViewPos:function(){return"number"==typeof window.pageYOffset?[window.pageXOffset,window.pageYOffset]:document.body&&(document.body.scrollLeft||document.body.scrollTop)?[document.body.scrollLeft,document.body.scrollTop]:document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)?[document.documentElement.scrollLeft,document.documentElement.scrollTop]:[0,0]},getViewSize:function(){return"number"==typeof window.innerWidth?[window.innerWidth,window.innerHeight]:document.body&&(document.body.clientWidth||document.body.clientHeight)?[document.body.clientWidth,document.body.clientHeight]:document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?[document.documentElement.clientWidth,document.documentElement.clientHeight]:[0,0]},URI:function(e){function o(e){for(var o="";e;)if("../"===e.substr(0,3)||"./"===e.substr(0,2))e=e.replace(/^\.+/,"").substr(1);else if("/./"===e.substr(0,3)||"/."===e)e="/"+e.substr(3);else if("/../"===e.substr(0,4)||"/.."===e)e="/"+e.substr(4),o=o.replace(/\/?[^\/]*$/,"");else if("."===e||".."===e)e="";else{var t=e.match(/^\/?[^\/]*/)[0];e=e.substr(t.length),o+=t}return o}// See RFC3986
this.scheme=null,this.authority=null,this.path="",this.query=null,this.fragment=null,this.parse=function(e){var o=e.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);return this.scheme=o[3]?o[2]:null,this.authority=o[5]?o[6]:null,this.path=o[7],this.query=o[9]?o[10]:null,this.fragment=o[12]?o[13]:null,this},this.toString=function(){var e="";return null!==this.scheme&&(e=e+this.scheme+":"),null!==this.authority&&(e=e+"//"+this.authority),null!==this.path&&(e+=this.path),null!==this.query&&(e=e+"?"+this.query),null!==this.fragment&&(e=e+"#"+this.fragment),e},this.toAbsolute=function(e){var e=new jscolor.URI(e),t=this,r=new jscolor.URI;// TODO: == or === ?
// TODO: == or === ?
return null!==e.scheme&&(null!==t.scheme&&t.scheme.toLowerCase()===e.scheme.toLowerCase()&&(t.scheme=null),null!==t.scheme?(r.scheme=t.scheme,r.authority=t.authority,r.path=o(t.path),r.query=t.query):(null!==t.authority?(r.authority=t.authority,r.path=o(t.path),r.query=t.query):(""===t.path?(r.path=e.path,null!==t.query?r.query=t.query:r.query=e.query):("/"===t.path.substr(0,1)?r.path=o(t.path):(null!==e.authority&&""===e.path?r.path="/"+t.path:r.path=e.path.replace(/[^\/]+$/,"")+t.path,r.path=o(r.path)),r.query=t.query),r.authority=e.authority),r.scheme=e.scheme),r.fragment=t.fragment,r)},e&&this.parse(e)},/*
	 * Usage example:
	 * var myColor = new jscolor.color(myInputElement)
	 */
color:function(e,o){function t(e,o,t){var r=Math.min(Math.min(e,o),t),s=Math.max(Math.max(e,o),t),i=s-r;if(0===i)return[null,0,s];var c=e===r?3+(t-o)/i:o===r?5+(e-t)/i:1+(o-e)/i;return[6===c?0:c,i/s,s]}function r(e,o,t){if(null===e)return[t,t,t];var r=Math.floor(e),s=r%2?e-r:1-(e-r),i=t*(1-o),c=t*(1-o*s);switch(r){case 6:case 0:return[t,c,i];case 1:return[c,t,i];case 2:return[i,t,c];case 3:return[i,c,t];case 4:return[c,i,t];case 5:return[t,i,c]}}function s(){delete jscolor.picker.owner,document.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)}function i(o,t){if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div")};for(var r=0,s=4;r<jscolor.images.sld[1];r+=s){var i=document.createElement("div");i.style.height=s+"px",i.style.fontSize="1px",i.style.lineHeight="0",jscolor.picker.sld.appendChild(i)}jscolor.picker.sldB.appendChild(jscolor.picker.sld),jscolor.picker.box.appendChild(jscolor.picker.sldB),jscolor.picker.box.appendChild(jscolor.picker.sldM),jscolor.picker.padB.appendChild(jscolor.picker.pad),jscolor.picker.box.appendChild(jscolor.picker.padB),jscolor.picker.box.appendChild(jscolor.picker.padM),jscolor.picker.boxB.appendChild(jscolor.picker.box)}var n=jscolor.picker;
// recompute controls positions
m=[o+f.pickerBorder+f.pickerFace+f.pickerInset,t+f.pickerBorder+f.pickerFace+f.pickerInset],g=[null,t+f.pickerBorder+f.pickerFace+f.pickerInset],
// controls interaction
n.box.onmouseup=n.box.onmouseout=function(){e.focus()},n.box.onmousedown=function(){y=!0},n.box.onmousemove=function(e){v&&u(e),w&&h(e)},n.padM.onmouseup=n.padM.onmouseout=function(){v&&(v=!1,jscolor.fireEvent(k,"change"))},n.padM.onmousedown=function(e){v=!0,u(e)},n.sldM.onmouseup=n.sldM.onmouseout=function(){w&&(w=!1,jscolor.fireEvent(k,"change"))},n.sldM.onmousedown=function(e){w=!0,h(e)},
// picker
n.box.style.width=4*f.pickerInset+2*f.pickerFace+jscolor.images.pad[0]+2*jscolor.images.arrow[0]+jscolor.images.sld[0]+"px",n.box.style.height=2*f.pickerInset+2*f.pickerFace+jscolor.images.pad[1]+"px",
// picker border
n.boxB.style.position="absolute",n.boxB.style.clear="both",n.boxB.style.left=o+"px",n.boxB.style.top=t+"px",n.boxB.style.zIndex=f.pickerZIndex,n.boxB.style.border=f.pickerBorder+"px solid",n.boxB.style.borderColor=f.pickerBorderColor,n.boxB.style.background=f.pickerFaceColor,
// pad image
n.pad.style.width=jscolor.images.pad[0]+"px",n.pad.style.height=jscolor.images.pad[1]+"px",
// pad border
n.padB.style.position="absolute",n.padB.style.left=f.pickerFace+"px",n.padB.style.top=f.pickerFace+"px",n.padB.style.border=f.pickerInset+"px solid",n.padB.style.borderColor=f.pickerInsetColor,
// pad mouse area
n.padM.style.position="absolute",n.padM.style.left="0",n.padM.style.top="0",n.padM.style.width=f.pickerFace+2*f.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px",n.padM.style.height=n.box.style.height,n.padM.style.cursor="crosshair",
// slider image
n.sld.style.overflow="hidden",n.sld.style.width=jscolor.images.sld[0]+"px",n.sld.style.height=jscolor.images.sld[1]+"px",
// slider border
n.sldB.style.position="absolute",n.sldB.style.right=f.pickerFace+"px",n.sldB.style.top=f.pickerFace+"px",n.sldB.style.border=f.pickerInset+"px solid",n.sldB.style.borderColor=f.pickerInsetColor,
// slider mouse area
n.sldM.style.position="absolute",n.sldM.style.right="0",n.sldM.style.top="0",n.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+f.pickerFace+2*f.pickerInset+"px",n.sldM.style.height=n.box.style.height;try{n.sldM.style.cursor="pointer"}catch(a){n.sldM.style.cursor="hand"}
// load images in optimal order
switch(b){case 0:var d="hs.png";break;case 1:var d="hv.png"}n.padM.style.background="url('"+jscolor.getDir()+"cross.gif') no-repeat",n.sldM.style.background="url('"+jscolor.getDir()+"arrow.gif') no-repeat",n.pad.style.background="url('"+jscolor.getDir()+d+"') 0 0 no-repeat",
// place pointers
c(),l(),jscolor.picker.owner=f,document.getElementsByTagName("body")[0].appendChild(n.boxB)}function c(){
// redraw the pad pointer
switch(b){case 0:var e=1;break;case 1:var e=2}var o=Math.round(f.hsv[0]/6*(jscolor.images.pad[0]-1)),t=Math.round((1-f.hsv[e])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=f.pickerFace+f.pickerInset+o-Math.floor(jscolor.images.cross[0]/2)+"px "+(f.pickerFace+f.pickerInset+t-Math.floor(jscolor.images.cross[1]/2))+"px";
// redraw the slider image
var s=jscolor.picker.sld.childNodes;switch(b){case 0:for(var i=r(f.hsv[0],f.hsv[1],1),c=0;c<s.length;c+=1)s[c].style.backgroundColor="rgb("+i[0]*(1-c/s.length)*100+"%,"+i[1]*(1-c/s.length)*100+"%,"+i[2]*(1-c/s.length)*100+"%)";break;case 1:var i,l,n=[f.hsv[2],0,0],c=Math.floor(f.hsv[0]),a=c%2?f.hsv[0]-c:1-(f.hsv[0]-c);switch(c){case 6:case 0:i=[0,1,2];break;case 1:i=[1,0,2];break;case 2:i=[2,0,1];break;case 3:i=[2,1,0];break;case 4:i=[1,2,0];break;case 5:i=[0,2,1]}for(var c=0;c<s.length;c+=1)l=1-1/(s.length-1)*c,n[1]=n[0]*(1-l*a),n[2]=n[0]*(1-l),s[c].style.backgroundColor="rgb("+100*n[i[0]]+"%,"+100*n[i[1]]+"%,"+100*n[i[2]]+"%)"}}function l(){
// redraw the slider pointer
switch(b){case 0:var e=2;break;case 1:var e=1}var o=Math.round((1-f.hsv[e])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(f.pickerFace+f.pickerInset+o-Math.floor(jscolor.images.arrow[1]/2))+"px"}function n(){return jscolor.picker&&jscolor.picker.owner===f}function a(){k===e&&f.importColor(),f.pickerOnfocus&&f.hidePicker()}function d(){k!==e&&f.importColor()}function u(e){var o=jscolor.getMousePos(e),t=o[0]-m[0],r=o[1]-m[1];switch(b){case 0:f.fromHSV(t*(6/(jscolor.images.pad[0]-1)),1-r/(jscolor.images.pad[1]-1),null,M);break;case 1:f.fromHSV(t*(6/(jscolor.images.pad[0]-1)),null,1-r/(jscolor.images.pad[1]-1),M)}}function h(e){var o=jscolor.getMousePos(e),t=o[1]-m[1];switch(b){case 0:f.fromHSV(null,null,1-t/(jscolor.images.sld[1]-1),C);break;case 1:f.fromHSV(null,1-t/(jscolor.images.sld[1]-1),null,C)}}this.required=!0,// refuse empty values?
this.adjust=!0,// adjust value to uniform notation?
this.hash=!1,// prefix color with # symbol?
this.caps=!0,// uppercase?
this.valueElement=e,// value holder
this.styleElement=e,// where to reflect current color
this.hsv=[0,0,1],// read-only  0-6, 0-1, 0-1
this.rgb=[1,1,1],// read-only  0-1, 0-1, 0-1
this.pickerOnfocus=!0,// display picker on focus?
this.pickerMode="HSV",// HSV | HVS
this.pickerPosition="bottom",// left | right | top | bottom
this.pickerFace=10,// px
this.pickerFaceColor="#f4f6f6",// CSS color
this.pickerBorder=1,// px
this.pickerBorderColor="#d0d7df",// CSS color
this.pickerInset=1,// px
this.pickerInsetColor="#d0d7df",// CSS color
this.pickerZIndex=1e4;for(var p in o)o.hasOwnProperty(p)&&(this[p]=o[p]);this.hidePicker=function(){n()&&s()},this.showPicker=function(){if(!n()){var o,t,r,s=jscolor.getElementPos(e),c=jscolor.getElementSize(e),l=jscolor.getViewPos(),a=jscolor.getViewSize(),d=[// picker size
2*this.pickerBorder+4*this.pickerInset+2*this.pickerFace+jscolor.images.pad[0]+2*jscolor.images.arrow[0]+jscolor.images.sld[0],2*this.pickerBorder+2*this.pickerInset+2*this.pickerFace+jscolor.images.pad[1]];switch(this.pickerPosition.toLowerCase()){case"left":o=1,t=0,r=-1;break;case"right":o=1,t=0,r=1;break;case"top":o=0,t=1,r=-1;break;default:o=0,t=1,r=1}var u=(c[t]+d[t])/2,h=[// picker pos
-l[o]+s[o]+d[o]>a[o]&&-l[o]+s[o]+c[o]/2>a[o]/2&&s[o]+c[o]-d[o]>=0?s[o]+c[o]-d[o]:s[o],-l[t]+s[t]+c[t]+d[t]-u+u*r>a[t]?-l[t]+s[t]+c[t]/2>a[t]/2&&s[t]+c[t]-u-u*r>=0?s[t]+c[t]-u-u*r:s[t]+c[t]-u+u*r:s[t]+c[t]-u+u*r>=0?s[t]+c[t]-u+u*r:s[t]+c[t]-u-u*r];i(h[o],h[t])}},this.importColor=function(){k?this.adjust?!this.required&&/^\s*$/.test(k.value)?(k.value="",j.style.backgroundColor=j.jscStyle.backgroundColor,j.style.color=j.jscStyle.color,this.exportColor(E|x)):this.fromString(k.value)||this.exportColor():this.fromString(k.value,E)||(j.style.backgroundColor=j.jscStyle.backgroundColor,j.style.color=j.jscStyle.color,this.exportColor(E|x)):this.exportColor()},this.exportColor=function(e){if(!(e&E)&&k){var o=this.toString();this.caps&&(o=o.toUpperCase()),this.hash&&(o="#"+o),k.value=o}e&x||!j||(j.style.backgroundColor="#"+this.toString(),j.style.color=.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]<.5?"#FFF":"#000"),e&C||!n()||c(),e&M||!n()||l()},this.fromHSV=function(e,o,t,s){// null = don't change
e<0&&(e=0)||e>6&&(e=6),o<0&&(o=0)||o>1&&(o=1),t<0&&(t=0)||t>1&&(t=1),this.rgb=r(null===e?this.hsv[0]:this.hsv[0]=e,null===o?this.hsv[1]:this.hsv[1]=o,null===t?this.hsv[2]:this.hsv[2]=t),this.exportColor(s)},this.fromRGB=function(e,o,r,s){// null = don't change
e<0&&(e=0)||e>1&&(e=1),o<0&&(o=0)||o>1&&(o=1),r<0&&(r=0)||r>1&&(r=1);var i=t(null===e?this.rgb[0]:this.rgb[0]=e,null===o?this.rgb[1]:this.rgb[1]=o,null===r?this.rgb[2]:this.rgb[2]=r);null!==i[0]&&(this.hsv[0]=i[0]),0!==i[2]&&(this.hsv[1]=i[1]),this.hsv[2]=i[2],this.exportColor(s)},this.fromString=function(e,o){var t=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);// 6-char notation
// 3-char notation
return!!t&&(6===t[1].length?this.fromRGB(parseInt(t[1].substr(0,2),16)/255,parseInt(t[1].substr(2,2),16)/255,parseInt(t[1].substr(4,2),16)/255,o):this.fromRGB(parseInt(t[1].charAt(0)+t[1].charAt(0),16)/255,parseInt(t[1].charAt(1)+t[1].charAt(1),16)/255,parseInt(t[1].charAt(2)+t[1].charAt(2),16)/255,o),!0)},this.toString=function(){return(256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1)};var m,g,f=this,b="hvs"===this.pickerMode.toLowerCase()?1:0,y=!1,k=jscolor.fetchElement(this.valueElement),j=jscolor.fetchElement(this.styleElement),v=!1,w=!1,E=1,x=2,C=4,M=8;
// valueElement
if(
// target
jscolor.addEvent(e,"focus",function(){f.pickerOnfocus&&f.showPicker()}),jscolor.addEvent(e,"blur",function(){y?y=!1:window.setTimeout(function(){y||a(),y=!1},0)}),k){var B=function(){f.fromString(k.value,E)};jscolor.addEvent(k,"keyup",B),jscolor.addEvent(k,"input",B),jscolor.addEvent(k,"blur",d),k.setAttribute("autocomplete","off")}
// require images
switch(
// styleElement
j&&(j.jscStyle={backgroundColor:j.style.backgroundColor,color:j.style.color}),b){case 0:jscolor.requireImage("hs.png");break;case 1:jscolor.requireImage("hv.png")}jscolor.requireImage("cross.gif"),jscolor.requireImage("arrow.gif"),this.importColor()}};jscolor.install();