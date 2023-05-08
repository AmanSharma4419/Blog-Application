const User = require("../models/users");

const handleUserCreation = async (req, res) => {
  const { fullName, email, password } = req.body;
  const userInfo = {
    fullName: fullName,
    email: email,
    password: password,
  };
  try {
    const user = await User.create(userInfo);
    if (user) {
      res.redirect("/signin");
      return res.status(200).json({ user: user });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndCreateToken(email, password);
    if (token) {
      return res.status(200).cookie("token", token).redirect("/");
    }
  } catch (error) {
    res.render("signin", { error: error.message });
  }
};

const handleUserLogout = (req, res) => {
  try {
    return res.clearCookie("token").redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { handleUserCreation, handleUserLogin, handleUserLogout };
