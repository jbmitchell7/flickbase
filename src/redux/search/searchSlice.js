import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  query: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchResults, setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
