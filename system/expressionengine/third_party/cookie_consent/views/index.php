	<?=form_open('C=addons_modules'.AMP.'M=show_module_cp'.AMP.'module=cookie_consent'.AMP.'method=save_ext_settings')?>



	<p><?=form_checkbox('show_cp_login_cb', 'y', $show_lcb)?>&nbsp;&nbsp;<span><?=lang('show_cp_login_cb', 'show_cp_login_cb')?></span></p>
	<p><?=form_checkbox('auto_delete_all', 'y', $auto_delete)?>&nbsp;&nbsp;<span><?=lang('auto_delete_all', 'auto_delete_all')?></span></p>

	<p>
		<?=form_submit(array('name' => 'submit', 'value' => lang('submit'), 'class' => 'submit'))?>
	</p>

	<?=form_close()?>
