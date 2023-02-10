import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    results: [],
    query: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.value.watchlist = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.value.changed = action.payload;
    },
  },
});

export const { setSearchResults, setSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
