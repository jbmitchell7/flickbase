import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { windowHeight } from '../../App';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Movie = (props) => (
  // <Card>
  //   <Card.Title title={props.movie.title} />
  //   <Card.Cover source={{ uri: `${IMAGE_URL}${props.movie.poster_path}` }} />
  // </Card>

  <TouchableOpacity>
    <View style={styles.container}>
      <Image style={styles.image} source={`${IMAGE_URL}${props.movie.poster_path}`} />


      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>
          {props.movie.title}
        </Text>
      </View> */}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: '#032541',
    overflow: 'hidden'
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default Movie;
