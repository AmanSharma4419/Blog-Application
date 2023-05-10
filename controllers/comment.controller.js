const Comment = require("../models/comment");

const handleBlogComments = async (req, res) => {
  console.log(req.body, "req.body");
  try {
    const commentToBeAdded = {
      commentBody: req.body.commentBody,
      blog: req.params.blogId,
      createdBy: req.user._id,
    };
    const comment = await Comment.create(commentToBeAdded);
    if (comment) {
      return res.redirect(`/blog/ ${req.params.blogId}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { handleBlogComments };
