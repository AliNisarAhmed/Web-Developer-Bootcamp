const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment");
});

const animals = {
    cow: "Moooo",
    dog: "Woof Woof",
    cat: "I hate you Human",
    pig: "Oink",
    crow: "KAAW KAAW",
}

app.get("/speak/:animal", (req, res) => {
    let animal = req.params.animal;
    res.send(`The ${animal} says "${animals[animal]}"`)
});

app.get("/repeat/:phrase/:num", (req, res) => {
    let phrase = '';
    let num = req.params.num;
    for(let i = 0; i < num; i++) {
        phrase += req.params.phrase + ' ';
    }
    res.send(phrase);
});

app.get("*", (req, res) => {
    res.send("Sorry page not found...What are you doing with your life?");
});

app.listen(3000, () => console.log("App is running on localhost:3000"))