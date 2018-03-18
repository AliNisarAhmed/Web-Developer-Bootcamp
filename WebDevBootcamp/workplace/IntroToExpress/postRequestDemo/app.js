const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const friends = ['Ali', 'Samrah', 'Rizwan', "Dawood", "Nisar"]

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.post("/addfriend", (req, res) => {
    let newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", (req, res) => {
    res.render("friends.ejs", {friends: friends});
});



app.listen(3000, () => console.log("Server started"));