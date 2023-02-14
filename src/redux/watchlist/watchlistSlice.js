import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
  pages: 0,
  id: "",
  sortBy: "original_order.desc",
  page: 1,
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setTotalPages: (state, action) => {
      state.pages = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
  },
});

export const { 
    setWatchlist,
    setTotalPages,
    setId,
    setSortBy,
    setPage,
    incrementPage,
    decrementPage
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
