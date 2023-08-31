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
  broker: undefined,
  phone_num: undefined,
  wp_num: undefined,
  trading_account_number: undefined,
  customer:undefined,
  register_type: undefined,
  users: undefined,
  project: undefined,
  products: undefined,
  credits: undefined,
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
      state.register_type = action.payload.register_type;
      localStorage.setItem('_user', JSON.stringify(action?.payload))
      localStorage.setItem('_token', JSON.stringify(action?.payload.token))
    },

    updateUserAuth: (state, action) => { 
      state.name = action.payload.name;
      state.email = action.payload.email; 
      state.active = action.payload.active;
      state.role = action.payload.role; 
      state.phone_num = action.payload.phone_num;
      state.wp_num = action.payload.wp_num; 
      state.register_type = action.payload.register_type;
      localStorage.setItem('_user', JSON.stringify(action?.payload))
    },

    userLoggedIn: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email; 
      state.active = action.payload.active;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.phone_num = action.payload.phone_num;
      state.wp_num = action.payload.wp_num;
      state.trading_account_number = action.payload.trading_account_number;
      state.register_type = action.payload.register_type;
      state.customer = action.payload.customer;
      state.broker = action.payload.broker;
      localStorage.setItem('_user', JSON.stringify(action?.payload))
      localStorage.setItem('_token', JSON.stringify(action?.payload.token))
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      state.id = undefined;
      state.friendList = null;
    },
    myUsersGet: (state, action) => {
      state.users = action.payload; 
    },
    projectListGet: (state, action) => {
      state.project = action.payload; 
    },
    productListGet: (state, action) => {
      state.products = action.payload;  
    },
    creditsListGet: (state, action) => {
      state.credits = action.payload;  
    },
 
  },
});

export const {
  userLoggedIn,
  userLoggedOut, 
  createUsersData,
  updateUserAuth,
  myUsersGet,
  projectListGet,
  productListGet,
  creditsListGet,
} = authSlice.actions;
export default authSlice.reducer;
