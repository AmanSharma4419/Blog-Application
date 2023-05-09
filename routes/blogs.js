const express = require("express");
const router = express.Router();
const {
  handleBlogCreation,
  findSingleBlog,
} = require("../controllers/blog.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/images"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now() + file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-blog", (req, res) => {
  return res.render("addblog", { user: req.user });
});

router.post("/add-blog", upload.single("coverImageUrl"), handleBlogCreation);
router.get("/blog/:id", findSingleBlog);

module.exports = router;
