function average(arr) {
    //arr is an array between 0-100
    return Math.floor(arr.reduce((a, x) => a + x, 0)/arr.length);
}

console.log(average([90, 98, 89, 100, 100, 86, 94]));

console.log(average([40, 65, 77, 82, 80, 54, 73, 63, 95, 49]));