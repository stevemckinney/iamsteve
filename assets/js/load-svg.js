(function ()
{ 
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // https://davidwalsh.name/javascript-debounce-function
  var debounce = function(func, wait, immediate)
  {
  	var timeout;
  	
  	return function() {
  		var context = this, args = arguments;
  		
  		var later = function()
  		{
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	}
  }
  
  var dogs = function()
  {
    var img = document.getElementById('rio-osc');
    
    if ( img )
    {
      var dogs = new XMLHttpRequest();
      dogs.open('GET', document.location.origin + '/dist/images/rio-osc.svg', true);
      dogs.send();
      dogs.onload = function(e)
      {
        img.innerHTML = dogs.responseText;
      }
    }
  }
  
  var subscribe = function()
  {
    var img = document.getElementById('subscribe');
    
    if ( img )
    {
      getSubscribeImage();
      window.addEventListener('resize', getSubscribeImage, false);
    }
  }
  
  var getSubscribeImage = debounce(function()
  {
    if ( _room() )
    {
      var sub = new XMLHttpRequest();
      sub.open('GET', document.location.origin + '/dist/images/subscribe.svg', true);
      sub.send();
       
      sub.onload = function(e)
      {
        document.body.insertAdjacentHTML('afterbegin', sub.responseText);
      }
    }
  }, 250);
    
  // Check to see if the window is wide enough to fit the image
  var _room = function()
  {
    if ( window.matchMedia('(min-width: 600px)').matches )
    {
      return true;
    }
  }
  
  return {
    dogs: dogs(),
    sub: subscribe()
  }
})();