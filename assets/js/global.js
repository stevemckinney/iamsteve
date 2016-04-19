var toggle = document.getElementById('toggle');
var nav = document.getElementById('nav');

toggle.addEventListener('click', function(e) {
  e.preventDefault();
  
  this.classList.toggle('active');
  nav.classList.toggle('active');
});