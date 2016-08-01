
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

"use strict";

var ClockView = Backbone.View.extend({
	initialize: function() {
		this.today();
		this.thedate();
		this.ticktock();
		setInterval( this.ticktock.bind(this), 1000 );
	},
	today: function() {

		var day = ["Sunday,","Monday,","Tueday,","Wednesday,","Thursday,","Friday","Saturday,"][(new Date()).getDay()]		

		this.$el.find('.day').html(day);

	},
	
	thedate: function() {

		var m_names = new Array("Jan", "Feb", "March", 
		"April", "May", "Jun", "Jul", "Aug", "Sept", 
		"Oct", "Nov", "Dec");
		
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		var thedate = m_names[curr_month] 
		+ " " + curr_date;
			
		this.$el.find('.date').html(thedate);

	},
	
	ticktock: function() {
		var time = new Date();
		var hour = time.getHours() % 12;
		hour = time.getHours() === 12 ? 12 : hour;
		//var ampm = time.getHours() < 12 ? 'am' : 'am';
		var minute = this.addZero(time.getMinutes());
	//	var seconds = this.addZero(time.getSeconds());

		var timeString = hour + ':' + minute ;
		//var $ampm = $('<sup>').html(ampm);

		this.$el.find('.time').html(timeString)
			//.append($ampm);
	},
	addZero: function(i) {
		if (i < 10) {
		    i = "0" + i;
		}
		return i;
	}
});

return ClockView;

});