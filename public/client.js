document.addEventListener("DOMContentLoaded", function() {
	var player_id = 0;

	// Adding new player

	// Setting up base game
	function Game() {

	}

	// Presenting the canvas visually
	Game.prototype.draw = function() {

	};

	// Setting up one frame lifecycle
	Game.prototype.update = function() {


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
		}
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
		// Top and bottom collision

		// Checking for scoring
	};

	// player scores
		Game.prototype.score = function(p) {
			// set ball position

			// set ball velocity
		};

		// PADDLE
		function Paddle(x, y) {

		}

		Paddle.prototype.draw = function(p) {
			// displaying the paddle
		};

		// BALL
		function Ball() {

		}

		Ball.prototype.update = function() {

		};

		Ball.prototype.draw = function(p) {
			// Displaying the ball
		};

		//DISPLAY (Score)
		function Display(x, y) {

		}

		Display.prototype.draw = function(p) {
			// Displaying the score
		};

/*
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
*/

		// Initialize our game instance

		// Setting up the game lifecycle
		function MainLoop() {
			// Call the main loop again at a frame rate of 60fps
		}

		// Socket connections

		// Start the game execution
});
