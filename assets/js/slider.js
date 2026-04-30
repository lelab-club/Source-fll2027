(function ($) {
	"use strict";

	/*=============================================
		=     td-text-slider-active	   =
	=============================================*/
	if ($('.td-text-slider-active').length > 0) {
		var td_text_slider = new Swiper(".td-text-slider-active", {
			loop: true,
			freemode: true,
			slidesPerView: 'auto',
			spaceBetween: 30,
			centeredSlides: true,
			allowTouchMove: false,
			speed: 7000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

})(jQuery);
