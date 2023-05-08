const Blog = require("../models/blog");

const handleBlogCreation = async (req, res) => {
  try {
    const { title, body } = req.body;
    const blog = await Blog.create({
      title: title,
      body: body,
      coverImageUrl: `images/${req.file.filename}`,
    });
    if (blog) {
      return res.redirect("/");
    }
  } catch (error) {
    return console.log(error.message);
  }
};

module.exports = { handleBlogCreation };
