define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var MBTAView = Backbone.View.extend({
	initialize: function() {
		var self = this;
		var req = $.get('/mbta');

		req.done(function(d) { self.render(d); });

		/* Update every second */
		setInterval(function() { 
			var req = $.get('/mbta');
			req.done(function(d) { self.render(d); });
		}, 1000*10);
	},
	render: function(d) {
		d = JSON.parse(d.body);
		
		var departure1= d.mode[0].route[0].direction[0].trip[0].pre_away;
		var departure2= d.mode[0].route[0].direction[0].trip[1].pre_away;
		var departure3= d.mode[0].route[0].direction[0].trip[2].pre_away;

	//	var $mbtaIcon = this.getMBTAIcon(departure2);
    		var mbtaString = this.getMBTAString(departure1,departure2,departure3);

		this.$el.html(mbtaString);
	//	this.$el.prepend($mbtaIcon);
	},

	getMBTAString: function(d1,d2,d3) {
		var time;
		var time2;
		
		var minutesAway = d1 / 60;
		minutesAway =  Math.floor(minutesAway)	

		if (minutesAway === 0) {
			minutesAway = 'Now'
		}
		
		
		var minutesAway2 = d2 / 60;
		minutesAway2 =  Math.floor(minutesAway2)
		var minutesAway3 = d3 / 60;
		minutesAway3 =  Math.floor(minutesAway3)
		
		if ( minutesAway === 1 ) {
			time = 'min';
		} else if (minutesAway === 'Now') {
			time ='';
		} else {
			time = 'mins';
		}
		if ( minutesAway3 === 1 ) {
			time2 = 'min';
		} else {
			time2 = 'mins';
		}
		var icon =  '<img src="/assets/blue-line-icon.png">'		
		var s = '<div class="nextTrain">' + icon + minutesAway + ' <span class="thenTrains"> ' + time + '</span></div><div class="thenTrains">' +  minutesAway2 + ', ' + minutesAway3 + '</div>';
		return s;
	},
/*
	getMBTAIcon: function(departure2) {
		var src = '/assets/blue-line-icon.png'; //MBTA has no icons, try switching to generic icons or use manual iceon (needs new image)
		var icon = return $('<img>').attr('src', src);
	} 
*/
});

return MBTAView;

});