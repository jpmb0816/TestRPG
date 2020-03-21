var SIZE = 32;
var player;
var map;

function Pixel(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

function Map(rows, cols) {
	this.rows = rows;
	this.cols = cols;
	this.grid = new Array(cols);
	
	for (var y = 0; y < cols; y++) {
		this.grid[y] = new Array(rows);
		for (var x = 0; x < rows; x++) {
			this.grid[y][x] = new Pixel(random(255), random(255), random(255), random(100));
		}
	}
	
	this.draw = function() {
		push();
		noStroke();
		for (var y = 0; y < this.cols; y++) {
			for (var x = 0; x < this.rows; x++) {
				var p = this.grid[y][x];
				var clr = color(p.r, p.g, p.b);
				clr.setAlpha(p.a);
				fill(clr);
				rect(x * SIZE, y * SIZE, SIZE, SIZE);
			}
		}
		pop();
	};
}

function Player() {
	this.color = "orange";
	this.position = {
		x: 256,
		y: 256
	};
	this.velocity = {
		x: 0,
		y: 0
	};
	this.speed = 4;
	this.width = SIZE;
	this.height = SIZE;

	this.update = function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.checkBoundaries();
	};

	this.draw = function() {
		fill(this.color);
		rect(this.position.x, this.position.y, this.width, this.height);
	};

	this.checkBoundaries = function() {
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		else if (this.position.x > width - this.width) {
			this.position.x = width - this.width;
		}

		if (this.position.y < 0) {
			this.position.y = 0;
		}
		else if (this.position.y > height - this.height) {
			this.position.y = height - this.height;
		}
	};
}

function setup() {
	createCanvas(SIZE * 20, SIZE * 15);
	map = new Map(20, 15);
	player = new Player();
}

function draw() {
	background(255);
	map.draw();
	player.update();
	player.draw();
}

function keyPressed() {
	switch (keyCode) {
		case 37:
			player.velocity.x = -player.speed;
			break;
		case 38:
			player.velocity.y = -player.speed;
			break;
		case 39:
			player.velocity.x = player.speed;
			break;
		case 40:
			player.velocity.y = player.speed;
			break;
	}
}

/*function keyReleased() {
	switch(keyCode) {
		case 37:
			player.velocity.x = 0;
			break;
		case 38:
			player.velocity.y = 0;
			break;
		case 39:
			player.velocity.x = 0;
			break;
		case 40:
			player.velocity.y = 0;
			break;
	}
}*/
