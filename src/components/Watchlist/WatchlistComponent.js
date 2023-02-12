import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { fetchGet } from "../../api/tmdb";

const WatchlistComponent = (props) => {
  const watchlistId = useSelector((state) => state.watchlist.id);
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const totalPages = useSelector((state) => state.watchlist.pages);
  const loggedIn = useSelector((state) => state.user.loginStatus);
  const watchlistChanged = useSelector((state) => state.watchlist.changed);

  const [watchlistView, setWatchlistView] = useState(watchlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("release_date.desc");

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const updateWatchlist = async () => {
        try {
          const updatedList = await fetchGet(
            `/4/list/${watchlistId}?page=${currentPage}&sort_by=${filter}`
          );
          setWatchlistView(updatedList.results);
        } catch {
          throw new Error("error getting watchlist");
        }
      };

      if (watchlistId.length > 0) {
        updateWatchlist();
      }

      return () => (isActive = false);
    }, [filter, currentPage, watchlistChanged, watchlistId])
  );

  if (!loggedIn) {
    return <NotLoggedIn />;
  }

  if (watchlistId.length === 0) {
    return <NoWatchlist />;
  }

  if (watchlist.length === 0) {
    return <EmptyWatchlist />;
  }

  return (
    <>
      <Text style={watchlistStyles.header}>Watchlist</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={watchlistStyles.pickerContainer}>
          <RNPickerSelect
            value={filter}
            style={pickerStyle}
            onValueChange={(value) => {
              setFilter(value);
              setCurrentPage(1);
            }}
            items={[
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
              {
                label: "Recently Added (Recents First)",
                value: "original_order.desc",
              },
              {
                label: "Recently Added (Oldest First)",
                value: "original_order.asc",
              },
            ]}
          />
        </View>
        <FlatList
          data={watchlistView}
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
        {totalPages > 1 ? (
          <View style={watchlistStyles.pageBtns}>
            {currentPage != 1 ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-left-circle"
                mode="contained"
                style={watchlistStyles.pageBtn}
                onPress={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </Button>
            ) : null}
            {currentPage != totalPages ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-right-circle"
                mode="contained"
                style={watchlistStyles.pageBtn}
                onPress={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default WatchlistComponent;
