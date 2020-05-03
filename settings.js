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
	 var user_name = sessionStorage.getItem("signup_user_name");
	 localStorage.setItem(user_name+"_settings", JSON.stringify(details));	
	 sessionStorage.setItem("user_name", user_name);	
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