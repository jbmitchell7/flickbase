import { useDispatch } from "react-redux";
import { fetchPost } from "./tmdb";

// const dispatch = useDispatch();

export const createFlickbaseList = async () => {
  try {
    const watchlistRes = await fetchPost(`/4/list`, {
      name: "Flickbase Watchlist",
      iso_639_1: "en",
    });
    // dispatch(setWatchlistChanged(!watchlistChanged));
    await AsyncStorage.setItem("watchlistId", watchlistRes.id);
  } catch {
    throw new Error("error creating watchlist");
  }
};
