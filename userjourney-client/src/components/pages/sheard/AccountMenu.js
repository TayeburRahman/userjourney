import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
 
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../features/auth/authSlice";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const localAuth = localStorage?.getItem("_user");  
  const _user = JSON.parse(localAuth);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    setAnchorEl(null);
    navigate("/home") 
  };

  
  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> 
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={_user?.image}>{_user?.name.slice(0, 1)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose} 
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 25,
              height: 25,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
           <Link to="/dashboard/profile" className="link_nav_tog"><AccountCircleIcon className="icon_nav_togo mr-3" /> Profile</Link>
        </MenuItem>
        <MenuItem  >
          <Link to="/dashboard/project/user_projects" className="link_nav_tog"> <AccountTreeIcon className="icon_nav_togo mr-3"  /> My Projects</Link>
          
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link to="/login" className="link_nav_tog">
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
             Login another account
          </Link>
        </MenuItem>
         
        <MenuItem onClick={logout} className="link_nav_tog">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
