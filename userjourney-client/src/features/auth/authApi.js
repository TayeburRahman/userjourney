import { apiSlice } from "../apiSlice";
import {
  setAllEvents,
  setFriendList,
  setLikedEvent,
  setScanHistory,
  setUserInfo,
  userLoggedIn,
} from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
              id: result.data._id,
            })
          );

          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
              id: result.data._id,
            })
          );

          //   dispatch(
          //     addMessage({
          //       message: "Registration successful",
          //       type: "success",
          //     })
          //   );
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
    registration: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    getFriendList: builder.query({
      query: (data) => ({
        url: "/api/v1/user/get_user_friends",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setFriendList(result.data));
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
    getScanHistory: builder.query({
      query: (userId) => ({
        url: `/api/v1/user/get_user_scanned_product?id=${userId.userId}`,
        method: "GET",
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setScanHistory(result.data));
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
    getUserInfo: builder.query({
      query: (email) => ({
        url: `/api/v1/user/find/${email}`,
        method: "GET",
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUserInfo(result.data));
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
    getLikedEvents: builder.query({
      query: (email) => ({
        url: `api/v1/event/find/like/${email}`,
        method: "GET",
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setLikedEvent(result.data?.likeEvent));
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
    getAllEvents: builder.query({
      query: () => ({
        url: `api/v1/event/find`,
        method: "GET",
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setAllEvents(result.data.event));
        } catch (error) {
          console.log("redux store error", error);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegistrationMutation,
  useLazyGetFriendListQuery,
  useLazyGetScanHistoryQuery,
  useGetUserInfoQuery,
  useGetLikedEventsQuery,
  useGetAllEventsQuery,
} = authApi;
