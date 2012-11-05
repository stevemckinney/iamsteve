$(document).ready(function() {
	$(".mor table.col-sortable").tablesorter();
	$(".mor table.NSM_Stripeable").NSM_Stripeable();
	$(".mor table.NSM_MagicCheckboxes").NSM_MagicCheckboxes();
	
	// Hide inactive tabs
	$('.nsm_inactive_tab').each(function(el) {
		var self = $(this),
			id = self.data('addonid'),
			tab = $(id);
			tab_menu = $('#menu_'+id),
			field = self.parents('div.publish_field').eq(0);
			
			tab.hide();
			tab_menu.hide();
			field.hide();
	});
	
});

