// comment.js

// imports `mongoose`. We need `mongoose` here to create the new model.
const mongoose = require("mongoose");

//similar to the Review model with the difference that the Comment model only saves a `title` and `content`.
const Comment = mongoose.model("Comment", {
  title: String,
  content: String,
});

// exports the `Comment` object. By doing this you can import `Comment` into any of your other files.
module.exports = Comment;
