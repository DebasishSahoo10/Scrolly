import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  currentUser: {},
  followingUsers: [],
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_ALL_USERS: (state, action) => {
      state.allUsers = action.payload;
    },
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    UPDATE_ALL_USER: (state, action) => {
      const index = state.allUsers.indexOf(action.payload);
      if (index) {
        state.allUsers[index] = action.payload;
      }
    },
    UPDATE_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
      const index = state.allUsers.indexOf(action.payload);
      if (index) {
        state.allUsers[index] = action.payload;
      }
    },
    UPDATE_FOLLOWING: (state, action) => {
      state.followingUsers.push(action.payload);
    },
    OUTDATE_FOLLOWING: (state, action) => {
      const index = state.followingUsers.indexOf(action.payload);
      state.followingUsers.splice(index, 1);
    },
  },
});
export const SET_ALL_USERS = createAction("user/SET_ALL_USERS", (allUsers) => ({
  payload: allUsers,
}));
export const SET_CURRENT_USER = createAction(
  "user/SET_CURRENT_USER",
  (currentUser) => ({
    payload: currentUser,
  })
);
export const UPDATE_ALL_USER = createAction(
  "user/UPDATE_ALL_USER",
  (updatedUser) => ({
    payload: updatedUser,
  })
);
export const UPDATE_CURRENT_USER = createAction(
  "user/UPDATE_CURRENT_USER",
  (updatedUser) => ({
    payload: updatedUser,
  })
);
export const UPDATE_FOLLOWING = createAction(
  "user/UPDATE_FOLLOWING",
  (user) => ({
    payload: user,
  })
);
export const OUTDATE_FOLLOWING = createAction(
  "user/OUTDATE_FOLLOWING",
  (user) => ({
    payload: user,
  })
);
