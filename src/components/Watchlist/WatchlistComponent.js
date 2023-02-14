import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button } from "react-native-paper";
import { ScrollView, View, FlatList } from "react-native";
import RNPickerSelect from "react-native-picker-select-updated";

import NotLoggedIn from "./layouts/NotLoggedIn";
import NoWatchlist from "./layouts/NoWatchlist";
import EmptyWatchlist from "./layouts/EmptyWatchlist";
import { watchlistStyles } from "./WatchlistComponentStyles";
import { pickerStyle } from "./WatchlistComponentStyles";
import ListCardComponent from "../../ui/ListCardComponent";
import colors from "../../assets/colors";
import Snack from "../../ui/Snack";
import { fetchGet } from "../../api/tmdb";
import {
  decrementPage,
  incrementPage,
  setPage,
  setSortBy,
  setTotalPages,
  setWatchlist,
} from "../../redux/watchlist/watchlistSlice";

const WatchlistComponent = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loginStatus);
  const watchlistData = useSelector((state) => state.watchlist);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive) {
        updateWatchlist();
      }

      return () => (isActive = false);
    }, [
      watchlistData.watchlist.length,
      watchlistData.sortBy,
      watchlistData.page,
      watchlistData.id
    ])
  );

  const updateWatchlist = async () => {
    const updatedList = await fetchGet(
      `/4/list/${watchlistData.id}?sort_by=${watchlistData.sortBy}&page=${watchlistData.page}`
    );
    dispatch(setWatchlist(updatedList.results));
    dispatch(setTotalPages(updatedList.total_pages));
  };

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  if (watchlistData.id.length === 0) {
    return <NoWatchlist />;
  }

  if (watchlistData.watchlist.length === 0) {
    return <EmptyWatchlist />;
  }

  return (
    <>
      <Text style={watchlistStyles.header}>Watchlist</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={watchlistStyles.pickerContainer}>
          <RNPickerSelect
            value={watchlistData.sortBy}
            style={pickerStyle}
            onValueChange={(value) => {
              dispatch(setSortBy(value));
              dispatch(setPage(1));
            }}
            items={[
              {
                label: "Recently Added (Recents First)",
                value: "original_order.desc",
              },
              {
                label: "Recently Added (Oldest First)",
                value: "original_order.asc",
              },
              {
                label: "Release Date (Newest First)",
                value: "release_date.desc",
              },
              {
                label: "Release Date (Oldest First)",
                value: "release_date.asc",
              },
              { label: "Title (A->Z)", value: "title.asc" },
              { label: "Title (Z->A)", value: "title.desc" },
              { label: "Rating (Highest First)", value: "vote_average.desc" },
              { label: "Rating (Lowest First)", value: "vote_average.asc" },
            ]}
          />
        </View>
        <FlatList
          data={watchlistData.watchlist}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListCardComponent
              media={item}
              navigation={props.navigation}
              type="watchlist"
            />
          )}
        />
        {watchlistData.pages > 1 ? (
          <View style={watchlistStyles.pageBtns}>
            {watchlistData.page != 1 ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-left-circle"
                mode="contained"
                style={watchlistStyles.pageBtn}
                onPress={() => {
                  dispatch(decrementPage());
                }}
              >
                Prev
              </Button>
            ) : null}
            {watchlistData.page != watchlistData.pages ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-right-circle"
                mode="contained"
                style={watchlistStyles.pageBtn}
                onPress={() => {
                  dispatch(incrementPage());
                }}
              >
                Next
              </Button>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
      <Snack />
    </>
  );
};

export default WatchlistComponent;
