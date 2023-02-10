import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from '../watchlist/watchlistSlice';
import userReducer from '../user/userSlice';
import searchReducer from '../search/searchSlice';
import mediaReducer from '../media/mediaSlice';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    user: userReducer,
    media: mediaReducer,
    search: searchReducer
  },
})