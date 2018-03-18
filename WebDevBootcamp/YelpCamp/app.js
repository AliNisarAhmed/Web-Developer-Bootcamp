const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.get("/campgrounds", (req, res) => {
    const campgrounds = [
        {
            name: "Salmon Creek",
            image: "https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
        },
        {
            name: "Dark View",
            image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144394f3c679a0e5b1_340.jpg"
        },
        {
            name: "Old Styles",
            image: "https://farm3.staticflickr.com/2222/5763171257_b604848409.jpg"
        },
    ]

    res.render("campgrounds.ejs", {campgrounds: campgrounds});
})



app.listen(3000, () => console.log("YelpGalaxy has started"));