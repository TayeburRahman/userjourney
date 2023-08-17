import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
  id: undefined,
  friendList: undefined,
  scanHistory: undefined,
  userInfo: undefined,
  likedEvent: undefined,
  allEvents: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.id = action.payload.id;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.id = undefined;
      state.friendList = null;
    },
    setFriendList: (state, action) => {
      state.friendList = action.payload;
    },
    setScanHistory: (state, action) => {
      state.scanHistory = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setLikedEvent: (state, action) => {
      state.likedEvent = action.payload;
    },
    setAllEvents: (state, action) => {
      state.allEvents = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setFriendList,
  setScanHistory,
  setAllEvents,
  setLikedEvent,
  setUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
