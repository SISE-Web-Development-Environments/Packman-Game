function showOnlyLogin() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'none';
	var e2 = document.getElementById("signup");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'block';
	var e4 = document.getElementById("about");
	e4.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'none';
	var e6 = document.getElementById("game");
	e6.style.display = 'none';
	
}

function login_start(){
	var user_name = document.getElementById("login_user_name");  
	var password_in = document.getElementById("login_password");  
	if (user_name.value =="" || password_in.value ==""){
		alert("please enter user name and password")
	}
	else{
		var retrievedData = localStorage.getItem(user_name.value); 
		if (retrievedData == null){
			alert("The user name you’ve entered is incorrect")
		}
		else{
			var details =  JSON.parse(retrievedData);
			password.innerText = details[0];
			if (password.innerText==password_in.value){
				alert("welcome "+user_name.value);
				showOnlyGame();
				//TODO: set settings and start the game
				
			}
			else{
				alert("The password you’ve entered is incorrect")
			}
		}
	}
	
}