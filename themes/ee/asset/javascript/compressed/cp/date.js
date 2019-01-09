/*!
 * This source file is part of the open source project
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2019, EllisLab Corp. (https://ellislab.com)
 * @license   https://expressionengine.com/license Licensed under Apache License, Version 2.0
 */
!function(t){"use strict";function e(t){return t=t.toString(),t.length<2?"0"+t:t}EE.formatDate=function(n,o){n=n||new Date,o=t.extend({time_format:"12",include_seconds:"n"},o);var u=n.getHours(),r=e(n.getMinutes()),i=e(n.getSeconds()),s=[],a="";return"12"==o.time_format&&(a=u<12?" AM":" PM",u=u%12||12),s.push(u),s.push(r),"y"==o.include_seconds&&s.push(i)," '"+s.join(":")+a+"'"},EE.date_obj_time=EE.formatDate(new Date,EE.date)}(jQuery);