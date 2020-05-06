
var context;
var shape = new Object();
var board;
var m_board;
var score;
var lives;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
let pac = new Image();
let white_monster = new Image();
let pink_monster = new Image();
let grey_monster = new Image();
let funny_monster = new Image();
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
	var canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");	
	Start();
}

function Start() {
	board = new Array();
	m_board = new Array();
	score = 0;
	lives = 5;
	pac_color = "yellow";
	var cnt = 22 * 12;
	var food_remain = sessionStorage.getItem("balls_amount");
	var low_points_balls_remain = food_remain * 0.6;
	var medium_points_balls_remain = food_remain * 0.3;
	var high_points_balls_remain = food_remain * 0.1;
	var pacman_state = false;
	pacPosition = "R";
	start_time = new Date();
	for (var i = 0; i < 22; i++) {
		m_board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			//monsters
			n_monsters = sessionStorage.getItem("n_monsters");//string or int?
			
			if (i == 1 && j == 1) {
				monstersLocations = new Array();
				monstersLocations[0] = new Array();
				monstersLocations[0][0] = i
				monstersLocations[0][1] = j
				m_board[i][j] = 3.1;
			}
			else if (i == 1 && j == 10 && n_monsters > 1) {
				m_board[i][j] = 3.2;
				monstersLocations[1] = new Array();
				monstersLocations[1][0] = i
				monstersLocations[1][1] = j
			}
			else if (i == 20 && j == 1 && n_monsters > 2) {
				m_board[i][j] = 3.3;
				monstersLocations[2] = new Array();
				monstersLocations[2][0] = i
				monstersLocations[2][1] = j
			}
			else if (i == 20 && j == 10 && n_monsters > 3) {
				m_board[i][j] = 3.4;
				monstersLocations[3] = new Array();
				monstersLocations[3][0] = i
				monstersLocations[3][1] = j
			}
			else{
				m_board[i][j] = 0;
			}
		}
	}

	for (var i = 0; i < 22; i++) {
		board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			if (i == 21 || j == 11 || i == 0 || j == 0) {
				board[i][j] = 4.1;
			}
			else if (
				// walls

				// i = col . j = row

				(i == 2 && j == 2) ||
				(i == 2 && j == 3) ||
				(i == 2 && j == 4) ||
				(i == 2 && j == 5) ||
				(i == 2 && j == 6) ||
				(i == 2 && j == 7) ||
				(i == 2 && j == 8) ||
				(i == 2 && j == 9) ||
				(i == 3 && j == 2) ||
				(i == 4 && j == 2) ||
				(i == 5 && j == 2) ||
				(i == 6 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 8 && j == 2) ||
				(i == 8 && j == 3) ||
				(i == 8 && j == 4) ||
				(i == 8 && j == 4) ||
				(i == 7 && j == 6) ||
				(i == 6 && j == 6) ||
				(i == 5 && j == 6) ||
				(i == 4 && j == 6) ||
				(i == 8 && j == 5) ||
				(i == 8 && j == 6) ||
				(i == 8 && j == 7) ||
				(i == 8 && j == 8) ||
				(i == 8 && j == 9) ||
				//M
				(i == 19 && j == 2) ||
				(i == 19 && j == 3) ||
				(i == 19 && j == 4) ||
				(i == 19 && j == 5) ||
				(i == 19 && j == 6) ||
				(i == 19 && j == 7) ||
				(i == 19 && j == 8) ||
				(i == 19 && j == 9) ||
				(i == 18 && j == 2) ||
				(i == 17 && j == 2) ||
				(i == 16 && j == 2) ||
				(i == 15 && j == 2) ||
				(i == 14 && j == 2) ||
				(i == 13 && j == 2) ||
				(i == 12 && j == 2) ||
				(i == 11 && j == 2) ||
				(i == 11 && j == 3) ||
				(i == 11 && j == 4) ||
				(i == 11 && j == 5) ||
				(i == 11 && j == 6) ||
				(i == 11 && j == 7) ||
				(i == 11 && j == 8) ||
				(i == 11 && j == 9) ||
				(i == 15 && j == 3) ||
				(i == 15 && j == 4) ||
				(i == 15 && j == 5) ||
				(i == 15 && j == 6) ||
				(i == 15 && j == 7) ||
				(i == 15 && j == 8) ||
				(i == 15 && j == 9)



			) {
				board[i][j] = 4.1;
			} else if (

				(i == 13 && j == 4) ||
				(i == 13 && j == 5) ||
				(i == 13 && j == 6) ||
				(i == 13 && j == 7) ||
				(i == 13 && j == 8) ||
				(i == 13 && j == 9) ||
				(i == 17 && j == 4) ||
				(i == 17 && j == 5) ||
				(i == 17 && j == 6) ||
				(i == 17 && j == 7) ||
				(i == 17 && j == 8) ||
				(i == 17 && j == 9) ||
				(i == 4 && j == 9) ||
				(i == 4 && j == 8) ||
				(i == 5 && j == 8) ||
				(i == 6 && j == 8) ||
				(i == 6 && j == 9) ||
				(i == 4 && j == 4) ||
				(i == 5 && j == 4) ||
				(i == 6 && j == 4) 

			) {
				board[i][j] = 4.2;
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
					board[i][j] = 1.2;
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
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	//interval2 = setInterval(UpdateMonstersPosition, 400);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 21 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 21 + 1);
		j = Math.floor(Math.random() * 11 + 1);
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
	lblTime.value = Math.floor(time_elapsed);
	lblUserName.value = sessionStorage.getItem("user_name");
	lblLives.value = lives;

	pac.src = "resource\\pacman_" + pacPosition + ".png";
	for (var i = 0; i < 22; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 15;
			center.y = j * 60 + 15;
			if (board[i][j] == 2) {

				// context.beginPath();
				// context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				// context.lineTo(center.x, center.y);
				// context.fillStyle = pac_color; //color
				// context.fill();
				// context.beginPath();
				// context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();

				context.drawImage(pac, center.x - 15, center.y - 15);

			}
			else if (board[i][j] == 1.1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = sessionStorage.getItem("low_points_balls_color"); //color
				context.fill();
			} else if (board[i][j] == 1.2) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = sessionStorage.getItem("medium_points_balls_color");; //color
				context.fill();
			} else if (board[i][j] == 1.3) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = sessionStorage.getItem("high_points_balls_color"); //color
				context.fill();
				//column wall
			} else if (board[i][j] == 4.1) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 60, 60);
				context.fillStyle = "blue"; //color
				context.fill();
			}
			//row wall
			else if (board[i][j] == 4.2) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "#003366"; //color
				context.fill();
			}
		}
	}
}

