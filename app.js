const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/rotten-onion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Review = mongoose.model("Review", {
  title: String,
  description: String,
  movieTitle: String,
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log("error...........");
    });
});

app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", {});
});

app.post("/reviews", (req, res) => {
  Review.create(req.body)
    .then((review) => {
      console.log(review);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("error" + err.massage);
    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
