import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const TvShowInfo = (props) => {
  const { show, styles } = props;
  return (
    <View>
      <Text style={styles.titleText}>{show.name}</Text>
      <Text style={[styles.bioTextHeader, styles.bioText]}>Synopsis:</Text>
      <Text style={styles.bioTextSummary}>{show.overview}</Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Debuted: </Text>
        <Text>{show.first_air_date}</Text>
      </Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Total Seasons: </Text>
        <Text>{show.number_of_seasons}</Text>
      </Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Total Episodes: </Text>
        <Text>{show.number_of_episodes}</Text>
      </Text>
    </View>
  );
};

export default TvShowInfo;
