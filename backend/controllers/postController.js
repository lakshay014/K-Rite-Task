const asyncHandler = require("express-async-handler");

const { Post } = require("../models/postModel");

//----------------------------------------------------------------Controllers - POST
const createPost = asyncHandler(async (req, res) => {
  const { coverPicture, caption } = req.body;
  const { name, username, email, picture } = req.user;

  const post = await Post.create({
    coverPicture,
    caption,
    author: { name, username, profilePicture: picture },
  });

  if (post) {
    res.status(201);
    res.send(post);
  } else {
    res.status(400);
    throw new Error("Failed to create post");
  }
});

const readPosts = asyncHandler(async (req, res) => {
  // sort will send back reversed array for the most latest post to show first
  const foundPosts = await Post.find().sort({
    createdAt: -1,
  });
  if (foundPosts.length) {
    res.status(200);
    res.send(foundPosts);
  } else {
    res.status(400);
    throw new Error("Posts not found");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  const { id, comment } = req.body;
  const { name, username, email, picture } = req.user;

  const payload = {
    comment: comment,
    author: {
      name,
      username,
      profilePicture: picture,
    },
  };

  const response = await Post.updateOne(
    { _id: id },
    { $push: { comments: payload } }
  );

  if (response.acknowledged) {
    // Find the latest comments
    const response = await Post.findOne({ _id: id }, "comments");
    const latestComments = response.comments;
    const lastComment = latestComments[latestComments.length - 1];

    // Return latest comment along with response
    res.status(200);
    res.send(lastComment);
  } else {
    res.status(400);
    throw new Error("Cannot Update");
  }
});

module.exports = {
  createPost,
  readPosts,
  updateComment,
};
