var iamsteve = (function ()
{
  // Variables
  var toggle = document.getElementById('toggle');
  var nav = document.getElementById('nav');
  var toggle_search = document.getElementById('toggle-search');
  var search = document.getElementById('search');
  
  // Public
  var toggler = function()
  {    
    toggle.addEventListener( 'click', _toggleNav, false);
    toggle_search.addEventListener( 'click', _toggleSearch, false);
  }
  
  // Find all rows of posts, loop through them and setup flickity
  var flickity = function()
  {
    var rows = document.querySelectorAll('.posts');
    var pagination = document.querySelectorAll('.js-pagination');

    if ( ! Modernizr.touchevents ) 
    {
      for ( var i = 0; i < rows.length; i++ )
      {
        _setupFlickity( rows[i] );
      }
    }
    else
    {
      for ( var ii = 0; ii < pagination.length; ii++ ) 
      {
        pagination[ii].parentNode.removeChild(pagination[ii]);
      }
    }
  }
  
  var headroom = function()
  {
    var header = document.querySelector('.header');
    var options =
    {
      tolerance:
      {
        up: 12,
        down: 12
      },
      classes:
      {
        initial: 'header',
        pinned: 'header-pinned',
        unpinned: 'header-unpinned',
        top: 'header-top',
        notTop: 'header-not-top',
        bottom: 'header-bottom',
        notBottom: 'header-not-bottom'
      },
      onUnpin: function()
      { 
        if ( _isNavVisible() )
        {
          this.elem.classList.remove(this.classes.unpinned);
          this.elem.classList.add(this.classes.pinned);
        }
        else
        {
          this.elem.classList.add(this.classes.unpinned);
          this.elem.classList.remove(this.classes.pinned);
        }
      }
    };
    var headroom = new Headroom(header, options);
    
    headroom.init(); 
  }
  
  // Fontfaceobserver for loading fonts nicely
  var fonts = function()
  {
  	// Optimization for Repeat Views
  	if( !( 'geolocation' in navigator ) || sessionStorage.getItem('avertaOne') && sessionStorage.getItem('avertaTwo') ) {
  		return;
  	}
  
  	var subset = new FontFaceObserver('AvertaSubset');
  
  	Promise.all([subset.load()]).then(function ()
  	{
  		document.documentElement.className += " fonts-stage-1";
  
  		var regular = new FontFaceObserver('Averta', {
  			weight: 400
  		});
  		var italic = new FontFaceObserver('Averta', {
  			weight: 600
  		});
  		var bold = new FontFaceObserver('Averta', {
  			weight: 700
  		});
  		var light = new FontFaceObserver('Averta', {
  			weight: 300
  		});
  		var semibold = new FontFaceObserver('Averta', {
  			weight: 400,
  			style: 'italic'
  		});
  		
  		sessionStorage.setItem('avertaOne', true);
  
  		Promise.all([regular.load(), italic.load(), bold.load(), light.load(), semibold.load()]).then(function ()
  		{
  			document.documentElement.className += " fonts-stage-2";
  
  			// Optimization for Repeat Views
  			sessionStorage.setItem('avertaTwo', true);
  		});
  	});
  }
    
  // Private
  var _isNavVisible = function()
  {
    return ( nav.classList.contains('visible') || search.classList.contains('visible') ? true : false );
  }
  
  var _toggleSearch = function( e )
  {     
    this.classList.toggle('active');
    search.classList.toggle('visible');
    
    var field = document.getElementById('keywords');
    
    search.addEventListener('transitionend', function()
    {
      if ( toggle.classList.contains('active') ) 
      {
        field.blur();
      }
      else
      {
        field.focus();
      }
    }, true);
    
    if ( toggle.classList.contains('active') ) 
    {
      toggle.classList.remove('active');
      nav.classList.remove('visible');
    }
    
    e.preventDefault();
  }
  
  var _toggleNav = function( e )
  {    
    this.classList.toggle('active');
    nav.classList.toggle('visible');
    
    if ( toggle_search.classList.contains('active') ) 
    {
      toggle_search.classList.remove('active');
      search.classList.remove('visible');
    }
    
    e.preventDefault();
  }
  
  // With multiple, and having custom pagination, you need to initialise using
  // the parent as a reference, https://github.com/metafizzy/flickity/issues/319
  function _setupFlickity( container )
  {
    // init flickity
    var scroll = container.querySelector('.scroll');
    
    // Pagination
    var left = container.querySelector('.paginate-left');
    var right = container.querySelector('.paginate-right');
    
    // Has flickity reached the first or last item?
    // If so add or remove the relevant class name
    // reference: https://github.com/metafizzy/flickity/issues/220
    var disabled = 'disabled';
    
    var flickity = new Flickity( scroll,
    {
      cellAlign: 'left',
      freeScroll: true,
      prevNextButtons: false,
      pageDots: false,
      contain: true,
      imagesLoaded: true,
      dragThreshold: 24
    });
    
    // Initial state means left should be disabled
    left.classList.add(disabled);
    
    left.addEventListener( 'click', function( e )
    {
      flickity.previous();
    });
    
    right.addEventListener( 'click', function( e )
    {
      flickity.next();
    });
    
    flickity.on( 'cellSelect', function()
    { 
      var i = flickity.selectedIndex;
      
      if ( i === flickity.cells.length - 1 ) right.classList.add(disabled);
      else right.classList.remove(disabled);
      
      if ( i === 0 ) left.classList.add(disabled);
      else left.classList.remove(disabled);
    });
  }
  
  return {
    toggler: toggler(),
    headroom: headroom(),
    flickity: flickity(),
    fonts: fonts()
  };

})();