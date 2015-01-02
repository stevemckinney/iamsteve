<?php
/**
 * View for Control Panel Settings Form
 * This file is responsible for displaying a single .htaccess path
 *
 * @package			NsmHtaccessGenerator
 * @version			1.1.5
 * @author			Leevi Graham <http://leevigraham.com> - Technical Director, Newism
 * @copyright 		Copyright (c) 2007-2012 Newism <http://newism.com.au>
 * @license 		Commercial - please see LICENSE file included with this distribution
 * @link			http://ee-garage.com/nsm-htaccess-generator
 * @see 			http://expressionengine.com/docs/development/extensions.html
 **/
?>

<tr class="<?= $class ?>">
	<td><input type="text" name="<?= $input_prefix ?>[path][<?= $count ?>]" value="<?= $path ?>" /></td>
	<td style="width:18px"><span class="icon delete">Delete</span></td>
</tr>