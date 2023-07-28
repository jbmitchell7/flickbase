import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { fetchPost, fetchDelete, fetchGet } from "../../api/tmdb";
import colors from "../../assets/colors";
import { setTotalPages, setWatchlist } from "../../redux/watchlist/watchlistSlice";
import { setSnackText, setVisible } from "../../redux/snack/snackSlice";

const WatchlistBtn = (props) => {
  const { media, type, buttonType } = props;
  const dispatch = useDispatch();
  const watchlistData = useSelector((state) => state.watchlist);

  const updateWatchlist = async () => {
    const updatedList = await fetchGet(
      `/4/list/${watchlistData.id}?sort_by=${watchlistData.sortBy}&page=${watchlistData.page}`
    );
    dispatch(setWatchlist(updatedList.results));
    dispatch(setTotalPages(updatedList.total_pages));
  };

  const showSnack = (displayText) => {
    dispatch(setVisible(true));
    dispatch(setSnackText(displayText));
  };

  const addToWatchlist = async () => {
    try {
      await fetchPost(`/4/list/${watchlistData.id}/items`, {
        items: [{ media_type: type, media_id: media.id }],
      });
      updateWatchlist();
      showSnack("Added to Watchlist");
    } catch {
      showSnack("Error Adding to Watchlist");
    }
  };

  const removeFromWatchlist = async () => {
    try {
      await fetchDelete(`/4/list/${watchlistData.id}/items`, {
        items: [{ media_type: type, media_id: media.id }],
      });
      updateWatchlist();
      showSnack("Removed from Watchlist");
    } catch {
      showSnack("Error Removing from Watchlist");
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
          iconColor={colors.red}
          size={30}
          icon="book-remove-multiple"
          onPress={() => removeFromWatchlist()}
        ></IconButton>
      )}
    </View>
  );
};

export default WatchlistBtn;
