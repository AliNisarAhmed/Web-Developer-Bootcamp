const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));


// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "this is a huge granite hill, no bathroom, no waters, but lots of great views"
//     }, function(err, campground){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Newly created campground")
//         }
//     });


// =========== LANDING PAGE =========
app.get("/", (req, res) => {
    res.render("landing.ejs");
});



// INDEX ROUTE - SHOW ALL CAMPGROUND
app.get("/campgrounds", (req, res) => {
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, (error, allCampgrounds) => {
        if(error) {
            console.log("error");
        } else {
            console.log("getting items from DB")
            res.render("index.ejs", {campgrounds: allCampgrounds})
        }
    });
    // res.render("campgrounds.ejs", {campgrounds: campgrounds});
});


// SHOW FORM TO CREATE A CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});


//CREATE ROUTE - SUMBIT A NEW CAMPGROUND
app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};

    // Create a new campground and add to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err) 
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//SHOW ROUTE
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err)
        } else {
            res.render("show.ejs", {campground: foundCampground})
        }
    });
    // render the page with more info on that ID
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


app.listen(3000, () => console.log("YelpCamp has started"));