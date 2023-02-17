import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
  username: ''
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setUsername: (state, action) => {
        state.username = action.payload;
    }
  },
});

export const { setLoginStatus, setUsername } = userSlice.actions;

export default userSlice.reducer;
