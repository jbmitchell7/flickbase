import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMediaChoice: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMediaChoice } = mediaSlice.actions;

export default mediaSlice.reducer;
