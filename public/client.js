document.addEventListener("DOMContentLoaded", function() {
	var player_id = 0;

	// Adding new player

	// Setting up base game
	function Game() {
		/*
		var canvas = document.getElementById("game");
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = canvas.getContext("2d");
		this.context.fillStyle = "#D00";
		this.keys = new KeyListener();

		// Adding the paddle on the screen
		// Player one
		this.p1 = new Paddle(5, 0);
		this.p1.y = this.height/2 - this.p1.height/2;
		this.display1 = new Display(this.width/8, 25);

		// Player two
		this.p2 = new Paddle(this.width - 5 - 2, 0);
		this.p2.y = this.height/2 - this.p2.height/2;
		this.display2 = new Display(this.width*7/8, 25);

		this.ball = new Ball();
		this.ball.x = this.width/2;
		this.ball.y = this.height/2;
		this.ball.vy = Math.floor(Math.random()*12 - 6);
		this.ball.vx = 7 - Math.abs(this.ball.vy);
		socket.emit('ball_change', { vx: this.ball.vx, vy: this.ball.vy, x: this.ball.x, y: this.ball.y });
		// The game is only ready when there are 2 connections
		this.game_is_ready = false;
		*/
	}

	// Presenting the canvas visually
	Game.prototype.draw = function() {
		/*
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillRect(this.width/2, 0, 2, this.height);

		this.ball.draw(this.context);

		this.p1.draw(this.context);
		this.p2.draw(this.context);
		this.display1.draw(this.context);
		this.display2.draw(this.context);
		*/
	};

	// Setting up one frame lifecycle
	Game.prototype.update = function() {
/*
		this.ball.update();
		this.display1.value = this.p1.score;
		this.display2.value = this.p2.score;
*/
/*
		// Paddle movement
		if (player_id >= 0) {
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
			}
			else if (this.keys.isPressed(87)) { // UP
				if (player_id == 0) {
					new_y = Math.max(0, this.p1.y - 8);
					this.p1.y = new_y;
				}
				else if (player_id == 1) {
					new_y = Math.max(0, this.p2.y - 8);
					this.p2.y = new_y;
				}
			}
		}
*/
/*
		// Collision for paddles
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
*/
/*
		// Top and bottom collision
		if ((this.ball.vy < 0 && this.ball.y < 0) || (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
			this.ball.vy = -this.ball.vy;
		}
*/
/*
		// Checking for scoring
		if (this.ball.x >= this.width) {
			this.score(this.p1);
		}
		else if (this.ball.x + this.ball.width <= 0) {
			this.score(this.p2);
		}
*/
	};

	// player scores
		Game.prototype.score = function(p) {
			/*
			p.score++;
			var player = p == this.p1 ? 0 : 1;

			// set ball position
			this.ball.x = this.width/2;
			this.ball.y = this.height/2;

			// set ball velocity
			if (this.game_is_ready && player_id == 0) {
				this.ball.vy = Math.floor(Math.random()*12 - 6);
				this.ball.vx = 7 - Math.abs(this.ball.vy);
				if (player == 1) {
					this.ball.vx *= -1;
				}
				socket.emit('ball_change', { vx: this.ball.vx, vy: this.ball.vy, x: this.ball.x, y: this.ball.y });
			}
			*/
		};

		// PADDLE
		function Paddle(x, y) {
			this.x = x;
			this.y = y;
			this.width = 2;
			this.height = 28;
			this.score = 0;
		};

		Paddle.prototype.draw = function(p) {
			// displaying the paddle
			p.fillRect(this.x, this.y, this.width, this.height);
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
			}
		};

		Ball.prototype.draw = function(p) {
			// Displaying the ball
			p.fillRect(this.x, this.y, this.width, this.height);
		};

		//DISPLAY (Score)
		function Display(x, y) {
			this.x = x;
			this.y = y;
			this.value = 0;
		}

		Display.prototype.draw = function(p) {
			// Displaying the score
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
		// var game = new Game();

		// Setting up the game lifecycle
		function MainLoop() {
			/*
			game.update();
			game.draw();
			// Call the main loop again at a frame rate of 60fps
			var frameCount = 1000/60;
			setTimeout(MainLoop, frameCount);
			*/
		}
/*
		// Socket connections
		socket.on('notify_v_moved', function (data) {
			if (data.player_id == 0) {
				game.p1.y = data.new_y;
			}
			else if (data.player_id == 1) {
				game.p2.y = data.new_y;
			}
		});

		socket.on('game_is_ready', function (data) {
			game.game_is_ready = data.game_is_ready;
			// When someone disconnects
			if(!data.game_is_ready) {
				game.p1.score = 0;
				game.p2.score = 0;
			}
		});

		socket.on('ball_changed', function (data) {
			game.ball.vx = data.vx;
			game.ball.vy = data.vy;
			game.ball.x = data.x;
			game.ball.y = data.y;
		});
*/
		// Start the game execution
		// MainLoop();
});
