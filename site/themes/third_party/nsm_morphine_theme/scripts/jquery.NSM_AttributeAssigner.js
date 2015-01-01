(function($) {

	$.fn.NSM_AttributeAssigner = function(options) {
		var options = options;
		return this.each(function () {
		    var $container = $(this).parents(".tg:eq(0)");
			var obj = {
					dom: {
						$container: $container,
						$trigger : $(this),
						$targets : $("select[id^='"+options.prefix+"_']:not(#"+this.id+")", $container)
					},
					cf_data: options.cf_data
				};
			// console.log(obj.dom.$trigger);
			// console.log("select[id^='"+options.prefix+"_']:not(#"+this.id+")");
			obj.dom.$trigger.change(function() {
				NSM_AttributeAssigner.update(obj);
			}).trigger("change");

		});
	}

	var NSM_AttributeAssigner = {

		update: function(obj) {

			var channel_id = obj.dom.$trigger.val();
			var options = [];

			obj.dom.$targets.empty().hide();

			options[0] = document.createElement("OPTION");
			options[0].value = "";
			options[0].text = "Entry title";

			// console.log(obj.dom.$container);

			obj.dom.$targets.html(options);

			$(".no-custom-field-group-error", obj.dom.$container).hide();

			if(obj.cf_data[channel_id])
			{
				$(obj.cf_data[channel_id]).each(function(index) {
					options[index + 1] = document.createElement("OPTION");
					options[index + 1].value = obj.cf_data[channel_id][index]['field_id'];
					options[index + 1].text = obj.cf_data[channel_id][index]['field_label'];
					options[index + 1].setAttribute("data-field-id", obj.cf_data[channel_id][index]['field_id']);
					options[index + 1].setAttribute("data-field-type", obj.cf_data[channel_id][index]['field_type']);
				});
				obj.dom.$targets.html(options).fadeIn();
			}
			else
			{
				$(".no-custom-field-group-error", obj.dom.$container).show();
			}
			// console.log(options);
		}
	}

})(jQuery);