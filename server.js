var express = require('express');
var request = require('request');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by third party
//var port = process.env.PORT || 8080;

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
/*
server.listen(port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + port )
});
*/



// set the view engine to ejs but use html
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);

// make express look in the root directory for assets (css/js/img)
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/weather', function(req, res) {
	// hard code for now
	var lng = '-71.0373';
	var lat = '42.3665';
	var key = '02f7985b48f8f25a0b1eebbfa3e824cd';
	var url = 'https://api.forecast.io/forecast/';

	url += key;
	url += '/';
	url += lat;
	url += ',';
	url += lng;

	request(url, function(err, d) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(d));
		res.end();
	});
});

/*
app.get('/subway', function(req, res) {
	// hard code for now
	var mode = 'transit';
	var origin = 'place_id:ChIJN1ZOal1w44kR5IAo-Xm02vU'; //Maverick *use Google placeid finder 
	var dest = 'place_id:ChIJ1QvXeoRw44kR_jMMN0I5To0';//State St. 
	var key = 'AIzaSyAJFm6N6BEzYHLsdKwapx_43Ez1sD1Igmk'; // <- his key, my key ->   AIzaSyCCAazPCKDKSmZAftmFd0jgveFQVjNCuVc
	var url = 'https://maps.googleapis.com/maps/api/directions/json';

	url += '?origin='+origin;
	url += '&destination='+dest;
  url += '&mode='+mode;
  url += '&key='+key;

  request(url, function(err, d) {
  	res.writeHead(200, {"Content-Type": "application/json"});
  	res.write(JSON.stringify(d));
  	res.end();
  });

});
*/


app.get('/mbta', function(req, res) {
	// hard code for now
	var stopid = '70045';//MBTA Stop ID (Maverick = 7005). 
	var apikey = 'VJKitNU0VUaWrOsGfPhBjQ'; // <-personal key for dwood7399
	var url = 'http://realtime.mbta.com/developer/api/v2/predictionsbystop?format=json';

	url += '&api_key='+apikey;
	url += '&stop='+stopid;

  request(url, function(err, d) {
  	res.writeHead(200, {"Content-Type": "application/json"});
  	res.write(JSON.stringify(d));
  	res.end();
  });

});


app.get('/news', function(req, res) {
	var url = 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=news&rsz=8';

	request(url, function(err, d) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(d));
		res.end();
	});
});

app.get('/stocks', function(req, res) {
  var url = 'https://www.google.com/finance/info?infotype=infoquoteall&q=';
  var stocks = req.query.stocks.join();

  url += stocks;
  
  request(url, function(err, d) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(d));
    res.end();
  });
});

app.listen(port, function() {
  console.log('HelenMirrorn is running on http://localhost:' + port);
});
