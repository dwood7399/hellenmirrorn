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

		/* Update every minute */
		setInterval(function() { 
			var req = $.get('/mbta');
			req.done(function(d) { self.render(d); });
		}, 1000*60);
	},
	render: function(d) {
		d = JSON.parse(d.body);
		
		var departure1= d.mode[0].route[0].direction[0].trip[0].pre_away;
		var departure2= d.mode[0].route[0].direction[0].trip[1].pre_away;
		var departure3= d.mode[0].route[0].direction[0].trip[2].pre_away;

		var $mbtaIcon = this.getMBTAIcon(departure2);
    		var mbtaString = this.getMBTAString(departure1,departure2,departure3);

		this.$el.html(mbtaString);
		this.$el.prepend($mbtaIcon);
	},

	getMBTAString: function(d1,d2,d3) {
		var time;
		var time2;
		
		var minutesAway = d1 / 60;
		minutesAway =  Math.floor(minutesAway)
		
		var minutesAway2 = d2 / 60;
		minutesAway2 =  Math.floor(minutesAway2)
		var minutesAway3 = d3 / 60;
		minutesAway3 =  Math.floor(minutesAway3)
		
		if ( minutesAway === 1 ) {
			time = 'min';
		} else {
			time = 'mins';
		}
		if ( minutesAway3 === 1 ) {
			time2 = 'min';
		} else {
			time2 = 'mins';
		}
		var s = '<span class="bold">' + minutesAway + ' ' + time +'</span> </br>' +  minutesAway2 + ', ' + minutesAway3 +' ' + time2;
		return s;
	},
	getMBTAIcon: function(departure2) {
		var src = '/assets/blue-line-icon.png'; //MBTA has no icons, try switching to generic icons or use manual iceon (needs new image)
		return $('<img>').attr('src', src);
	} 
});

return MBTAView;

});