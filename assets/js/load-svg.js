var svg = (function ()
{ 
  var rio = function() {
    var rio = new XMLHttpRequest();
    rio.open('GET', 'dist/images/rio.svg', true);
    rio.send();
    rio.onload = function(e)
    {
      var img = document.getElementById('rio');
      img.innerHTML = rio.responseText;
    }
  }
  
  var osc = function() {
    var osc = new XMLHttpRequest();
    osc.open('GET', 'dist/images/osc.svg', true);
    osc.send();
    osc.onload = function(e)
    {
      var img = document.getElementById('osc');
      img.innerHTML = osc.responseText;
    }
  }
  
  return {
    rio: rio(),
    osc: osc()
  }
})();