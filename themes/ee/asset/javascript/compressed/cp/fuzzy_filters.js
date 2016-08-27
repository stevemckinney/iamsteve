!function(t){/**
 * A class to fuzzy search on a list:
 *
 * options.keep - selector of items that are always visible
 *
 * fuzzy = new FuzzyListSearch($('ul'), {keep: 'selector'});
 * fuzzy.filter('cho'); // will match "choice", "cathode", "bachelor"
 *
 */
function e(e,i){this.ul=e,this.keep=t();var s=e.find("li");i.keep&&(this.keep=this.ul.find(i.keep),s=s.not(i.keep)),this.items=s.map(function(e){return{el:this,text:t(this).text(),score:1,origIndex:e}}),this.length=this.items.length}/**
 * A helper class to handle moving the .act class up and down through
 * a list that is potentially reordered and has hidden elements.
 */
function i(t){this.ul=t,this.items=t.find("li"),this.isNav=!!t.closest(".nav-main").length,this.scrollWrap=this.getScrollWrap(),this.scrollOffset=this.isNav?7:4,this.current=-1,this.scrolled=0,this.setLength(this.items)}e.prototype={/**
	 * Score each item based on search, reorder by scores, and hide
	 * any with a score of 0
	 */
filter:function(e){if(""==e)return this.reset();var i=0,s=this;
// update the score and show/hide
_.each(this.items,function(n){n.score=s._scoreString(n.text,e),t(n.el).toggle(0!=n.score),i+=Math.ceil(n.score)}),this.length=i,this.items.sort(function(t,e){return e.score-t.score}),this._update()},/**
	 * Show the entire list
	 */
reset:function(){_.each(this.items,function(e){t(e.el).toggle(!0)}),this.length=this.items.length,this.items.sort(function(t,e){return t.origIndex-e.origIndex}),this._update()},/**
	 * Re-render the list, make sure keep elements are always there
	 */
_update:function(){this.ul.empty().append(_.pluck(this.items,"el")),this.ul.append(this.keep)},/**
	 * Rough fuzzy matching scorer
	 */
_scoreString:function(t,e){var i=0,s=1,n=e.length;t=t.toLowerCase(),
// First letter match is a big plus
t[0]==e[0]&&(i+=1);for(var r=0;r<n;r++){var h=t.indexOf(e.charAt(r).toLowerCase());switch(h){case-1:return 0;// not found, not our word
case 0:i+=.6,// first position, good
r==s&&(// consecutive, better
i+=.4);break;default:i+=.4/s}s+=h,t=t.substr(h+1)}
// Score per letter * letter per item letter looked at
return i/n*(n/s)}},i.prototype={getScrollWrap:function(){return this.isNav?this.ul:this.ul.closest(".scroll-wrap")},/**
	 * Set the focus index
	 */
setCurrent:function(t){return this.current=t,this.ul.find("li a.act").removeClass("act"),t<0?void(this.active=null):(this.active=this.ul.find("li a:visible").eq(t),this.active.addClass("act"),void this._updateScroll())},/**
	 * Get the focused element
	 */
getCurrent:function(){return this.active},/**
	 * Update the known list length
	 */
setLength:function(t){this.length=t},/**
	 * Make sure the active element is visible
	 */
_updateScroll:function(){var t=this.current-this.scrolled;t>this.scrollOffset?this.scrolled+=t-this.scrollOffset:t<=0&&(this.scrolled+=t),this.scrollWrap.scrollTop(this.scrolled*this.active.outerHeight())},/**
	 * Move the focus down one element if possible
	 */
down:function(){this.setCurrent(Math.min(this.length,this.current+1))},/**
	 * Move the focus up one element if possible
	 */
up:function(){this.setCurrent(Math.max(0,this.current-1))}};/**
 * And now the glue code. Given the <input> element on one of our
 * filter lists, fuzzy search through the list and allow the user to
 * arrow through it to select an element.
 */
var s={enter:13,escape:27,up:38,right:39,down:40};t.fn.fuzzyFilter=function(){return this.each(function(){if(!t(this).data("fuzzyFilterActive")){t(this).data("fuzzyFilterActive",!0);var n=t(this),r=t(this).closest(".sub-menu, .nav-sub-menu").find("ul"),h=new i(r),l=new e(r,{keep:":has(.add, .nav-add)"}),u=h.getScrollWrap();
// the input gains focus when it becomes visible. at this point
// we want to make sure that our menu isn't going to shrink horizontally
// as longer words are filtered out.
n.on("focus",function(){u.width(u.width())}),n.on("keydown",function(t){switch(h.setLength(l.length),t.keyCode){case s.enter:t.preventDefault(),h.getCurrent()[0].click();break;case s.escape:n.val("");break;case s.up:h.up();break;case s.down:h.down();break;default:return}t.preventDefault()}),n.on("interact",function(){l.filter(n.val()),h.setCurrent(0)})}})},t.fuzzyFilter=function(){t(".nav-filter input, .filters input[data-fuzzy-filter=true]").fuzzyFilter()},
// and create the defaults, third parties can call this to "refresh"
t.fuzzyFilter()}(jQuery);