const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});  

app.get("/fallinlovewith/:thing", (req, res) => {
    const thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", (req, res) => {
    const posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Hello I am new here", author: "Ali"},
        {title: "I love Ali", author: "Samrah"},
    ];

    res.render("posts.ejs", {posts: posts});
})





app.listen(3000, () => console.log("Server Started"));