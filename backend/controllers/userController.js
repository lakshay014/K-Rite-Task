const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Model
const User = require("../models/userModel");

// Helper method to create a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//----------------------------------------------------------------Controllers
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, picture, password } = req.body;

  if (name || username || email || password) {
    const foundEmail = await User.findOne({ email });
    const foundUsername = await User.findOne({ username });
    if (foundEmail) {
      res.status(400);
      throw new Error("User already exist");
    } else if (foundUsername) {
      res.status(400);
      throw new Error("Username not available");
    } else {
      const saltRounds = process.env.SALT_ROUNDS;
      const salt = await bcrypt.genSalt(parseInt(saltRounds)); // because environment variables are treated as string and bcrypt needs an integer number
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        username: username,
        email: email,
        picture: picture,
        password: hash,
      });

      if (user) {
        res.status(201);
        const token = generateToken(user._id);
        res.send({ token });
      } else {
        res.status(400);
        throw new Error("Failed to create a user");
      }
    }
  } else {
    res.status(400);
    throw new Error("Please input all fields");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (isValidPassword) {
        res.status(200);
        res.send({
          token: generateToken(foundUser._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid Password");
      }
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  } else {
    res.status(400);
    throw new Error("Please input all fields");
  }
});

const getUserProfile = (req, res) => {
  const { name, username, email, picture } = req.user;
  res.status(200);
  res.send({
    name,
    username,
    email,
    picture,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
