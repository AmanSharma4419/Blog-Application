const mongoose = require("mongoose");

const connectionToDb = async (url) => {
  return await mongoose.connect(url);
};

module.exports = { connectionToDb };
