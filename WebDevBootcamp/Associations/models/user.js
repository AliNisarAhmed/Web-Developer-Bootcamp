const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
});

module.exports = mongoose.model("User", userSchema);