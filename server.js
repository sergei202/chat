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


var messages = [
	{name:'Server', text:'Node server started', date:new Date()},
];

// This block adds 100 messages to show that we really are getting the last 10
// for(var i=0;i<100;i++) {
// 	messages.push({name:'Repeat', text:'Message #' + i, date:new Date()});
// }


// Route to get all the messages
app.get('/messages', function(req,res) {
	// Show only the last 10 messages
	res.json(messages.slice(-10));
});


// Route to add a new message
app.post('/message', function(req,res) {
	var message = req.body;
	console.log('/message: ', message);
	messages.push(message);
	// Show only the last 10 messages
	res.json(messages.slice(-10));
});
