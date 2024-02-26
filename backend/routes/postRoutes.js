const express = require("express");
const router = express.Router();

// Controllers
const {
  createPost,
  readPosts,
  updateComment,
} = require("../controllers/postController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");

//----------------------------------------------------------------Post Routes
// @desc    Create new post
// @route   POST /api/post/create
// @access  Private
router.post("/create", protectedRoute, createPost);

// @desc    Read all posts
// @route   GET /api/post/all
// @access  Private
router.get("/all", protectedRoute, readPosts);

// @desc    Comment on post
// @route   POST /api/post/comment
// @access  Private
router.post("/comment", protectedRoute, updateComment);

module.exports = router;
