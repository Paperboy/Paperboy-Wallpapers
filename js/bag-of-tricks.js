if (typeof window.console === 'undefined'){
 var console = { log: function(e){/* alert(e) */} }
}

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

// Expandable model list, remember state by setting cookie
(function() {
    var moreModels = $('#model-list').find('.more-models'),
        menuToggle = $('#menu-toggle'),
        l = $.cookie('l'),
        path = { path: '/' };
    menuToggle.click(function() {
        if (moreModels.is(':hidden')) {
            moreModels.slideDown(200);
            $.cookie('l', 'e', path);
            return false;
        } else {
            moreModels.slideUp(200);
            $.cookie('l', null, path);
            return false;
        }
    });
    if (l === 'e') { moreModels.show(); }
})();

// Top friend links tracking
$('#toplist').find('li a').click(function(){ // prepend tys url to generated (inc/toplist.php) top friend links
    $(this).attr('href','http://www.trackyourstats.com/cgibin/tys-listout.php?acc=1002396&site='+($(this).attr('href')));
});

// Other random stuff..
$('#share').find('a').attr('target','_blank');
$('#contact input:eq(2)').focus();

$('a').click(function(){
    $(this).blur();
});

// Tracking of outbound link clicks
// $('a[href^=http://]').click(function(){
 // _gaq.push(['_trackEvent', 'External', 'Clicked', ($(this).text())+' - '+($(this).attr('href'))]);
// });

// Fn to calculate greatest common divisor -- GCD
function gcdCalc(a, b) {
    return (b === 0) ? a : gcdCalc(b, a % b);
}

// Hints the user which wallpaper links ~match their current screen resolution
(function() {
    // set up user generated vars
    var width = 1280, // hard coded for now to test res other than mine
        height = 720,
        gcd = gcdCalc(width, height),
        aspect = (width / gcd) + ':' + (height / gcd),
        pixels = width * height,
        screenSize = width + 'x' + height,
        // hardcoded aspect ratios, pixels and sizes available in #wallpapers
        sizes = {
            '5:4': {
                1310720: '1280x1024'
            },
            '4:3': {
                786432: '1024x768',
                1920000: '1600x1200'
            },
            '16:10': {
                1024000: '1280x800',
                1296000: '1440x900',
                1764000: '1680x1050',
                2304000: '1920x1200'
            },
            '16:9': {
                1049088: '1366x768',
                2073600: '1920x1080'
            }
        },
        // get elements and stuff..
        wallpapers = $('#wallpapers'),
        wallpaperLinks = wallpapers.find('dd a'),
        match;

    // not fully tested
    wallpaperLinks.each(function() {
        if (screenSize === $(this).text()) { // if users screen size matches anchor text, set attributes
            $(this).addClass('match')
                   .attr('title', 'This is your current screen resolution');
        } else {
            if (aspect in sizes) { // else check if users aspect ratio matches one of the objects in sizes
                for (var prop in sizes[aspect]) { // then loop thru keys in matched object
                    if (sizes[aspect].hasOwnProperty(prop) && prop > pixels) {
                        match = sizes[aspect][prop]; // the first match is when key (pixels) is higher than users pixels
                        break;
                    }
                }
                if (match && match === $(this).text()) { // if match was found and a wallpapers that matches exist
                    $(this).addClass('match')
                           .attr('title', 'This size should scale down nicely on your screen'); // set secondary attributes
                    //console.log(prop + " = " + sizes[aspect][prop]);
                }
            }
        }
    });
    
    wallpapers.delegate('a[href$=jpg]', 'click', function(){ // Tracking of wp downloads and set target _blank on wps
        var url = $(this).attr('href');
        $(this).attr('target','_blank');
        //_gaq.push(['_trackEvent', 'Walls', 'Downloaded', url.substring(url.lastIndexOf('/')+1)]);
    });

    console.log(match); // 1920x1080
    console.log(aspect);

})();