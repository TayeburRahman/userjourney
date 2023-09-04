import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import { Box, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noto_rocket from '../assets/noto_rocket.svg';
import { userLoggedOut } from "../features/auth/authSlice";
import useAdmin from "../hooks/useAdmin";
import useSubUsers from "../hooks/useSubUsers";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    // backgroundColor: "#82CD47",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const SideBar = () => {
  const [open, setOpen] = React.useState(true);
  const [noneDisplay, setDisplayNone] = React.useState(false);
  const [user, setCurrentUser] = React.useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  var w = window?.innerWidth;
  const auth = useSelector(state => state.auth); 
 
    const isAdmin = useAdmin()
    const isSubUser = useSubUsers() 

   useEffect(()=>{ 
    
    if(w < 920){
      setOpen(false); 
      setDisplayNone(false) 
    }else{
      setOpen(true);
    }  
   },[w,])

   useEffect(()=>{  
    setCurrentUser(auth)
   },[pathname])
 
 

  const toggleDrawer = async () => { 
      setOpen(!open); 
      open ? setDisplayNone(true) : setDisplayNone(false)
  };
  // list item for sidebar

  const listItem = [
    {
      name: "Dashboard",
      icon: <DashboardIcon  />,
      to: "/dashboard",
    },
    {
      name: "Products",
      icon: <RedeemIcon   />,
      to: "/dashboard/products",
    },
    {
      name: "Profile",
      icon: <AccountCircleIcon   />,
      to: "/dashboard/profile",
    }, 
     
    {
      name: "Projects",
      icon: <AccountTreeIcon />,
      to: "/dashboard/project/user_projects",
    }
  ];

  const privateList =[
    {
      name: "My Users",
      icon: <GroupsIcon />,
      to: "/dashboard/my_users",
    }
    ,
    {
      name: "Credits",
      icon: <CreditCardIcon />,
      to: "/dashboard/credits/user_credits",
    }
  ]

  const adminItem = [
    {
      name: "Admin",
      icon: <AdminPanelSettingsIcon  />,
      to: "/dashboard/admin/projects",
    },
    {
      name: "Admin Products",
      icon: <RedeemIcon   />,
      to: "/dashboard/admin/products",
    },
    {
      name: "Subscribe",
      icon: <RedeemIcon   />,
      to: "/dashboard/admin/subscribe ",
    },
    {
      name: "Contact",
      icon: <RedeemIcon   />,
      to: "/dashboard/admin/contact ",
    } 
  ];

  
const navigate = useNavigate()

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/home") 
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Box className="nav_width">
            <Link to="/home" className="link_nav_logo">
            <Box className="nav_width" id={`${noneDisplay && "noneDisplay"}`}>
              <img src={noto_rocket} alt="logo" className="noto_rocket" />
              <h6 className="pee_pips_dashboard">PeepPips</h6> 
           </Box>
            </Link>

           <IconButton onClick={toggleDrawer} className="iconNone">
               <MenuIcon className="iconNone" /> 
          </IconButton> 
        </Box>
         
      </Toolbar>
      <Divider />
      
      <List component="nav">
      {listItem?.map(({ name, icon, to }) => (
          <Link className="router_link " to={to} key={to} >
            <ListItemButton
              className="routing_button mb-1"
              id={`${pathname === to ? "background": "background_white"}`}
            >
              <ListItemIcon id={`${pathname === to ? "background": "background_white"}`}>{icon}</ListItemIcon>
              <ListItemText
                className="font500"
                primary={name} 
              />
            </ListItemButton>
          </Link>
        ))} 

         {!isSubUser && privateList?.map(({ name, icon, to }) => (
          <Link className="router_link " to={to} key={to} >
            <ListItemButton
              className="routing_button mb-1"
              id={`${pathname === to ? "background": "background_white"}`}
            >
              <ListItemIcon id={`${pathname === to ? "background": "background_white"}`}>{icon}</ListItemIcon>
              <ListItemText
                className="font500"
                primary={name} 
              />
            </ListItemButton>
          </Link>
        ))}  
        
      {
       isAdmin &&  adminItem?.map(({name, icon, to})=>(
            <Link className="router_link " to={to} key={to} >
            <ListItemButton
              className="routing_button mb-1"
              id={`${pathname === to ? "background": "background_white"}`}
            >
              <ListItemIcon id={`${pathname === to ? "background": "background_white"}`}>{icon}</ListItemIcon>
              <ListItemText
                className="font500"
                primary={name} 
              />
            </ListItemButton>
          </Link>
          ))
        }
       
    
       

        <ListItemButton className="routing_button mb-1" onClick={logout}>
          <ListItemIcon id="background_white">
            <LogoutIcon />{" "}
          </ListItemIcon>
          <ListItemText
            className="font500"
            primary="Logout"
            sx={{ color: "#e3e3e3" }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideBar;
 