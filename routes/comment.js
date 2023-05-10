const express = require("express");
const router = express.Router();
const { handleBlogComments } = require("../controllers/comment.controller");

router.post("/add-comment/:blogId", handleBlogComments);

module.exports = router;
