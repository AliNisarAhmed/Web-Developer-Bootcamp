const express = require("express");
const methodOverride = require("method-override");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSanitizer = require("express-sanitizer")



// =============== APP CONFIG ============================
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));



// ============ MONGOOSE MODEL CONFIG ======================
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Dog",
//     image: "https://images.unsplash.com/photo-1511407397940-d57f68e81203?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc36f6ef9f5f60d81144f40cb6cbfc38&auto=format&fit=crop&w=1267&q=80",
//     body: "Hello this is a blog post"
// }, () => console.log("Entry created"));

// ============== ROUTES =====================================


// ROOT Route - redirected to index
app.get("/", (req, res) => {
    res.redirect("/blogs");
});


// Index Route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    }
);
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});


//CREATE ROUTE
app.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body); //sanitize the body 
    // to remove any script tag
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            console.log(err)
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    });
});

// UPDATE ROUTE

app.put("/blogs/:id", (req, res) => {
    //sanitize the blog body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/req.params.id");
        }
    });   
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    // destroy blog
    
   
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
    //redirect
});


//=================================================

app.listen(3000, () => console.log("Server is running"));