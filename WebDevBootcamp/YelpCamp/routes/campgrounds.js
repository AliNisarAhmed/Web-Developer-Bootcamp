const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX ROUTE - SHOW ALL CAMPGROUND
router.get("/", (req, res) => {

    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, (error, allCampgrounds) => {
        if (error) {
            console.log("error");
        } else {
            console.log("getting items from DB")
            res.render("campgrounds/index.ejs", { campgrounds: allCampgrounds, currentUser: req.user })
        }
    });
    // res.render("campgrounds.ejs", {campgrounds: campgrounds});
});


// SHOW FORM TO CREATE A CAMPGROUND
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
});


//CREATE ROUTE - SUMBIT A NEW CAMPGROUND
router.post("/", isLoggedIn,(req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
    }
    let newCampground = { name: name, image: image, description: desc, author: author};

    // Create a new campground and add to DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//SHOW ROUTE
router.get("/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show.ejs", { campground: foundCampground })
        }
    });
    // render the page with more info on that ID
});

// MIDDLEWARE - to authenticate whether the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;