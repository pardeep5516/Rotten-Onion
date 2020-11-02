const express = require("express");
// const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/rotten-onion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Review = mongoose.model("Review", {
  title: String,
  rating: Number,
  description: String,
  movieTitle: String,
});

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", {});
});

app.get("/reviews/:id", (req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      res.render("reviews-show", { review: review });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.post("/reviews", (req, res) => {
  Review.create(req.body)
    .then((review) => {
      console.log(review);
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log("error" + err.massage);
    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
