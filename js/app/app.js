define([
  'jquery',
//   'views/news',
  'views/clock',
//   'views/subway',
    'views/mbta',
  'views/stocks',
  'views/weather',
], function($, ClockView, MBTAView, StocksView, WeatherView) {

"use strict";

$(document).ready(function() {

// 	new NewsView({ el: $('.news') });
	new ClockView({ el: $('.clock') });
// 	new SubwayView({ el: $('.subway') });
	new MBTAView({ el: $('.mbta') });
	new WeatherView({ el: $('.weather') });
  new StocksView({ el: $('.stocks') });

	$(document).ajaxStop(function() {

		$('body').addClass('active');

	});

});

});
