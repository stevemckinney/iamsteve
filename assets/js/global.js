var iamsteve = (function ()
{  
  var toggle = document.getElementById('toggle');
  var nav = document.getElementById('nav');
  var toggle_search = document.getElementById('toggle-search');
  var search = document.getElementById('search');
  
  var toggler = function ()
  {    
    toggle.addEventListener( 'click', function( e )
    {
      e.preventDefault();
      
      this.classList.toggle('active');
      nav.classList.toggle('visible');
      
      if ( toggle_search.classList.contains('active') ) 
      {
        toggle_search.classList.remove('active');
        search.classList.remove('visible');
      }
    });
    
    toggle_search.addEventListener( 'click', function( e )
    { 
      e.preventDefault();
      
      this.classList.toggle('active');
      search.classList.toggle('visible');
      document.getElementById('keywords').focus();
      
      if ( toggle.classList.contains('active') ) 
      {
        toggle.classList.remove('active');
        nav.classList.remove('visible');
      }
    });
  }
  
  // With multiple, and having custom pagination, you need to initialise using
  // the parent as a reference, https://github.com/metafizzy/flickity/issues/319
  function _setupFlickity( container )
  {
    // init flickity
    var scroll = container.querySelector('.scroll');
    var flickity = new Flickity( scroll,
    {
      cellAlign: 'left',
      freeScroll: true,
      prevNextButtons: false,
      pageDots: false,
      contain: true,
      imagesLoaded: true
    });
    
    // Pagination
    var left = container.querySelector('.paginate-left');
    var right = container.querySelector('.paginate-right');
    
    // Initial state means left should be disabled
    left.classList.add('paginate-disabled');
    
    left.addEventListener( 'click', function( e )
    {
      flickity.previous();
    });
    
    right.addEventListener( 'click', function( e )
    {
      flickity.next();
    });
    
    // Has flickity reached the first or last item?
    // If so add or remove the relevant class name
    // reference: https://github.com/metafizzy/flickity/issues/220
    var disabled = 'paginate-disabled';
    
    flickity.on( 'cellSelect', function()
    { 
      var i = flickity.selectedIndex;
      
      if ( i === flickity.cells.length - 1 ) right.classList.add(disabled);
      else right.classList.remove(disabled);
      
      if ( i === 0 ) left.classList.add(disabled);
      else left.classList.remove(disabled);
    });
  }
  
  // Find all rows of posts, loop through them and setup flickity
  var flickity = function()
  {
    var rows = document.querySelectorAll('.posts');
    
    for ( var i=0; i < rows.length; i++ ) _setupFlickity( rows[i] );
  }
  
  var headroom = function()
  {
    var header = document.querySelector('.header');
    var options =
    {
      tolerance:
      {
        up: 12,
        down: 0
      },
      classes:
      {
        initial: '',
        pinned: 'header-pinned',
        unpinned: 'header-unpinned',
        top: 'header-top',
        notTop: 'header-not-top',
        bottom: 'header-bottom',
        notBottom: 'header-not-bottom'
      }
    };
    var headroom  = new Headroom(header, options);
    
    headroom.init(); 
  }
  
  return {
    toggler: toggler(),
    flickity: flickity()
  };

})();