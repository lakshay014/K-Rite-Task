import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Register from "./Register";
import Login from "./Login";

import { useUser } from "../Contexts/userContext";

export default function BasicMenu() {
  const location = useLocation();
  const { user, setUser } = useUser();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handleRegisterClose = () => {
    setOpenRegister(false);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openRegisterDialog = () => {
    setOpenRegister(true);
    handleClose();
  };
  const openLoginDialog = () => {
    setOpenLogin(true);
    handleClose();
  };
  // =========================================================================================== LogOut
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(JSON.parse(localStorage.getItem("user")));
    handleClose();
  };

  return (
    <div>
      <IconButton
        size="large"
        color="secondary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>
      {location.pathname === "/" && !user ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={openRegisterDialog}>Register</MenuItem>
          <MenuItem onClick={openLoginDialog}>Login</MenuItem>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => alert("Profile")}>Profile</MenuItem>
          <MenuItem onClick={() => alert("Friends")}>Friends</MenuItem>
          <MenuItem onClick={() => alert("Chats")}>Chats</MenuItem>

          <Button
            variant="contained"
            color="warning"
            onClick={logoutUser}
            disableElevation
            sx={{ mx: 2, mt: 1 }}
          >
            Log-Out
          </Button>
        </Menu>
      )}
      <Register open={openRegister} handleClose={handleRegisterClose} />
      <Login open={openLogin} handleClose={handleLoginClose} />
    </div>
  );
}
