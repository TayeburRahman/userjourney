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

    forwardEmail: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/forward/email",
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

    








    // getFriendList: builder.query({
    //   query: (data) => ({
    //     url: "/api/v1/user/get_user_friends",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(query, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled; 
    //     } catch (error) {
    //       console.log("redux store error", error);
    //     }
    //   },
    // }),
    // getScanHistory: builder.query({
    //   query: (userId) => ({
    //     url: `/api/v1/user/get_user_scanned_product?id=${userId.userId}`,
    //     method: "GET",
    //   }),
    //   async onQueryStarted(query, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled; 
    //     } catch (error) {
    //       console.log("redux store error", error);
    //     }
    //   },
    // }),
    // getUserInfo: builder.query({
    //   query: (email) => ({
    //     url: `/api/v1/user/find/${email}`,
    //     method: "GET",
    //   }),
    //   async onQueryStarted(query, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       // dispatch(setUserInfo(result.data));
    //     } catch (error) {
    //       console.log("redux store error", error);
    //     }
    //   },
    // }),
    // getLikedEvents: builder.query({
    //   query: (email) => ({
    //     url: `api/v1/event/find/like/${email}`,
    //     method: "GET",
    //   }),
    //   async onQueryStarted(query, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       // dispatch(setLikedEvent(result.data?.likeEvent));
    //     } catch (error) {
    //       console.log("redux store error", error);
    //     }
    //   },
    // }),
    // getAllEvents: builder.query({
    //   query: () => ({
    //     url: `api/v1/event/find`,
    //     method: "GET",
    //   }),
    //   async onQueryStarted(query, { queryFulfilled, dispatch }) {
    //     try {
    //       const result = await queryFulfilled;
    //       // dispatch(setAllEvents(result.data.event));
    //     } catch (error) {
    //       console.log("redux store error", error);
    //     }
    //   },
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useRegistrationMutation,
  useGoogleSingInMutation,
  useForwardEmailMutation,  
  useUpdateProfileInfoMutation, 

   

  // useLazyGetFriendListQuery,
  // useLazyGetScanHistoryQuery,
  // useGetUserInfoQuery,
  // useGetLikedEventsQuery,
  // useGetAllEventsQuery, 
} = authApi;
