import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";
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
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  // list item for sidebar

  const listItem = [
    {
      name: "Home",
      icon: <HomeIcon sx={{ color: "#e3e3e3" }} />,
      to: "/",
    },
    {
      name: "Profile",
      icon: <AccountCircleIcon sx={{ color: "#e3e3e3" }} />,
      to: "/profile",
    }, 
    {
      name: "Leaderboards",
      icon: <LeaderboardIcon sx={{ color: "#e3e3e3" }} />,
      to: "/leaderboards",
    }, 
  ];

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
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
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <Divider />

      {/* Dashboard Dower Router  */}
      <List component="nav">
        {listItem.map(({ name, icon, to }) => (
          <Link className="router_link " to={to} key={to} >
            <ListItemButton
              className="routing_button mb-1"
              id={`${pathname === to && "background"}`}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                className="font500"
                primary={name}
                sx={{ color: "#e3e3e3" }}
              />
            </ListItemButton>
          </Link>
        ))}

        <ListItemButton className="routing_button mb-1" onClick={logout}>
          <ListItemIcon>
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
