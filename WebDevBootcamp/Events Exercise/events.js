let button = document.querySelector("button");




/*button.addEventListener("click", function() {
	if (document.body.style.background === "white" || document.body.style.background === "") {
		document.body.style.background = 'red';
	} else if (document.body.style.background === "red") {
		document.body.style.background = 'green';
	} else if (document.body.style.background === "green") {
		document.body.style.background = "blue";
	} else {
		document.body.style.background = "white";
	}
});
*/


button.addEventListener("click", function() {
	document.body.classList.toggle("purple");
});
