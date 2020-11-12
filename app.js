const express = require("express");
// const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/rotten-onion", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const Review = mongoose.model("Review", {
  title: String,
  image: String,
  rating: Number,
  description: String,
  movieTitle: String,
});

const Comment = mongoose.model("Comment", {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: "Review" },
});

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

const reviews = require("./controller/reviews")(app, Review);

app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", { title: "New Review" });
});

app.get("/reviews/:id", (req, res) => {
  // find review
  Review.findById(req.params.id)
    .then((review) => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then((comments) => {
        // respond with the template with both values
        res.render("reviews-show", { review: review, comments: comments });
      });
    })
    .catch((err) => {
      // catch errors
      console.log(err.message);
    });
});

// EDIT
app.get("/reviews/:id/edit", (req, res) => {
  Review.findById(req.params.id, function (err, review) {
    res.render("reviews-edit", { review: review, title: "Edit Review" });
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

app.put("/reviews/:id", (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then((review) => {
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.delete("/reviews/:id", function (req, res) {
  console.log("DELETE review");
  Review.findByIdAndRemove(req.params.id)
    .then((review) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// NEW Comment
app.post("/reviews/comments", (req, res) => {
  Comment.create(req.body)
    .then((comment) => {
      console.log(comment);
      res.redirect(`/reviews/${comment.reviewId}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

module.exports = app;
