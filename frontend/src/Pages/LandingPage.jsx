import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Register from "../Components/Register";
import Login from "../Components/Login";

const LandingPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handleRegisterClose = () => {
    setOpenRegister(false);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ maxWidth: "750px" }}>
        <Typography variant="h2">
          Connect. Create. Cultivate. Welcome to K-Rite Social
        </Typography>
        <Typography variant="h6" sx={{ mt: 5, maxWidth: "400px" }}>
          Where Connections Flourish, Ideas Thrive, and Communities Unite!
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            size="large"
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
          <Register open={openRegister} handleClose={handleRegisterClose} />
          <Login open={openLogin} handleClose={handleLoginClose} />
        </Stack>
      </Box>
      <Box>
        <img src="social-media.png" alt="social" />
      </Box>
    </Container>
  );
};

export default LandingPage;
