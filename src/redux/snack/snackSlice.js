import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  text: ""
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    setSnackText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setVisible, setSnackText } = snackSlice.actions;

export default snackSlice.reducer;
