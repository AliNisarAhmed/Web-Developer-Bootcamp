function printReverse(arr) {
	let newArr = []
	for (let i = arr.length - 1; i >= 0; i--) {
		newArr.push(arr[i]);
	}
	return newArr;
}


function isUniform(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] !== arr[i + 1]) {
			return false;
		}
	}
	return true;
}


function sumArray(arr) {
	return arr.reduce((a, b) => a + b);
}


function max(arr) {
	return arr.reduce(function (a, b) {
		if (a < b) {return b;}
		else return a;
	})
}

max([10,2,3,4, -5])