var express = require('express'),
	path = require('path'),
	app = express(),
	port = process.env.PORT || 5000;
app.configure(function() {
	'use strict';
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, '')));
});
// start listning
app.listen(port);