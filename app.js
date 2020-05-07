
var context;
var shape = new Object();
var coinShape = new Object();
let coinTaken;
var board;
var m_board;
var c_board;
var score;
var lives;
var start_time;
var time_elapsed;
let pac = new Image();
let white_monster = new Image();
let pink_monster = new Image();
let grey_monster = new Image();
let funny_monster = new Image();
let fifty_cent = new Image();
let pacPosition;
let clock = new Image();
let clock_display = false;
let myMusic = new Audio();
var game_duration;
let oneTime;
let isPaused;
let wasEaten;
var interval;
let n_monsters;



function showOnlyGame() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("signup");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'none';
	var e6 = document.getElementById("game");
	e6.style.display = 'block';
	var canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	getUserSettings();
	Start();
}

function getUserSettings(){
	let key_up = String.fromCharCode(sessionStorage.getItem("key_up"));
	if(key_up=="&"){
		key_up = "&#9650";
	}
	let key_down = String.fromCharCode(sessionStorage.getItem("key_down"));
	if(key_down=="("){
		key_down = "&#9660";
	}
	let key_right = String.fromCharCode(sessionStorage.getItem("key_right"));
	if(key_right=="'"){
		key_right = "&#9654";
	}
	let key_left = String.fromCharCode(sessionStorage.getItem("key_left"));
	if(key_left=="%"){
		key_left = "&#9664";
	}
	$("#keys").html("")
	$("#keys").append("<b>DIRECTIONS<b> <br/>");
	$("#keys").append("UP : " + key_up +  "<br/>");
	$("#keys").append("DOWN : " + key_down +  "<br/>");
	$("#keys").append("RIGHT : " + key_right +  "<br/>");
	$("#keys").append("LEFT : " + key_left +  "<br/>");	

	let low_points_balls_color = sessionStorage.getItem("low_points_balls_color");
	let medium_points_balls_color = sessionStorage.getItem("medium_points_balls_color");
	let high_points_balls_color = sessionStorage.getItem("high_points_balls_color");	
	$("#ball_5").css("color",low_points_balls_color);
	$("#ball_15").css("color", medium_points_balls_color);
	$("#ball_25").css("color", high_points_balls_color);	
	
	let duration = sessionStorage.getItem("game_duration");
	if(duration<60){
		duration=60;
	}
	$("#timeset").html("");
	$("#timeset").append("<b>TIME FOR GAME<b> <br/>");
	$("#timeset").append(duration + " seconds");

	let amount_monsters = sessionStorage.getItem("n_monsters");
	$("#monsters").html("")
	$("#monsters").append("<b>AMOUNT OF MONSTERS<b> <br/>");
	$("#monsters").append(amount_monsters + " monsters");

	$("#user_name_player").html("");
	$("#user_name_player").append("User Name:  " + sessionStorage.getItem("user_name"));


}

