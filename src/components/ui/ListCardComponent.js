import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import MediaCoverComponent from "./MediaCoverComponent";
import WatchlistBtn from "./WatchlistBtn";

const ListCardComponent = (props) => {
  const { navigation, media, type } = props;

  const getYear = (date) => {
    return date.slice(0, 4);
  };

  if (media.media_type == "person") {
    return (
      <View style={styles.watchlistItemContainer}>
        <MediaCoverComponent media={media} key={media.id} navigation={navigation} />
        <View style={styles.column}>
          <Text style={[styles.itemTitle, styles.itemText]}>{media.name}</Text>
          <Text style={styles.itemText}>(Person)</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.watchlistItemContainer}>
      <MediaCoverComponent media={media} key={media.id} navigation={navigation} />
      <View style={styles.column}>
        <View>
          {media.media_type == "movie" ? (
            <View>
              <Text style={[styles.itemTitle, styles.itemText]}>
                {media.title}
              </Text>
              <Text style={styles.itemText}>(Movie)</Text>
              {"release_date" in media ? (
                <Text style={styles.itemText}>
                  {getYear(media.release_date)}
                </Text>
              ) : (
                <Text style={styles.itemText}>Release Date Unavailable</Text>
              )}
            </View>
          ) : (
            <View>
              <Text style={[styles.itemTitle, styles.itemText]}>
                {media.name}
              </Text>
              <Text style={styles.itemText}>(TV Show)</Text>
              {"first_air_date" in media ? (
                <Text style={styles.itemText}>
                  Premiered: {getYear(media.first_air_date)}
                </Text>
              ) : (
                <Text style={styles.itemText}>Premier Date Unavailable</Text>
              )}
            </View>
          )}
        </View>
        <View
          style={
            type == "search"
              ? styles.twoButtonContainer
              : styles.oneButtonContainer
          }
        >
          {type == "search" ? (
            <WatchlistBtn
              media={media}
              type={media.media_type}
              buttonType="add"
            />
          ) : null}
          <WatchlistBtn
            media={media}
            type={media.media_type}
            buttonType="remove"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  watchlistItemContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  column: {
    flexShrink: 1,
    paddingLeft: 10,
    alignSelf: "center",
  },
  itemTitle: {
    fontSize: 20,
  },
  itemText: {
    marginBottom: 10,
  },
  oneButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  twoButtonContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default ListCardComponent;
