import { SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { createFlickbaseList } from "../../../api/flickbase";
import { watchlistStyles } from "../WatchlistComponentStyles";
import colors from "../../../assets/colors";

const NoWatchlist = () => {
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
        onPress={() => createFlickbaseList()}
      >
        Create Flickbase Watchlist
      </Button>
    </SafeAreaView>
  );
};

export default NoWatchlist;
