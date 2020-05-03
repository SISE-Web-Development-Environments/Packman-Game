

function clearLocalStorage() {
	localStorage.clear();
}


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
		sessionStorage.setItem("signup_user_name", user_name);
		sessionStorage.setItem("signup_password", password);
		$("#success").html("")
		$("#success").append("Your details have been successfully entered")
	}

}



