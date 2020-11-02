const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/rotten-onion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log("error...........");
    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
