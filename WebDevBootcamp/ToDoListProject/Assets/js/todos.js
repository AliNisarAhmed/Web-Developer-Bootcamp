// Check off specific todos with a click

$("ul").on("click", "li", function() {
	//$(this).css("color", "gray");
	//$(this).css("text-decoration", "line-through");

	/*console.log($(this).css("color"));
	// if li is already gray
		//then we turn it black
	if($(this).css("color") === "rgb(128, 128, 128)") {
		$(this).css({
		color: "black",
		textDecoration: "none",
	});
	} else {
	$(this).css({
		color: "gray",
		textDecoration: "line-through",
	});
	}*/

	$(this).toggleClass("completed");
});


//Click on X to delete todo

$("ul").on("click", "span", function (event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
})

//Creation of New Todo
$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		//grabbing new Todo Text from input field
		let todoText = $(this).val();
		//create new LI and add to ul
		$("ul").append(`<li><span><i class="far fa-trash-alt"></i> </span>${todoText}</li>`);
		//clear the value from the input field
		$(this).val("");
	}
});

 document.addEventListener('DOMContentLoaded', function () {
	$("h1").on("click", "[data-fa-i2svg]", function() {
		$("input[type='text']").fadeToggle();
});
})
