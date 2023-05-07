const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "../public/images/avtar.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Pre save hook for the hashing the user password while registeration
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  // Creating the salt
  const salt = randomBytes(16).toString();

  // Hashing the password with salt
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  // Updating the salt & password
  this.salt = salt;
  this.password = hashPassword;
  next();
});

//Static hook for finding the user and matching the passord for login
userSchema.static(
  "matchPassword",
  async function (UserInputEmail, UserInputPassword) {
    const user = await this.findOne({ email: UserInputEmail });
    if (!user) throw new Error("User Not Found");
    // Creating salt
    const { salt, password } = user;
    console.log("in teh user", salt, password);

    // Creating the hash from user input password and existing user salt
    const userProvidedPasswordHash = createHmac("sha256", salt)
      .update(UserInputPassword)
      .digest("hex");
    console.log(userProvidedPasswordHash, "hash user");
    // Matching the password hasg
    if (userProvidedPasswordHash !== password) {
      throw new Error("Password Not Matched");
    } else {
      return user;
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