function DrawMonsters() {
	pink_monster.src = "resource\\pink_monster.png";
	white_monster.src = "resource\\white_monster.png";
	grey_monster.src = "resource\\grey_monster.png";
	funny_monster.src = "resource\\funny_monster.png";

	for (var i = 0; i < 22; i++) { //clean board
		for (var j = 0; j < 12; j++) {

			var center = new Object();
			center.x = i * 60 + 15;
			center.y = j * 60 + 15;
			//canvas.width = canvas.width;

			if (m_board[i][j] == 3.1) {
			
				context.drawImage(pink_monster, center.x - 15, center.y - 15);
			}
			else if (m_board[i][j] == 3.2) {
			
				context.drawImage(white_monster, center.x - 15, center.y - 15);
			}
			else if (m_board[i][j] == 3.3) {
				
				context.drawImage(grey_monster, center.x - 15, center.y - 15);
			}
			else if (m_board[i][j] == 3.4) {
				
				context.drawImage(funny_monster, center.x - 15, center.y - 15);
			}
		}
	}
}



function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		pacPosition = "U";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4.1 && shape.j > 0 && board[shape.i][shape.j - 1] != 4.2) {
			shape.j--;
		}
	}
	if (x == 2) {
		pacPosition = "D";
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4.1 && (shape.j < 11 && board[shape.i][shape.j + 1] != 4.2)) {
			shape.j++;
		}
	}
	if (x == 3) {
		pacPosition = "L";
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4.1 && shape.i > 0 && board[shape.i - 1][shape.j] != 4.2) {
			shape.i--;
		}
	}
	if (x == 4) {
		pacPosition = "R";
		if (shape.i < 21 && board[shape.i + 1][shape.j] != 4.1 && shape.i < 21 && board[shape.i + 1][shape.j] != 4.2) {
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
	time_elapsed = sessionStorage.getItem("game_duration") - ((currentTime - start_time) / 1000);

	//  if (score >= 20 && time_elapsed <= 10) {
	//  	pac_color = "green";
	//  }
	if(m_board[shape.i][shape.j]==3.1){
		lives--;
		score -=10;
	}
	else if(m_board[shape.i][shape.j]==3.2){
		lives--;
		score-=20;
	}
	else if(m_board[shape.i][shape.j]==3.3){
		lives-=2;
		score-=30
	}
	else if(m_board[shape.i][shape.j]==3.4){
		lives-=2;
		score-=40;
	}
	if(lives==0){
		
	}

	if (time_elapsed <= 0) {
		window.clearInterval(interval);
		if (score < 100) {
			window.alert("You are better than " + score + " points!");
		}
		else {
			window.alert("Winner!!!");
		}
		showOnlyGame();
	} else {
		Draw();
		UpdateMonstersPosition();
	}
}

function UpdateMonstersPosition() {
	var coin = Math.random();	
	let x = shape.i;
	let y = shape.j;
	let m1;
	let m2;
	for (var i = 0; i < n_monsters; i++) {
		m1 = monstersLocations[i][0]
		m2 = monstersLocations[i][1]
		if (coin > 0.5 ) {				//move up or down
			if (y - m2 < 0) {		//means: pacman is higher than monster
				if (m2 > 0 && board[m1][m2 - 1] != 4.1 && board[m1][m2 - 1] != 4.2 && m_board[m1][m2 - 1]==0) {
					monstersLocations[i][1]--;
					let type = m_board[m1][m2];
					m_board[m1][m2] = 0;
					m_board[m1][m2 - 1] = type;
				}

			}
			else {
				if (m2 < 11 && board[m1][m2 + 1] != 4.1 && board[m1][m2 + 1] != 4.2 && m_board[m1][m2 + 1]==0) {
					monstersLocations[i][1]++;
					let type = m_board[m1][m2];
					m_board[m1][m2] = 0;
					m_board[m1][m2 + 1] = type;
				}
			}
		}

		if (coin <= 0.5) {	 			// moved left or right
			if (x - m1 < 0) {		//means: pacman is lefter than monster
				if (m1 > 0 && board[m1 - 1][m2] != 4.1 && board[m1 - 1][m2] != 4.2 && m_board[m1 - 1][m2]==0) {
					monstersLocations[i][0]--;
					let type = m_board[m1][m2];
					m_board[m1][m2] = 0;
					m_board[m1 - 1][m2] = type;
				}

			}
			else {
				if (m1 < 21 && board[m1 + 1][m2] != 4.1 && board[m1 + 1][m2] != 4.2 && m_board[m1 + 1][m2]==0) {
					monstersLocations[i][0]++;
					let type = m_board[m1][m2];
					m_board[m1][m2] = 0;
					m_board[m1 + 1][m2] = type;
				}
			}
		}
	}
	DrawMonsters();
}
