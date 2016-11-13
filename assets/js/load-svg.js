var svg = (function ()
{ 
  var call = function() {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'dist/images/rio.svg', true);
    ajax.send();
    ajax.onload = function(e)
    {
      var img = document.getElementById('rio');
      img.innerHTML = ajax.responseText;
    }  
  }
  
  return {
    call: call()
  }
})();