const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");
const Campground    = require("./models/campground");
const seedDB        = require("./seeds");
const Comment       = require("./models/comment")
const passport      = require("passport");
const LocalStrategy = require("passport-local");
const User          = require("./models/user");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


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
            res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user})
        }
    });
    // res.render("campgrounds.ejs", {campgrounds: campgrounds});
});


// SHOW FORM TO CREATE A CAMPGROUND
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
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
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err)
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show.ejs", {campground: foundCampground})
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

//========================================================
// COMMENT ROUTES
//========================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn,(req, res) => {
    // find campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn,(req, res) => {
    //lookup campgrounds using ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
    //create a new comment
    // connect new comment to campground
    // redirect to campground show page
});

//==================================
// AUTH Routes
//==================================

// show register form

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

// handle sign up logic

app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register.ejs");
        } 
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});


// SHOW LOGIN FORM

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), (req, res) => {
    
})

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})


// MIDDLEWARE - to authenticate whether the user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => console.log("YelpCamp has started"));