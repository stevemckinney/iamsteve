var iamsteve = (function ()
{  
  var toggle = document.getElementById('toggle');
  var nav = document.getElementById('nav');
  var toggle_search = document.getElementById('toggle-search');
  var search = document.getElementById('search');

  var toggler = function ()
  {    
    toggle.addEventListener('click', function(e)
    {
      e.preventDefault();
      
      this.classList.toggle('active');
      nav.classList.toggle('visible');
      
      if (toggle_search.classList.contains('active')) 
      {
        toggle_search.classList.remove('active');
        search.classList.remove('visible');
      }
    });
    
    toggle_search.addEventListener('click', function(e)
    { 
      e.preventDefault();
      
      this.classList.toggle('active');
      search.classList.toggle('visible');
      document.getElementById('keywords').focus();
      
      if (toggle.classList.contains('active')) 
      {
        toggle.classList.remove('active');
        nav.classList.remove('visible');
      }
    });
  };
  
  var flickity = function() {
    var scrollers = document.querySelectorAll('.scroll');
    
    for ( var i = 0, s = scrollers.length; i < s; i++ )
    {
      var scroll = scrollers[i];
      
      new Flickity( scroll,
      {
        cellAlign: 'left',
        freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
        contain: true
      });
    }
  }
  
  return {
    toggler: toggler(),
    flickity: flickity()
  };

})();