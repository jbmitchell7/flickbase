import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchPost, fetchDelete } from "../api/tmdb";
import colors from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { setWatchlistChanged } from "../redux/watchlist/watchlistSlice";
import { setSnackText, setVisible } from "../redux/snack/snackSlice";

const WatchlistBtn = (props) => {
  const dispatch = useDispatch();
  const watchlistChanged = useSelector((state) => state.watchlist.changed);
  const { media, type, buttonType } = props;

  const addToWatchlist = async () => {
    try {
      const listId = await AsyncStorage.getItem("watchlistId");
      await fetchPost(`/4/list/${listId}/items`, {
        items: [{ media_type: type, media_id: media.id }],
      });
      dispatch(setWatchlistChanged(!watchlistChanged));
      dispatch(setVisible(true));
      dispatch(setSnackText("Added to Watchlist"));
    } catch {
      dispatch(setVisible(true));
      dispatch(setSnackText("Error Adding to Watchlist"));
    }
  };

  const removeFromWatchlist = async () => {
    try {
      const listId = await AsyncStorage.getItem("watchlistId");
      await fetchDelete(`/4/list/${listId}/items`, {
        items: [{ media_type: type, media_id: media.id }],
      });
      dispatch(setWatchlistChanged(!watchlistChanged));
      dispatch(setVisible(true));
      dispatch(setSnackText("Removed from Watchlist"));
    } catch {
      dispatch(setVisible(true));
      dispatch(setSnackText("Error Removing from Watchlist"));
    }
  };

  return (
    <View>
      {buttonType == "add" ? (
        <IconButton
          iconColor={colors.blueGreen}
          size={30}
          icon="book-plus-multiple"
          onPress={() => addToWatchlist()}
        ></IconButton>
      ) : (
        <IconButton
          iconColor={colors.yellow}
          size={30}
          icon="book-remove-multiple"
          onPress={() => removeFromWatchlist()}
        ></IconButton>
      )}
    </View>
  );
};

export default WatchlistBtn;
