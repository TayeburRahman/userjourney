import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
// import { useLocation } from "react-router-dom";
import logo from "../assets/profile.avif";
import AppBarDashboard from "./AppBarDashboard";
function NavBar() { 
  const localAuth = localStorage?.getItem("_user");
  const _user  = JSON.parse(localAuth); 
  
  return (
    <Box className="navbar" sx={{ width: "100%" }}  justifyContent={"center"} >
       <Box className="navbar-box d-flex" sx={{ width: "98%", justifyContent: "space-between"}} >
     
         <AppBarDashboard/>
 
      <Box className="avatar" display={"flex"} justifyContent={"flex-end"} alignItems={"center"} >
        <Typography className="nav_user_name mr-3">{_user?.name}</Typography>
        <Avatar alt="Remy Sharp" src={logo} className="avatar_nav"  />
      </Box>
    </Box>
    </Box>
  );
}

export default NavBar;
