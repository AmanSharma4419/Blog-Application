const JWT = require("jsonwebtoken");
const createTokenForUser = (user) => {
  const { _id, email, profile, profileImage, role, fullName } = user;
  const payload = {
    _id: _id,
    email: email,
    profile: profile,
    profileImage: profileImage,
    role: role,
    fullName: fullName,
  };
  try {
    const token = JWT.sign(payload, process.env.SECRET);
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const validateToken = (token) => {
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    return payload;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createTokenForUser, validateToken };
