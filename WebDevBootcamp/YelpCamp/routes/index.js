const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");



//Root Route
// =========== LANDING PAGE =========
router.get("/", (req, res) => {
    res.render("landing.ejs");
});

//==================================
// AUTH Routes
//==================================

// show register form

router.get("/register", (req, res) => {
    res.render("register.ejs");
})

// handle sign up logic

router.post("/register", (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});


// SHOW LOGIN FORM

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }), (req, res) => {

    })


// Logout Route    
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})


// MIDDLEWARE - to authenticate whether the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;