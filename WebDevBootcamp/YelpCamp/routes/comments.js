const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const User = require("../models/user");


//========================================================
// COMMENT ROUTES
//========================================================


// Comments New
router.get("/new", isLoggedIn, (req, res) => {
    // find campground by ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", { campground: campground });
        }
    });
});


// Comments Create
router.post("/", isLoggedIn, (req, res) => {
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
                    // add username and id to a comment
                    // req.user exists because of isLoggedIn middleware
                    // which ensures that user is logged in b4 commenting
                    comment.author.id = req.user_id;     
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            });
        }
    });
});

// Comment Edit Route

router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment: foundComment});
        }
        
    })
})


// Comment Update Route

router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
});


//Comment Destroy Route

router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

// MIDDLEWARE - to authenticate whether the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Middleware to check comment ownership

// This middleware is broken as author.id is coming out as undefined

// therefore it is impossible to validate

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Hello from line 105");
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            console.log("find comment by ID, foundComment", req.params.comment_id )
            console.log("foundComment in line 108:", foundComment );
            if (err) {
                console.log("Hello from Line 108")
                res.redirect("back")
            } else {
                // if yes, does hes own the Comment
                console.log("Helo from line 112");
                console.log(`foundComment.author: ${foundComment.author}`);
                console.log(`foundComment.author.id.: ${foundComment.author.id}`);
                console.log(`foundComment._id: ${foundComment._id}`);
                console.log(`req.user._id: ${req.user._id}`)
                if (foundComment.author.id.equals(req.user._id)) {
                    
                    console.log("helo from line 117")
                    return next();
                } else {
                    console.log("Hellow from line 120");
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("hello from line 123")
        res.redirect("back");
    }
}

module.exports = router;