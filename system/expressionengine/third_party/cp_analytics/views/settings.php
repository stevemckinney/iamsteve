<?php
    $this->EE =& get_instance();
?>

<?php foreach ($cp_messages as $cp_message_type => $cp_message) : ?>
	<p class="notice <?=$cp_message_type?>"><?=$cp_message?></p>
<?php endforeach; ?>

<?php
	// We need a hidden field called 'file' whose value matches this extension's url slug. (Apparently?)
	echo form_open('C=addons_extensions'.AMP.'M=save_extension_settings', array('id' => $file), array('file' => $file));
	
	$this->table->set_template($cp_pad_table_template);
	
	$this->table->set_heading(
		array('data'=> NBS), array('data'=> NBS)
	);
	
	// Show username/password inputs, or current authentication
	if(!isset($current['authenticated']) || $current['authenticated'] == 'n' || $current['authenticated'] == FALSE)
	{
		$this->table->add_row(
			form_label($this->EE->lang->line('analytics_username'), 'user'),
			form_input('user', '', 'id="user"')
		);
		$this->table->add_row(
			form_label($this->EE->lang->line('analytics_password'), 'password'),
			form_input('password', '', 'id="password"')
		);
	}
	else
	{
		$this->table->add_row(
			$this->EE->lang->line('analytics_username'),
			$this->EE->lang->line('analytics_authenticated_as').
			' <b>'.$current['user'].'</b> &nbsp; (<a href="'.
				BASE.AMP.'C=addons_extensions'.
				AMP.'M=extension_settings'.
				AMP.'file='.$file.
				AMP.'analytics_reset=y'.
				'">'.$this->EE->lang->line('analytics_reset').'</a>)'
		);		
	}

	// Show profile chooser, or relevant message	
	if(!isset($current['authenticated']) || $current['authenticated'] == FALSE)
	{
		$this->table->add_row(
			$this->EE->lang->line('analytics_profile'),
			$this->EE->lang->line('analytics_need_credentials')
		);
	}
	elseif($current['authenticated'] == 'n')
	{
		$this->table->add_row(
			$this->EE->lang->line('analytics_profile'),
			'<span class="failure">'.$this->EE->lang->line('analytics_bad_credentials').'</span>'
		);	
	}
	else
	{
		if(isset($ga_profiles))
		{
			$this->table->add_row(
				form_label($this->EE->lang->line('analytics_profile'), 'profile'),
				form_dropdown('profile', $ga_profiles, (isset($current['profile'])) ? $current['profile'] : '')
			);		
		}
		else
		{
			$this->table->add_row(
				$this->EE->lang->line('analytics_profile'),
				'<span class="failure">'.$this->EE->lang->line('analytics_no_accounts').'</span>'
			);			
		}
	}
									
	echo $this->table->generate();
	
	echo form_submit(array('name' => 'submit', 'value' => $this->EE->lang->line('analytics_save_settings'), 'class' => 'submit'));
	echo form_close();
?>