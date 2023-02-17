import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import SearchForm from "./SearchForm";
import ListCardComponent from "../../ui/ListCardComponent"
import Snack from "../../ui/Snack";
import colors from "../../../assets/colors";
import {
  decrementCurrentPage,
  incrementCurrentPage,
  setSearchResults,
} from "../../../redux/search/searchSlice";
import { fetchGet } from "../../../api/tmdb";

const Search = (props) => {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive && searchState.query !== "") {
        getResults();
      }

      return () => {
        isActive = false;
      };
    }, [searchState.query, searchState.currentPage])
  );

  const getResults = async () => {
    try {
      const getResponse = await fetchGet(
        `/3/search/multi?query=${searchState.query}&page=${searchState.currentPage}`
      );
      dispatch(setSearchResults(getResponse.results));
    } catch {
      throw new Error("error querying for media");
    }
  };

  if (!searchState.results || searchState.results.length == 0) {
    return (
      <ScrollView>
        <SearchForm />
        <Text style={styles.text}> No Results</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchForm />
        {searchState.results.map((item) => (
          <ListCardComponent
            key={item.id}
            media={item}
            navigation={props.navigation}
            type="search"
          />
        ))}
        {searchState.pages > 1 ? (
          <View style={styles.pageBtns}>
            {searchState.currentPage != 1 ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-left-circle"
                mode="contained"
                style={styles.pageBtn}
                onPress={() => {
                  dispatch(decrementCurrentPage());
                }}
              >
                Prev
              </Button>
            ) : null}
            {searchState.currentPage != searchState.pages ? (
              <Button
                buttonColor={colors.yellow}
                dark={true}
                icon="arrow-right-circle"
                mode="contained"
                style={styles.pageBtn}
                onPress={() => {
                  dispatch(incrementCurrentPage());
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

const styles = StyleSheet.create({
  text: {
    paddingTop: 50,
    fontSize: 20,
    alignSelf: "center",
  },
  pageBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  pageBtn: {
    padding: 1,
    marginBottom: 20,
    marginHorizontal: 5,
  },
});

export default Search;
