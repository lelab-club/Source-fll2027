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

	/*===========================================
		=        magnificPopup video view    =
	=============================================*/
	if ($('.popup-video').length > 0) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
					'</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

				patterns: {
					youtube: {
						index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
						id: 'v=', // String that splits URL in a two parts, second part should be %id%
						src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
					},
				},
				srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
			},
		});
	}

})(jQuery);
