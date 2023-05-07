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
      return res.status(200).json({ user: user });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password, "in the user");

    const user = await User.matchPassword(email, password);
    if (user) {
      return res.status(200).json({ user: user });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { handleUserCreation, handleUserLogin };
