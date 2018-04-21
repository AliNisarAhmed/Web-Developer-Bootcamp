const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo2");

//User - email,name

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema],
});

const User = mongoose.model("User", userSchema);

//Post = title, content



// const newUser = new User({
//     email: "hermoine@brown.edu",
//     name: "hermoine Granger",
// });


// newUser.posts.push({
//     title: "how to brue polyjuice potion",
//     content: "Just kidding",
// });

// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// const newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious",
// });

// newPost.save((err, post) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

// User.findOne({name: "hermoine Granger"}, (err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         user.posts.push({
//             title: "Three things i really hate",
//             content: "V, V and Voldemort"
//         });
//         user.save((err, user) => {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log(user);
//             }
//         })
//     }
// });