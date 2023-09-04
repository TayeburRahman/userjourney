import { IconButton } from '@material-ui/core';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from "react";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import noto_rocket from '../../../assets/noto_rocket.svg';
import { userLoggedOut } from '../../../features/auth/authSlice';
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';
import useSubUsers from '../../../hooks/useSubUsers';
export default function AppBarDashboard({logoGreen}) {
  const { pathname } = useLocation();
  const isAuth = useAuth()
  const isAdmin = useAdmin()
  const isSubUser = useSubUsers() 
  const dispatch = useDispatch();
  const [state, setState] = React.useState({ 
    left: false, 
  });

 

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

 
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




  const list = (anchor) => (
    <Box 
      role="presentation"
      className="app_bar_main"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >  
    <Box className="dower_top_item mt-4 mb-5">
           <Box className="d-flex pl-5"  >
           <img src={noto_rocket} alt="logo" className="noto_rocket" />
                            <h6 className="pee_pips_nav">PeepPips</h6>
            </Box>

           <IconButton onClick={toggleDrawer} className="pr-5" sx={{color:"white"}}>
               <MenuIcon  sx={{color:"white"}} /> 
          </IconButton> 
        </Box> 
     <Box>
     <List component="nav" className='list_item'>

      {listItem?.map(({ name, icon, to }) => (
          <Link className="router_link  link_nav_dower " to={to} key={to} >
            <ListItemButton
              className="mb-3"
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
          <Link className="router_link  link_nav_dower " to={to} key={to} >
            <ListItemButton
              className="mb-3"
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
            <Link className="router_link  link_nav_dower " to={to} key={to} >
            <ListItemButton
              className="mb-3"
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
       
    
       

        <ListItemButton className=" ms-5 link_nav_dower " onClick={logout}>
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
     </Box>
        
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}> 
          <IconButton onClick={toggleDrawer(anchor, true)}
                            className='lg_dp_none'
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon id="colorBlack" />
                        </IconButton> 
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            className='dower_navigation'
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}