"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */
var ConcurrencyQueue=function(){function e(n){var t=n.concurrency;_classCallCheck(this,e),this.concurrency=t,this.queue=[],this.currentlyRunning=0}return _createClass(e,[{key:"enqueue",value:function(e,n){var t=this;e.forEach(function(e){t.queue.push({item:e,factory:n})}),this.start()}},{key:"start",value:function(){for(var e=this;this.currentlyRunning<this.concurrency&&this.queue.length>0;){var n=this.queue.shift(),t=n.item,r=n.factory;this.currentlyRunning++,r(t).then(function(){e.currentlyRunning--,e.start()})["catch"](function(){e.currentlyRunning--,e.start()})}}}]),e}();