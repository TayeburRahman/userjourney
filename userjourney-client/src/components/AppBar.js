import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/profile.avif";
import AppBarDashboard from "./pages/sheard/AppBarDashboard";
function NavBar() { 
  const [noneDisplay, setDisplayNone] = React.useState(false);
  const localAuth = localStorage?.getItem("_user");
  const _user  = JSON.parse(localAuth); 
  var w = window?.innerWidth;
  useEffect(()=>{  
    if(w < 620){ 
      setDisplayNone(true) 
    }  
   },[w,])
  
  return (
    <Box className="navbar" sx={{ width: "100%" }}  justifyContent={"center"} >
       <Box className="navbar-box d-flex" sx={{ width: "98%", justifyContent: "space-between"}} >
        <Typography></Typography>
        {
          noneDisplay &&  <AppBarDashboard />
        }
     
         
 
      <Box className="avatar" display={"flex"} justifyContent={"flex-end"} alignItems={"center"} >
        <Typography className="nav_user_name mr-3">{_user?.name}</Typography>
         <Link to='/dashboard/profile'><Avatar alt="Remy Sharp" src={logo} className="avatar_nav"  /></Link>
      </Box>
    </Box>
    </Box>
  );
}

export default NavBar;
