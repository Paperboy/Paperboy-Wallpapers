/**
 * This js includes:
 *
 * Cookie plugin
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Slider Script modified by Paperboy March 20, 2009
 * Originally by Matt Rossi
 * http://ifohdesigns.com/blog/tutorials/
 */
jQuery.cookie = function(name, value, options) {
 if (typeof value != 'undefined'  ||  (name  &&  typeof name != 'string')) { // name and value given, set cookie
  if (typeof name == 'string') {
   options = options || {};
   if (value === null) {
    value = '';
    options.expires = -1;
   }
   var expires = '';
   if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
    var date;
    if (typeof options.expires == 'number') {
     date = new Date();
     date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    } else {
     date = options.expires;
    }
    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
   }
   var path = options.path ? '; path=' + (options.path) : '',
       domain = options.domain ? '; domain=' + (options.domain) : '',
       secure = options.secure ? '; secure' : '';
   document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
  } else { // `name` is really an object of multiple cookies to be set.
   for (var m in name) { jQuery.cookie(m, name[m], value||options); }
  }
} else { // get cookie (or all cookies if name is not provided)
  var r = {};
  if (document.cookie) {
   var cookies = document.cookie.split(';');
   for (var i = 0; i < cookies.length; i++) {
    var cookie = jQuery.trim(cookies[i]);
    if (!name) { // Does this cookie string begin with the name we want?
     var nameLength = cookie.indexOf('=');
     r[ cookie.substr(0, nameLength)] = decodeURIComponent(cookie.substr(nameLength+1));
    } else if (cookie.substr(0, name.length + 1) == (name + '=')) {
     r = decodeURIComponent(cookie.substr(name.length + 1));
     break;
    }
   }
  }
  return r;
 }
};

(function(moreModels, menuToggle, l, path){
 var moreModels = $('#model-list').find('.more-models'),
     menuToggle = $('#menu-toggle'),
     l = $.cookie('l'),
     path = {path:'/'};
 menuToggle.click(function(){
  if (moreModels.is(':hidden')){
   moreModels.slideDown(200);
   $.cookie('l', 'e', path);
   return false;
  } else {
   moreModels.slideUp(200);
   $.cookie('l', null, path); // changed from $.cookie('l','',{path:'/'});
   return false;
  }
 });
 if (l === 'e') moreModels.show();
})();

$('a').click(function(){
 $(this).blur();
});

// Tracking of outbound link clicks
// $('a[href^=http://]').click(function(){
 // _gaq.push(['_trackEvent', 'External', 'Clicked', ($(this).text())+' - '+($(this).attr('href'))]);
// });

(function(){

 var topList = $('#toplist').find('li a'),
     wallpapers = $('#wallpapers'),
     wallpaperLinks = wallpapers.find('dd a'),
     screenSize = screen.width+'x'+screen.height,
     matchedSize = {'style' : 'font-weight:bold', 'title' : 'This is your current screen resolution'},
     scaledSize = {'style' : 'font-weight:bold', 'title' : 'This size should scale down nicely on your screen'};

 topList.click(function(){ // prepend tys url to generated (inc/toplist.php) top friend links
  $(this).attr('href','http://www.trackyourstats.com/cgibin/tys-listout.php?acc=1002396&site='+($(this).attr('href')));
 });

 $('#share').find('a').attr('target','_blank');
 $('#contact input:eq(2)').focus();

 wallpapers.delegate('a[href$=jpg]', 'click', function(){ // Tracking of wp downloads and set target _blank
  var url = $(this).attr('href');
  $(this).attr('target','_blank');
  _gaq.push(['_trackEvent', 'Walls', 'Downloaded', url.substring(url.lastIndexOf('/')+1)]);
 });

 wallpaperLinks.each(function(){
  if (screenSize === $(this).text()){
   $(this).attr(matchedSize);
  } else if (screenSize === '1600x900'){
   $('a:contains("1920x1080")').attr(scaledSize);
  } else if (screenSize in{'1280x720':'', '854x480':''}){
   $('a:contains("1366x768")').attr(scaledSize);
  } else if (screenSize in{'1400x1050':'', '1280x960':'', '1152x864':''}){ // or: if (screenSize === ('1400x1050'||'1280x960'||'1152x864'))
   $('a:contains("1600x1200")').attr(scaledSize);
  } else if (screenSize === '800x600'){
    $('a:contains("1024x768")').attr(scaledSize);
  }
 });
 
})();