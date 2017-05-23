// http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas/
document.addEventListener("DOMContentLoaded", function() {
	var player_id;
	var socket  = io.connect();
	// Adding new player

	socket.on('new_player', function (data) {
		player_id = data.player_id;
		// Adding the paddle on the screen
	});

	function Game() {
		var canvas = document.getElementById("game");
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = canvas.getContext("2d");
		this.context.fillStyle = "white";
		this.keys = new KeyListener();

		// Player one
		this.p1 = new Paddle(5, 0, true);
		this.p1.y = this.height/2 - this.p1.height/2;
		this.display1 = new Display(this.width/8, 25);

		// Player two
		this.p2 = new Paddle(this.width - 5 - 2, 0, true);
		this.p2.y = this.height/2 - this.p2.height/2;
		this.display2 = new Display(this.width*7/8, 25);

		this.ball = new Ball();
		this.ball.x = this.width/2;
		this.ball.y = this.height/2;
		this.ball.vy = Math.floor(Math.random()*12 - 6);
		this.ball.vx = 7 - Math.abs(this.ball.vy);
		this.game_is_ready = false;
	}

	Game.prototype.draw = function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillRect(this.width/2, 0, 2, this.height);

		this.ball.draw(this.context);

		this.p1.draw(this.context);
		this.p2.draw(this.context);
		this.display1.draw(this.context);
		this.display2.draw(this.context);
	};

	Game.prototype.update = function() {
		this.ball.update();
		this.display1.value = this.p1.score;
		this.display2.value = this.p2.score;
		var new_y;
		if (this.keys.isPressed(83)) { // DOWN
			if (player_id == 0) {
				new_y = Math.min(this.height - this.p1.height, this.p1.y + 8);
				this.p1.y = new_y;
			}
			else if (player_id == 1) {
				new_y = Math.min(this.height - this.p2.height, this.p2.y + 8);
				this.p2.y = new_y;
			}
			socket.emit('paddle_v_move', { player_id: player_id, new_y: new_y });
		} else if (this.keys.isPressed(87)) { // UP
			if (player_id == 0) {
				new_y = Math.max(0, this.p1.y - 8);
				this.p1.y = new_y;
			}
			else if (player_id == 1) {
				new_y = Math.max(0, this.p2.y - 8);
				this.p2.y = new_y;
			}
			socket.emit('paddle_v_move', { player_id: player_id, new_y: new_y });
		}

		if (this.ball.vx > 0) {
			if (this.p2.x <= this.ball.x + this.ball.width && this.p2.x > this.ball.x - this.ball.vx + this.ball.width) {
				var collisionDiff = this.ball.x + this.ball.width - this.p2.x;
				var k = collisionDiff/this.ball.vx;
				var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
				if (y >= this.p2.y && y + this.ball.height <= this.p2.y + this.p2.height) {
					// collides with right paddle
					this.ball.x = this.p2.x - this.ball.width;
					this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
					this.ball.vx = -this.ball.vx;
				}
			}
		}
		else {
			if (this.p1.x + this.p1.width >= this.ball.x) {
				var collisionDiff = this.p1.x + this.p1.width - this.ball.x;
				var k = collisionDiff/-this.ball.vx;
				var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
				if (y >= this.p1.y && y + this.ball.height <= this.p1.y + this.p1.height) {
					// collides with the left paddle
					this.ball.x = this.p1.x + this.p1.width;
					this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
					this.ball.vx = -this.ball.vx;
				}
			}
		}

		// Top and bottom collision
		if ((this.ball.vy < 0 && this.ball.y < 0) || (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
			this.ball.vy = -this.ball.vy;
		}

		if (this.ball.x >= this.width) {
			this.score(this.p1);
		}
		else if (this.ball.x + this.ball.width <= 0) {
			this.score(this.p2);
		}
	};

		Game.prototype.score = function(p) {
			// player scores
			p.score++;
			var player = p == this.p1 ? 0 : 1;

			// set ball position
			this.ball.x = this.width/2;
			this.ball.y = this.height/2;

			// set ball velocity
			this.ball.vy = Math.floor(Math.random()*12 - 6);
			this.ball.vx = 7 - Math.abs(this.ball.vy);
			if (this.game_is_ready)
			this.ball.vx *= -1;
		};

		// PADDLE
		function Paddle(x, y, is_vertical) {
			this.x = x;
			this.y = y;
			this.is_vertical = is_vertical;
			this.width = 2;
			this.height = 28;
			this.score = 0;
		}

		Paddle.prototype.draw = function(p) {
			if(this.is_vertical) {
				p.fillRect(this.x, this.y, this.width, this.height);
			}
			else {
				p.fillRect(this.x, this.y, this.height, this.width);
			}
		};

		// BALL
		function Ball() {
			this.x = 0;
			this.y = 0;
			this.vx = 0;
			this.vy = 0;
			this.width = 4;
			this.height = 4;
		}

		Ball.prototype.update = function() {
			if(game.game_is_ready) {
				this.x += this.vx;
				this.y += this.vy;
				socket.emit('ball_move', { x: this.x, y: this.y });
			}
		};

		Ball.prototype.draw = function(p) {
			p.fillRect(this.x, this.y, this.width, this.height);
		};

		//DISPLAY
		function Display(x, y) {
			this.x = x;
			this.y = y;
			this.value = 0;
		}

		Display.prototype.draw = function(p) {
			p.fillText(this.value, this.x, this.y);
		};

		// KEY LISTENER
		function KeyListener() {
			this.pressedKeys = [];

			this.keydown = function(e) {
				this.pressedKeys[e.keyCode] = true;
			};

			this.keyup = function(e) {
				this.pressedKeys[e.keyCode] = false;
			};

			document.addEventListener("keydown", this.keydown.bind(this));
			document.addEventListener("keyup", this.keyup.bind(this));
		}

		KeyListener.prototype.isPressed = function(key) {
			return this.pressedKeys[key] ? true : false;
		};

		KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
			document.addEventListener("keypress", function(e) {
				if (e.keyCode == keyCode)
				callback(e);
			});
		};

		// Initialize our game instance
		var game = new Game();

		function MainLoop() {
			game.update();
			game.draw();
			// Call the main loop again at a frame rate of 30fps
			var frameCount = 1000/60;
			setTimeout(MainLoop, frameCount);
		}

		socket.on('notify_v_moved', function (data) {
			if (data.player_id == 0) {
				game.p1.y = data.new_y;
			}
			else if (data.player_id == 1) {
				game.p2.y = data.new_y;
			}
		});

		socket.on('ball_update', function (data) {
			if(player_id != 1) {
				game.ball.x = data.x;
				game.ball.y = data.y;
			}
		});

		socket.on('game_is_ready', function (data) {
			game.game_is_ready = data.game_is_ready;
			if(!data.game_is_ready) {
				game.p1.score = 0;
				game.p2.score = 0;
			}
		});

		// Start the game execution
		MainLoop();
});
