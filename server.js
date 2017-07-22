'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Allow us to parse POST requests into req.body
app.use(bodyParser.json());

// Mount are website (inside the public directory) at /
app.use('/', express.static('./public'));

// Listen on port 3000
app.listen(3000, function(err) {
	console.log('Listening at http://localhost:3000');
});
