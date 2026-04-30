(function ($) {
	"use strict";

	/*===========================================
		=            WOW Js (Animations)        =
	=============================================*/
	$(window).on('load', function () {
		if (typeof WOW !== 'undefined') {
			var wow = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: false,
				live: true
			});
			wow.init();
		}
	});

	/*===========================================
		=          Data Background    =
	=============================================*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	});

	/*=============================================
		=       jarallax Js	      =
	=============================================*/
	if ($('.jarallax').length > 0) {
		$('.jarallax').jarallax({
			speed: 0.2,
			imgWidth: 1200,
			imgHeight: 520,
		});
	};

})(jQuery);
