import { IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import noto_rocket from '../../../assets/noto_rocket.svg';
import useAuth from '../../../hooks/useAuth';

export default function LeftSmallNav({logoGreen}) {
  const { pathname } = useLocation();
  const isAuth = useAuth()
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
      name: "Home", 
      to: "/home",
    },
    {
      name: "Products", 
      to: "/product",
    },
    {
      name: "About", 
      to: "/about",
    }, 
    {
      name: "Contact", 
      to: "/contact_us",
    },  
   
  ];

  const dashboard = [
    {
      name: "Dashboard", 
      to: "/dashboard",
    }  
   
  ];




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
     <List component="nav" className='list_item'  > 
      {listItem.map(({ name,  to }) => ( 
             <Link className="router_link  link_nav_dower mb-3" to={to} key={to} >
            <ListItemButton
              className="dower_routing_button mb-1 J_c_f_s"
              id={`${pathname === to ? "background": "background_white"}`}
            > 
              <Typography
                className="dower_routing_text text-left" > {name}</Typography> 
            </ListItemButton>
          </Link>  
        ))} 

{  isAuth && dashboard.map(({ name, to }) => ( 
             <Link className="router_link  link_nav_dower mb-3" to={to} key={to} >
            <ListItemButton
              className="dower_routing_button mb-1 J_c_f_s"
              id={`${pathname === to ? "background": "background_white"}`}
            > 
              <Typography
                className="dower_routing_text text-left" > {name}</Typography> 
            </ListItemButton>
          </Link>  
        ))} 
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
                            <MenuIcon id={`${logoGreen && "colorBlack"}`} />
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