function show_only_welcome() {
	var e1 = document.getElementById("welcome");
	e1.style.display = 'block';
	var e2 = document.getElementById("register");
	e2.style.display = 'none';
	var e3 = document.getElementById("login");
	e3.style.display = 'none';
	var e4 = document.getElementById("about");
	e4.style.display = 'none';
	var e5 = document.getElementById("settings");
	e5.style.display = 'none';
}