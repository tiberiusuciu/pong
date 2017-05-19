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
	{is_online: false},
	{is_online: false},
	{is_online: false},
	{is_online: false},
];

var give_player_id = () => {
	if(!current_players[0].is_online) {
		current_players[0].is_online = true;
		return 0;
	}
	else if (!current_players[1].is_online) {
		current_players[1].is_online = true;
		return 1;
	}
	else if (!current_players[2].is_online) {
		current_players[2].is_online = true;
		return 2;
	}
	else if (!current_players[3].is_online) {
		current_players[3].is_online = true;
		return 3;
	}
	else {
		return -1;
	}
};

var clear_player_slot = (player_id) => {
	current_players[player_id].is_online = false;
}

io.on('connection', function (socket) {
	var player_id = give_player_id();
	if(player_id != -1) {
		socket.emit('new_player', { player_id: player_id});

		socket.on('disconnect', function() {
			clear_player_slot(player_id);
		});

		socket.on('paddle_v_move', function(data) {
			io.emit('notify_v_moved', { player_id: data.player_id, new_y: data.new_y });
		});

		socket.on('paddle_h_move', function(data) {
			io.emit('notify_h_moved', { player_id: data.player_id, new_x: data.new_x });
		});

		socket.on('ball_move', function(data) {
			io.emit('ball_update', { x: data.x, y: data.y });
		});
	}
	// Player count full, the user will spectate
});

// var line_history = [];
//
// io.on('connection', function (socket) {
// 	for (var i in line_history) {
// 		socket.emit('draw_line', { line: line_history[i] } );
// 	}
// 	socket.on('draw_line', function (data) {
// 		line_history.push(data.line);
// 		io.emit('draw_line', { line: data.line });
// 	});
// });
