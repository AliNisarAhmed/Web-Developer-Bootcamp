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

// requiring Routes
const commentRoutes     = require("./routes/comments"),
      campgroundRoutes  = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");


//seedDB();  //seed the database

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


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);





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