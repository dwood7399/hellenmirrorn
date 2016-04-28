require.config({
	baseUrl: "/js/app",
	paths: {
		"jquery": "../lib/jquery.min",
		"underscore": "../lib/underscore",
		"backbone": "../lib/backbone",
		"chartjs":"../../node_modules/chart.js"
	},
	shim: {
		jquery: {
		  exports: "$"
		},
		underscore: {
		  deps: ["jquery"],
		  exports: "_"
		},
		backbone: {
		  deps: ["jquery", "underscore"],
		  exports: "Backbone"
		}
	},
	urlArgs: "bust=" + (new Date()).getTime(),
	waitSeconds: 0
});

require([
	"jquery",
	"underscore",
	"backbone",
	"chartjs"
], function($, _, Backbone,Chart) {

	require(['app'], function() {});

});