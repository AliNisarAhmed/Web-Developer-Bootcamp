const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

const Post = require("./models/post");
const User = require("./models/user.js");





// Post.create({
//     title: "how to cook the best burger part 4",
//     content: "Ali Nisar Ahmed",
// }, (err, post) => {
//     console.log(post);
//     User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
//         if(err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save((err, data) => {
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });


//FIND USER
//FIND AL POSTS OF THAT USER

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });