import { fetchPost } from "./tmdb";

export const createFlickbaseList = async () => {
  try {
    const watchlistRes = await fetchPost(`/4/list`, {
      name: "Flickbase Watchlist",
      iso_639_1: "en",
    });
    await AsyncStorage.setItem("watchlistId", watchlistRes.id);
  } catch {
    throw new Error("error creating watchlist");
  }
};
