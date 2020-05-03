
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
let pac = new Image();
let pacPosition;

// $(document).ready(function() {
// 	context = canvas.getContext("2d");
// 	Start();
// });

function showOnlyGame() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("signup");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e4 = document.getElementById("about");
	e4.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'none';
	var e6 = document.getElementById("game");
	e6.style.display = 'block';	
	context = canvas.getContext("2d");
 	Start();
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = sessionStorage.getItem("balls_amount");
	var low_points_balls_remain = food_remain * 0.6;
	var medium_points_balls_remain = food_remain * 0.3;
	var high_points_balls_remain = food_remain * 0.1;
	var pacman_state = false;
	pacPosition = "R";
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				
				//walls
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
					 //monsters
					 
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				//low points ball - 1.1
				if (randomNum <= (1.0 * low_points_balls_remain) / cnt) {
					low_points_balls_remain--;
					food_remain--;
					board[i][j] = 1.1;
				}
				//medium points ball - 1.2
				else if (randomNum <= (1.0 * medium_points_balls_remain) / cnt) {
					medium_points_balls_remain--;
					food_remain--;
					board[i][j] = 1;
				}
				//high points ball - 1.3
				else if (randomNum <= (1.0 * high_points_balls_remain) / cnt) {
					high_points_balls_remain--;
					food_remain--;
					board[i][j] = 1.3;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (low_points_balls_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.1;
		low_points_balls_remain--;
	}
	while (medium_points_balls_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.2;
		medium_points_balls_remain--;
	}
	while (high_points_balls_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1.3;
		high_points_balls_remain--;
	}

	//pacman position
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;


	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	//up
	if (keysDown[sessionStorage.getItem("key_up")]) {
		return 1;
	}
	//down
	if (keysDown[sessionStorage.getItem("key_down")]) {
		return 2;
	}
	//left
	if (keysDown[sessionStorage.getItem("key_left")]) {
		return 3;
	}
	//right
	if (keysDown[sessionStorage.getItem("key_right")]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblUserName.value = sessionStorage.getItem("user_name");
	
	pac.src = "resource\\pacman_"+pacPosition+".png";
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			
			if (board[i][j] == 2) {
				/*
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
				*/
				context.drawImage(pac, center.x-15, center.y-15);
				
			} else if (board[i][j] == 1.1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = sessionStorage.getItem("low_points_balls_color"); //color
				context.fill();
			} else if (board[i][j] == 1.2) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = sessionStorage.getItem("medium_points_balls_color");; //color
				context.fill();
			} else if (board[i][j] == 1.3) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle  = sessionStorage.getItem("high_points_balls_color"); //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		pacPosition = "U";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		pacPosition = "D";
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		pacPosition = "L";
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		pacPosition = "R";
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1.1) {
		score = score + 5;
	}
	if (board[shape.i][shape.j] == 1.2) {
		score = score + 15;
	}
	if (board[shape.i][shape.j] == 1.3) {
		score = score + 25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = sessionStorage.getItem ("game_duration") - ((currentTime - start_time) / 1000);
	
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (time_elapsed <= 0) {
		window.clearInterval(interval);
		if (score < 100){
			window.alert("You are better than "+ score+" points!");
		}
		else{
			window.alert("Winner!!!");
		}
		showOnlyGame();
	} else {
		Draw();
	
	}
}
