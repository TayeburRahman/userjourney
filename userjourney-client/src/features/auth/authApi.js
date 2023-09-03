import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: data,
      }),
    }),
    
    registration: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    googleSingIn: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/auth",
        method: "POST",
        body: data,
      }),
    }),

    forgetEmail: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/forget/email",
        method: "POST",
        body: data,
      }),
    }),
    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/update/profile",
        method: "PUT",
        body: data,
      }),
    }),
 
  }),
});

export const {
  useLoginUserMutation,
  useRegistrationMutation,
  useGoogleSingInMutation,
  useForgetEmailMutation,  
  useUpdateProfileInfoMutation,  
} = authApi;
