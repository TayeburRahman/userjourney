import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  useGetAllEventsQuery,
  useGetLikedEventsQuery,
  useGetUserInfoQuery,
  useLazyGetFriendListQuery,
  useLazyGetScanHistoryQuery,
} from "../features/auth/authApi";
import NavBar from "./AppBar";
import SideBar from "./SideBar";
import "./css/main.css";

const mdTheme = createTheme();

export default function Layout() {
  const isAuthenticated = true;
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }
  const { user } = useSelector((state) => state.auth);
  const [getFriendList] = useLazyGetFriendListQuery();
  const [getScanHistory] = useLazyGetScanHistoryQuery();
  useGetAllEventsQuery();
  useGetLikedEventsQuery(user?.email);
  useGetUserInfoQuery(user?.email);
  useEffect(() => {
    getFriendList({ userId: user?._id });
    getScanHistory({ userId: user?._id });
  }, [getFriendList, getScanHistory, user?._id]);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}> 
        <SideBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <NavBar />
          <Grid container spacing={3} padding={2}>
           
            <Outlet />
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
