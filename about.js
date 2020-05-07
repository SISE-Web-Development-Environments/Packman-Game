function showOnlyAbout() {
	var about = document.getElementById("about");
	about.showModal();

	
	window.onclick = function (e) {
		if ((e.target == about)) {
			about.close();
		}
	}
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
		about.close();		
	 }

}



