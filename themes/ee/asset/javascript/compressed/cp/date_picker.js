void 0===EE.cp&&(EE.cp={}),EE.cp.datePicker={zeropad:function(e){return e+="",2==e.length?e:"0"+e},get_formatted_date:function(e,t){var a=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getDay(),d=e.getHours(),l=e.getMinutes();d=(d+11)%12+1,
// Suffix
1==r?suffix="st":2==r?suffix="nd":3==r?suffix="rd":suffix="th",
// Calculate day of year
diff=e-new Date(e.getFullYear(),0,0),doy=Math.ceil(diff/864e5)-1,
// Calculate days in this month
2==n?1==new Date(a,1,29).getMonth()?days_in_month=29:days_in_month=28:[4,6,9,11].indexOf(n)>-1?days_in_month=30:days_in_month=31;var c={
// Day
d:this.zeropad(r),D:EE.lang.date.days[i],j:r,l:EE.lang.date.days[i],N:0==i?7:i,S:suffix,w:i,z:doy,
// Week
W:Math.ceil(((e-new Date(e.getFullYear(),0,1))/864e5+new Date(e.getFullYear(),0,1).getDay()+1)/7),
// Month
F:EE.lang.date.months.full[n-1],m:this.zeropad(n),M:EE.lang.date.months.abbreviated[n-1],n:n,t:days_in_month,
// Year
L:1==new Date(a,1,29).getMonth()?1:0,
// o: year,
Y:a,y:e.getFullYear().toString().substr(2,2),
// Time
a:e.getHours()<12?"am":"pm",A:e.getHours()<12?"AM":"PM",
// B: '???',
g:d,G:e.getHours(),h:this.zeropad(d),H:this.zeropad(e.getHours()),i:this.zeropad(l),s:this.zeropad(e.getSeconds()),u:e.getMilliseconds(),
// Timezone
// e: foo,
// I: foo,
// O: foo,
// P: foo,
// T: foo,
Z:60*e.getTimezoneOffset()*-1,
// Full Date/Time
// c: foo,
// r: foo,
U:Math.floor(e.getTime()/1e3)},s=/%d|%D|%j|%l|%N|%S|%w|%z|%W|%F|%m|%M|%n|%t|%L|%o|%Y|%y|%a|%A|%B|%g|%G|%h|%H|%i|%s|%u|%e|%I|%O|%P|%T|%Z|%c|%r|%U|"[^"]*"|'[^']*'/g;return t.replace(s,function(e){return e=e.replace("%",""),e in c?c[e]:e.slice(1,e.length-1)})},Calendar:{calendars:[],element:null,
// showing
year:2010,month:0,init:function(e){var t,a=null,n=null,r=null;this.element=e,this.calendars=[];var i=this;if(0==$(".date-picker-wrap").length){var d=$("body");$("#cform").length&&(d=$("#cform")),d.append('<div class="date-picker-wrap"><div class="date-picker-clip"><div class="date-picker-clip-inner"></div></div></div>'),
// listen for clicks on elements classed with .date-picker-next
$(".date-picker-clip-inner").on("click",".date-picker-next",function(e){EE.cp.datePicker.Month.next(),
// animate the scrolling of .date-picker-clip forwards
// to the next .date-picker-item
$(".date-picker-clip").animate({scrollLeft:"+=260"},200),
// stop page from reloading
// the source window and appending # to the URI
e.preventDefault()}),
// listen for clicks on elements classed with .date-picker-back
$(".date-picker-clip-inner").on("click",".date-picker-prev",function(e){EE.cp.datePicker.Month.prev(),
// animate the scrolling of .date-picker-clip backwards
// to the previous .date-picker-item
$(".date-picker-clip").animate({scrollLeft:"-=260"},200),
// stop page from reloading
// the source window and appending # to the URI
e.preventDefault()}),
// listen for clicks on elements classed with .date-picker-back
$(".date-picker-clip-inner").on("click",".date-picker-item td a",function(e){if($(".date-picker-item td.act").removeClass("act"),$(this).closest("td").addClass("act"),$(i.element).val()){var t=new Date(1e3*$(i.element).data("timestamp"));t.setYear(i.year),t.setMonth(i.month),t.setDate($(this).text())}else var t=new Date(i.year,i.month,$(this).text());var a=new Date;t.setHours(a.getHours()),t.setMinutes(a.getMinutes()),t.setSeconds(a.getSeconds());var n=EE.date.date_format;
// Allow custom date format via data-date-format parameter
$(i.element).data("dateFormat")&&(n=$(i.element).data("dateFormat")),$(i.element).val(EE.cp.datePicker.get_formatted_date(t,n)).trigger("change"),$(i.element).data("timestamp",EE.cp.datePicker.get_formatted_date(t,"%U")),$(i.element).focus(),$(".date-picker-wrap").toggle(),e.preventDefault(),e.stopPropagation()}),
// Prevent manual scrolling of the huge inner clip div
$(".date-picker-clip-inner").on("mousewheel",function(e){e.preventDefault()})}if($(this.element).val()){var l=$(this.element).data("timestamp");t=l?new Date(1e3*l):new Date(Date.parse($(this.element).val())),a=t.getUTCDate(),n=t.getUTCFullYear(),r=t.getUTCMonth()}else t=new Date,n=t.getFullYear(),r=t.getMonth();var c=this.generate(n,r);null!=c&&($(".date-picker-clip-inner").html(c),a&&$(".date-picker-item td:contains("+a+")").each(function(){$(this).text()==a&&$(this).addClass("act")}))},generate:function(e,t){if(
// Set variables
this.month=t,this.year=e,this.calendars.indexOf(e+"-"+t)>-1)return null;var a=EE.cp.datePicker.Month.total_days(e,t),n=(EE.cp.datePicker.Month.total_days(e,t-1),EE.cp.datePicker.Month.first_day(e,t)),r=7-(n+a)%7,i=new Date,d=t-1>-1?t-1:11,l=t+1<12?t+1:0;r=7==r?0:r;
// Leading dimmed
for(var c=['<div class="date-picker-item">','<div class="date-picker-heading">','<a class="date-picker-prev" href="">'+EE.lang.date.months.abbreviated[d]+"</a>","<h3>"+EE.lang.date.months.full[t]+" "+e+"</h3>",'<a class="date-picker-next" href="">'+EE.lang.date.months.abbreviated[l]+"</a>","</div>","<table>","<tr>","<th>"+EE.lang.date.days[0]+"</th>","<th>"+EE.lang.date.days[1]+"</th>","<th>"+EE.lang.date.days[2]+"</th>","<th>"+EE.lang.date.days[3]+"</th>","<th>"+EE.lang.date.days[4]+"</th>","<th>"+EE.lang.date.days[5]+"</th>","<th>"+EE.lang.date.days[6]+"</th>","</tr>"],s=["</table>","</div>"],o=["<tr>"],p=1,h=0,u=0;u<n;u++)o[p++]='<td class="empty"></td>',h++;
// Main calendar
for(var f=0;f<a;f++)h&&h%7===0&&(o[p++]="</tr>",o[p++]="<tr>"),i.getFullYear()!=e||i.getMonth()!=t||i.getDate()!=f+1||$(this.element).data("timestamp")?o[p++]='<td><a href="#">':o[p++]='<td class="act"><a href="#">',o[p++]=f+1,o[p++]="</a></td>",h++;
// Trailing dimmed
for(var g=0;g<r;g++)o[p++]='<td class="empty"></td>',h++;return o[p++]="</tr>",this.calendars.push(e+"-"+t),c.join("")+o.join("")+s.join("")}},Month:{select:function(e){var t=new Date(EE.cp.datePicker.Calendar.year,e);return EE.cp.datePicker.Calendar.generate(t.getFullYear(),t.getMonth())},prev:function(){var e=this.select(EE.cp.datePicker.Calendar.month-1);if(null!=e){$(".date-picker-clip-inner").prepend(e);var t=$(".date-picker-clip").scrollLeft();$(".date-picker-clip").scrollLeft(t+260)}},next:function(){var e=this.select(EE.cp.datePicker.Calendar.month+1);null!=e&&$(".date-picker-clip-inner").append(e)},total_days:function(e,t){return 32-new Date(e,t,32).getDate()},first_day:function(e,t){return new Date(e,t,1).getDay()}},Day:{select:function(e){var t=$(".week a").not(".dim"),a=t.length;return isNaN(e)&&(e=t.index(e)+1),e>0&&e<=a&&Calendar.select(e-1),!1}},bind:function(e){$('input[rel="date-picker"]').on("focus",function(){
// find the position of the input clicked
var e=$(this).offset();EE.cp.datePicker.Calendar.init(this),
// position and toggle the .date-picker-wrap relative to the input clicked
$(".date-picker-wrap").css({top:e.top+30,left:e.left}).show()})}},$(document).ready(function(){EE.cp.datePicker.bind($('input[rel="date-picker"]').not(".grid-input-form input")),
// Date fields inside a Grid need to be bound when a new row is added
void 0!==Grid&&Grid.bind("date","display",function(e){EE.cp.datePicker.bind($('input[rel="date-picker"]',e))}),$(document).on("focus","input,select,button",function(e){"date-picker"==$(e.target).attr("rel")||$(e.target).closest(".date-picker-wrap").length||$(".date-picker-wrap").hide()}),$(document).on("click",function(e){"date-picker"==$(e.target).attr("rel")||$(e.target).closest(".date-picker-wrap").length||$(".date-picker-wrap").hide()})});