const express = require("express");
const app = express();
const request = require("request");

app.get("/", (req, res) => {
    res.render("search.ejs");
});


app.get("/results", (req, res) => {
    let query = req.query.movieSearch;
    request(`http://www.omdbapi.com/?apikey=thewdb&s=${query}`, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            const results = JSON.parse(body)
            res.render("results.ejs", {data: results});
        }
    })
});




app.listen(3000, () => console.log("Movie App has started"))