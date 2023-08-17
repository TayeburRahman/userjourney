import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
// import { useLocation } from "react-router-dom";
import logo from "../assets/Trash_Talk_Logo_Light.jpg";
function NavBar() {
  // const { pathname } = useLocation();
  return (
    <Box className="navbar" sx={{ width: "100%" }}>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, color: "#000000b8", fontFamily: "sans-serif " }}
        >
          Trash Talk
        </Typography>
      <Box className="avatar" display={"flex"} justifyContent={"center"} >
        <Avatar alt="Remy Sharp" src={logo}  />
      </Box>
    </Box>
  );
}

export default NavBar;
