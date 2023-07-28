import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";

import { IMAGE_URL } from "./ImageComponent";

const MediaCoverComponent = (props) => {
  const { navigation, media } = props;

  if ("gender" in media) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("MediaInfo", {
            mediaId: media.id,
            mediaType: "person",
          });
        }}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_URL}${media.profile_path}` }}
        />
      </Pressable>
    );
  }

  if ("first_air_date" in media) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("MediaInfo", {
            mediaId: media.id,
            mediaType: "tv",
          });
        }}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_URL}${media.poster_path}` }}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("MediaInfo", {
          mediaId: media.id,
          mediaType: "movie",
        });
      }}
      style={styles.imageContainer}
    >
      <Image
        style={styles.image}
        source={{ uri: `${IMAGE_URL}${media.poster_path}` }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  watchlistContainer: {
    width: "50%",
    height: 250,
    marginBottom: 15,
  },
  imageContainer: {
    width: 160,
    height: 225,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

export default MediaCoverComponent;
