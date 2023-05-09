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

const findSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id.trim()).populate("createdBy");
    console.log(blog, "blogblog");
    if (blog) {
      return res.render("blogs", { blog: blog });
    }
  } catch (error) {
    return console.log(error.message);
  }
};
module.exports = { handleBlogCreation, findSingleBlog };