function Start() {	
	window.clearInterval(interval);
	board = new Array();
	m_board = new Array();
	game_duration = sessionStorage.getItem("game_duration")
	if(game_duration<60){
		game_duration=60;
	}
	myMusicSrc = document.createElement("source");
    myMusicSrc.type = "audio/mpeg";
    myMusicSrc.src = "resource//song.mp3";
	myMusic.appendChild(myMusicSrc);
	myMusic.volume = 0.1;
	myMusic.play();
      
	c_board = new Array();
	score = 0;
	lives = 5;
	var cnt = 22 * 12;
	var food_remain = sessionStorage.getItem("balls_amount");
	var low_points_balls_remain = food_remain * 0.6;
	var medium_points_balls_remain = food_remain * 0.3;
	var high_points_balls_remain = food_remain * 0.1;
	oneTime = true;
	isPaused = true;
	wasEaten = false;
	coinTaken = false;
	pacPosition = "R";
	start_time = new Date();
	for (var i = 0; i < 22; i++) {
		m_board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			//monsters
			n_monsters = sessionStorage.getItem("n_monsters");

			if (i == 1 && j == 1) {
				monstersLocations = new Array();
				monstersLocations[0] = new Array();
				monstersLocations[0][0] = i;
				monstersLocations[0][1] = j;
				m_board[i][j] = 3.1;
				
			}
			else if (i == 1 && j == 10 && n_monsters > 1) {
				m_board[i][j] = 3.2;
				monstersLocations[1] = new Array();
				monstersLocations[1][0] = i;
				monstersLocations[1][1] = j;
				
					
			}
			else if (i == 20 && j == 1 && n_monsters > 2) {
				m_board[i][j] = 3.3;
				monstersLocations[2] = new Array();
				monstersLocations[2][0] = i;
				monstersLocations[2][1] = j;
			
					
			}
			else if (i == 20 && j == 10 && n_monsters > 3) {
				m_board[i][j] = 3.4;
				monstersLocations[3] = new Array();
				monstersLocations[3][0] = i;
				monstersLocations[3][1] = j;
				

			}
			else {
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
			else if ((i == 1 && j == 1) || (i == 1 && j == 10) || (i == 20 && j == 1) || (i == 20 && j == 10)) {
				board[i][j] = 3;
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
				(i == 17 && j == 9)
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
				}
				else {
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

	//random start for to 50 coin
	for (var i = 0; i < 22; i++) {
		c_board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			c_board[i][j] = 0;
		}
	}
	var emptyCellFor50 = findRandomEmptyCell(c_board)
	while (board[emptyCellFor50[0]][emptyCellFor50[1]] == 2 ||
		board[emptyCellFor50[0]][emptyCellFor50[1]] == 3 ||
		board[emptyCellFor50[0]][emptyCellFor50[1]] == 4.1 ||
		board[emptyCellFor50[0]][emptyCellFor50[1]] == 4.2) {
		emptyCellFor50 = findRandomEmptyCell(c_board)

	}
	c_board[emptyCellFor50[0]][emptyCellFor50[1]] = 1;
	coinShape.i = emptyCellFor50[0];
	coinShape.j = emptyCellFor50[1];

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

	interval = window.setInterval(UpdatePosition, 250);


}

function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 21) + 1);
	var j = Math.floor((Math.random() * 11) + 1);
	while (board[i][j] != 0) {
		i = Math.floor((Math.random() * 21) + 1);
		j = Math.floor((Math.random() * 11) + 1);
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
	var currentTime = new Date();
	time_elapsed = game_duration - ((currentTime - start_time) / 1000);	
	lblTime.value = Math.floor(time_elapsed);	
	lblLives.value = lives;

	if (wasEaten) {
		board[shape.i][shape.j] = 0
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2;
	}

	pac.src = "resource\\pacman_" + pacPosition + ".png";
	clock.src = "resource\\clock.png";
	fifty_cent.src = "resource\\50.png";
	for (var i = 0; i < 22; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 15;
			center.y = j * 60 + 15;


			if (board[i][j] == 2) {
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
				context.fillStyle = "darkgreen"; //color
				context.fill();
			}


			//row wall
			else if (board[i][j] == 4.2) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "#6e9e6e"; //color
				context.fill();
			}
			//clock 
			else if (board[i][j] == 1.4){
				context.drawImage(clock, center.x - 15, center.y - 15);
			}
			//coin
			if (c_board[i][j] == 1) {
				context.drawImage(fifty_cent, center.x - 15, center.y - 15);
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
	if (oneTime) {
		isPaused = true;
		oneTime = false;
	}

}

function setPausedFalse() {
	isPaused = false;
}

function UpdatePosition() {
	if ($('#game').is(':hidden')) {
		window.clearInterval(interval);
	}
	else {
		if (!isPaused) {
			if (wasEaten) {
				board[shape.i][shape.j] = 0
				var emptyCell = findRandomEmptyCell(board);
				shape.i = emptyCell[0];
				shape.j = emptyCell[1];
				board[emptyCell[0]][emptyCell[1]] = 2;
				Draw();
				UpdateMonstersPosition();
			}
			else {

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
				if (c_board[shape.i][shape.j] == 1) {
					score = score + 50;
					coinTaken = true;
				}
				
				if (board[shape.i][shape.j] == 1.4 ){
					game_duration = game_duration * 2;  
				}

				board[shape.i][shape.j] = 2;
				if (!coinTaken) {
					updateCoinPosition();
				}
				else {
					x = coinShape.i;
					y = coinShape.j;
					c_board[x][y] = 0;
				}


				var currentTime = new Date();
				time_elapsed = game_duration - ((currentTime - start_time) / 1000);
			
				let m = m_board[shape.i][shape.j];
				if (m == 3.1 || m == 3.2 || m == 3.3 || m == 3.4) {
					if (m_board[shape.i][shape.j] == 3.1) {
						lives--;
						score -= 10;
					}
					else if (m_board[shape.i][shape.j] == 3.2) {
						lives--;
						score -= 20;
					}
					else if (m_board[shape.i][shape.j] == 3.3) {
						lives -= 2;
						score -= 30;
					}
					else if (m_board[shape.i][shape.j] == 3.4) {
						lives -= 2;
						score -= 40;
					}
					wasEaten = true;
					window.alert("You have been eaten")
					if (lives <= 0) {
						window.clearInterval(interval);
						myMusic.pause();
						window.alert("Loser!!!");
						showOnlyGame();
					}
				}

				if (time_elapsed <= 0) {
					window.clearInterval(interval);
					if (score < 100) {
						myMusic.pause();
						window.alert("You are better than " + score + " points!");
					}
					else {
						myMusic.pause();
						window.alert("Winner!!!");
					}
					showOnlyGame();
				} else {
					if (time_elapsed <= 50 && clock_display==false){
						var emptyCell = findRandomEmptyCell(board);
						board[emptyCell[0]][emptyCell[1]] = 1.4; //clock
						clock_display = true;
					}
					Draw();
					UpdateMonstersPosition();
				}
			}
		}
		else {//if isPaused: continue drawing but not update location - NECCESSARY FOR IMAGE!
			Draw();
			UpdateMonstersPosition();
		}
	}
}

function updateCoinPosition() {

	c_board[coinShape.i][coinShape.j] = 0;
	let random = Math.random();
	if (random > 0.75) {				//move up or down
		if (coinShape.i < 21 && board[coinShape.i + 1][coinShape.j] != 4.1 && coinShape.i < 21 && board[coinShape.i + 1][coinShape.j] != 4.2) {
			coinShape.i++;
		}
	}
	else if (random > 0.5 && random <= 0.75) {
		if (coinShape.i > 0 && board[coinShape.i - 1][coinShape.j] != 4.1 && coinShape.i > 0 && board[coinShape.i - 1][coinShape.j] != 4.2) {
			coinShape.i--;
		}
	}
	else if (random > 0.25 && random <= 0.5) {
		if (coinShape.j < 11 && board[coinShape.i][coinShape.j + 1] != 4.1 && (coinShape.j < 11 && board[coinShape.i][coinShape.j + 1] != 4.2)) {
			coinShape.j++;
		}
	}
	else {
		if (coinShape.j > 0 && board[coinShape.i][coinShape.j - 1] != 4.1 && coinShape.j > 0 && board[coinShape.i][coinShape.j - 1] != 4.2) {
			coinShape.j--;
		}
	}
	c_board[coinShape.i][coinShape.j] = 1;
}

function UpdateMonstersPosition() {

	if (!isPaused) {
		if (wasEaten) {
			for (var i = 0; i < n_monsters; i++) {
				m1 = monstersLocations[i][0]
				m2 = monstersLocations[i][1]
				let type = m_board[m1][m2];
				m_board[m1][m2] = 0;


				if (i == 0) {
					m_board[1][1] = type
					monstersLocations[i][0] = 1
					monstersLocations[i][1] = 1
				}
				else if (i == 1) {
					m_board[1][10] = type
					monstersLocations[i][0] = 1
					monstersLocations[i][1] = 10
				}
				else if (i == 2) {
					m_board[20][1] = type
					monstersLocations[i][0] = 20
					monstersLocations[i][1] = 1
				}
				else {
					m_board[20][10] = type
					monstersLocations[i][0] = 20
					monstersLocations[i][1] = 10
				}
			}
			wasEaten = false;
			oneTime = true;
		}
		else {

			var coin = Math.random();
			let x = shape.i;
			let y = shape.j;
			let m1;
			let m2;
			for (var i = 0; i < n_monsters; i++) {
				m1 = monstersLocations[i][0]
				m2 = monstersLocations[i][1]
				if (coin > 0.5) {				//move up or down
					if (y - m2 < 0) {		//means: pacman is higher than monster
						if (m2 > 0 && board[m1][m2 - 1] != 4.1 && board[m1][m2 - 1] != 4.2 && m_board[m1][m2 - 1] == 0) {
							monstersLocations[i][1]--;
							let type = m_board[m1][m2];
							m_board[m1][m2] = 0;
							m_board[m1][m2 - 1] = type;
						}

					}
					else {
						if (m2 < 11 && board[m1][m2 + 1] != 4.1 && board[m1][m2 + 1] != 4.2 && m_board[m1][m2 + 1] == 0) {
							monstersLocations[i][1]++;
							let type = m_board[m1][m2];
							m_board[m1][m2] = 0;
							m_board[m1][m2 + 1] = type;
						}
					}
				}

				if (coin <= 0.5) {	 			// moved left or right
					if (x - m1 < 0) {		//means: pacman is lefter than monster
						if (m1 > 0 && board[m1 - 1][m2] != 4.1 && board[m1 - 1][m2] != 4.2 && m_board[m1 - 1][m2] == 0) {
							monstersLocations[i][0]--;
							let type = m_board[m1][m2];
							m_board[m1][m2] = 0;
							m_board[m1 - 1][m2] = type;
						}

					}
					else {
						if (m1 < 21 && board[m1 + 1][m2] != 4.1 && board[m1 + 1][m2] != 4.2 && m_board[m1 + 1][m2] == 0) {
							monstersLocations[i][0]++;
							let type = m_board[m1][m2];
							m_board[m1][m2] = 0;
							m_board[m1 + 1][m2] = type;
						}
					}
				}
			}
		}
	}
	DrawMonsters();//Weather isPaused or not: continue drawing but not update location  - NECCESSARY FOR IMAGE!
}

