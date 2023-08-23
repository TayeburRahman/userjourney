import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
// import { useLocation } from "react-router-dom";
import logo from "../assets/profile.avif";
function NavBar() { 
  const localAuth = localStorage?.getItem("_user");
  const _user  = JSON.parse(localAuth); 
  
  return (
    <Box className="navbar" sx={{ width: "100%" }}  justifyContent={"center"} >
       <Box className="navbar-box" sx={{ width: "98%" }} >
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, color: "#000000b8", fontFamily: "sans-serif " }}
        >
          {/* Trash Talk */}
        </Typography>
      <Box className="avatar" display={"flex"} justifyContent={"flex-end"} alignItems={"center"} >
        <Typography className="nav_user_name mr-3">{_user?.name}</Typography>
        <Avatar alt="Remy Sharp" src={logo} className="avatar_nav"  />
      </Box>
    </Box>
    </Box>
  );
}

export default NavBar;
