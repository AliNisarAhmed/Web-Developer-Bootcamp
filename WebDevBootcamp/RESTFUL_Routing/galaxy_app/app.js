const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// ================== APP CONFIG ===============================
mongoose.connect("mongodb://localhost/galaxy_app");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// ================== SCHEMA Setup ==============================
const galaxySchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    meta: {
        diameter: String,
        distanceFromMilkyWay: String,
    },
    created: {type: Date, default: Date.now}
})

const Galaxy = mongoose.model("Galaxy", galaxySchema);

// Galaxy.create({
//     title: "Milky Way",
//     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1920px-ESO-VLT-Laser-phot-33a-07.jpg",
//     description: "This is Milky Way, our Own Galaxy",
//     meta: {
//         diameter: "100-180 Kilo Light-Years",
//         distanceFromMilkyWay: "0"
//     }, 
// }, () => console.log(""))





//================== ROUTES ============================

// ROOT Route - redirected to index
app.get("/", (req, res) => {
    res.redirect("/galaxies");
})

// INDEX Route
app.get("/galaxies", (req, res) => {
    Galaxy.find({}, (err, galaxies) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {galaxies: galaxies});
        }
    });
});

// NEW Route
app.get("/galaxies/new", (req, res) => {
    res.render("new");
});

//CREATE Route
app.post("/galaxies", (req, res) => {
    res.send("You have reached the POST Route")
});








//=================================================================
app.listen(3000, () => {console.log("Server has started")})

/* RESTful Routes

name        Path                 verb       Purpose                               Mongoose Method
===================================================================================================
Index       /galaxies            GET        List all Galaxies                     Galaxy.find()
New         /galaxies/new        GET        Enter a new Galaxy                    N/A
Create      /galaxies            POST       Create a new galaxy and redirect      Galaxy.create()
Show        /galaxies/:id        GET        show more details abt a galaxy        Galaxy.findById()
Edit        /galaxies/:id/edit   GET        show edit form                        Galaxy.findById() 
Update      /galaxies/:id        PUT        Update a particular galaxy. redirect
Destroy     /galaxies/:id        DELETE     Delete a particular galaxy, redirect

*/