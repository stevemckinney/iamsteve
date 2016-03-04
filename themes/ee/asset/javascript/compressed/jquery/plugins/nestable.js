/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
!function(t,s,e,i){function o(s,i){this.w=t(e),this.el=t(s),this.options=t.extend({},n,i),this.init()}var a="ontouchstart"in e,l=function(){var t=e.createElement("div"),i=e.documentElement;if(!("pointerEvents"in t.style))return!1;t.style.pointerEvents="auto",t.style.pointerEvents="x",i.appendChild(t);var o=s.getComputedStyle&&"auto"===s.getComputedStyle(t,"").pointerEvents;return i.removeChild(t),!!o}(),n={listNodeName:"ol",itemNodeName:"li",rootClass:"dd",listClass:"dd-list",itemClass:"dd-item",dragClass:"dd-dragel",handleClass:"dd-handle",collapsedClass:"dd-collapsed",placeClass:"dd-placeholder",noDragClass:"dd-nodrag",emptyClass:"dd-empty",expandBtnHTML:'<button data-action="expand" type="button">Expand</button>',collapseBtnHTML:'<button data-action="collapse" type="button">Collapse</button>',group:0,maxDepth:5,threshold:20,constrainToRoot:!1};o.prototype={init:function(){var e=this;e.reset(),0!==this.options.group?e.el.data("nestable-group",this.options.group):e.el.data("nestable-group")!==i&&(this.options.group=e.el.data("nestable-group")),e.placeEl=this.options.placeElement!==i?this.options.placeElement:t('<div class="'+e.options.placeClass+'"/>'),t.each(this.el.find(e.options.itemNodeName+"."+e.options.itemClass),function(s,i){e.setParent(t(i))}),e.el.on("click","button",function(s){if(!e.dragEl){var i=t(s.currentTarget),o=i.data("action"),a=i.parent(e.options.itemNodeName+"."+e.options.itemClass);"collapse"===o&&e.collapseItem(a),"expand"===o&&e.expandItem(a)}});var o=function(s){var i=t(s.target);if(!i.hasClass(e.options.handleClass)){if(i.closest("."+e.options.noDragClass).length)return;i=i.closest("."+e.options.handleClass)}i.length&&!e.dragEl&&(e.isTouch=/^touch/.test(s.type),e.isTouch&&1!==s.touches.length||(s.preventDefault(),e.dragStart(s.touches?s.touches[0]:s)))},l=function(t){e.dragEl&&(t.preventDefault(),e.dragMove(t.touches?t.touches[0]:t))},n=function(t){e.dragEl&&(t.preventDefault(),e.dragStop(t.touches?t.touches[0]:t))};a&&(e.el[0].addEventListener("touchstart",o,!1),s.addEventListener("touchmove",l,!1),s.addEventListener("touchend",n,!1),s.addEventListener("touchcancel",n,!1)),e.el.on("mousedown",o),e.w.on("mousemove",l),e.w.on("mouseup",n)},serialize:function(){var s,e=0,i=this;return step=function(s,e){var o=[],a=s.children(i.options.itemNodeName+"."+i.options.itemClass);return a.each(function(){var s=t(this),a=t.extend({},s.data()),l=s.children(i.options.listNodeName+"."+i.options.listClass);l.length&&(a.children=step(l,e+1)),o.push(a)}),o},s=step(i.el.find(i.options.listNodeName+"."+i.options.listClass).first(),e)},serialise:function(){return this.serialize()},reset:function(){this.mouse={offsetX:0,offsetY:0,startX:0,startY:0,lastX:0,lastY:0,nowX:0,nowY:0,distX:0,distY:0,dirAx:0,dirX:0,dirY:0,lastDirX:0,lastDirY:0,distAxX:0,distAxY:0},this.isTouch=!1,this.moving=!1,this.dragEl=null,this.dragRootEl=null,this.dragDepth=0,this.hasNewRoot=!1,this.pointEl=null},expandItem:function(t){t.removeClass(this.options.collapsedClass),t.children('[data-action="expand"]').hide(),t.children('[data-action="collapse"]').show(),t.children(this.options.listNodeName+"."+this.options.listClass).show()},collapseItem:function(t){var s=t.children(this.options.listNodeName+"."+this.options.listClass);s.length&&(t.addClass(this.options.collapsedClass),t.children('[data-action="collapse"]').hide(),t.children('[data-action="expand"]').show(),t.children(this.options.listNodeName+"."+this.options.listClass).hide())},expandAll:function(){var s=this;s.el.find(s.options.itemNodeName+"."+s.options.itemClass).each(function(){s.expandItem(t(this))})},collapseAll:function(){var s=this;s.el.find(s.options.itemNodeName+"."+s.options.itemClass).each(function(){s.collapseItem(t(this))})},setParent:function(s){s.children(this.options.listNodeName+"."+this.options.listClass).length&&(s.prepend(t(this.options.expandBtnHTML)),s.prepend(t(this.options.collapseBtnHTML))),s.children('[data-action="expand"]').hide()},unsetParent:function(t){t.removeClass(this.options.collapsedClass),t.children("[data-action]").remove(),t.children(this.options.listNodeName+"."+this.options.listClass).remove()},dragStart:function(s){var o=this.mouse,a=t(s.target),l=a.closest(this.options.itemNodeName+"."+this.options.itemClass);this.placeEl.css("height",l.height()),o.offsetX=s.offsetX!==i?s.offsetX:s.pageX-a.offset().left,o.offsetY=s.offsetY!==i?s.offsetY:s.pageY-a.offset().top,o.startX=o.lastX=s.pageX,o.startY=o.lastY=s.pageY,this.dragRootEl=this.el,this.dragEl=t(e.createElement(this.options.listNodeName)).addClass(this.options.listClass+" "+this.options.dragClass.replace("."," ")),this.dragEl.css("width",l.width()),l.after(this.placeEl),l[0].parentNode.removeChild(l[0]),l.appendTo(this.dragEl);
// Either append the dragging element to the body or the root element
var n=this.options.constrainToRoot?this.el:e.body;t(n).append(this.dragEl),
// Account for root element offset if appending to root element
this.dragEl.css(this.options.constrainToRoot?{left:s.pageX-this.el.offset().left-o.offsetX,top:s.pageY-this.el.offset().top-o.offsetY}:{left:s.pageX-o.offsetX,top:s.pageY-o.offsetY});
// total depth of dragging item
var d,h,p=this.dragEl.find(this.options.itemNodeName+"."+this.options.itemClass);for(d=0;d<p.length;d++)h=t(p[d]).parents(this.options.listNodeName+"."+this.options.listClass).length,h>this.dragDepth&&(this.dragDepth=h)},dragStop:function(t){var s=this.dragEl.children(this.options.itemNodeName+"."+this.options.itemClass).first();s[0].parentNode.removeChild(s[0]),this.placeEl.replaceWith(s),this.dragEl.remove(),this.el.trigger("change"),this.hasNewRoot&&this.dragRootEl.trigger("change"),this.reset()},dragMove:function(i){var o,a,n,d,h,p=this.options,r=this.mouse;
// Account for root element offset if appending to root element
this.dragEl.css(this.options.constrainToRoot?{left:i.pageX-this.el.offset().left-r.offsetX,top:i.pageY-this.el.offset().top-r.offsetY}:{left:i.pageX-r.offsetX,top:i.pageY-r.offsetY}),
// mouse position last events
r.lastX=r.nowX,r.lastY=r.nowY,
// mouse position this events
r.nowX=i.pageX,r.nowY=i.pageY,
// distance mouse moved between events
r.distX=r.nowX-r.lastX,r.distY=r.nowY-r.lastY,
// direction mouse was moving
r.lastDirX=r.dirX,r.lastDirY=r.dirY,
// direction mouse is now moving (on both axis)
r.dirX=0===r.distX?0:r.distX>0?1:-1,r.dirY=0===r.distY?0:r.distY>0?1:-1;
// axis mouse is now moving on
var c=Math.abs(r.distX)>Math.abs(r.distY)?1:0;
// do nothing on first move
if(!r.moving)return r.dirAx=c,void(r.moving=!0);
// calc distance moved on this axis (and direction)
r.dirAx!==c?(r.distAxX=0,r.distAxY=0):(r.distAxX+=Math.abs(r.distX),0!==r.dirX&&r.dirX!==r.lastDirX&&(r.distAxX=0),r.distAxY+=Math.abs(r.distY),0!==r.dirY&&r.dirY!==r.lastDirY&&(r.distAxY=0)),r.dirAx=c,/**
             * move horizontal
             */
r.dirAx&&r.distAxX>=p.threshold&&(
// reset move distance on x-axis for new phase
r.distAxX=0,n=this.placeEl.prev(p.itemNodeName+"."+p.itemClass),
// increase horizontal level if previous sibling exists and is not collapsed
r.distX>0&&n.length&&!n.hasClass(p.collapsedClass)&&(
// cannot increase level when item above is collapsed
o=n.find(p.listNodeName+"."+p.listClass).last(),
// check if depth limit has reached
h=this.placeEl.parents(p.listNodeName+"."+p.listClass).length,h+this.dragDepth<=p.maxDepth&&(
// create new sub-level if one doesn't exist
o.length?(
// else append to next level up
o=n.children(p.listNodeName+"."+p.listClass).last(),o.append(this.placeEl)):(o=t("<"+p.listNodeName+"/>").addClass(p.listClass),o.append(this.placeEl),n.append(o),this.setParent(n)))),
// decrease horizontal level
r.distX<0&&(
// we can't decrease a level if an item preceeds the current one
d=this.placeEl.next(p.itemNodeName+"."+p.itemClass),d.length||(a=this.placeEl.parent(),this.placeEl.closest(p.itemNodeName+"."+p.itemClass).after(this.placeEl),a.children().length||this.unsetParent(a.parent()))));var f=!1;if(
// find list item under cursor
l||(this.dragEl[0].style.visibility="hidden"),this.pointEl=t(e.elementFromPoint(i.pageX-e.body.scrollLeft,i.pageY-(s.pageYOffset||e.documentElement.scrollTop))),l||(this.dragEl[0].style.visibility="visible"),this.pointEl.hasClass(p.handleClass)&&(this.pointEl=this.pointEl.closest(p.itemNodeName+"."+p.itemClass)),this.pointEl.hasClass(p.emptyClass))f=!0;else if(!this.pointEl.length||!this.pointEl.hasClass(p.itemClass))return;
// find parent list of item under cursor
var m=this.pointEl.closest("."+p.rootClass),g=this.dragRootEl.data("nestable-id")!==m.data("nestable-id");/**
             * move vertical
             */
if(!r.dirAx||g||f){
// check if groups match if dragging over new root
if(g&&0!==p.group&&p.group!==m.data("nestable-group"))return;if(
// check depth limit
h=this.dragDepth-1+this.pointEl.parents(p.listNodeName+"."+p.listClass).length,h>p.maxDepth)return;var u=i.pageY<this.pointEl.offset().top+this.pointEl.height()/2;a=this.placeEl.parent(),
// if empty create new list to replace empty placeholder
f?(o=t(e.createElement(p.listNodeName)).addClass(p.listClass),o.append(this.placeEl),this.pointEl.replaceWith(o)):u?this.pointEl.before(this.placeEl):this.pointEl.after(this.placeEl),a.children().length||this.unsetParent(a.parent()),this.dragRootEl.find(p.itemNodeName+"."+p.itemClass).length||this.dragRootEl.append('<div class="'+p.emptyClass+'"/>'),
// parent root list has changed
g&&(this.dragRootEl=m,this.hasNewRoot=this.el[0]!==this.dragRootEl[0])}}},t.fn.nestable=function(s){var e=this,i=this;return e.each(function(){var e=t(this).data("nestable");e?"string"==typeof s&&"function"==typeof e[s]&&(i=e[s]()):(t(this).data("nestable",new o(this,s)),t(this).data("nestable-id",(new Date).getTime()))}),i||e}}(window.jQuery||window.Zepto,window,document);