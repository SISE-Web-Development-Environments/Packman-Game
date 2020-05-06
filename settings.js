$(document).ready(function() {
	createUserP();
});

let current_user_name;

function clearLocalStorage() {
	localStorage.clear();
}
/* ---------------- USER P ---------------- */
function createUserP() {	
	if(localStorage.getItem("p")==null){
		var details = ["p", "p levy", "p.com", "01.01.1994"]
		localStorage.setItem("p", JSON.stringify(details));
		current_user_name = "p";
		randomSettings();
		saveSettings();
	}
}

/* ---------------- SIGN UP ---------------- */
function showOnlySignup() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("signup");
	e2.style.display = 'block';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e4 = document.getElementById("about");
	e4.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'none';
	var e6 = document.getElementById("game");
	e6.style.display = 'none';
}


function submit() {
	var user_name = $("#user_name").val();
	var password = $("#password").val();
	var full_name = $("#full_name").val();
	var Email = $("#Email").val();
	var birth_date = $("#birth_date").val();

	//valid using JQuery ($)
	if (user_name == "" || password == "" || full_name == "" || Email == "") {
		alert("You didn't fill all the fileds");		
	}
	
	else if (password.length < 6) {
		alert("Password's length must be at least 6 characters");
	}
	else if (!(/\d/.test(password) && /[a-zA-Z]/.test(password))) {
		alert("Password's must contain at least one digit and one letter");
	}
	else if (/\d/.test(full_name)) {
		alert("Full name mustn't contain digits");
	}
	else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))){
		alert("Email is not valid");
	}
	else {
		//submit
		var details = [password, full_name, Email, (birth_date).toString()]
		localStorage.setItem(user_name, JSON.stringify(details));
		//sessionStorage.setItem("signup_user_name", user_name);
		current_user_name=	user_name;	
		$("#success").html("")
		$("#success").append("Your details have been successfully entered")
	}

}

/* ---------------- SETTINGS ---------------- */
function showOnlySettings() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("signup");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e4 = document.getElementById("about");
	e4.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'block';
	var e6 = document.getElementById("game");
	e6.style.display = 'none';	
}

 function setKeyUp(event){
	var key_up = event.keyCode;
    sessionStorage.setItem("key_up", key_up);
	alert("up button select");
 } 
 function setKeyDown(event){
	var key_down = event.keyCode;
	sessionStorage.setItem("key_down", key_down);
  	alert("down button select");
 } 
 function setKeyLeft(event){
	var key_left = event.keyCode;
	sessionStorage.setItem("key_left", key_left);
  	alert("left button select");
 } 
 function setKeyRight(event){
	var key_right = event.keyCode;
	sessionStorage.setItem("key_right", key_right);
  	alert("right button select");
 } 
 function saveSettings(){
	 var balls_amount = document.getElementById("balls_amount").value ;
	 var low_points_balls_color = document.getElementById("low_points_balls_color").value;
	 var medium_points_balls_color = document.getElementById("medium_points_balls_color").value;
	 var high_points_balls_color = document.getElementById("high_points_balls_color").value;
	 var game_duration = document.getElementById("game_duration").value;
	 var n_monsters = document.getElementById("n_monsters").value;

	 sessionStorage.setItem("balls_amount", balls_amount);
	 sessionStorage.setItem("low_points_balls_color", low_points_balls_color);
	 sessionStorage.setItem("medium_points_balls_color", medium_points_balls_color);
	 sessionStorage.setItem("high_points_balls_color", high_points_balls_color);
	 sessionStorage.setItem("game_duration", game_duration);
	 sessionStorage.setItem("n_monsters", n_monsters);
	 
	 //save settings in local storage
	 var key_up = sessionStorage.getItem("key_up");
	 var key_down =sessionStorage.getItem("key_down");
	 var key_left =sessionStorage.getItem("key_left");
	 var key_right =sessionStorage.getItem("key_right");


	 var details = [balls_amount, low_points_balls_color, medium_points_balls_color, high_points_balls_color, game_duration, n_monsters, key_up, key_down, key_left, key_right];
		 //var user_name = sessionStorage.getItem("signup_user_name").value;
		 localStorage.setItem(current_user_name+"_settings", JSON.stringify(details));	
		 sessionStorage.setItem("user_name", current_user_name);	
 }
 function randomSettings(){
	document.getElementById("balls_amount").innerHTML = 60;
	document.getElementById("low_points_balls_color").innerHTML = "#00cc00";
	document.getElementById("medium_points_balls_color").innerHTML ="#0066ff";
	document.getElementById("high_points_balls_color").innerHTML = "#ff0000";
	document.getElementById("game_duration").innerHTML = 60;
	document.getElementById("n_monsters").innerHTML = 2;

	sessionStorage.setItem("key_up", 38);
	sessionStorage.setItem("key_down", 40);
	sessionStorage.setItem("key_left", 37);
	sessionStorage.setItem("key_right", 39);
 }
 function displaySettings(){
	alert("balls amount: "+ sessionStorage.getItem("balls_amount") + "\n" +
			"balls colors: " + sessionStorage.getItem("low_points_balls_color") +" "+ sessionStorage.getItem("medium_points_balls_color")
			+" "+ sessionStorage.getItem("high_points_balls_color") +"\n"+
			"game duration: "+ sessionStorage.getItem("game_duration") + "\n" +
			"monsters amount: "+ sessionStorage.getItem("n_monsters")+"\n"+
			"keys: "+"UP: "+ sessionStorage.getItem("key_up")+ " "
			+"DOWN: "+ sessionStorage.getItem("key_down")+ " "
			+"LEFT: "+ sessionStorage.getItem("key_left")+ " "
			+"RIGHT: "+ sessionStorage.getItem("key_right"));
 }