const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    picture: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg",
    },
    password: { type: String, required: [true, "Please add a password"] },
  },
  { timestamps: true }
);

// Modal
const User = mongoose.model("User", userSchema);

// Export
module.exports = User;
