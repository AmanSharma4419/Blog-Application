const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = 3000;
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comment");

const Blog = require("./models/blog");
const { checkAuthTokenInHeaders } = require("./services/middlewares");
const { connectionToDb } = require("./db/database.connection");

require("dotenv").config();

// Db connection
connectionToDb(process.env.DB_URL).then(() => {
  return console.log("Connected to Db");
});

// Middle ware for template engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middle ware to set teh json raw data into req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middle ware to serve the static files
app.use(express.static("./views"));
app.use(express.static("./public"));
// Middle ware Parsing the cookies
app.use(cookieParser());

// Middle ware for token verification and getting the paylod
app.use(checkAuthTokenInHeaders("token"));

// Rendering the homepage and listing the blogs
app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("homepage", { user: req.user, blogs: blogs });
});

// Routes
app.use("/", userRoutes);
app.use("/", blogRoutes);
app.use("/", commentRoutes);

// Listening the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
