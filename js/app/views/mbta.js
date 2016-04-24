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
		
		var departure = d.mode[0].route[0].direction[0].trip[0].pre_away;

		var $mbtaIcon = this.getMBTAIcon(departure);
    		var mbtaString = this.getMBTAString(departure);

		this.$el.html(mbtaString);
		this.$el.prepend($mbtaIcon);
	},

	getMBTAString: function(departure) {
		var time;
		var minutesAway = departure / 60;
		minutesAway =  Math.floor(minutesAway)

		if ( minutesAway === 1 ) {
			time = 'minute';
		} else {
			time = 'minutes';
		}

		var s = 'Next train  in ' + minutesAway + ' ' + time;
		return s;
	},
	getMBTAIcon: function(departure) {
		var src = '/assets/train.png'; //MBTA has no icons, try switching to generic icons or use manual iceon (needs new image)
		return $('<img>').attr('src', src);
	} 
});

return MBTAView;

});