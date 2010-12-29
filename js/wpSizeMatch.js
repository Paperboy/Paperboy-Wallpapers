(function(){
 // set up user generated vars
 var width = screen.width,
     height = screen.height,
     gcd = gcdCalc(width,height),
     aspect = (width / gcd) + ':' + (height / gcd),
     pixels = width x height,
     screenSize = width + 'x' + height,
 // hardcoded :( aspect ratios, pixels and sizes available in wallpapers
     sizes = {
      '5:4' : {1310720: '1280x1024'},
      '4:3' : {786432: '1024x768', 1920000: '1600x1200'},
      '16:10' : {1024000: '1280x800', 1296000: '1440x900', 1764000: '1680x1050', 2304000: '1920x1200'},
      '16:9' : {1049088: '1366x768', 2073600: '1920x1080'}
     },
 // get elements and set attributes
     wallpapers = documet.getElementById('wallpapers'),
     wallpaperLinks = wallpapers.find('dd a'),
     matchedSize = {'style' : 'font-weight:bold', 'title' : 'This is your current screen resolution'},
     scaledSize = {'style' : 'font-weight:bold', 'title' : 'This size should scale down nicely on your screen'};
 
 function gcdCalc(a,b) {
  return (b == 0) ? a : gcdCalc (b, a%b); 
 }
 
 // untested, and needs heavy refactoring. :D
 wallpaperLinks.each(function(){
  if (screenSize === $(this).text()){ // if users screen size matches anchor text, set attributes
   $(this).attr(matchedSize);
  } else if (aspect in sizes){ // else check if users aspect ratio matches one of the objects in sizes
     for (var key in sizes[aspect]){ // then loop thru keys in matched object
       if (key > pixels) var match = sizes[aspect][key]; // the first match is when key (pixels) is higher than users pixels
       break;
     }
   if (match && match === $(this).text()){ // if match was found and a wallpapers that matches exist
    $(this).attr(scaledSize); // set secondary attributes
   }
  } 
 });

 console.log(match); // 1920x1080
 console.log(key + " = " + sizes[aspect][key]);
 
})();