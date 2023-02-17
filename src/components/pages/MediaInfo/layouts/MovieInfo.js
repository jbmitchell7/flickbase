import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

const MovieInfo = (props) => {
  const { movie, styles } = props;

  const convertDollars = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View>
      <Text style={styles.titleText}>{movie.title}</Text>
      <Text style={[styles.bioTextHeader, styles.bioText]}>Synopsis:</Text>
      <Text style={styles.bioTextSummary}>{movie.overview}</Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Release Date: </Text>
        <Text>{movie.release_date}</Text>
      </Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Runtime: </Text>
        <Text>{movie.runtime} minutes</Text>
      </Text>
      <Text style={styles.bioText}>
        {movie.budget ? (
          <>
            <Text style={styles.bioTextHeader}>Budget: </Text>
            <Text>${convertDollars(movie.budget)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.bioTextHeader}>Budget: </Text>
            <Text>N/A</Text>
          </>
        )}
      </Text>
      <Text style={styles.bioText}>
        {movie.revenue ? (
          <>
            <Text style={styles.bioTextHeader}>Revenue: </Text>
            <Text>${convertDollars(movie.revenue)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.bioTextHeader}>Revenue: </Text>
            <Text>N/A</Text>
          </>
        )}
      </Text>
    </View>
  );
};

export default MovieInfo;
