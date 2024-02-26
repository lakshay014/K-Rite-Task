import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import _ from "lodash";
import toast from "react-hot-toast";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useUser } from "../Contexts/userContext";
import { useLoading } from "../Contexts/loadingContext";

const NewPost = ({ setPosts }) => {
  const { token } = useUser();
  const { openLoading, setOpenLoading } = useLoading();

  const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);

  const [caption, setCaption] = useState("");

  // =========================================================================================== Image
  const [selectedImage, setSelectedImage] = useState("");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image); // base 64 encoding
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      toast.error("Please select a cover picture");
    } else {
      const pictureURL = await uploadCoverPicture(selectedImage);
      // Create new post
      const postData = {
        coverPicture: pictureURL,
        caption: caption,
      };
      const response = await createPost(postData);
      if (response) {
        setPosts((prevState) => [response.data, ...prevState]); // Update local copy for component rerender
        toast.success("Successfully Posted");
        setNewPostDialogOpen(false); // Close new post dialog
      }
    }
  };

  //------------------------------------------------------------------------------------------- API
  const uploadCoverPicture = async (base64EncodedImage) => {
    setOpenLoading(true);
    try {
      const response = await axios.post(
        "/api/upload/post/cover",
        {
          imageString: base64EncodedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setOpenLoading(false);
        return response.data.url;
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error); // Debug Log
    }
  };

  const createPost = async (postData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/post/create", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setOpenLoading(false);
        return response;
      }
    } catch (error) {
      console.log(error); // Debug Log
      setOpenLoading(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
        onClick={() => setNewPostDialogOpen(true)}
      >
        <Typography variant="h3" color={"secondary"} textAlign={"center"}>
          + New Post
        </Typography>
      </Paper>
      <Dialog
        onClose={() => setNewPostDialogOpen(false)}
        open={newPostDialogOpen}
      >
        <DialogTitle>Create New Post</DialogTitle>

        <Box sx={{ px: 5, pb: 5 }}>
          <center>
            <Paper
              variant="outlined"
              sx={{
                height: "200px",
                maxWidth: "420px",
                my: 1,
                overflow: "clip",
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="cover"
                  style={{ objectFit: "cover", backgroundPosition: "center" }}
                  height="100%"
                  width="100%"
                />
              ) : (
                <Typography variant="   ">
                  Please select cover picture
                </Typography>
              )}
            </Paper>
          </center>
          <form onSubmit={onSubmitHandler}>
            <TextField
              label="Caption"
              type="text"
              required
              onChange={(e) => setCaption(_.capitalize(e.target.value))}
              multiline
              rows={5}
              fullWidth
            />

            <IconButton component="label" size="large" color="secondary">
              <Input
                accept="image/*"
                multiple={false}
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <AddAPhotoIcon />
            </IconButton>
            <Typography variant="overline" sx={{ ml: 1 }}>
              Cover Picture
            </Typography>

            <LoadingButton
              fullWidth
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              loading={openLoading}
              sx={{ my: 1 }}
            >
              Post
            </LoadingButton>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

// Component Prop Types

NewPost.propTypes = {
  setPosts: PropTypes.func.isRequired,
};

export default NewPost;
