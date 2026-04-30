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

	/*=============================================
		=        countdown	   =
	=============================================*/
	function makeTimer() {
		var endTime = new Date("26 mar 2027 18:00:00 GMT+02:00");
		endTime = (Date.parse(endTime) / 1000);
		var now = new Date();
		now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		
		if (timeLeft > 0) {
			var days = Math.floor(timeLeft / 86400);
			var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
			var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
			var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
			
			if (hours < 10) { hours = "0" + hours; }
			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			
			$(".days").html(days + "<span>Jours</span>");
			$(".hours").html(hours + "<span>Hrs</span>");
			$(".minutes").html(minutes + "<span>Mins</span>");
			$(".seconds").html(seconds + "<span>Secs</span>");
		} else {
			$(".days").html("00<span>Jours</span>");
			$(".hours").html("00<span>Hrs</span>");
			$(".minutes").html("00<span>Mins</span>");
			$(".seconds").html("00<span>Secs</span>");
		}
	}
	
	if ($('#timer').length > 0) {
		makeTimer(); // Initialize immediately so no delay
		setInterval(function () { makeTimer(); }, 1000);
	}

})(jQuery);
