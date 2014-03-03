$(function() {
	
	$(".thing").lettering();
	$(".thing").fitText();
	$('[role="main"]').fitVids();
	
	$accordion = $('.accordion'),
	$a_next = $accordion.next();
	
	$a_next.hide();
	$accordion.on('click', function() {
		$(this).next().slideToggle();
	});
	
});