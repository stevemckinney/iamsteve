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
    var sub = new XMLHttpRequest();
    sub.open('GET', document.location.origin + '/dist/images/subscribe.svg', true);
    sub.send();
      
    sub.onload = function(e)
    {
      document.body.insertAdjacentHTML('afterbegin', sub.responseText);
    }
  }
  return {
    dogs: dogs(),
    sub: subscribe()
  }
})();