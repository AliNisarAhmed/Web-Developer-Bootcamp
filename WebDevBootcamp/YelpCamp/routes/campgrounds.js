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
            
            res.render("campgrounds/show.ejs", { campground: foundCampground })
        }
    });
    // render the page with more info on that ID
});

// EDIT CAmpground Route

router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            res.render("campgrounds/edit.ejs", { campground: foundCampground });
        });
});

// Update Campground Route
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
    // redirect to show page
});

// Destroy Campground Route
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

// MIDDLEWARE - to authenticate whether the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Middleware - to check the ownership of campground

function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.redirect("back")
            } else {
                // if yes, does hes own the campgrounds
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");    
    }
}



module.exports = router;