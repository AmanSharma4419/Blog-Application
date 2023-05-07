const {
  handleUserCreation,
  handleUserLogin,
} = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/register", handleUserCreation);
router.post("/login", handleUserLogin);

module.exports = router;
