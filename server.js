'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chat', {useMongoClient:true});

var Message = mongoose.model('Message', {
	name: String,
	text: String,
	date: Date
});


var app = express();

// Allow us to parse POST requests into req.body
app.use(bodyParser.json());

// Mount are website (inside the public directory) at /
app.use('/', express.static('./public'));

// Listen on port 3000
app.listen(3000, function(err) {
	console.log('Listening at http://localhost:3000');
});


function getMessages() {
	return Message
		.find()					// Get all messages
		.sort({date:-1})		// Sort by date descending
		.limit(10)				// Get the last 10 documents
		.exec().then(function(msgs) {
			return msgs.reverse();	// Reverse the array over (so last message is on the bottom)
		});
}

function saveMessage(msg) {
	// Create a new message document, save it and return the promise
	return new Message(msg).save();
}


// Route to get all the messages
app.get('/messages', function(req,res) {
	// Get our messages and send back to the user
	getMessages().then(function(msgs) {
		res.json(msgs);
	});
});


// Route to add a new message
app.post('/message', function(req,res) {
	var message = req.body;
	console.log('/message: ', message);

	// Save our message and then return
	saveMessage(message).then(function() {
		res.json(message);
	});
});
