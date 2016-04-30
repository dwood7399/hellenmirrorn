define([
  'jquery',
  'underscore',
  'backbone',
  'chartjs'
], function($, _, Backbone, Chart) {

"use strict";

var forecastChart =  function() {

	var ctx = document.getElementById('forecast').getContext('2d');

	var forecast = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
		this.$el.find('.forecastChart').html(forecastChart);
}

return ForecastView;

});