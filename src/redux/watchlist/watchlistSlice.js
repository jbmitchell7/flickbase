import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    watchlist: [],
    changed: false
  },
}

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.value.watchlist = action.payload
    },
    setWatchlistChanged: (state, action) => {
        state.value.changed = action.payload
    }
  },
})

export const { setWatchlist, setWatchlistChanged } = watchlistSlice.actions

export default watchlistSlice.reducer