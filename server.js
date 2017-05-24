var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');

var server = http.createServer(app);
var io = io.listen(server);
server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// Keeping track of who's connected and who's disconnecting
var give_player_id = () => {

};

var clear_player_slot = (player_id) => {

};

// Socket.io Connection
io.on('connection', function (socket) {
	// Assign ID
	
	// Notify client of new player

	// Manage disconnection

	// Notify users of new position of target paddle

	// Notify second player that the ball trajectory has changed

	// Check if game ready to start
});
