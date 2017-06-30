// Find all rows of posts, loop through them and setup flickity
function flickities()
{
  const rows = document.querySelectorAll('.posts');
  const pagination = document.querySelectorAll('.js-pagination');

  if ( ! Modernizr.touchevents ) 
  {
    for ( let i = 0; i < rows.length; i++ )
    {
      _setupFlickity( rows[i] );
    }
  }
  else
  {
    for ( let ii = 0; ii < pagination.length; ii++ ) 
    {
      pagination[ii].parentNode.removeChild(pagination[ii]);
    }
  }
}

// With multiple, and having custom pagination, you need to initialise using
// the parent as a reference, https://github.com/metafizzy/flickity/issues/319
function _setupFlickity( container )
{
  // init flickity
  const scroll = container.querySelector('.scroll');
  
  // Pagination
  const left = container.querySelector('.paginate-left');
  const right = container.querySelector('.paginate-right');
  
  // Has flickity reached the first or last item?
  // If so add or remove the relevant class name
  // reference: https://github.com/metafizzy/flickity/issues/220
  const disabled = 'disabled';
  
  const flickity = new Flickity( scroll,
  {
    cellAlign: 'left',
    freeScroll: true,
    prevNextButtons: false,
    pageDots: false,
    contain: false,
    imagesLoaded: true,
    dragThreshold: 24,
    groupCells: true,
    percentPosition: false
  });
  
  // Initial state means left should be disabled
  left.classList.add(disabled);
  
  left.addEventListener( 'click', function()
  {
    flickity.previous();
  });
  
  right.addEventListener( 'click', function()
  {
    flickity.next();
  });
  
  flickity.on( 'cellSelect', function()
  { 
    let i = flickity.selectedIndex;
    
    if ( i === flickity.cells.length - 1 ) right.classList.add(disabled);
    else right.classList.remove(disabled);
    
    if ( i === 0 ) left.classList.add(disabled);
    else left.classList.remove(disabled);
  });
}