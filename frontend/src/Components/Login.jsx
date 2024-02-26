import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Box, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useUser } from "../Contexts/userContext";
import { useLoading } from "../Contexts/loadingContext";

const Login = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const { user, setToken } = useUser();
  const { openLoading, setOpenLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (user) navigate("/app");
  }, [user, navigate]);

  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    const response = await loginUser(loginData);
    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data.token));
      setToken(JSON.parse(localStorage.getItem("user")));
      handleClose(); // Close login dialog
    }
  };

  // =========================================================================================== API
  const loginUser = async (loginData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/user/login", loginData);
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Login</DialogTitle>
      <Box sx={{ px: 5, pt: 2, pb: 5 }}>
        <form onSubmit={onSubmitHandler}>
          <Stack spacing={1} sx={{ mb: 1 }}>
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
          </Stack>

          <LoadingButton
            fullWidth
            color="secondary"
            variant="contained"
            size="large"
            type="submit"
            loading={openLoading}
            sx={{ my: 1 }}
          >
            Login
          </LoadingButton>
        </form>
      </Box>
    </Dialog>
  );
};

export default Login;
