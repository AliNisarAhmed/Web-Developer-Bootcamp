
let todos = [];

var input = prompt("What would you like to do");


while (input !== 'quit') {
	if (input === "list") {
		console.log("**********");
		todos.forEach(function (todo, index) {
			console.log(index + ": " + todo);
		})
		console.log("**********");	
		
	} else if (input === 'new') {
		todos.push(prompt('Enter a new todo'));
		console.log('Added new todo');
	} else if (input === 'delete') {
		var index = prompt('Enter index of todo to delete');
		todos.splice(index, 1);
		console.log('item deleted');		
	}
	
	input = prompt("What would you like to do");

}

console.log("You quit the app, reload to relaunch")