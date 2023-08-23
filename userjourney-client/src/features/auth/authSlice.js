import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
  id: undefined,    
  otp : undefined,
  name : undefined,
  email : undefined, 
  active : undefined,
  role : undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUsersData: (state, action) => {
      state.otp = action.payload.otp;
      state.name = action.payload.name;
      state.email = action.payload.email; 
      state.active = action.payload.active;
      state.role = action.payload.role; 
      localStorage.setItem('_user', JSON.stringify(action?.payload))
      localStorage.setItem('_token', JSON.stringify(action?.payload.token))
    },

    googleAuth: (state, action) => { 
      state.name = action.payload.name;
      state.email = action.payload.email; 
      state.active = action.payload.active;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('_token', JSON.stringify(action?.payload.token))
      localStorage.setItem('_user', JSON.stringify(action?.payload))
    },

    userLoggedIn: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email; 
      state.active = action.payload.active;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('_user', JSON.stringify(action?.payload))
      localStorage.setItem('_token', JSON.stringify(action?.payload.token))
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.id = undefined;
      state.friendList = null;
    },
 
  },
});

export const {
  userLoggedIn,
  userLoggedOut, 
  createUsersData,
  googleAuth,
} = authSlice.actions;
export default authSlice.reducer;
