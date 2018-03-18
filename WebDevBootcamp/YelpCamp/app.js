const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
    },
    {
        name: "Dark View",
        image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
    },
    {
        name: "Old Styles",
        image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
    }, {
        name: "Dark View",
        image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
    }, {
        name: "Old Styles",
        image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"
    },
]

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds.ejs", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    let newCampground = {name: name, image: image};

    campgrounds.push(newCampground);
    //get data from form and add to campground array

    //redirect back to /campgrounds page
    res.redirect("/campgrounds");
});



app.listen(3000, () => console.log("YelpGalaxy has started"));