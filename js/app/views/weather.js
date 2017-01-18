define([
  'jquery',
  'underscore',
  'backbone',
  'chartjs'
], function($, _, Backbone, Chart) {

"use strict";

var WeatherView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		var req = $.get('/weather');

		req.done(function(d) { self.render(d); });

		/* Update every 5 minutes */
		setInterval(function() { 
			var req = $.get('/weather');
			req.done(function(d) { self.render(d); });
		}, 1000*60*5);
	},
	render: function(d) {
		d = JSON.parse(d.body);
		var icon = d.currently.icon;
		var temp = this.formatTemp(d.currently.apparentTemperature);
		var hourlyTemp = [];
		var hourlyPrecip = [];
		var hourlyLabels = [];
		for (var i = 0; i < 13; i++) {
			hourlyTemp.push(this.formatTemp(d.hourly.data[i].apparentTemperature));
		}
		for (var i = 0; i < 13; i++) {
			hourlyPrecip.push(d.hourly.data[i].precipProbability*100);
		}
		for (var i = 0; i < 13; i++) {
			hourlyLabels.push(this.formatHours(d.hourly.data[i].time));
		}

// 	 		var summary = d.hourly.summary;
		this.$el.html(temp + '&deg 	</br><canvas style="font-family: Roboto Condensed;" id="forecast" width="400" height="200"></canvas>').addClass(icon);
		
		var ctx = document.getElementById("forecast");
		var myChart = new Chart(ctx, {
		    type: 'line',
		    data: {
		        labels: hourlyLabels,
		        datasets: [
		        {
			        	yAxisID: "y-axis-temp",
		            data: hourlyTemp,
		            borderColor: "#fff",
		            	pointBorderColor: "#fff",
		        },
		        {
			        	yAxisID: "y-axis-precip",			        
		            data: hourlyPrecip,
		            backgroundColor: "#0C3D86",
		            	borderColor: "#0C3D86",
		            	pointBorderColor: "#0C3D86",

		        }
		       
		        ]
		    },
		    options: {
			    events:false,
			    fontFamily: "'Roboto Condensed'",
			    fullWidth: false,
			    responsive: false,
			    tension: .7,			    
			    legend: {
				    display: false
			    },
				elements: {
					point: {
						radius:0
					}
				},
		        scales: {
		            yAxes: [
		            			{
			            			id: "y-axis-temp",
//			            			position: "right",
								ticks: {
// 									beginAtZero:false,
									stepSize: 5,	
									fontColor: "#fff",
									fontSize: 22,
									fontFamily: "'Roboto Condensed'",
									fontStyle:"light",
									callback: function(value) {
						               return value + "°"
						           }					
								}
							},
		            			{
			            			id: "y-axis-precip",
			            			position: "right",
								ticks: {
									display: false,
									beginAtZero:true,
									min:0,
									max: 100,
									stepSize: 50,
									fontStyle:"light",
									fontFamily: "'Roboto Condensed'",
									fontColor: "#0C3D86",
									callback: function(value) {
						               return value + "%"
						           }
									
								}
							}
		            ],
		            
		            xAxes: [			            
			            {
				            ticks: {
					            fontColor: "#fff",
								autoSkipPadding: 20,
								fontFamily: "'Roboto Condensed'",
								maxRotation: 0,
								labelOffset: 10					           // unit: "hour"
			            	},
			            	
			            	gridLines: {
			            	}
			            }
		            ]
		        },    
		    }

		    
		});		
	},


	formatTemp: function(i) {
		return i.toString().split('.')[0];
	},
	
	formatHours: function(timestamp) {
			var date = new Date(timestamp * 1000);
			var hours = date.getHours();
			var labels = ((hours + 11) % 12 + 1);
			var suffix = hours >= 12 ? " pm":" am"; 
			return labels + suffix;
	},	
	

});



return WeatherView;

});


