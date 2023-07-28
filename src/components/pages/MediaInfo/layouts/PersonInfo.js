import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import CreditList from "../../../ui/CreditList/CreditList";

const PersonInfo = (props) => {
  const {
    person,
    styles,
    movieInfo,
    tvInfo,
    navigation,
  } = props;

  let isLoading = true;
  let profession = '';

  if (person.known_for_department && movieInfo?.id && tvInfo?.id) {
    profession = person.known_for_department === "Acting" ? 'cast' : 'crew';
    isLoading = false;
  }

  if(isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={styles.titleText}>{person.name}</Text>
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Born: </Text>
        <Text>{person.birthday}</Text>
      </Text>
      {person.deathday ? (
        <Text style={styles.bioText}>
          <Text style={styles.bioTextHeader}>Died: </Text>
          <Text>{person.deathday}</Text>
        </Text>
      ) : null}
      <Text style={styles.bioText}>
        <Text style={styles.bioTextHeader}>Profession: </Text>
        <Text>{person.known_for_department}</Text>
      </Text>
      {movieInfo?.[profession].length > 0 ? (
        <>
          <Text style={[styles.bioTextHeader, styles.bioText]}>
            Film Credits:{" "}
          </Text>
          <CreditList
            list={movieInfo[profession]}
            listType={profession}
            mediaType="movie"
            navigation={navigation}
          />
        </>
      ) : (
        <Text style={styles.bioText}>No Film Credits</Text>
      )}
      {tvInfo?.[profession].length > 0 ? (
        <>
          <Text style={[styles.bioTextHeader, styles.bioText]}>
            Television Credits:{" "}
          </Text>
          <CreditList
            list={tvInfo[profession]}
            listType={profession}
            mediaType="tv"
            navigation={navigation}
          />
        </>
      ) : (
        <Text style={styles.bioText}>No Television Credits</Text>
      )}
      <Text style={[styles.bioTextHeader, styles.bioText]}>Biography:</Text>
      <Text style={styles.bioTextSummary}>{person.biography}</Text>
    </View>
  );
};

export default PersonInfo;
