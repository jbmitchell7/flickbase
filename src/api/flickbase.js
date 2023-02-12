import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchGet, fetchPost } from "./tmdb";

export const createFlickbaseList = async () => {
  try {
    const watchlistRes = await fetchPost(`/4/list`, {
      name: "Flickbase Watchlist",
      iso_639_1: "en",
    });
    await AsyncStorage.setItem("watchlistId", watchlistRes.id.toString());
  } catch {
    throw new Error("error creating watchlist");
  }
};

export const getUserWatchlist = async () => {
  try {
    const id = await AsyncStorage.getItem("watchlistId");
    const updatedList = await fetchGet(
      `/4/list/${id}?sort_by=primary_release_date.desc`
    );
    return updatedList;
  } catch {
    return null;
  }
};
