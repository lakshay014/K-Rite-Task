const mongoose = require("mongoose");

// Schema

const postSchema = new mongoose.Schema(
  {
    coverPicture: {
      type: String,
      default:
        "https://res.cloudinary.com/farazdevmedia/image/upload/v1706196490/TravelBlog-Task/Blogs/Image/Placeholder/Cover_Placeholder_mnm9lk.jpg",
    },
    caption: {
      type: String,
      required: [true, "Please add a caption"],
    },
    author: {
      name: { type: String },
      username: { type: String },
      profilePicture: { type: String },
    },
    comments: [
      {
        comment: { type: String },
        author: {
          name: { type: String },
          username: { type: String },
          profilePicture: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

// Model

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
