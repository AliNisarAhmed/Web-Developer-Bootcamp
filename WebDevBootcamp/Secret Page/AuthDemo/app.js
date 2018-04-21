const express               = require("express");
const mongoose              = require("mongoose");
const passport              = require("passport");
const bodyParser            = require("body-parser");
const User                  = require("./models/user")
const LocalStrategy         = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================================================
// ROUTES
//==================================================================


app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret.ejs");
})

// AUTH Routes

// SHOW SIGNUP FORM
app.get("/register", (req, res) => {
    res.render("register.ejs");
})

// handle user sign up

app.post("/register", (req, res) => {
  
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register.ejs");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret")
            })
        }
    });
});

// login routes

//render login form
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

//login the user - middleware (passport.authenticate)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
}) ,(req, res) => {

})

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}


app.listen(3000, () => console.log("Server has started"));