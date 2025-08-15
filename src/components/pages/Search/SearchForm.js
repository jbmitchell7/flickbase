import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";

import {
  setSearchCurrentPage,
  setSearchPages,
  setSearchQuery,
  setSearchResults,
} from "../../../redux/search/searchSlice";
import colors from "../../../assets/colors";
import { fetchGet } from "../../../api/tmdb";

const SearchForm = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const search = async () => {
    dispatch(setSearchQuery(searchText));
    dispatch(setSearchCurrentPage(1));
    try {
      const getResponse = await fetchGet(
        `/3/search/multi?query=${searchText}&page=1`
      );
      dispatch(setSearchResults(getResponse.results));
      dispatch(setSearchPages(getResponse.total_pages));
    } catch {
      throw new Error("error querying for media");
    }
  };

  return (
    <Searchbar
      placeholder="Movie, TV Show, or Person"
      onChangeText={(query) => setSearchText(query)}
      onIconPress={() => search()}
      onSubmitEditing={() => search()}
      value={searchText}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 40,
    backgroundColor: colors.backgroundBlue,
    borderColor: colors.yellow,
    borderWidth: 2,
    width: "95%",
    alignSelf: "center",
  },
});

export default SearchForm;
