// Kebab to Snake Case

	function kebabToSnake(str) {
		let newStr = str.replace(/-/g, "_" );
		return newStr;
	}




//  Kebab to Camel Case Converter

	function kebabToCamelCase(str) {
		let arr = str.split('-');
		let newString = '';
		for (let i = 0; i < arr.length; i++) {
			if (i === 0) {
				newString += arr[i];
			} else {
				newString += arr[i][0].toUpperCase() + arr[i];
			}

		}
		return newString;
	}