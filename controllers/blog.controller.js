const Blog = require("../models/blog");
const Comment = require("../models/comment");

const handleBlogCreation = async (req, res) => {
  try {
    const { title, body } = req.body;
    const blog = await Blog.create({
      title: title,
      body: body,
      coverImageUrl: `images/${req.file.filename}`,
      createdBy: req.user._id,
    });
    if (blog) {
      return res.redirect("/");
    }
  } catch (error) {
    return console.log(error.message);
  }
};

const findSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id.trim()).populate("createdBy");
    const comments = await Comment.find({ blog: id.trim() }).populate(
      "createdBy"
    );
    if (blog) {
      return res.render("blogs", {
        blog: blog,
        comments: comments,
        user: req.user,
      });
    }
  } catch (error) {
    return console.log(error.message);
  }
};
module.exports = { handleBlogCreation, findSingleBlog };
