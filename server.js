var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');

var server = http.createServer(app);
var io = io.listen(server);
server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

var current_players = [
	{ is_online: false },
	{ is_online: false },
];

// Keeping track of who's connected and who's disconnecting
var give_player_id = () => {
	/*
	if (!current_players[0].is_online) {
		current_players[0].is_online = true;
		return 0;
	}
	else if (!current_players[1].is_online) {
		current_players[1].is_online = true;
		return 1;
	}
	else {
		return -1;
	}
	*/
};

var clear_player_slot = (player_id) => {
	// current_players[player_id].is_online = false;
};

// Socket.io Connection
io.on('connection', function (socket) {
	/*
	// Assign ID
	var player_id = give_player_id();
	if (player_id >= 0) {
		// Notify client of new player
		socket.emit('new_player', { player_id: player_id});

		// Manage disconnection
		socket.on('disconnect', function() {
			clear_player_slot(player_id);
			if (!(current_players[0].is_online && current_players[1].is_online)) {
				io.emit('game_is_ready', {game_is_ready: false});
			}
		});

		// Notify users of new position of target paddle
		socket.on('paddle_v_move', function(data) {
			io.emit('notify_v_moved', { player_id: data.player_id, new_y: data.new_y });
		});

		// Notify second player that the ball trajectory has changed
		socket.on('ball_change', function (data) {
			socket.broadcast.emit('ball_changed', { vx: data.vx, vy: data.vy, x: data.x, y: data.y });
		});

		// Check if game ready to start
		if (current_players[0].is_online && current_players[1].is_online) {
			io.emit('game_is_ready', {game_is_ready: true});
		}
	}
	*/
});
