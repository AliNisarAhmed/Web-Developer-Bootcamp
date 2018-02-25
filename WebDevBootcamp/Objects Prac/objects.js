let movie = [
	{
		title: 'Pursuit of Happyness',
		rating: "5 stars",
		hasWatched: 'seen',
	},
	{
		title: "The last Samurai",
		rating: '5 stars',
		hasWatched: "seen",
	},
	{
		title: 'Inception',
		rating: "5 stars",
		hasWatched: 'not seen',
	}
];


for (let i = 0; i < movie.length; i++) {
	console.log(`You have ${movie[i].hasWatched} "${movie[i].title}" - ${movie[i].rating}`);	
}