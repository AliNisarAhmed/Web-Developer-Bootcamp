let p1Button = document.querySelector("#p1");
let p2Button = document.getElementById("p2");
let resetButton = document.getElementById("reset");
let h1 = document.querySelector("h1");
let p1Display = document.querySelector('#p1Display');
let p2Display = document.getElementById("p2Display");
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let winningScore = 5;
let numInput = document.querySelector("input");
let p = document.querySelector("p");
let winningScoreDisplay = document.querySelector("p span");

p1Button.addEventListener("click", function() {
	if (!gameOver) {
		p1Score++;
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("gameOver");
		}
		p1Display.textContent = p1Score;
}});

p2Button.addEventListener("click", function() {
	if (!gameOver){
		p2Score++;
		if (p2Score === winningScore) {
			gameOver = true;
			p2Display.classList.add("gameOver");
		}
		p2Display.textContent = p2Score;
}});

resetButton.addEventListener("click", reset);	


function reset() {
	gameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.classList.remove("gameOver");
	p2Display.classList.remove("gameOver");	
};

numInput.addEventListener("change", function() {
	winningScoreDisplay.textContent = this.value;
	winningScore = Number(this.value);
	reset();
});