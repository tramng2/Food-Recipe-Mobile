import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  userAuth: boolean;
};

const initialState: UserState = {
  userAuth: false,
};
export const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userInitState: (state) => {
      state.userAuth = initialState.userAuth;
    },
    userSetState: (state, action) => {
      state.userAuth = action.payload;
    },
  },
});

export const { userSetState, userInitState } = userSlice.actions;
