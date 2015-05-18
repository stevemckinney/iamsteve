(function($){

	// Plugin for tab and form functionality
	$.fn.LG_BetterMetaExt = function(opts) {

		return this.each(function() {

			var obj = {
				id: this.id,
				dom: {
					$container: $(this),
					$restricted_els: $("[recommended_length]", this)
				},
				options : opts
			}
			initRecommendedLength(obj);
		});

		function initRecommendedLength(obj){
			obj.dom.$restricted_els.each(function(index)
			{
				var rec_len = this.getAttribute('recommended_length');
				var $counter = $('<div>').addClass("note");
				$counter.html('Recommended length ' + rec_len +
							' characters | Current characters: <span>0</span>/' +
							rec_len
					);
				
				var checkMax = 	function() {
					var cur_len = this.value.length;
					if (cur_len > rec_len)
						$counter.addClass("toomuch");
					else
						$counter.removeClass("toomuch");
					$("span", $counter).text(cur_len);
				};

				$(this).after($counter);
				$(this).keyup(checkMax);
				$(this).change(checkMax);
				checkMax.apply(this);
			});
		}

		// private function for debugging
		function debug($obj) {
			if (window.console && window.console.log)
			window.console.log($obj);
		};

	};

	$.fn.LG_BetterMetaExt.defaults = {};

	$('#hold_field_nsm_better_meta__meta, #nsm_better_meta_prefs').LG_BetterMetaExt();

})(jQuery);
