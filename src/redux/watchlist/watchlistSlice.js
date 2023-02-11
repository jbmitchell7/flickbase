import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
  changed: false,
  pages: 0,
  currentPage: 1,
  id: "",
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setWatchlistChanged: (state, action) => {
      state.changed = action.payload;
    },
    setTotalPages: (state, action) => {
      state.pages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  setWatchlist,
  setWatchlistChanged,
  setTotalPages,
  setCurrentPage,
  setId,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
