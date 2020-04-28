function clearLocalStorage(){
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

function submit() 
   {
      var user_name = document.getElementById("user_name");
      var password = document.getElementById("password");
      var full_name = document.getElementById("full_name");
	  var Email = document.getElementById("Email");
	  var birth_date = document.getElementById("birth_date");
	  var details = [password.value, full_name.value, Email.value, (birth_date.value).toString()]
	 
	  localStorage.setItem(user_name.value, JSON.stringify(details));      
   }
   
   function test() 
   {
	var user_name = document.getElementById("user_name");  
	var retrievedData = localStorage.getItem(user_name.value); 
	var details2 =  JSON.parse(retrievedData);
	p1.innerText = details2[0];
   }