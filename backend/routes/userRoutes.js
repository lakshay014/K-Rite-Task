const express = require("express");
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");

//----------------------------------------------------------------User Routes
// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
router.post("/register", registerUser);

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
router.post("/login", loginUser);

// @desc    Get user data
// @route   GET /api/user/profile
// @access  Private
router.get("/profile", protectedRoute, getUserProfile);

module.exports = router;
