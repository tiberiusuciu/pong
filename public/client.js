// http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas/

function Game() {
    var canvas = document.getElementById("game");
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = "white";
    this.keys = new KeyListener();

    this.p1 = new Paddle(5, 0);
    this.p1.y = this.height/2 - this.p1.height/2;
    this.display1 = new Display(this.width/4, 25);
    this.p2 = new Paddle(this.width - 5 - 2, 0);
    this.p2.y = this.height/2 - this.p2.height/2;
    this.display2 = new Display(this.width*3/4, 25);

    this.ball = new Ball();
    this.ball.x = this.width/2;
    this.ball.y = this.height/2;
    this.ball.vy = Math.floor(Math.random()*12 - 6);
    this.ball.vx = 7 - Math.abs(this.ball.vy);
}

Game.prototype.draw = function()
{
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width/2, 0, 2, this.height);

    this.ball.draw(this.context);

    this.p1.draw(this.context);
    this.p2.draw(this.context);
    this.display1.draw(this.context);
    this.display2.draw(this.context);
};

Game.prototype.update = function()
{
    if (this.paused)
        return;

    this.ball.update();
    this.display1.value = this.p1.score;
    this.display2.value = this.p2.score;

    // To which Y direction the paddle is moving
    if (this.keys.isPressed(83)) { // DOWN
        this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
    } else if (this.keys.isPressed(87)) { // UP
        this.p1.y = Math.max(0, this.p1.y - 4);
    }

    if (this.keys.isPressed(40)) { // DOWN
        this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
    } else if (this.keys.isPressed(38)) { // UP
        this.p2.y = Math.max(0, this.p2.y - 4);
    }

    if (this.ball.vx > 0) {
        if (this.p2.x <= this.ball.x + this.ball.width &&
                this.p2.x > this.ball.x - this.ball.vx + this.ball.width) {
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
    } else {
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
    if ((this.ball.vy < 0 && this.ball.y < 0) ||
            (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
        this.ball.vy = -this.ball.vy;
    }

    if (this.ball.x >= this.width)
        this.score(this.p1);
    else if (this.ball.x + this.ball.width <= 0)
        this.score(this.p2);
};

Game.prototype.score = function(p)
{
    // player scores
    p.score++;
    var player = p == this.p1 ? 0 : 1;

    // set ball position
    this.ball.x = this.width/2;
    this.ball.y = p.y + p.height/2;

    // set ball velocity
    this.ball.vy = 7;
    this.ball.vx = 7;
    if (player == 1)
        this.ball.vx *= -1;
};


// PADDLE
function Paddle(x,y) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 28;
    this.score = 0;
}

Paddle.prototype.draw = function(p)
{
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

Ball.prototype.update = function()
{
    this.x += this.vx;
    this.y += this.vy;
};

Ball.prototype.draw = function(p)
{
    p.fillRect(this.x, this.y, this.width, this.height);
};


//DISPLAY
function Display(x, y) {
    this.x = x;
    this.y = y;
    this.value = 0;
}

Display.prototype.draw = function(p)
{
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

// function TouchListener(element) {
//     this.touches = [];
//     this.touchMoveListener = function(touch) {};
//
//     element.addEventListener("touchstart", (function(e) {
//         e.preventDefault();
//         for (var i = 0; i < e.changedTouches.length; i++) {
//             var touch = e.changedTouches[i];
//             this.touches[touch.identifier] = {x: touch.clientX, y: touch.clientY};
//         }
//     }).bind(this));
//
//     element.addEventListener("touchmove", (function(e) {
//         e.preventDefault();
//         for (var i = 0; i < e.changedTouches.length; i++) {
//             var touch = e.changedTouches[i];
//             var previousTouch = this.touches[touch.identifier];
//             this.touches[touch.identifier] = {x: touch.clientX, y: touch.clientY};
//
//             var offset = {x: touch.clientX - previousTouch.x, y: touch.clientY - previousTouch.y}
//             this.touchMoveListener({x: touch.clientX, y: touch.clientY, offset: offset});
//         }
//     }).bind(this));
//
//     element.addEventListener("touchend", (function(e) {
//         e.preventDefault();
//         for (var i = 0; i < e.changedTouches.length; i++) {
//             delete this.touches[e.changedTouches[i].identifier];
//         }
//     }).bind(this));
// }

KeyListener.prototype.isPressed = function(key)
{
    return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
{
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
    setTimeout(MainLoop, 33.3333);
}

// Start the game execution
MainLoop();


// document.addEventListener("DOMContentLoaded", function() {
// 	var mouse = {
// 		click: false,
// 		move: false,
// 		pos: {x:0, y:0},
// 		pos_prev: false
// 	};
//
// 	var canvas  = document.getElementById('drawing');
// 	var context = canvas.getContext('2d');
// 	var width   = window.innerWidth;
// 	var height  = window.innerHeight;
// 	var socket  = io.connect();
// 	context.fillStyle = "black";
//
// 	canvas.width = width;
// 	canvas.height = height;
//
// 	canvas.onmousedown = function(e){
// 		mouse.click = true;
// 	};
// 	canvas.onmouseup = function(e){
// 		mouse.click = false;
// 	};
//
// 	canvas.onmousemove = function(e) {
// 		mouse.pos.x = e.clientX / width;
// 		mouse.pos.y = e.clientY / height;
// 		mouse.move = true;
// 	};
//
// 	socket.on('draw_line', function (data) {
// 		var line = data.line;
// 		context.beginPath();
// 		context.lineWidth = 2;
// 		context.moveTo(line[0].x * width, line[0].y * height);
// 		context.lineTo(line[1].x * width, line[1].y * height);
// 		context.stroke();
// 	});
//
// 	function mainLoop() {
// 		if (mouse.click && mouse.move && mouse.pos_prev) {
// 			socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
// 			mouse.move = false;
// 		}
// 		mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
// 		setTimeout(mainLoop, 25);
// 	}
// 	mainLoop();
//
// 	function doKeyDown(e){
// 		console.log(e);
// 	}
//
// 	window.addEventListener('keydown',doKeyDown,true);
// });
