var express = require("express");
const app = express();

//  "/" => Hi there

app.get("/", function(req, res) {
    res.send("Hi there");
});

// "/bye" => Goodbye

app.get("/bye", function(req, res) {
    res.send("Goodbye");
});


// "/dog" => MEOW

app.get("/dog", function(req, res) {
    res.send("MEOW!!");
});

app.get("/r/:subreddit", function(req, res){
    res.send(`Welcome to the ${req.params.subreddit}`);
    console.log(req)
});

app.get("*", function(req, res) {
    res.send("You are a star");
});



app.listen(3000, () => console.log('Example App listening on Port: 3000'))