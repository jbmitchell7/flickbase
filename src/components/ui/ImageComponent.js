import React from "react";
import { Image, View, StyleSheet } from "react-native";

export const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

const ImageComponent = (props) => {
  const { item, media } = props;

  if (media == "person") {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_URL}${item.profile_path}` }}
        />
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: `${IMAGE_URL}${item.poster_path}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 400,
    marginBottom: 25,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

export default ImageComponent;
