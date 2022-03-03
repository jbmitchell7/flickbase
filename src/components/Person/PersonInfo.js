import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';

const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

const PersonInfo = (props) => {
  const { person } = props.route.params;

  return (
    <ScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{person.name}</Text>
        <Text style={styles.occupationText}>Occupation {person.known_for_department}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: `${IMAGE_URL}${person.profile_path}` }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  },

  occupationText: {
    marginBottom: 10
  },

  imageContainer: {
    width: '100%',
    height: 400,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    paddingTop: 20
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});

export default PersonInfo;
