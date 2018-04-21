const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

data = [
    {
        name: "Forest days and nights",
        image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419_960_720.jpg",
        description: "Great view of the forest"
    },
    {
        name: "Mountain Views",
        image: "https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588_960_720.jpg",
        description: "Great white mountains to enjoy"
    },
    {
        name: "Indian Style",
        image: "https://cdn.pixabay.com/photo/2017/10/28/23/18/indians-2898463_960_720.jpg",
        description: "Camping, Indian Style"
    }
]


function seedDB() {

    //Remove all Campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }

        data.forEach((seed) => {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is great, but I wish there was internet connection",
                            author: "Homer" 
                        }, (err, comment) => {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        }
                    )
                }
            });
        });
    });

    //Add a few camogrounds
    
}
    
module.exports = seedDB;