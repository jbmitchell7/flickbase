import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";

import { setSearchQuery } from "../../redux/search/searchSlice";
import colors from "../../assets/colors";

const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  return (
    <Searchbar
      placeholder="Movie, TV Show, or Person"
      onChangeText={(query) => setSearchText(query)}
      onIconPress={() => dispatch(setSearchQuery(searchText))}
      onSubmitEditing={() => dispatch(setSearchQuery(searchText))}
      value={searchText}
      style={styles.searchBar}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 40,
    backgroundColor: colors.primaryBlue,
    width: "95%",
    alignSelf: "center",
  },
});

export default SearchForm;
