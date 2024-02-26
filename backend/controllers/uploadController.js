const asyncHandler = require("express-async-handler");

// Cloudinary
const { cloudinary } = require("../configs/uploader");

const uploadUserPicture = asyncHandler(async (req, res) => {
  const { imageString } = req.body;
  const uploadResponse = await cloudinary.uploader.upload(imageString, {
    folder: "K-Rite-Media/User_Pictures",
  });
  if (uploadResponse.asset_id) {
    res.status(200);
    res.send(uploadResponse);
  } else {
    res.status(400);
    throw new Error("Failed to upload user profile picture");
  }
});

const uploadCoverPicture = asyncHandler(async (req, res) => {
  const { imageString } = req.body;
  const uploadResponse = await cloudinary.uploader.upload(imageString, {
    folder: "K-Rite-Media/Cover_Pictures",
  });
  if (uploadResponse.asset_id) {
    res.status(200);
    res.send(uploadResponse);
  } else {
    res.status(400);
    throw new Error("Failed to upload cover picture");
  }
});

module.exports = {
  uploadUserPicture,
  uploadCoverPicture,
};
