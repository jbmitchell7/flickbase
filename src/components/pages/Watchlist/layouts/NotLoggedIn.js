import { View } from "react-native";
import { Text } from "react-native-paper";

import { watchlistStyles } from "../WatchlistComponentStyles";

const NotLoggedIn = () => {
    return (
      <View style={watchlistStyles.viewContainer}>
        <Text style={watchlistStyles.header}>Watchlist</Text>
        <Text style={watchlistStyles.watchlistMsg}>
          Must be logged in to view watchlist.
        </Text>
      </View>
    );
}

export default NotLoggedIn;