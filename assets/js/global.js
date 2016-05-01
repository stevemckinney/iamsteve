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
  
  // Find all rows of posts, loop through them and setup flickity
  var flickity = function()
  {
    var rows = document.querySelectorAll('.row-posts');
    
    for ( var i=0; i < rows.length; i++ )
    {
      setupFlickity( rows[i] );
    }
  }
  
  // With multiple, and having custom pagination, you need to initialise using
  // the parent as a reference, https://github.com/metafizzy/flickity/issues/319
  function setupFlickity( container )
  {
    // init flickity
    var scroll = container.querySelector('.scroll');
    var flickity = new Flickity( scroll,
    {
      cellAlign: 'left',
      freeScroll: true,
      prevNextButtons: false,
      pageDots: false,
      contain: true
    });
    
    // Pagination
    var left = container.querySelector('.page-left');
    var right = container.querySelector('.page-right');
    
    left.addEventListener( 'click', function( event )
    {
      flickity.previous();
    });
    
    right.addEventListener( 'click', function( event )
    {
      flickity.next();
    });
  }
  
  return {
    toggler: toggler(),
    flickity: flickity()
  };

})();