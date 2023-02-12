import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: [],
  pages: 0,
  id: "",
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
  },
});

export const {
  setWatchlist,
  setTotalPages,
  setId,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
