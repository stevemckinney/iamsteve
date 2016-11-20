var svg = (function ()
{ 
  var rio = function() {
    var img = document.getElementById('rio');
    
    if ( img )
    {
      var rio = new XMLHttpRequest();
      rio.open('GET', document.location.origin + '/dist/images/rio.svg', true);
      rio.send();
      rio.onload = function(e)
      {
        img.innerHTML = rio.responseText;
      }
    }
  }
  
  var osc = function() {
    var img = document.getElementById('osc');
    
    if ( img )
    {
      var osc = new XMLHttpRequest();
      osc.open('GET', document.location.origin + '/dist/images/osc.svg', true);
      osc.send();
      osc.onload = function(e)
      {
        img.innerHTML = osc.responseText;
      }
    }
  }
  
  return {
    rio: rio(),
    osc: osc()
  }
})();