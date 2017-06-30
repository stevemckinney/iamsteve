(function ()
{
  // Variables
  const nav = document.getElementById('nav');
  const toggle_search = document.getElementById('toggle-search');
  const search = document.getElementById('search');
  
  // Public
  var toggler = function()
  {
    toggle_search.addEventListener( 'click', _toggleSearch, false);
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
  
  var lazy = function()
  {
    document.addEventListener('lazyunveilread', function(e)
    {
      e.target.parentNode.classList.add('image-loaded');
    });
  }
  
  var fonts = function()
  {
    if ( ! document.documentElement.classList.contains('fonts-stage-1') )
    {
    	var semibold = new FontFaceObserver('Averta', { weight: 600 });
    
    	Promise.all([semibold.load()]).then(function ()
    	{
    		document.documentElement.className += " fonts-stage-1";
    		cookie( "exp_fonts-stage-1", true, 365 );
    
        var regular = new FontFaceObserver('Averta', { weight: 400 });
        var italic = new FontFaceObserver('Averta', { weight: 300, style: 'italic' });
        var light = new FontFaceObserver('Averta', { weight: 300 });
    
    		Promise.all([regular.load(), italic.load(), light.load()]).then(function ()
    		{
    			document.documentElement.className += " fonts-stage-2";
    			cookie( "exp_fonts-stage-2", true, 365 );
    		});
    	});
  	}
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
      field.focus();
    }, true);
    
    e.preventDefault();
  }
  
  return {
    toggler: toggler(),
    headroom: headroom(),
    fonts: fonts(),
    images: lazy()
  };

})();