const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})


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



// INDEX ROUTE - SHOW ALL CAMPGROUND
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds.ejs", {campgrounds: campgrounds});
})


// SHOW FORM TO CREATE A CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});


// CREATE ROUTE - SUMBIT A NEW CAMPGROUND
app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    let newCampground = {name: name, image: image};

    campgrounds.push(newCampground);
    //get data from form and add to campground array

    //redirect back to /campgrounds page
    res.redirect("/campgrounds");
});

//SHOW ROUTE
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    // render the page with more info on that ID
    res.send("This will be the show page");
});


/*
RESTFUL Routes

  name      url          verb        description
=========================================================
  INDEX     /dogs        GET         Display a list of all dogs
  NEW       /dogs/new    GET         Displays form to make a new dog
  CREATE    /dogs        POST        Add new dog to DB
  SHOW      /dogs/:id    GET         Show info about one dog  


*/


app.listen(3000, () => console.log("YelpGalaxy has started"));