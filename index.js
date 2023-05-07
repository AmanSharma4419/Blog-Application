const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/users");
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

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
