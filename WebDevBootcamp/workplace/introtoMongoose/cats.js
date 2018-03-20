const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");


const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
})

let Cat = mongoose.model("Cat", catSchema);

// let george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Mean"
// });

// george.save((error, cat) => {
//     if(error) {
//         console.log("Something went wrong")
//     } else {
//         console.log("We just saved a cat to the DB")
//         console.log(cat);
//     }
// });

// Cat.find({}, (err, cats) => {
//     if(err) {
//         console.log("Oh NO!");
//         console.log(err);
//     } else {
//         console.log("All the cats");
//         console.log(cats);
//     }
// })

Cat.create({
    name: "Snowwhite",
    age: 15,
    temperament: "Indifferent"
}, (err, cat) => {
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
})