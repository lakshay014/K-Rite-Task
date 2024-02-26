const express = require("express");
const router = express.Router();

const {
  uploadUserPicture,
  uploadCoverPicture,
} = require("../controllers/uploadController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");

//----------------------------------------------------------------Upload Routes
// @desc    Upload user profile picture
// @route   POST /api/upload/user/picture
// @access  Public
router.post("/user/picture", uploadUserPicture);

// @desc    Upload cover picture
// @route   POST /api/upload/post/cover
// @access  Private
router.post("/post/cover", protectedRoute, uploadCoverPicture);

module.exports = router;
