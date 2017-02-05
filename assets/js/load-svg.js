var svg = (function ()
{ 
  var dogs = function() {
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
    if (_room())
    {
      var sub = new XMLHttpRequest();
      sub.open('GET', document.location.origin + '/dist/images/subscribe.svg', true);
      sub.send();
        
      sub.onload = function(e)
      {
        document.body.insertAdjacentHTML('afterbegin', sub.responseText);
      }
    }
  }
  
  var _room = function()
  {
    if (window.matchMedia("(min-width: 600px)").matches) 
      return true;
  }
  
  return {
    dogs: dogs(),
    sub: subscribe()
  }
})();