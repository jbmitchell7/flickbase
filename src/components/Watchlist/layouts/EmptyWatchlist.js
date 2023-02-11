import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { watchlistStyles } from "../WatchlistComponentStyles";

const EmptyWatchlist = () => {
  return (
    <SafeAreaView style={watchlistStyles.viewContainer}>
      <Text style={watchlistStyles.header}>Watchlist</Text>
      <Text style={watchlistStyles.watchlistMsg}>
        Looks like your watchlist is empty. Find movies or TV shows to watch on
        the home screen or search for them with the search function.
      </Text>
    </SafeAreaView>
  );
};

export default EmptyWatchlist;
