import { SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchPost } from "../../../../api/tmdb";
import { watchlistStyles } from "../WatchlistComponentStyles";
import colors from "../../../../assets/colors";
import { setId } from "../../../../redux/watchlist/watchlistSlice";

const NoWatchlist = () => {
  const dispatch = useDispatch();

  const createFlickbaseList = async () => {
    try {
      const watchlistRes = await fetchPost(`/4/list`, {
        name: "Flickbase Watchlist",
        iso_639_1: "en",
      });
      await AsyncStorage.setItem("watchlistId", watchlistRes.id.toString());
      dispatch(setId(watchlistRes.id.toString()));
    } catch {
      throw new Error("error creating watchlist");
    }
  };

  return (
    <SafeAreaView style={watchlistStyles.viewContainer}>
      <Text style={watchlistStyles.header}>Watchlist</Text>
      <Text style={watchlistStyles.watchlistMsg}>
        You have not created a watchlist for Flickbase yet.
      </Text>
      <Button
        buttonColor={colors.yellow}
        dark={true}
        icon="book-plus"
        mode="contained"
        style={watchlistStyles.yellowBtn}
        onPress={() => {
          createFlickbaseList();
        }}
      >
        Create Flickbase Watchlist
      </Button>
    </SafeAreaView>
  );
};

export default NoWatchlist;
