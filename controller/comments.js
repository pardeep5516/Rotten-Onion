module.exports = (app, Comment) => {
  // NEW Comment
  app.post("/reviews/comments", (req, res) => {
    res.send("reviews comment");
  });
};
