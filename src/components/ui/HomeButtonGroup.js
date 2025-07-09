import React from "react";
import { View, StyleSheet } from "react-native";
import MediaBtn from "./MediaBtn";

const HomeBtnGroup = (props) => (
  <View style={styles.buttonContainer}>
    <MediaBtn
      label="Movies"
      navigation={props.navigation}
      route={props.route}
      media="movie"
      icon="movie-open"
    />
    <MediaBtn
      label="TV"
      navigation={props.navigation}
      route={props.route}
      media="tv"
      icon="television-classic"
    />
    <MediaBtn
      label="People"
      navigation={props.navigation}
      route={props.route}
      media="person"
      icon="account"
    />
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default HomeBtnGroup;