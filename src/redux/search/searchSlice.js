import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  query: "",
  pages: 1,
  currentPage: 1,
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
    setSearchPages: (state, action) => {
      state.pages = action.payload;
    },
    setSearchCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    incrementCurrentPage: (state) => {
        state.currentPage += 1;
    },
    decrementCurrentPage: (state) => {
        state.currentPage -= 1;
    },
  },
});

export const {
  setSearchResults,
  setSearchQuery,
  setSearchPages,
  setSearchCurrentPage,
  incrementCurrentPage,
  decrementCurrentPage
} = searchSlice.actions;

export default searchSlice.reducer;
