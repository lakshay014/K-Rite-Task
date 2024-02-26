import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import _ from "lodash";

import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useUser } from "../Contexts/userContext";
import { useLoading } from "../Contexts/loadingContext";

const Register = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const { user, setToken } = useUser();
  const { openLoading, setOpenLoading } = useLoading();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (user) navigate("/app");
  }, [user, navigate]);

  // =========================================================================================== Image
  const [selectedImage, setSelectedImage] = useState("");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!selectedImage) {
      toast.error("Please select a profile picture");
    } else {
      const pictureURL = await uploadUserPicture(selectedImage);
      // Register User
      const registrationData = {
        name: name,
        username: username,
        email: email,
        picture: pictureURL,
        password: password,
      };
      const response = await registerUser(registrationData);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        setToken(JSON.parse(localStorage.getItem("user")));
        handleClose(); // Close register dialog
      }
    }
  };
  // =========================================================================================== API
  const uploadUserPicture = async (base64EncodedImage) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/user/picture", {
        imageString: base64EncodedImage,
      });
      if (response) {
        setOpenLoading(false);
        return response.data.url;
      }
    } catch (error) {
      setOpenLoading(false);
      toast.error("Failed to upload profile picture");
    } finally {
      setOpenLoading(false);
    }
  };

  const registerUser = async (registrationData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/user/register", registrationData);

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
    } finally {
      setOpenLoading(false);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Register</DialogTitle>
      <Box sx={{ px: 5, pb: 5 }}>
        <center>
          <Avatar src={selectedImage} sx={{ mb: 2, height: 128, width: 128 }} />
        </center>
        <form onSubmit={onSubmitHandler}>
          <Stack spacing={1} sx={{ mb: 1 }}>
            <TextField
              label="Name"
              type="text"
              required
              onChange={(e) => setName(_.capitalize(e.target.value))}
            />
            <TextField
              label="Username"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              inputProps={{ style: { textTransform: "lowercase" } }}
            />
            <TextField
              label="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>

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
            Profile Picture
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
            Register
          </LoadingButton>
        </form>
      </Box>
    </Dialog>
  );
};

// Component Prop Types

Register.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Register;
