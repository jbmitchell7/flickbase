import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setLoginStatus } = userSlice.actions;

export default userSlice.reducer;
